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
    MetricOverview: function() {
        return MetricOverview;
    },
    OverviewPanel: function() {
        return OverviewPanel;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _dashboards = require("@perses-dev/dashboards");
const _useresizeobserver = /*#__PURE__*/ _interop_require_default(require("use-resize-observer"));
const _pluginsystem = require("@perses-dev/plugin-system");
const _HelpCircleOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/HelpCircleOutline"));
const _types = require("../types");
const _utils = require("../utils");
const _OverviewTab = require("./tabs/OverviewTab");
const _JobTab = require("./tabs/JobTab");
const _SimilarTab = require("./tabs/SimilarTab");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function OverviewPanel({ metricName, datasource, filters, type, isLoading, ...props }) {
    const { width, ref: panelRef } = (0, _useresizeobserver.default)();
    const suggestedStepMs = (0, _pluginsystem.useSuggestedStepMs)(width);
    const [rateEnabled, setRateEnabled] = (0, _react.useState)(true);
    const { queries, definitions } = (0, _react.useMemo)(()=>{
        const expr = type === 'counter' || rateEnabled && (type === undefined || type === 'summary' || type === 'histogram') ? `rate({__name__="${metricName}", ${(0, _types.computeFilterExpr)(filters)}}[5m])` : `{__name__="${metricName}", ${(0, _types.computeFilterExpr)(filters)}}`;
        const queries = [
            {
                kind: 'TimeSeriesQuery',
                spec: {
                    plugin: {
                        kind: 'PrometheusTimeSeriesQuery',
                        spec: {
                            datasource: datasource,
                            query: expr
                        }
                    }
                }
            }
        ];
        const definitions = queries.map((query)=>{
            return {
                kind: query.spec.plugin.kind,
                spec: query.spec.plugin.spec
            };
        });
        return {
            queries,
            definitions
        };
    }, [
        datasource,
        filters,
        metricName,
        rateEnabled,
        type
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            ...props,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                variant: "rectangular",
                height: "100%"
            })
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        ref: panelRef,
        alignItems: "end",
        ...props,
        children: [
            (type === undefined || type === 'summary' || type === 'histogram') && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControlLabel, {
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Checkbox, {
                    size: "small"
                }),
                label: "Enable rate",
                checked: rateEnabled,
                onChange: (_, checked)=>setRateEnabled(checked)
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DataQueriesProvider, {
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
        ]
    });
}
function MetricOverview({ metricName, datasource, filters, isMetadataEnabled, isPanelEnabled, onExplore, onFiltersChange, ...props }) {
    const [tab, setTab] = (0, _react.useState)(0);
    const { metadata, isLoading: isMetadataLoading } = (0, _utils.useMetricMetadata)(metricName, datasource);
    const filtersWithMetricName = (0, _react.useMemo)(()=>{
        const result = filters.filter((filter)=>filter.label !== '__name__');
        result.push({
            label: '__name__',
            labelValues: [
                metricName
            ],
            operator: '='
        });
        return result;
    }, [
        filters,
        metricName
    ]);
    function handleFilterAdd(filter) {
        onFiltersChange([
            ...filters,
            filter
        ]);
    }
    function handleExplore(metricName, tab) {
        onExplore?.(metricName);
        if (tab !== undefined) {
            setTab(tab);
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        sx: {
            width: '100%'
        },
        ...props,
        children: [
            isPanelEnabled && /*#__PURE__*/ (0, _jsxruntime.jsx)(OverviewPanel, {
                metricName: metricName,
                filters: filters,
                datasource: datasource,
                type: metadata?.type,
                height: "250px",
                isLoading: isMetadataEnabled && isMetadataLoading
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Tabs, {
                value: tab,
                onChange: (_, state)=>setTab(state),
                variant: "scrollable",
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        label: "Overview"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        label: "Job related metrics",
                        icon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                            title: "All metrics scraped from the same job",
                            placement: "top",
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_HelpCircleOutline.default, {})
                        }),
                        iconPosition: "end"
                    }),
                    filters.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tab, {
                        label: "Similar metrics",
                        icon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                            title: "All metrics matching current filters",
                            placement: "top",
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_HelpCircleOutline.default, {})
                        }),
                        iconPosition: "end"
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                gap: 1,
                children: [
                    tab === 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_OverviewTab.OverviewTab, {
                        metricName: metricName,
                        datasource: datasource,
                        filters: filtersWithMetricName,
                        onFilterAdd: handleFilterAdd
                    }),
                    tab === 1 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_JobTab.JobTab, {
                        filters: filtersWithMetricName,
                        datasource: datasource,
                        isMetadataEnabled: isMetadataEnabled,
                        onExplore: (metricName)=>handleExplore(metricName, 0)
                    }),
                    tab === 2 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_SimilarTab.SimilarTab, {
                        filters: filtersWithMetricName,
                        datasource: datasource,
                        isMetadataEnabled: isMetadataEnabled,
                        onExplore: (metricName)=>handleExplore(metricName, 0)
                    })
                ]
            })
        ]
    });
}
