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
Object.defineProperty(exports, "PieChartBase", {
    enumerable: true,
    get: function() {
        return PieChartBase;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _core = require("echarts/core");
const _charts = require("echarts/charts");
const _components = require("echarts/components");
const _renderers = require("echarts/renderers");
const _material = require("@mui/material");
const _components1 = require("@perses-dev/components");
(0, _core.use)([
    _charts.PieChart,
    _components.GridComponent,
    _components.DatasetComponent,
    _components.TitleComponent,
    _components.TooltipComponent,
    _renderers.CanvasRenderer
]);
const PIE_WIN_WIDTH = 12;
const PIE_GAP = 4;
function PieChartBase(props) {
    const { width, height, data } = props;
    const chartsTheme = (0, _components1.useChartsTheme)();
    const option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        axisLabel: {
            overflow: 'truncate',
            width: width / 3
        },
        series: [
            {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        style: {
            width: width,
            height: height
        },
        sx: {
            overflow: 'auto'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.EChart, {
            sx: {
                minHeight: height,
                height: data ? data.length * (PIE_WIN_WIDTH + PIE_GAP) : '100%'
            },
            option: option,
            theme: chartsTheme.echartsTheme
        })
    });
}
