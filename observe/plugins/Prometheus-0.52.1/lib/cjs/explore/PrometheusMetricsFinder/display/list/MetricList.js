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
    MetricList: function() {
        return MetricList;
    },
    MetricRow: function() {
        return MetricRow;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _fuzzy = require("@nexucis/fuzzy");
const _explore = require("@perses-dev/explore");
const _Compass = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Compass"));
const _react = require("react");
const _reactrouterdom = require("react-router-dom");
const _reactvirtuoso = require("react-virtuoso");
const _utils = require("../../utils");
const _MetricChip = require("../MetricChip");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function MetricRow({ children, metricName, datasource, filters, isMetadataEnabled, onExplore }) {
    const { metadata, isLoading } = (0, _utils.useMetricMetadata)(metricName, datasource, isMetadataEnabled);
    const searchParams = (0, _explore.useExplorerQueryParams)({
        data: {
            tab: 'finder',
            datasource,
            filters,
            exploredMetric: metricName
        }
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                style: {
                    width: '300px'
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                    sx: {
                        fontFamily: 'monospace'
                    },
                    children: children ?? metricName
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                style: {
                    width: 115,
                    textAlign: 'center'
                },
                children: isMetadataEnabled && isLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                    variant: "rounded",
                    width: 75
                }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricChip.MetricChip, {
                    label: metadata?.type ?? 'unknown'
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                style: {
                    width: '100%'
                },
                children: isMetadataEnabled && isLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                    variant: "text",
                    width: 180
                }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                    sx: {
                        fontStyle: metadata?.help ? 'initial' : 'italic',
                        minWidth: '30vw'
                    },
                    children: metadata ? metadata.help : 'unknown'
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TableCell, {
                style: {
                    width: 140
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                    "aria-label": `explore metric ${metricName}`,
                    variant: "contained",
                    startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Compass.default, {}),
                    style: {
                        textWrap: 'nowrap'
                    },
                    onClick: ()=>onExplore?.(metricName),
                    component: _reactrouterdom.Link,
                    to: `?${searchParams}`,
                    children: "Explore"
                })
            })
        ]
    });
}
function MetricList({ metricNames, filteredResults, datasource, filters, isMetadataEnabled, onExplore, ...props }) {
    const fuzzy = new _fuzzy.Fuzzy();
    const fuzzyMetrics = (0, _react.useMemo)(()=>{
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        width: "100%",
        divider: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
            orientation: "horizontal",
            flexItem: true
        }),
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactvirtuoso.TableVirtuoso, {
                style: {
                    height: '70vh',
                    width: '100%'
                },
                totalCount: fuzzyMetrics.length,
                itemContent: (index)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(MetricRow, {
                        metricName: fuzzyMetrics[index].original,
                        datasource: datasource,
                        filters: filters,
                        isMetadataEnabled: isMetadataEnabled,
                        onExplore: onExplore,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                sx: {
                    width: '100%'
                },
                textAlign: "end",
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                    "data-testid": "finder-total",
                    children: [
                        "Total: ",
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                            children: metricNames.length
                        }),
                        " metrics"
                    ]
                })
            })
        ]
    });
}
