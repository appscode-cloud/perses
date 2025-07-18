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
import { jsx as _jsx } from "react/jsx-runtime";
import { use } from 'echarts/core';
import { PieChart as EChartsPieChart } from 'echarts/charts';
import { GridComponent, DatasetComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Box } from '@mui/material';
import { EChart, useChartsTheme } from '@perses-dev/components';
use([
    EChartsPieChart,
    GridComponent,
    DatasetComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer
]);
const PIE_WIN_WIDTH = 12;
const PIE_GAP = 4;
export function PieChartBase(props) {
    const { width, height, data } = props;
    const chartsTheme = useChartsTheme();
    const option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        axisLabel: {
            overflow: 'truncate',
            width: width / 3
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                label: false,
                center: [
                    '40%',
                    '50%'
                ],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        itemStyle: {
            borderRadius: 2,
            color: chartsTheme.echartsTheme[0]
        }
    };
    return /*#__PURE__*/ _jsx(Box, {
        style: {
            width: width,
            height: height
        },
        sx: {
            overflow: 'auto'
        },
        children: /*#__PURE__*/ _jsx(EChart, {
            sx: {
                minHeight: height,
                height: data ? data.length * (PIE_WIN_WIDTH + PIE_GAP) : '100%'
            },
            option: option,
            theme: chartsTheme.echartsTheme
        })
    });
}

//# sourceMappingURL=PieChartBase.js.map