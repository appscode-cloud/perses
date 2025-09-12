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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    TraceTablePanel: function() {
        return TraceTablePanel;
    },
    defaultTraceLink: function() {
        return defaultTraceLink;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _DataTable = require("./DataTable");
function defaultTraceLink({ query: originalQuery, traceId }) {
    // clone the original query spec (including the datasource) and replace the query value with the trace id
    const query = JSON.parse(JSON.stringify(originalQuery));
    query.spec.plugin.spec.query = traceId;
    const traceLinkParams = new URLSearchParams({
        explorer: 'Tempo-TempoExplorer',
        data: JSON.stringify({
            queries: [
                query
            ]
        })
    });
    return `/explore?${traceLinkParams}`;
}
function TraceTablePanel(props) {
    const { spec, queryResults, traceLink } = props;
    const chartsTheme = (0, _components.useChartsTheme)();
    const contentPadding = chartsTheme.container.padding.default;
    const tracesFound = queryResults.some((traceData)=>(traceData.data?.searchResult ?? []).length > 0);
    if (!tracesFound) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.NoDataOverlay, {
            resource: "traces"
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            height: '100%',
            padding: `${contentPadding}px`,
            overflowY: 'auto'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DataTable.DataTable, {
            options: spec,
            result: queryResults,
            traceLink: traceLink === null ? undefined : traceLink ?? defaultTraceLink
        })
    });
}
