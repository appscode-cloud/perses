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
Object.defineProperty(exports, "TracingGanttChartPanel", {
    enumerable: true,
    get: function() {
        return TracingGanttChartPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _TracingGanttChart = require("./TracingGanttChart/TracingGanttChart");
function TracingGanttChartPanel(props) {
    const { spec, queryResults, attributeLinks } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const contentPadding = chartsTheme.container.padding.default;
    if (queryResults.length > 1) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.TextOverlay, {
            message: "This panel does not support more than one query."
        });
    }
    const trace = queryResults[0]?.data.trace;
    if (!trace) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.NoDataOverlay, {
            resource: "trace"
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            height: '100%',
            padding: `${contentPadding}px`
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_TracingGanttChart.TracingGanttChart, {
            options: spec,
            attributeLinks: attributeLinks,
            trace: trace
        })
    });
}
