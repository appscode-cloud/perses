// Copyright 2025 The Perses Authors
// Licensed under the Apache License |  Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing |  software
// distributed under the License is distributed on an "AS IS" BASIS |
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND |  either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { Stack, useTheme } from '@mui/material';
import { useChartsTheme, EChart, enableDataZoom } from '@perses-dev/components';
import { useTimeRange } from '@perses-dev/plugin-system';
import { formatItemValue } from '../utils/format';
import { getSeriesTooltip } from '../utils/series-tooltip';
const LINE_WIDTH = 1.25;
const POINT_SIZE_OFFSET = 2;
export function SeriesChart(props) {
    const { width, height, data } = props;
    const chartsTheme = useChartsTheme();
    const theme = useTheme();
    const { setTimeRange } = useTimeRange();
    const chartRef = useRef();
    const handleEvents = useMemo(()=>{
        return {
            datazoom: (params)=>{
                if (params.batch[0] === undefined) return;
                const xAxisStartValue = params.batch?.[0]?.startValue;
                const xAxisEndValue = params.batch?.[0]?.endValue;
                if (xAxisStartValue !== undefined && xAxisEndValue !== undefined) {
                    const zoomEvent = {
                        start: xAxisStartValue,
                        end: xAxisEndValue
                    };
                    setTimeRange({
                        start: new Date(zoomEvent.start),
                        end: new Date(zoomEvent.end)
                    });
                }
            },
            finished: ()=>{
                if (chartRef.current !== undefined) {
                    enableDataZoom(chartRef.current);
                }
            }
        };
    }, [
        setTimeRange
    ]);
    const seriesData = useMemo(()=>{
        const timeLine = data.timeline || {};
        const startTime = timeLine.startTime;
        const durationDelta = timeLine.durationDelta;
        return timeLine.samples.map((sample, index)=>({
                id: index,
                value: [
                    (startTime + index * durationDelta) * 1000,
                    Number(sample)
                ]
            }));
    }, [
        data.timeline
    ]);
    const option = useMemo(()=>{
        const seriesMapping = {
            type: 'line',
            color: theme.palette.primary.main,
            sampling: 'lttb',
            showSymbol: true,
            showAllSymbol: true,
            symbolSize: LINE_WIDTH + POINT_SIZE_OFFSET,
            lineStyle: {
                width: LINE_WIDTH,
                opacity: 0.95
            },
            areaStyle: {
                opacity: 0
            },
            data: seriesData
        };
        const timeLine = data.timeline || {};
        const option = {
            series: seriesMapping,
            xAxis: {
                type: 'time',
                min: timeLine.startTime * 1000,
                max: (timeLine.startTime + timeLine.samples.length * timeLine.durationDelta) * 1000,
                axisLabel: {
                    hideOverlap: true
                },
                axisPointer: {
                    snap: false
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: (value)=>{
                        return formatItemValue(data.metadata?.units, value);
                    }
                }
            },
            animation: false,
            tooltip: {
                show: true,
                showContent: true,
                trigger: 'axis',
                appendToBody: true,
                confine: true,
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.background.paper,
                textStyle: {
                    color: theme.palette.text.primary
                },
                formatter: (params)=>getSeriesTooltip(params[0]?.data || {}, data.metadata?.units || '', data.metadata?.name || '', theme.palette.primary.main, theme.palette.divider)
            },
            axisPointer: {
                type: 'line',
                z: 0,
                triggerEmphasis: true,
                triggerTooltip: false,
                snap: false
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        icon: null,
                        yAxisIndex: 'none'
                    }
                }
            },
            grid: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        };
        return option;
    }, [
        data.timeline,
        data.metadata,
        seriesData,
        theme
    ]);
    const seriesChart = useMemo(()=>/*#__PURE__*/ _jsx(EChart, {
            style: {
                width: width,
                height: height
            },
            option: option,
            theme: chartsTheme.echartsTheme,
            onEvents: handleEvents,
            _instance: chartRef
        }), [
        chartsTheme.echartsTheme,
        height,
        option,
        width,
        handleEvents
    ]);
    return /*#__PURE__*/ _jsx(Stack, {
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        onMouseEnter: ()=>{
            // This is necessary to ensure that the data zoom feature is enabled after the theme is changed.
            if (chartRef.current !== undefined) {
                enableDataZoom(chartRef.current);
            }
        },
        children: seriesChart
    });
}

//# sourceMappingURL=SeriesChart.js.map