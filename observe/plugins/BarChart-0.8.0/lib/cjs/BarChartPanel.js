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
Object.defineProperty(exports, "BarChartPanel", {
    enumerable: true,
    get: function() {
        return BarChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _react = require("react");
const _core = require("@perses-dev/core");
const _utils = require("./utils");
const _BarChartBase = require("./BarChartBase");
function BarChartPanel(props) {
    const { spec: { calculation, format, sort, mode }, contentDimensions, queryResults } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const PADDING = chartsTheme.container.padding.default;
    const barChartData = (0, _react.useMemo)(()=>{
        const calculate = _core.CalculationsMap[calculation];
        const barChartData = [];
        for (const result of queryResults){
            for (const seriesData of result.data.series){
                const series = {
                    value: calculate(seriesData.values) ?? null,
                    label: seriesData.formattedName ?? ''
                };
                barChartData.push(series);
            }
        }
        const sortedBarChartData = (0, _utils.sortSeriesData)(barChartData, sort);
        if (mode === 'percentage') {
            return (0, _utils.calculatePercentages)(sortedBarChartData);
        } else {
            return sortedBarChartData;
        }
    }, [
        queryResults,
        sort,
        mode,
        calculation
    ]);
    if (contentDimensions === undefined) return null;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            padding: `${PADDING}px`
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_BarChartBase.BarChartBase, {
            width: contentDimensions.width - PADDING * 2,
            height: contentDimensions.height - PADDING * 2,
            data: barChartData,
            format: format,
            mode: mode
        })
    });
}
