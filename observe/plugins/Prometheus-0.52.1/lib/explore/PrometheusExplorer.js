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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { DataQueriesProvider, MultiQueryEditor, useSuggestedStepMs } from '@perses-dev/plugin-system';
import { useExplorerManagerContext } from '@perses-dev/explore';
import useResizeObserver from 'use-resize-observer';
import { Panel } from '@perses-dev/dashboards';
import { DEFAULT_PROM } from '../model/prometheus-selectors';
import { PrometheusMetricsFinder } from './PrometheusMetricsFinder';
const PANEL_PREVIEW_HEIGHT = 700;
function TimeSeriesPanel({ queries }) {
    const { width, ref: boxRef } = useResizeObserver();
    const height = PANEL_PREVIEW_HEIGHT;
    const suggestedStepMs = useSuggestedStepMs(width);
    // map TimeSeriesQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    return /*#__PURE__*/ _jsx(Box, {
        ref: boxRef,
        height: height,
        children: /*#__PURE__*/ _jsx(DataQueriesProvider, {
            definitions: definitions,
            options: {
                suggestedStepMs,
                mode: 'range'
            },
            children: /*#__PURE__*/ _jsx(Panel, {
                panelOptions: {
                    hideHeader: true
                },
                definition: {
                    kind: 'Panel',
                    spec: {
                        queries: queries,
                        display: {
                            name: ''
                        },
                        plugin: {
                            kind: 'TimeSeriesChart',
                            spec: {}
                        }
                    }
                }
            })
        })
    });
}
function MetricDataTable({ queries }) {
    const height = PANEL_PREVIEW_HEIGHT;
    // map TimeSeriesQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    });
    return /*#__PURE__*/ _jsx(Box, {
        height: height,
        children: /*#__PURE__*/ _jsx(DataQueriesProvider, {
            definitions: definitions,
            options: {
                mode: 'instant'
            },
            children: /*#__PURE__*/ _jsx(Panel, {
                panelOptions: {
                    hideHeader: true
                },
                definition: {
                    kind: 'Panel',
                    spec: {
                        queries: queries,
                        display: {
                            name: ''
                        },
                        plugin: {
                            kind: 'TimeSeriesTable',
                            spec: {}
                        }
                    }
                }
            })
        })
    });
}
export function PrometheusExplorer() {
    const { data: { tab = 'table', queries = [], datasource = DEFAULT_PROM, filters = [], exploredMetric = undefined }, setData } = useExplorerManagerContext();
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsxs(Tabs, {
                value: tab,
                onChange: (_, state)=>setData({
                        tab: state,
                        queries
                    }),
                variant: "scrollable",
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider'
                },
                children: [
                    /*#__PURE__*/ _jsx(Tab, {
                        value: "table",
                        label: "Table"
                    }),
                    /*#__PURE__*/ _jsx(Tab, {
                        value: "graph",
                        label: "Graph"
                    }),
                    /*#__PURE__*/ _jsx(Tab, {
                        value: "finder",
                        label: "Finder"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                gap: 1,
                children: [
                    tab === 'table' && /*#__PURE__*/ _jsxs(Stack, {
                        children: [
                            /*#__PURE__*/ _jsx(MultiQueryEditor, {
                                queryTypes: [
                                    'TimeSeriesQuery'
                                ],
                                onChange: (state)=>setData({
                                        tab,
                                        queries: state
                                    }),
                                queries: queries
                            }),
                            /*#__PURE__*/ _jsx(MetricDataTable, {
                                queries: queries
                            })
                        ]
                    }),
                    tab === 'graph' && /*#__PURE__*/ _jsxs(Stack, {
                        children: [
                            /*#__PURE__*/ _jsx(MultiQueryEditor, {
                                queryTypes: [
                                    'TimeSeriesQuery'
                                ],
                                onChange: (state)=>setData({
                                        tab,
                                        queries: state
                                    }),
                                queries: queries
                            }),
                            /*#__PURE__*/ _jsx(TimeSeriesPanel, {
                                queries: queries
                            })
                        ]
                    }),
                    tab === 'finder' && /*#__PURE__*/ _jsx(Stack, {
                        children: /*#__PURE__*/ _jsx(PrometheusMetricsFinder, {
                            onChange: (state)=>setData({
                                    tab,
                                    ...state
                                }),
                            value: {
                                datasource,
                                filters,
                                exploredMetric
                            }
                        })
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=PrometheusExplorer.js.map