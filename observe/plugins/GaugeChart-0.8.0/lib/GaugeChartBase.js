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
import { jsx as _jsx } from "react/jsx-runtime";
import { EChart, useChartsTheme } from '@perses-dev/components';
import { formatValue, useDeepMemo } from '@perses-dev/core';
import { use } from 'echarts/core';
import { GaugeChart as EChartsGaugeChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
use([
    EChartsGaugeChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
]);
const PROGRESS_WIDTH = 16;
// adjusts when to show pointer icon
const GAUGE_SMALL_BREAKPOINT = 170;
export function GaugeChartBase(props) {
    const { width, height, data, format, axisLine, max } = props;
    const chartsTheme = useChartsTheme();
    // useDeepMemo ensures value size util does not rerun everytime you hover on the chart
    const option = useDeepMemo(()=>{
        if (data.value === undefined) return chartsTheme.noDataOption;
        // adjusts fontSize depending on number of characters
        const valueSizeClamp = getResponsiveValueSize(data.value, format, width, height);
        return {
            title: {
                show: false
            },
            tooltip: {
                show: false
            },
            series: [
                {
                    type: 'gauge',
                    center: [
                        '50%',
                        '65%'
                    ],
                    radius: '86%',
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max,
                    silent: true,
                    progress: {
                        show: true,
                        width: PROGRESS_WIDTH,
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [
                                    1,
                                    'rgba(127,127,127,0.35)'
                                ]
                            ],
                            width: PROGRESS_WIDTH
                        }
                    },
                    axisTick: {
                        show: false,
                        distance: 0
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        distance: -18,
                        color: '#999',
                        fontSize: 12
                    },
                    anchor: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    data: [
                        {
                            value: data.value
                        }
                    ]
                },
                {
                    type: 'gauge',
                    center: [
                        '50%',
                        '65%'
                    ],
                    radius: '100%',
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max,
                    pointer: {
                        show: true,
                        // pointer hidden for small panels, path taken from ex: https://echarts.apache.org/examples/en/editor.html?c=gauge-grade
                        icon: width > GAUGE_SMALL_BREAKPOINT ? 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z' : 'none',
                        length: 10,
                        width: 5,
                        offsetCenter: [
                            0,
                            '-49%'
                        ],
                        itemStyle: {
                            color: 'auto'
                        }
                    },
                    axisLine,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    detail: {
                        show: true,
                        width: '60%',
                        borderRadius: 8,
                        offsetCenter: [
                            0,
                            '-9%'
                        ],
                        color: 'inherit',
                        fontSize: valueSizeClamp,
                        formatter: data.value === null ? // at this level because the `formatter` function argument is `NaN`
                        // when the value is `null`, making it difficult to differentiate
                        // `null` from a true `NaN` case.
                        ()=>'null' : (value)=>{
                            return formatValue(value, format);
                        }
                    },
                    data: [
                        {
                            value: data.value,
                            name: data.label,
                            // TODO: new UX for series names, create separate React component or reuse ListLegendItem
                            // https://echarts.apache.org/en/option.html#series-gauge.data.title
                            title: {
                                show: true,
                                color: chartsTheme.echartsTheme.textStyle?.color ?? 'inherit',
                                offsetCenter: [
                                    0,
                                    '55%'
                                ],
                                overflow: 'truncate',
                                fontSize: 12,
                                width: width * 0.8
                            }
                        }
                    ]
                }
            ]
        };
    }, [
        data,
        width,
        height,
        chartsTheme,
        format,
        axisLine,
        max
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
/**
 * Responsive font size depending on number of characters, clamp used
 * to ensure size stays within given range
 */ export function getResponsiveValueSize(value, format, width, height) {
    const MIN_SIZE = 3;
    const MAX_SIZE = 24;
    const SIZE_MULTIPLIER = 0.7;
    const formattedValue = typeof value === 'number' ? formatValue(value, format) : `${value}`;
    const valueCharacters = formattedValue.length ?? 2;
    const valueSize = Math.min(width, height) / valueCharacters * SIZE_MULTIPLIER;
    return `clamp(${MIN_SIZE}px, ${valueSize}px, ${MAX_SIZE}px)`;
}

//# sourceMappingURL=GaugeChartBase.js.map