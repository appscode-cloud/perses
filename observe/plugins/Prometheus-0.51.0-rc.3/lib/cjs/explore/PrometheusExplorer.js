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
Object.defineProperty(exports, "PrometheusExplorer", {
    enumerable: true,
    get: function() {
        return PrometheusExplorer;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _explore = require("@perses-dev/explore");
const _useresizeobserver = /*#__PURE__*/ _interop_require_default(require("use-resize-observer"));
const _dashboards = require("@perses-dev/dashboards");
const _prometheusselectors = require("../model/prometheus-selectors");
const _PrometheusMetricsFinder = require("./PrometheusMetricsFinder");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PANEL_PREVIEW_HEIGHT = 700;
function TimeSeriesPanel({ queries }) {
    const { width, ref: boxRef } = (0, _useresizeobserver.default)();
    const height = PANEL_PREVIEW_HEIGHT;
    const suggestedStepMs = (0, _pluginsystem.useSuggestedStepMs)(width);
    // map TimeSeriesQueryDefinition to Definition<UnknownSpec>
    const definitions = queries.length ? queries.map((query)=>{
        return {
            kind: query.spec.plugin.kind,
            spec: query.spec.plugin.spec
        };
    }) : [];
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        ref: boxRef,
        height: height,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DataQueriesProvider, {
            definitions: definitions,
            options: {
                suggestedStepMs,
                mode: 'range'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        height: height,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DataQueriesProvider, {
            definitions: definitions,
            options: {
                mode: 'instant'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_dashboards.Panel, {
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
function PrometheusExplorer() {
    const { data: { tab = 'table', queries = [], datasource = _prometheusselectors.DEFAULT_PROM, filters = [], exploredMetric = undefined }, setData } = (0, _explore.useExplorerManagerContext)();
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Tabs, {
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
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        value: "table",
                        label: "Table"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        value: "graph",
                        label: "Graph"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        value: "finder",
                        label: "Finder"
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                gap: 1,
                children: [
                    tab === 'table' && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.MultiQueryEditor, {
                                queryTypes: [
                                    'TimeSeriesQuery'
                                ],
                                onChange: (state)=>setData({
                                        tab,
                                        queries: state
                                    }),
                                queries: queries
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(MetricDataTable, {
                                queries: queries
                            })
                        ]
                    }),
                    tab === 'graph' && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.MultiQueryEditor, {
                                queryTypes: [
                                    'TimeSeriesQuery'
                                ],
                                onChange: (state)=>setData({
                                        tab,
                                        queries: state
                                    }),
                                queries: queries
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(TimeSeriesPanel, {
                                queries: queries
                            })
                        ]
                    }),
                    tab === 'finder' && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PrometheusMetricsFinder.PrometheusMetricsFinder, {
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
