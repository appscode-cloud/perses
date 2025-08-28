// Copyright 2025 The Perses Authors
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
Object.defineProperty(exports, "HeatMapChart", {
    enumerable: true,
    get: function() {
        return HeatMapChart;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _components = require("@perses-dev/components");
const _core = require("echarts/core");
const _charts = require("echarts/charts");
const _material = require("@mui/material");
const _utils = require("../utils");
const _HeatMapTooltip = require("./HeatMapTooltip");
(0, _core.use)([
    _charts.HeatmapChart
]);
// The default coloring is a blue->yellow->red gradient
const DEFAULT_VISUAL_MAP_COLORS = [
    '#313695',
    '#4575b4',
    '#74add1',
    '#abd9e9',
    '#e0f3f8',
    '#ffffbf',
    '#fee090',
    '#fdae61',
    '#f46d43',
    '#d73027',
    '#a50026'
];
function HeatMapChart({ width, height, data, xAxisCategories, yAxisCategories, yAxisFormat, countFormat, countMin, countMax, timeScale, showVisualMap }) {
    const chartsTheme = (0, _components.useChartsTheme)();
    const theme = (0, _material.useTheme)();
    const { timeZone } = (0, _components.useTimeZone)();
    const option = (0, _react.useMemo)(()=>{
        return {
            tooltip: {
                appendToBody: true,
                formatter: (params)=>{
                    return (0, _HeatMapTooltip.generateTooltipHTML)({
                        data: params.data.value,
                        label: params.data.label,
                        marker: params.marker,
                        xAxisCategories,
                        yAxisCategories,
                        theme,
                        yAxisFormat: yAxisFormat,
                        countFormat: countFormat
                    });
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisCategories,
                axisLabel: {
                    hideOverlap: true,
                    formatter: (0, _utils.getFormattedHeatmapAxisLabel)(timeScale?.rangeMs ?? 0, timeZone)
                }
            },
            yAxis: (0, _components.getFormattedAxis)({
                type: 'category',
                data: yAxisCategories
            }, yAxisFormat),
            visualMap: {
                show: showVisualMap ?? false,
                type: 'continuous',
                min: countMin,
                max: countMax,
                realtime: false,
                itemHeight: height - 30,
                itemWidth: 10,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                inRange: {
                    color: DEFAULT_VISUAL_MAP_COLORS
                },
                textStyle: {
                    color: theme.palette.text.primary,
                    textBorderColor: theme.palette.background.default,
                    textBorderWidth: 5
                }
            },
            series: [
                {
                    name: 'Gaussian',
                    type: 'heatmap',
                    data: data,
                    emphasis: {
                        itemStyle: {
                            borderColor: '#333',
                            borderWidth: 1
                        }
                    },
                    progressive: 1000,
                    animation: false
                }
            ]
        };
    }, [
        xAxisCategories,
        timeScale?.rangeMs,
        timeZone,
        yAxisCategories,
        yAxisFormat,
        showVisualMap,
        countMin,
        countMax,
        height,
        theme,
        data,
        countFormat
    ]);
    const chart = (0, _react.useMemo)(()=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
            sx: {
                width: width,
                height: height,
                padding: `${chartsTheme.container.padding.default}px`
            },
            option: option,
            theme: chartsTheme.echartsTheme
        }), [
        chartsTheme.container.padding.default,
        chartsTheme.echartsTheme,
        height,
        option,
        width
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: chart
    });
}
