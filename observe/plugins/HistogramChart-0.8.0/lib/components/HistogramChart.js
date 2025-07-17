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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { EChart, getFormattedAxis, useChartsTheme } from '@perses-dev/components';
import { use } from 'echarts/core';
import { CustomChart } from 'echarts/charts';
import { getColorFromThresholds } from '../utils';
use([
    CustomChart
]);
export function HistogramChart({ width, height, data, format, min, max, thresholds }) {
    const chartsTheme = useChartsTheme();
    const transformedData = useMemo(()=>{
        return data.buckets.map(([bucket, lowerBound, upperBound, count])=>{
            return {
                value: [
                    parseFloat(lowerBound),
                    parseFloat(upperBound),
                    parseFloat(count),
                    bucket
                ],
                itemStyle: {
                    color: getColorFromThresholds(parseFloat(lowerBound), thresholds, chartsTheme, chartsTheme.echartsTheme[0])
                }
            };
        });
    }, [
        chartsTheme,
        data.buckets,
        thresholds
    ]);
    const minXAxis = useMemo(()=>{
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
    const maxXAxis = useMemo(()=>{
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
    const option = useMemo(()=>{
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
            yAxis: getFormattedAxis({}, format),
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
    return /*#__PURE__*/ _jsx(EChart, {
        sx: {
            width: width,
            height: height,
            padding: `${chartsTheme.container.padding.default}px`
        },
        option: option,
        theme: chartsTheme.echartsTheme
    });
}

//# sourceMappingURL=HistogramChart.js.map