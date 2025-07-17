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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartBase", {
    enumerable: true,
    get: function() {
        return BarChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _core1 = require("echarts/core");
const _charts = require("echarts/charts");
const _components1 = require("echarts/components");
const _renderers = require("echarts/renderers");
const _material = require("@mui/material");
(0, _core1.use)([
    _charts.BarChart,
    _components1.GridComponent,
    _components1.DatasetComponent,
    _components1.TitleComponent,
    _components1.TooltipComponent,
    _renderers.CanvasRenderer
]);
const BAR_WIN_WIDTH = 14;
const BAR_GAP = 6;
function BarChartBase(props) {
    const { width, height, data, format = {
        unit: 'decimal'
    }, mode = 'value' } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const option = (0, _react.useMemo)(()=>{
        if (!data || !data.length) return chartsTheme.noDataOption;
        const source = [];
        data.map((d)=>{
            source.push([
                d.label,
                d.value
            ]);
        });
        return {
            title: {
                show: false
            },
            dataset: [
                {
                    dimensions: [
                        'label',
                        'value'
                    ],
                    source: source
                }
            ],
            xAxis: (0, _components.getFormattedAxis)({}, format),
            yAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    overflow: 'truncate',
                    width: width / 3
                }
            },
            series: {
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    formatter: (params)=>{
                        if (!params.data[1]) {
                            return undefined;
                        }
                        if (mode === 'percentage') {
                            return (0, _core.formatValue)(params.data[1], {
                                unit: 'percent',
                                decimalPlaces: format.decimalPlaces
                            });
                        }
                        return (0, _core.formatValue)(params.data[1], format);
                    },
                    barMinWidth: BAR_WIN_WIDTH,
                    barCategoryGap: BAR_GAP
                },
                itemStyle: {
                    borderRadius: 4,
                    color: chartsTheme.echartsTheme[0]
                }
            },
            tooltip: {
                appendToBody: true,
                confine: true,
                formatter: (params)=>params.data[1] && `<b>${params.name}</b> &emsp; ${(0, _core.formatValue)(params.data[1], format)}`
            },
            // increase distance between grid and container to prevent y axis labels from getting cut off
            grid: {
                left: '5%',
                right: '5%'
            }
        };
    }, [
        data,
        chartsTheme,
        width,
        mode,
        format
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        style: {
            width: width,
            height: height
        },
        sx: {
            overflow: 'auto'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
            sx: {
                minHeight: height,
                height: data ? data.length * (BAR_WIN_WIDTH + BAR_GAP) : '100%'
            },
            option: option,
            theme: chartsTheme.echartsTheme
        })
    });
}
