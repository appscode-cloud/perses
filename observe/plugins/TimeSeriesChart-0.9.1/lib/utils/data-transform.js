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
import { getCommonTimeScale } from '@perses-dev/core';
import { OPTIMIZED_MODE_SERIES_LIMIT } from '@perses-dev/components';
import { DEFAULT_AREA_OPACITY, DEFAULT_CONNECT_NULLS, DEFAULT_LINE_WIDTH, DEFAULT_POINT_RADIUS, DEFAULT_Y_AXIS, POSITIVE_MIN_VALUE_MULTIPLIER, NEGATIVE_MIN_VALUE_MULTIPLIER } from '../time-series-chart-model';
export const EMPTY_GRAPH_DATA = {
    timeSeries: [],
    xAxis: [],
    legendItems: []
};
export const HIDE_DATAPOINTS_LIMIT = 70;
export const BLUR_FADEOUT_OPACITY = 0.5;
/**
 * Given a list of running queries, calculates a common time scale for use on
 * the x axis (i.e. start/end dates and a step that is divisible into all of
 * the queries' steps).
 */ export function getCommonTimeScaleForQueries(queries) {
    const seriesData = queries.map((query)=>query.data);
    return getCommonTimeScale(seriesData);
}
/**
 * [DEPRECATED] Gets ECharts line series option properties for legacy LineChart
 */ export function getLineSeries(id, formattedName, data, visual, paletteColor) {
    const lineWidth = visual.lineWidth ?? DEFAULT_LINE_WIDTH;
    const pointRadius = visual.pointRadius ?? DEFAULT_POINT_RADIUS;
    // Shows datapoint symbols when selected time range is roughly 15 minutes or less
    let showPoints = data !== undefined && data.length <= HIDE_DATAPOINTS_LIMIT;
    // Allows overriding default behavior and opt-in to always show all symbols (can hurt performance)
    if (visual.showPoints === 'always') {
        showPoints = true;
    }
    return {
        type: 'line',
        id: id,
        name: formattedName,
        data: data,
        connectNulls: visual.connectNulls ?? DEFAULT_CONNECT_NULLS,
        color: paletteColor,
        stack: visual.stack === 'all' ? visual.stack : undefined,
        sampling: 'lttb',
        progressiveThreshold: OPTIMIZED_MODE_SERIES_LIMIT,
        showSymbol: showPoints,
        showAllSymbol: true,
        symbolSize: pointRadius,
        lineStyle: {
            width: lineWidth,
            opacity: 0.8
        },
        areaStyle: {
            opacity: visual.areaOpacity ?? DEFAULT_AREA_OPACITY
        },
        // https://echarts.apache.org/en/option.html#series-line.emphasis
        emphasis: {
            focus: 'series',
            disabled: visual.areaOpacity !== undefined && visual.areaOpacity > 0,
            lineStyle: {
                width: lineWidth + 1.5,
                opacity: 1
            }
        },
        blur: {
            lineStyle: {
                width: lineWidth,
                opacity: BLUR_FADEOUT_OPACITY
            }
        }
    };
}
/**
 * Gets ECharts line series option properties for recommended TimeChart
 */ export function getTimeSeries(id, datasetIndex, formattedName, visual, timeScale, paletteColor) {
    const lineWidth = visual.lineWidth ?? DEFAULT_LINE_WIDTH;
    const pointRadius = visual.pointRadius ?? DEFAULT_POINT_RADIUS;
    // Shows datapoint symbols when selected time range is roughly 15 minutes or less
    const minuteMs = 60000;
    let showPoints = timeScale.rangeMs <= minuteMs * 15;
    // Allows overriding default behavior and opt-in to always show all symbols (can hurt performance)
    if (visual.showPoints === 'always') {
        showPoints = true;
    }
    if (visual.display === 'bar') {
        const series = {
            type: 'bar',
            id: id,
            datasetIndex,
            name: formattedName,
            color: paletteColor,
            stack: visual.stack === 'all' ? visual.stack : undefined,
            label: {
                show: false
            }
        };
        return series;
    }
    const series = {
        type: 'line',
        id: id,
        datasetIndex,
        name: formattedName,
        connectNulls: visual.connectNulls ?? DEFAULT_CONNECT_NULLS,
        color: paletteColor,
        stack: visual.stack === 'all' ? visual.stack : undefined,
        sampling: 'lttb',
        progressiveThreshold: OPTIMIZED_MODE_SERIES_LIMIT,
        showSymbol: showPoints,
        showAllSymbol: true,
        symbolSize: pointRadius,
        lineStyle: {
            width: lineWidth,
            opacity: 0.95
        },
        areaStyle: {
            opacity: visual.areaOpacity ?? DEFAULT_AREA_OPACITY
        },
        // https://echarts.apache.org/en/option.html#series-line.emphasis
        emphasis: {
            focus: 'series',
            disabled: visual.areaOpacity !== undefined && visual.areaOpacity > 0,
            lineStyle: {
                width: lineWidth + 1,
                opacity: 1
            }
        },
        selectedMode: 'single',
        select: {
            itemStyle: {
                borderColor: paletteColor,
                borderWidth: pointRadius + 0.5
            }
        },
        blur: {
            lineStyle: {
                width: lineWidth,
                opacity: BLUR_FADEOUT_OPACITY
            }
        }
    };
    return series;
}
/**
 * Gets threshold-specific line series styles
 * markLine cannot be used since it does not update yAxis max / min
 * and threshold data needs to show in the tooltip
 */ export function getThresholdSeries(name, threshold, seriesIndex) {
    return {
        type: 'line',
        name: name,
        id: name,
        datasetId: name,
        datasetIndex: seriesIndex,
        color: threshold.color,
        label: {
            show: false
        },
        lineStyle: {
            type: 'dashed',
            width: 2
        },
        emphasis: {
            focus: 'series',
            lineStyle: {
                width: 2.5
            }
        },
        blur: {
            lineStyle: {
                opacity: BLUR_FADEOUT_OPACITY
            }
        }
    };
}
/**
 * Converts percent threshold into absolute step value
 * If max is undefined, use the max value from time series data as default
 */ export function convertPercentThreshold(percent, data, max, min) {
    const percentDecimal = percent / 100;
    const adjustedMax = max ?? findMax(data);
    const adjustedMin = min ?? 0;
    const total = adjustedMax - adjustedMin;
    return percentDecimal * total + adjustedMin;
}
function findMax(data) {
    let max = 0;
    if (data.length && data[0] !== undefined && data[0]?.values) {
        data.forEach((series)=>{
            series.values.forEach((valueTuple)=>{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [_, value] = valueTuple;
                if (typeof value === 'number' && value > max) {
                    max = value;
                }
            });
        });
    } else {
        data.forEach((series)=>{
            if (series.data !== undefined) {
                series.data.forEach((value)=>{
                    if (typeof value === 'number' && value > max) {
                        max = value;
                    }
                });
            }
        });
    }
    return max;
}
/**
 * Converts Perses panel yAxis from dashboard spec to ECharts supported yAxis options
 */ export function convertPanelYAxis(inputAxis = {}) {
    const yAxis = {
        show: true,
        axisLabel: {
            show: inputAxis?.show ?? DEFAULT_Y_AXIS.show
        },
        min: inputAxis?.min,
        max: inputAxis?.max
    };
    // Set the y-axis minimum relative to the data
    if (inputAxis?.min === undefined) {
        // https://echarts.apache.org/en/option.html#yAxis.min
        yAxis.min = (value)=>{
            if (value.min >= 0 && value.min <= 1) {
                // Helps with PercentDecimal units, or datasets that return 0 or 1 booleans
                return 0;
            }
            // Note: We can tweak the MULTIPLIER constants if we want
            // TODO: Experiment with using a padding that is based on the difference between max value and min value
            if (value.min > 0) {
                return roundDown(value.min * POSITIVE_MIN_VALUE_MULTIPLIER);
            } else {
                return roundDown(value.min * NEGATIVE_MIN_VALUE_MULTIPLIER);
            }
        };
    }
    return yAxis;
}
/**
 * Rounds down to nearest number with one significant digit.
 *
 * Examples:
 * 1. 675 --> 600
 * 2. 0.567 --> 0.5
 * 3. -12 --> -20
 */ export function roundDown(num) {
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const firstDigit = Math.floor(num / Math.pow(10, magnitude));
    return firstDigit * Math.pow(10, magnitude);
}

//# sourceMappingURL=data-transform.js.map