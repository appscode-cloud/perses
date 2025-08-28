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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Stack } from '@mui/material';
import { ErrorAlert, ErrorBoundary, LoadingOverlay, NoDataOverlay } from '@perses-dev/components';
import { isValidTraceId } from '@perses-dev/core';
import { Panel } from '@perses-dev/dashboards';
import { useExplorerManagerContext } from '@perses-dev/explore';
import { DataQueriesProvider, MultiQueryEditor, useDataQueries } from '@perses-dev/plugin-system';
function SearchResultsPanel({ queries }) {
    const { isFetching, isLoading, queryResults } = useDataQueries('TraceQuery');
    // no query executed, show empty panel
    if (queryResults.length === 0) {
        return /*#__PURE__*/ _jsx(_Fragment, {});
    }
    if (isLoading || isFetching) {
        return /*#__PURE__*/ _jsx(LoadingOverlay, {});
    }
    const queryError = queryResults.find((d)=>d.error);
    if (queryError) {
        throw queryError.error;
    }
    const tracesFound = queryResults.some((traceData)=>(traceData.data?.searchResult ?? []).length > 0);
    if (!tracesFound) {
        return /*#__PURE__*/ _jsx(NoDataOverlay, {
            resource: "traces"
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        sx: {
            height: '100%'
        },
        gap: 2,
        children: [
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    height: '35%',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ _jsx(Panel, {
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
            /*#__PURE__*/ _jsx(Panel, {
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
    return /*#__PURE__*/ _jsx(Panel, {
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
export function TempoExplorer() {
    const { data: { queries = [] }, setData } = useExplorerManagerContext();
    // map TraceQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    // Cannot cast to TempoTraceQuerySpec because 'tempo-plugin' types are not accessible in @perses-dev/explore
    const isSingleTrace = queries.length === 1 && queries[0]?.kind === 'TraceQuery' && queries[0]?.spec.plugin.kind === 'TempoTraceQuery' && isValidTraceId((queries[0]?.spec.plugin.spec).query ?? ''); // eslint-disable-line @typescript-eslint/no-explicit-any
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsx(MultiQueryEditor, {
                queryTypes: [
                    'TraceQuery'
                ],
                onChange: (newQueries)=>setData({
                        queries: newQueries
                    }),
                queries: queries
            }),
            /*#__PURE__*/ _jsx(ErrorBoundary, {
                FallbackComponent: ErrorAlert,
                resetKeys: [
                    queries
                ],
                children: /*#__PURE__*/ _jsx(DataQueriesProvider, {
                    definitions: definitions,
                    children: /*#__PURE__*/ _jsx(Box, {
                        height: 700,
                        children: isSingleTrace ? /*#__PURE__*/ _jsx(TracingGanttChartPanel, {
                            queries: queries
                        }) : /*#__PURE__*/ _jsx(SearchResultsPanel, {
                            queries: queries
                        })
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=TempoExplorer.js.map