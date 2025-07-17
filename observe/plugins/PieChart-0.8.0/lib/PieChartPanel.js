//Copyright 2024 The Perses Authors
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
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { ContentWithLegend, useChartsTheme, useId } from '@perses-dev/components';
import { CalculationsMap, DEFAULT_LEGEND } from '@perses-dev/core';
import { validateLegendSpec } from '@perses-dev/plugin-system';
import merge from 'lodash/merge';
import { useMemo, useRef, useState } from 'react';
import { getSeriesColor } from './palette-gen';
import { calculatePercentages, sortSeriesData } from './utils';
import { PieChartBase } from './PieChartBase';
export function PieChartPanel(props) {
    const { spec: { calculation, sort, mode }, contentDimensions, queryResults } = props;
    const chartsTheme = useChartsTheme();
    const muiTheme = useTheme();
    const PADDING = chartsTheme.container.padding.default;
    const chartId = useId('time-series-panel');
    const categoricalPalette = chartsTheme.echartsTheme.color;
    const { pieChartData, legendItems } = useMemo(()=>{
        const calculate = CalculationsMap[calculation];
        const pieChartData = [];
        const legendItems = [];
        for(let queryIndex = 0; queryIndex < queryResults.length; queryIndex++){
            const result = queryResults[queryIndex];
            let seriesIndex = 0;
            for (const seriesData of result?.data.series ?? []){
                const seriesColor = getSeriesColor({
                    categoricalPalette: categoricalPalette,
                    muiPrimaryColor: muiTheme.palette.primary.main,
                    seriesName: seriesData.name
                });
                const series = {
                    value: calculate(seriesData.values) ?? null,
                    name: seriesData.formattedName ?? '',
                    itemStyle: {
                        color: seriesColor
                    }
                };
                pieChartData.push(series);
                const seriesId = chartId + seriesData.name + seriesIndex;
                legendItems.push({
                    id: seriesId,
                    label: series.name,
                    color: seriesColor
                });
                seriesIndex++;
            }
        }
        const sortedPieChartData = sortSeriesData(pieChartData, sort);
        if (mode === 'percentage') {
            return {
                pieChartData: calculatePercentages(sortedPieChartData),
                legendItems
            };
        }
        return {
            pieChartData: sortedPieChartData,
            legendItems
        };
    }, [
        calculation,
        sort,
        mode,
        queryResults,
        categoricalPalette,
        muiTheme.palette.primary.main,
        chartId
    ]);
    const contentPadding = chartsTheme.container.padding.default;
    const adjustedContentDimensions = contentDimensions ? {
        width: contentDimensions.width - contentPadding * 2,
        height: contentDimensions.height - contentPadding * 2
    } : undefined;
    const legend = useMemo(()=>{
        return props.spec.legend && validateLegendSpec(props.spec.legend) ? merge({}, DEFAULT_LEGEND, props.spec.legend) : undefined;
    }, [
        props.spec.legend
    ]);
    const [selectedLegendItems, setSelectedLegendItems] = useState('ALL');
    const [legendSorting, setLegendSorting] = useState();
    const chartRef = useRef(null);
    // ensures there are fallbacks for unset properties since most
    // users should not need to customize visual display
    if (contentDimensions === undefined) return null;
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            padding: `${PADDING}px`
        },
        children: /*#__PURE__*/ _jsx(ContentWithLegend, {
            width: adjustedContentDimensions?.width ?? 400,
            height: adjustedContentDimensions?.height ?? 1000,
            // Making this small enough that the medium size doesn't get
            // responsive-handling-ed away when in the panel options editor.
            minChildrenHeight: 50,
            legendSize: legend?.size,
            legendProps: legend && {
                options: legend,
                data: legendItems,
                selectedItems: selectedLegendItems,
                onSelectedItemsChange: setSelectedLegendItems,
                tableProps: {
                    columns: [],
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
                return /*#__PURE__*/ _jsx(Box, {
                    style: {
                        height,
                        width
                    },
                    children: /*#__PURE__*/ _jsx(PieChartBase, {
                        data: pieChartData,
                        width: contentDimensions.width - PADDING * 2,
                        height: contentDimensions.height - PADDING * 2
                    })
                });
            }
        })
    });
}

//# sourceMappingURL=PieChartPanel.js.map