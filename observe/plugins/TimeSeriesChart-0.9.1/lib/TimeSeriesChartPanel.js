// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import merge from 'lodash/merge';
import { getTimeSeriesValues, DEFAULT_LEGEND, getCalculations, formatValue } from '@perses-dev/core';
import { LEGEND_VALUE_CONFIG, useTimeRange, validateLegendSpec, legendValues } from '@perses-dev/plugin-system';
import { YAxisLabel, useChartsTheme, ContentWithLegend, useId, DEFAULT_TOOLTIP_CONFIG } from '@perses-dev/components';
import { DEFAULT_FORMAT, DEFAULT_VISUAL, THRESHOLD_PLOT_INTERVAL } from './time-series-chart-model';
import { getTimeSeries, getCommonTimeScaleForQueries, convertPanelYAxis, getThresholdSeries, convertPercentThreshold } from './utils/data-transform';
import { getSeriesColor } from './utils/palette-gen';
import { TimeSeriesChartBase } from './TimeSeriesChartBase';
// Using an "ALL" value to handle the case on first loading the chart where we
// want to select all, but do not want all of the legend items to be visually highlighted.
// This helps us differentiate those cases more clearly instead of inferring it
// based on the state of the data. This also helps us avoid some coding
// complexity around initializing a full record for the initial load that would
// currently require significantly more refactoring of this component.
// TODO: simplify this if we switch the list-based legend UI to use checkboxes,
// where we *would* want to visually select all items in this case.
export function TimeSeriesChartPanel(props) {
    const { spec: { thresholds, yAxis, tooltip, querySettings: querySettingsList }, contentDimensions, queryResults } = props;
    const chartsTheme = useChartsTheme();
    const muiTheme = useTheme();
    const chartId = useId('time-series-panel');
    const chartRef = useRef(null);
    // ECharts theme comes from ChartsProvider, more info: https://echarts.apache.org/en/option.html#color
    // Colors are manually applied since our legend and tooltip are built custom with React.
    const categoricalPalette = chartsTheme.echartsTheme.color;
    // TODO: consider refactoring how the layout/spacing/alignment are calculated
    // the next time significant changes are made to the time series panel (e.g.
    // when making improvements to the legend to more closely match designs).
    // This may also want to include moving some of this logic down to the shared,
    // embeddable components.
    const contentPadding = chartsTheme.container.padding.default;
    const adjustedContentDimensions = contentDimensions ? {
        width: contentDimensions.width - contentPadding * 2,
        height: contentDimensions.height - contentPadding * 2
    } : undefined;
    // populate default 'position' and other future properties
    const legend = useMemo(()=>{
        return props.spec.legend && validateLegendSpec(props.spec.legend) ? merge({}, DEFAULT_LEGEND, props.spec.legend) : undefined;
    }, [
        props.spec.legend
    ]);
    // TODO: add support for y_axis_alt.format
    const format = props.spec.yAxis?.format ?? DEFAULT_FORMAT;
    // ensures there are fallbacks for unset properties since most
    // users should not need to customize visual display
    const visual = useMemo(()=>{
        return merge({}, DEFAULT_VISUAL, props.spec.visual);
    }, [
        props.spec.visual
    ]);
    // convert Perses dashboard format to be ECharts compatible
    const echartsYAxis = useMemo(()=>{
        return convertPanelYAxis(yAxis);
    }, [
        yAxis
    ]);
    const [selectedLegendItems, setSelectedLegendItems] = useState('ALL');
    const [legendSorting, setLegendSorting] = useState();
    const { setTimeRange } = useTimeRange();
    // Populate series data based on query results
    const { timeScale, timeChartData, timeSeriesMapping, legendItems } = useMemo(()=>{
        const timeScale = getCommonTimeScaleForQueries(queryResults);
        if (timeScale === undefined) {
            return {
                timeChartData: [],
                timeSeriesMapping: []
            };
        }
        const legendItems = [];
        // Utilizes ECharts dataset so raw data is separate from series option style properties
        // https://apache.github.io/echarts-handbook/en/concepts/dataset/
        const timeChartData = [];
        const timeSeriesMapping = [];
        // Index is counted across multiple queries which ensures the categorical color palette does not reset for every query
        let seriesIndex = 0;
        // Mapping of each set of query results to be ECharts option compatible
        // TODO: Look into performance optimizations and moving parts of mapping to the lower level chart
        for(let queryIndex = 0; queryIndex < queryResults.length; queryIndex++){
            const result = queryResults[queryIndex];
            // Retrieve querySettings for this query, if exists.
            // queries & querySettings indices do not necessarily match, so we have to check the tail value of the $ref attribute
            let querySettings;
            for (const item of querySettingsList ?? []){
                if (item.queryIndex === queryIndex) {
                    querySettings = item;
                // We don't break the loop here just in case there are multiple querySettings defined for the
                // same queryIndex, because in that case we want the last one to take precedence.
                }
            }
            if (result) {
                for(let i = 0; i < result.data.series.length; i++){
                    const timeSeries = result.data.series[i];
                    if (timeSeries === undefined) {
                        return {
                            timeChartData: [],
                            timeSeriesMapping: [],
                            legendItems: []
                        };
                    }
                    // Format is determined by seriesNameFormat in query spec
                    const formattedSeriesName = timeSeries.formattedName ?? timeSeries.name;
                    // Color is used for line, tooltip, and legend
                    const seriesColor = getSeriesColor({
                        // ECharts type for color is not always an array but it is always an array in ChartsProvider
                        categoricalPalette: categoricalPalette,
                        visual,
                        muiPrimaryColor: muiTheme.palette.primary.main,
                        seriesName: formattedSeriesName,
                        seriesIndex,
                        querySettings: querySettings,
                        queryHasMultipleResults: (queryResults[queryIndex]?.data?.series?.length ?? 0) > 1
                    });
                    // We add a unique id for the chart to disambiguate items across charts
                    // when there are multiple on the page.
                    const seriesId = chartId + timeSeries.name + seriesIndex;
                    const legendCalculations = legend?.values ? getCalculations(timeSeries.values, legend.values) : undefined;
                    // When we initially load the chart, we want to show all series, but
                    // DO NOT want to visualy highlight all the items in the legend.
                    const isSelectAll = selectedLegendItems === 'ALL';
                    const isSelected = !isSelectAll && !!selectedLegendItems[seriesId];
                    const showTimeSeries = isSelected || isSelectAll;
                    if (showTimeSeries) {
                        // Use timeChartData.length to ensure the data that is passed into the tooltip accounts for
                        // which legend items are selected. This must happen before timeChartData.push to avoid an
                        // off-by-one error, seriesIndex cannot be used since it's needed to cycle through palette
                        const datasetIndex = timeChartData.length;
                        // Each series is stored as a separate dataset source.
                        // https://apache.github.io/echarts-handbook/en/concepts/dataset/#how-to-reference-several-datasets
                        timeSeriesMapping.push(getTimeSeries(seriesId, datasetIndex, formattedSeriesName, visual, timeScale, seriesColor));
                        timeChartData.push({
                            name: formattedSeriesName,
                            values: getTimeSeriesValues(timeSeries, timeScale)
                        });
                    }
                    if (legend && legendItems) {
                        legendItems.push({
                            id: seriesId,
                            label: formattedSeriesName,
                            color: seriesColor,
                            data: legendCalculations
                        });
                    }
                    // Used for repeating colors in Categorical palette
                    seriesIndex++;
                }
            }
        }
        if (thresholds && thresholds.steps) {
            // Convert how thresholds are defined in the panel spec to valid ECharts 'line' series.
            // These are styled with predefined colors and a dashed style to look different than series from query results.
            // Regular series are used instead of markLines since thresholds currently show in our React TimeSeriesTooltip.
            const thresholdsColors = chartsTheme.thresholds;
            const defaultThresholdColor = thresholds.defaultColor ?? thresholdsColors.defaultColor;
            thresholds.steps.forEach((step, index)=>{
                const stepPaletteColor = thresholdsColors.palette[index] ?? defaultThresholdColor;
                const thresholdLineColor = step.color ?? stepPaletteColor;
                const stepOption = {
                    color: thresholdLineColor,
                    value: // yAxis is passed here since it corresponds to dashboard JSON instead of the already converted ECharts yAxis
                    thresholds.mode === 'percent' ? convertPercentThreshold(step.value, timeChartData, yAxis?.max, yAxis?.min) : step.value
                };
                const thresholdName = step.name ?? `Threshold ${index + 1}`;
                // Generates array of [time, step.value] where time ranges from timescale.startMs to timescale.endMs with an interval of 15s
                const thresholdTimeValueTuple = [];
                let currentTimestamp = timeScale.startMs;
                while(currentTimestamp <= timeScale.endMs){
                    thresholdTimeValueTuple.push([
                        currentTimestamp,
                        stepOption.value
                    ]);
                    // Used to plot fake thresholds datapoints so correct nearby threshold series shows in tooltip without flicker
                    currentTimestamp += 1000 * THRESHOLD_PLOT_INTERVAL;
                }
                timeChartData.push({
                    name: thresholdName,
                    values: thresholdTimeValueTuple
                });
                timeSeriesMapping.push(getThresholdSeries(thresholdName, stepOption, seriesIndex));
                seriesIndex++;
            });
        }
        return {
            timeScale,
            timeChartData,
            timeSeriesMapping,
            legendItems
        };
    }, [
        queryResults,
        thresholds,
        selectedLegendItems,
        legend,
        visual,
        querySettingsList,
        yAxis?.max,
        yAxis?.min,
        categoricalPalette,
        chartId,
        chartsTheme.thresholds,
        muiTheme.palette.primary.main
    ]);
    // Translate the legend values into columns for the table legend.
    const legendColumns = useMemo(()=>{
        if (!legend?.values) {
            return [];
        }
        // Iterating the predefined list of possible values to retain a specific
        // intended order of values.
        return legendValues.reduce((columns, legendValue)=>{
            const legendConfig = LEGEND_VALUE_CONFIG[legendValue];
            if (legendConfig && legend?.values?.includes(legendValue)) {
                columns.push({
                    accessorKey: `data.${legendValue}`,
                    header: legendConfig.label,
                    headerDescription: legendConfig.description,
                    // Intentionally hardcoding a column width to start based on discussions
                    // with design around keeping this simple to start. This may need
                    // revisiting in the future to handle edge cases with very large values.
                    width: 72,
                    align: 'right',
                    cell: ({ getValue })=>{
                        const cellValue = getValue();
                        return typeof cellValue === 'number' && format ? formatValue(cellValue, format) : cellValue;
                    },
                    cellDescription: true,
                    enableSorting: true
                });
            }
            return columns;
        }, []);
    }, [
        legend?.values,
        format
    ]);
    if (adjustedContentDimensions === undefined) {
        return null;
    }
    // override default spacing, see: https://echarts.apache.org/en/option.html#grid
    const gridLeft = yAxis && yAxis.label ? 30 : 20;
    const gridOverrides = {
        left: !echartsYAxis.show ? 0 : gridLeft,
        right: 20,
        bottom: 0
    };
    const handleDataZoom = (event)=>{
        // TODO: add ECharts transition animation on zoom
        setTimeRange({
            start: new Date(event.start),
            end: new Date(event.end)
        });
    };
    // Used to opt in to ECharts trigger item which show subgroup data accurately
    const isStackedBar = visual.display === 'bar' && visual.stack === 'all';
    // Turn on tooltip pinning by default but opt out for stacked bar or if explicitly set in tooltip panel spec
    let enablePinning = true;
    if (isStackedBar) {
        enablePinning = false;
    } else if (tooltip?.enablePinning !== undefined) {
        enablePinning = tooltip.enablePinning;
    }
    const tooltipConfig = {
        ...DEFAULT_TOOLTIP_CONFIG,
        enablePinning
    };
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            padding: `${contentPadding}px`
        },
        children: /*#__PURE__*/ _jsx(ContentWithLegend, {
            width: adjustedContentDimensions.width,
            height: adjustedContentDimensions.height,
            // Making this small enough that the medium size doesn't get
            // responsive-handling-ed away when in the panel options editor.
            minChildrenHeight: 50,
            legendSize: legend?.size,
            legendProps: legend && {
                options: legend,
                data: legendItems || [],
                selectedItems: selectedLegendItems,
                onSelectedItemsChange: setSelectedLegendItems,
                tableProps: {
                    columns: legendColumns,
                    sorting: legendSorting,
                    onSortingChange: setLegendSorting
                },
                onItemMouseOver: (e, { id })=>{
                    chartRef.current?.highlightSeries({
                        name: id
                    });
                },
                onItemMouseOut: ()=>{
                    chartRef.current?.clearHighlightedSeries();
                }
            },
            children: ({ height, width })=>{
                return /*#__PURE__*/ _jsxs(Box, {
                    style: {
                        height,
                        width
                    },
                    children: [
                        yAxis && yAxis.show && yAxis.label && /*#__PURE__*/ _jsx(YAxisLabel, {
                            name: yAxis.label,
                            height: height
                        }),
                        /*#__PURE__*/ _jsx(TimeSeriesChartBase, {
                            ref: chartRef,
                            height: height,
                            data: timeChartData,
                            seriesMapping: timeSeriesMapping,
                            timeScale: timeScale,
                            yAxis: echartsYAxis,
                            format: format,
                            grid: gridOverrides,
                            isStackedBar: isStackedBar,
                            tooltipConfig: tooltipConfig,
                            syncGroup: "default-panel-group" // TODO: make configurable from dashboard settings and per panel-group overrides
                            ,
                            onDataZoom: handleDataZoom,
                            //  Show an empty chart when there is no data because the user unselected all items in
                            // the legend. Otherwise, show a "no data" message.
                            noDataVariant: !timeChartData.length && legendItems && legendItems.length > 0 ? 'chart' : 'message'
                        })
                    ]
                });
            }
        })
    });
}

//# sourceMappingURL=TimeSeriesChartPanel.js.map