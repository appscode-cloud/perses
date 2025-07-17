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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PieChartPanel", {
    enumerable: true,
    get: function() {
        return PieChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _pluginsystem = require("@perses-dev/plugin-system");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _react = require("react");
const _palettegen = require("./palette-gen");
const _utils = require("./utils");
const _PieChartBase = require("./PieChartBase");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PieChartPanel(props) {
    const { spec: { calculation, sort, mode }, contentDimensions, queryResults } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const muiTheme = (0, _material.useTheme)();
    const PADDING = chartsTheme.container.padding.default;
    const chartId = (0, _components.useId)('time-series-panel');
    const categoricalPalette = chartsTheme.echartsTheme.color;
    const { pieChartData, legendItems } = (0, _react.useMemo)(()=>{
        const calculate = _core.CalculationsMap[calculation];
        const pieChartData = [];
        const legendItems = [];
        for(let queryIndex = 0; queryIndex < queryResults.length; queryIndex++){
            const result = queryResults[queryIndex];
            let seriesIndex = 0;
            for (const seriesData of result?.data.series ?? []){
                const seriesColor = (0, _palettegen.getSeriesColor)({
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
        const sortedPieChartData = (0, _utils.sortSeriesData)(pieChartData, sort);
        if (mode === 'percentage') {
            return {
                pieChartData: (0, _utils.calculatePercentages)(sortedPieChartData),
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
    const legend = (0, _react.useMemo)(()=>{
        return props.spec.legend && (0, _pluginsystem.validateLegendSpec)(props.spec.legend) ? (0, _merge.default)({}, _core.DEFAULT_LEGEND, props.spec.legend) : undefined;
    }, [
        props.spec.legend
    ]);
    const [selectedLegendItems, setSelectedLegendItems] = (0, _react.useState)('ALL');
    const [legendSorting, setLegendSorting] = (0, _react.useState)();
    const chartRef = (0, _react.useRef)(null);
    // ensures there are fallbacks for unset properties since most
    // users should not need to customize visual display
    if (contentDimensions === undefined) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            padding: `${PADDING}px`
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ContentWithLegend, {
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
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    style: {
                        height,
                        width
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PieChartBase.PieChartBase, {
                        data: pieChartData,
                        width: contentDimensions.width - PADDING * 2,
                        height: contentDimensions.height - PADDING * 2
                    })
                });
            }
        })
    });
}
