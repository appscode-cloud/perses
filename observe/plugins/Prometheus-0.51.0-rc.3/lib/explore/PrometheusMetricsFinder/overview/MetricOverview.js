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
import { Checkbox, FormControlLabel, Skeleton, Stack, Tab, Tabs, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import { Panel } from '@perses-dev/dashboards';
import useResizeObserver from 'use-resize-observer';
import { DataQueriesProvider, useSuggestedStepMs } from '@perses-dev/plugin-system';
import HelpCircleOutlineIcon from 'mdi-material-ui/HelpCircleOutline';
import { computeFilterExpr } from '../types';
import { useMetricMetadata } from '../utils';
import { OverviewTab } from './tabs/OverviewTab';
import { JobTab } from './tabs/JobTab';
import { SimilarTab } from './tabs/SimilarTab';
export function OverviewPanel({ metricName, datasource, filters, type, isLoading, ...props }) {
    const { width, ref: panelRef } = useResizeObserver();
    const suggestedStepMs = useSuggestedStepMs(width);
    const [rateEnabled, setRateEnabled] = useState(true);
    const { queries, definitions } = useMemo(()=>{
        const expr = type === 'counter' || rateEnabled && (type === undefined || type === 'summary' || type === 'histogram') ? `rate({__name__="${metricName}", ${computeFilterExpr(filters)}}[5m])` : `{__name__="${metricName}", ${computeFilterExpr(filters)}}`;
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
        return /*#__PURE__*/ _jsx(Stack, {
            ...props,
            children: /*#__PURE__*/ _jsx(Skeleton, {
                variant: "rectangular",
                height: "100%"
            })
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        ref: panelRef,
        alignItems: "end",
        ...props,
        children: [
            (type === undefined || type === 'summary' || type === 'histogram') && /*#__PURE__*/ _jsx(FormControlLabel, {
                control: /*#__PURE__*/ _jsx(Checkbox, {
                    size: "small"
                }),
                label: "Enable rate",
                checked: rateEnabled,
                onChange: (_, checked)=>setRateEnabled(checked)
            }),
            /*#__PURE__*/ _jsx(DataQueriesProvider, {
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
        ]
    });
}
export function MetricOverview({ metricName, datasource, filters, isMetadataEnabled, isPanelEnabled, onExplore, onFiltersChange, ...props }) {
    const [tab, setTab] = useState(0);
    const { metadata, isLoading: isMetadataLoading } = useMetricMetadata(metricName, datasource);
    const filtersWithMetricName = useMemo(()=>{
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
    return /*#__PURE__*/ _jsxs(Stack, {
        sx: {
            width: '100%'
        },
        ...props,
        children: [
            isPanelEnabled && /*#__PURE__*/ _jsx(OverviewPanel, {
                metricName: metricName,
                filters: filters,
                datasource: datasource,
                type: metadata?.type,
                height: "250px",
                isLoading: isMetadataEnabled && isMetadataLoading
            }),
            /*#__PURE__*/ _jsxs(Tabs, {
                value: tab,
                onChange: (_, state)=>setTab(state),
                variant: "scrollable",
                sx: {
                    borderBottom: 1,
                    borderColor: 'divider'
                },
                children: [
                    /*#__PURE__*/ _jsx(Tab, {
                        label: "Overview"
                    }),
                    /*#__PURE__*/ _jsx(Tab, {
                        label: "Job related metrics",
                        icon: /*#__PURE__*/ _jsx(Tooltip, {
                            title: "All metrics scraped from the same job",
                            placement: "top",
                            children: /*#__PURE__*/ _jsx(HelpCircleOutlineIcon, {})
                        }),
                        iconPosition: "end"
                    }),
                    filters.length > 0 && /*#__PURE__*/ _jsx(Tab, {
                        label: "Similar metrics",
                        icon: /*#__PURE__*/ _jsx(Tooltip, {
                            title: "All metrics matching current filters",
                            placement: "top",
                            children: /*#__PURE__*/ _jsx(HelpCircleOutlineIcon, {})
                        }),
                        iconPosition: "end"
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                gap: 1,
                children: [
                    tab === 0 && /*#__PURE__*/ _jsx(OverviewTab, {
                        metricName: metricName,
                        datasource: datasource,
                        filters: filtersWithMetricName,
                        onFilterAdd: handleFilterAdd
                    }),
                    tab === 1 && /*#__PURE__*/ _jsx(JobTab, {
                        filters: filtersWithMetricName,
                        datasource: datasource,
                        isMetadataEnabled: isMetadataEnabled,
                        onExplore: (metricName)=>handleExplore(metricName, 0)
                    }),
                    tab === 2 && /*#__PURE__*/ _jsx(SimilarTab, {
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

//# sourceMappingURL=MetricOverview.js.map