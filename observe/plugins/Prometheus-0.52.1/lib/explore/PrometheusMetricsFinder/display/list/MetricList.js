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
import { Button, Divider, Skeleton, Stack, TableCell, Typography } from '@mui/material';
import { Fuzzy } from '@nexucis/fuzzy';
import { useExplorerQueryParams } from '@perses-dev/explore';
import CompassIcon from 'mdi-material-ui/Compass';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import { useMetricMetadata } from '../../utils';
import { MetricChip } from '../MetricChip';
export function MetricRow({ children, metricName, datasource, filters, isMetadataEnabled, onExplore }) {
    const { metadata, isLoading } = useMetricMetadata(metricName, datasource, isMetadataEnabled);
    const searchParams = useExplorerQueryParams({
        data: {
            tab: 'finder',
            datasource,
            filters,
            exploredMetric: metricName
        }
    });
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(TableCell, {
                style: {
                    width: '300px'
                },
                children: /*#__PURE__*/ _jsx(Typography, {
                    sx: {
                        fontFamily: 'monospace'
                    },
                    children: children ?? metricName
                })
            }),
            /*#__PURE__*/ _jsx(TableCell, {
                style: {
                    width: 115,
                    textAlign: 'center'
                },
                children: isMetadataEnabled && isLoading ? /*#__PURE__*/ _jsx(Skeleton, {
                    variant: "rounded",
                    width: 75
                }) : /*#__PURE__*/ _jsx(MetricChip, {
                    label: metadata?.type ?? 'unknown'
                })
            }),
            /*#__PURE__*/ _jsx(TableCell, {
                style: {
                    width: '100%'
                },
                children: isMetadataEnabled && isLoading ? /*#__PURE__*/ _jsx(Skeleton, {
                    variant: "text",
                    width: 180
                }) : /*#__PURE__*/ _jsx(Typography, {
                    sx: {
                        fontStyle: metadata?.help ? 'initial' : 'italic',
                        minWidth: '30vw'
                    },
                    children: metadata ? metadata.help : 'unknown'
                })
            }),
            /*#__PURE__*/ _jsx(TableCell, {
                style: {
                    width: 140
                },
                children: /*#__PURE__*/ _jsx(Button, {
                    "aria-label": `explore metric ${metricName}`,
                    variant: "contained",
                    startIcon: /*#__PURE__*/ _jsx(CompassIcon, {}),
                    style: {
                        textWrap: 'nowrap'
                    },
                    onClick: ()=>onExplore?.(metricName),
                    component: RouterLink,
                    to: `?${searchParams}`,
                    children: "Explore"
                })
            })
        ]
    });
}
export function MetricList({ metricNames, filteredResults, datasource, filters, isMetadataEnabled, onExplore, ...props }) {
    const fuzzy = new Fuzzy();
    const fuzzyMetrics = useMemo(()=>{
        if (filteredResults) {
            return filteredResults;
        }
        return metricNames.map((metricName)=>({
                original: metricName
            }));
    }, [
        filteredResults,
        metricNames
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        width: "100%",
        divider: /*#__PURE__*/ _jsx(Divider, {
            orientation: "horizontal",
            flexItem: true
        }),
        ...props,
        children: [
            /*#__PURE__*/ _jsx(TableVirtuoso, {
                style: {
                    height: '70vh',
                    width: '100%'
                },
                totalCount: fuzzyMetrics.length,
                itemContent: (index)=>/*#__PURE__*/ _jsx(MetricRow, {
                        metricName: fuzzyMetrics[index].original,
                        datasource: datasource,
                        filters: filters,
                        isMetadataEnabled: isMetadataEnabled,
                        onExplore: onExplore,
                        children: /*#__PURE__*/ _jsx("span", {
                            dangerouslySetInnerHTML: {
                                __html: fuzzy.render(fuzzyMetrics[index].original, fuzzyMetrics[index].intervals ?? [], {
                                    pre: '<strong style="color:darkorange">',
                                    post: '</strong>',
                                    escapeHTML: true
                                })
                            }
                        })
                    })
            }),
            /*#__PURE__*/ _jsx(Stack, {
                sx: {
                    width: '100%'
                },
                textAlign: "end",
                children: /*#__PURE__*/ _jsxs(Typography, {
                    "data-testid": "finder-total",
                    children: [
                        "Total: ",
                        /*#__PURE__*/ _jsx("strong", {
                            children: metricNames.length
                        }),
                        " metrics"
                    ]
                })
            })
        ]
    });
}

//# sourceMappingURL=MetricList.js.map