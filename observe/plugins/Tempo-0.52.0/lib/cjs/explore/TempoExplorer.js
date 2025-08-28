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
Object.defineProperty(exports, "TempoExplorer", {
    enumerable: true,
    get: function() {
        return TempoExplorer;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _dashboards = require("@perses-dev/dashboards");
const _explore = require("@perses-dev/explore");
const _pluginsystem = require("@perses-dev/plugin-system");
function SearchResultsPanel({ queries }) {
    const { isFetching, isLoading, queryResults } = (0, _pluginsystem.useDataQueries)('TraceQuery');
    // no query executed, show empty panel
    if (queryResults.length === 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {});
    }
    if (isLoading || isFetching) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.LoadingOverlay, {});
    }
    const queryError = queryResults.find((d)=>d.error);
    if (queryError) {
        throw queryError.error;
    }
    const tracesFound = queryResults.some((traceData)=>(traceData.data?.searchResult ?? []).length > 0);
    if (!tracesFound) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.NoDataOverlay, {
            resource: "traces"
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        sx: {
            height: '100%'
        },
        gap: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                sx: {
                    height: '35%',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
                    panelOptions: {
                        hideHeader: true
                    },
                    definition: {
                        kind: 'Panel',
                        spec: {
                            queries,
                            display: {
                                name: ''
                            },
                            plugin: {
                                kind: 'ScatterChart',
                                spec: {}
                            }
                        }
                    }
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
                sx: {
                    flexGrow: 1
                },
                panelOptions: {
                    hideHeader: true
                },
                definition: {
                    kind: 'Panel',
                    spec: {
                        queries,
                        display: {
                            name: ''
                        },
                        plugin: {
                            kind: 'TraceTable',
                            spec: {}
                        }
                    }
                }
            })
        ]
    });
}
function TracingGanttChartPanel({ queries }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
        panelOptions: {
            hideHeader: true
        },
        definition: {
            kind: 'Panel',
            spec: {
                queries,
                display: {
                    name: ''
                },
                plugin: {
                    kind: 'TracingGanttChart',
                    spec: {}
                }
            }
        }
    });
}
function TempoExplorer() {
    const { data: { queries = [] }, setData } = (0, _explore.useExplorerManagerContext)();
    // map TraceQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    // Cannot cast to TempoTraceQuerySpec because 'tempo-plugin' types are not accessible in @perses-dev/explore
    const isSingleTrace = queries.length === 1 && queries[0]?.kind === 'TraceQuery' && queries[0]?.spec.plugin.kind === 'TempoTraceQuery' && (0, _core.isValidTraceId)((queries[0]?.spec.plugin.spec).query ?? ''); // eslint-disable-line @typescript-eslint/no-explicit-any
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.MultiQueryEditor, {
                queryTypes: [
                    'TraceQuery'
                ],
                onChange: (newQueries)=>setData({
                        queries: newQueries
                    }),
                queries: queries
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ErrorBoundary, {
                FallbackComponent: _components.ErrorAlert,
                resetKeys: [
                    queries
                ],
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DataQueriesProvider, {
                    definitions: definitions,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        height: 700,
                        children: isSingleTrace ? /*#__PURE__*/ (0, _jsxruntime.jsx)(TracingGanttChartPanel, {
                            queries: queries
                        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(SearchResultsPanel, {
                            queries: queries
                        })
                    })
                })
            })
        ]
    });
}
