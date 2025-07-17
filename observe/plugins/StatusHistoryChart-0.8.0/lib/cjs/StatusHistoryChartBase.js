// Copyright 2024 The Perses Authors
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
Object.defineProperty(exports, "StatusHistoryChartBase", {
    enumerable: true,
    get: function() {
        return StatusHistoryChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _charts = require("echarts/charts");
const _components = require("echarts/components");
const _core = require("echarts/core");
const _renderers = require("echarts/renderers");
const _components1 = require("@perses-dev/components");
const _getformattedaxislabel = require("./utils/get-formatted-axis-label");
const _StatusHistoryTooltip = require("./StatusHistoryTooltip");
(0, _core.use)([
    _charts.HeatmapChart,
    _components.VisualMapComponent,
    _components.GridComponent,
    _components.DatasetComponent,
    _components.TitleComponent,
    _components.TooltipComponent,
    _renderers.CanvasRenderer
]);
const StatusHistoryChartBase = (props)=>{
    const { height, data, xAxisCategories, yAxisCategories, timeScale, colors } = props;
    const { timeZone } = (0, _components1.useTimeZone)();
    const chartsTheme = (0, _components1.useChartsTheme)();
    const theme = (0, _material.useTheme)();
    const option = {
        tooltip: {
            appendToBody: true,
            formatter: (params)=>{
                return (0, _StatusHistoryTooltip.generateTooltipHTML)({
                    data: params.data.value,
                    label: params.data.label,
                    marker: params.marker,
                    xAxisCategories,
                    yAxisCategories,
                    theme
                });
            }
        },
        grid: {
            top: '5%',
            bottom: '5%'
        },
        xAxis: {
            type: 'category',
            data: xAxisCategories,
            axisLine: {
                show: false
            },
            splitArea: {
                show: false
            },
            axisLabel: {
                hideOverlap: true,
                formatter: (0, _getformattedaxislabel.getFormattedStatusHistoryAxisLabel)(timeScale?.rangeMs ?? 0, timeZone)
            }
        },
        yAxis: {
            type: 'category',
            data: yAxisCategories,
            axisLine: {
                show: false
            },
            splitArea: {
                show: false,
                interval: 0
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                interval: 0
            }
        },
        visualMap: {
            show: false,
            type: 'piecewise',
            pieces: colors
        },
        series: [
            {
                name: 'Status history',
                type: 'heatmap',
                coordinateSystem: 'cartesian2d',
                data: data,
                label: {
                    show: false
                },
                itemStyle: {
                    borderWidth: 1,
                    borderType: 'solid',
                    borderColor: '#ffffff'
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.5
                    }
                }
            }
        ]
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        style: {
            height: height
        },
        sx: {
            overflow: 'auto'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.EChart, {
            sx: {
                width: '100%',
                height: height
            },
            option: option,
            theme: chartsTheme.echartsTheme
        })
    });
};
