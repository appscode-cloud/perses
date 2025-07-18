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
import { useMemo } from 'react';
import { EChart, useChartsTheme } from '@perses-dev/components';
import { use } from 'echarts/core';
import { ScatterChart as EChartsScatterChart } from 'echarts/charts';
import { DatasetComponent, DataZoomComponent, LegendComponent, GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { formatValue } from '@perses-dev/core';
use([
    DatasetComponent,
    DataZoomComponent,
    LegendComponent,
    EChartsScatterChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
]);
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'long',
    timeStyle: 'medium'
}).format;
export function Scatterplot(props) {
    const { width, height, options, onClick } = props;
    const chartsTheme = useChartsTheme();
    // Apache EChart Options Docs: https://echarts.apache.org/en/option.html
    const eChartOptions = {
        dataset: options.dataset,
        series: options.series,
        dataZoom: options.dataZoom,
        grid: {
            bottom: 40,
            top: 50,
            left: 50,
            right: 100
        },
        xAxis: {
            type: 'time',
            name: 'Local Time'
        },
        yAxis: {
            scale: true,
            type: 'value',
            name: 'Duration',
            axisLabel: {
                formatter: (durationMs)=>formatValue(durationMs, {
                        unit: 'milliseconds'
                    })
            }
        },
        animation: false,
        tooltip: {
            padding: 5,
            borderWidth: 1,
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: function(params) {
                // TODO: import type from ECharts instead of using any
                const data = params[0].data;
                return [
                    `<b>Service name</b>: ${data.rootServiceName}<br/>`,
                    `<b>Span name</b>: ${data.rootTraceName}<br/>`,
                    `<b>Time</b>: ${DATE_FORMATTER(data.startTime)}<br/>`,
                    `<b>Duration</b>: ${formatValue(data.durationMs, {
                        unit: 'milliseconds'
                    })}<br/>`,
                    `<b>Span count</b>: ${data.spanCount} (${data.errorCount} errors)<br/>`
                ].join('');
            }
        },
        legend: {
            show: true,
            type: 'scroll',
            orient: 'horizontal',
            bottom: 0
        }
    };
    const handleEvents = useMemo(()=>{
        const handlers = {};
        if (onClick) {
            handlers.click = (params)=>onClick(params.data);
        }
        return handlers;
    }, [
        onClick
    ]);
    return /*#__PURE__*/ _jsx(EChart, {
        sx: {
            width: width,
            height: height
        },
        option: eChartOptions,
        theme: chartsTheme.echartsTheme,
        onEvents: handleEvents
    });
}

//# sourceMappingURL=Scatterplot.js.map