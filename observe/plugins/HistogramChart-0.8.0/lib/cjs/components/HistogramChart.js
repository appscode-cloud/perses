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
Object.defineProperty(exports, "HistogramChart", {
    enumerable: true,
    get: function() {
        return HistogramChart;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _components = require("@perses-dev/components");
const _core = require("echarts/core");
const _charts = require("echarts/charts");
const _utils = require("../utils");
(0, _core.use)([
    _charts.CustomChart
]);
function HistogramChart({ width, height, data, format, min, max, thresholds }) {
    const chartsTheme = (0, _components.useChartsTheme)();
    const transformedData = (0, _react.useMemo)(()=>{
        return data.buckets.map(([bucket, lowerBound, upperBound, count])=>{
            return {
                value: [
                    parseFloat(lowerBound),
                    parseFloat(upperBound),
                    parseFloat(count),
                    bucket
                ],
                itemStyle: {
                    color: (0, _utils.getColorFromThresholds)(parseFloat(lowerBound), thresholds, chartsTheme, chartsTheme.echartsTheme[0])
                }
            };
        });
    }, [
        chartsTheme,
        data.buckets,
        thresholds
    ]);
    const minXAxis = (0, _react.useMemo)(()=>{
        if (min) {
            return min;
        }
        if (transformedData && transformedData[0]) {
            return Math.min(0, Math.floor(transformedData[0]?.value[0] ?? 0));
        }
        return undefined;
    }, [
        min,
        transformedData
    ]);
    const maxXAxis = (0, _react.useMemo)(()=>{
        if (max) {
            return max;
        }
        if (transformedData && transformedData[transformedData.length - 1]) {
            return Math.ceil(transformedData[transformedData.length - 1]?.value[1] ?? 1);
        }
        return undefined;
    }, [
        max,
        transformedData
    ]);
    const option = (0, _react.useMemo)(()=>{
        if (!transformedData) return chartsTheme.noDataOption;
        return {
            title: {
                show: false
            },
            tooltip: {},
            xAxis: {
                scale: false,
                min: minXAxis,
                max: maxXAxis
            },
            yAxis: (0, _components.getFormattedAxis)({}, format),
            series: [
                {
                    type: 'custom',
                    renderItem: function(params, api) {
                        const yValue = api.value(2);
                        const start = api.coord([
                            api.value(0),
                            yValue
                        ]);
                        const size = api.size?.([
                            api.value(1) - api.value(0),
                            yValue
                        ]);
                        const style = api.style?.();
                        return {
                            type: 'rect',
                            shape: {
                                x: start[0],
                                y: start[1],
                                width: size[0],
                                height: size[1]
                            },
                            style: style
                        };
                    },
                    label: {
                        show: false
                    },
                    dimensions: [
                        'from',
                        'to'
                    ],
                    encode: {
                        x: [
                            0,
                            1
                        ],
                        y: 2,
                        tooltip: [
                            0,
                            1
                        ],
                        itemName: 2
                    },
                    data: transformedData
                }
            ]
        };
    }, [
        chartsTheme.noDataOption,
        format,
        maxXAxis,
        minXAxis,
        transformedData
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
        sx: {
            width: width,
            height: height,
            padding: `${chartsTheme.container.padding.default}px`
        },
        option: option,
        theme: chartsTheme.echartsTheme
    });
}
