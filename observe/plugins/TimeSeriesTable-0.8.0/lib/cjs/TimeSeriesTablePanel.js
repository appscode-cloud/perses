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
Object.defineProperty(exports, "TimeSeriesTablePanel", {
    enumerable: true,
    get: function() {
        return TimeSeriesTablePanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _components1 = require("./components");
function TimeSeriesTablePanel(props) {
    const { contentDimensions, queryResults } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const contentPadding = chartsTheme.container.padding.default;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            height: contentDimensions?.height || 0,
            padding: `${contentPadding}px`,
            overflowY: 'scroll'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.DataTable, {
            queryResults: queryResults
        })
    });
}
