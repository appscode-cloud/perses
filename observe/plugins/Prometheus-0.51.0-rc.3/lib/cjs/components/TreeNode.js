// Copyright 2025 The Perses Authors
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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/pages/query/TreeNode.tsx
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return TreeNode;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _Circle = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Circle"));
const _react = require("react");
const _AlertCircle = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/AlertCircle"));
const _ast = require("./promql/ast");
const _utils = require("./promql/utils");
const _format = require("./promql/format");
const _serialize = /*#__PURE__*/ _interop_require_default(require("./promql/serialize"));
const _functionSignatures = require("./promql/functionSignatures");
const _query = require("./query");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// The indentation factor for each level of the tree.
const nodeIndent = 5;
const connectorWidth = nodeIndent * 5;
// max number of label names and values to show in the individual query status
const maxLabelNames = 10;
const maxLabelValues = 10;
// mergeChildStates basically returns the "worst" state found among the children.
const mergeChildStates = (states)=>{
    if (states.includes('error')) {
        return 'error';
    }
    if (states.includes('waiting')) {
        return 'waiting';
    }
    if (states.includes('running')) {
        return 'running';
    }
    return 'success';
};
function TreeNode({ node, parentEl, reverse, datasource, childIdx, reportNodeState }) {
    const theme = (0, _material.useTheme)();
    const children = (0, _utils.getNodeChildren)(node);
    // A normal ref won't work properly here because the ref's `current` property
    // going from `null` to defined won't trigger a re-render of the child
    // component, since it's not a React state update. So we manually have to
    // create a state update using a callback ref. See also
    // https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs
    const [nodeEl, setNodeEl] = (0, _react.useState)(null);
    const nodeRef = (0, _react.useCallback)((node)=>setNodeEl(node), []);
    const [resultStats, setResultStats] = (0, _react.useState)({
        numSeries: 0,
        labelExamples: {},
        sortedLabelCards: []
    });
    const [connectorStyle, setConnectorStyle] = (0, _react.useState)({
        borderColor: theme.palette.grey['500'],
        borderLeftStyle: 'solid',
        borderLeftWidth: 2,
        width: connectorWidth,
        left: -connectorWidth
    });
    const [childStates, setChildStates] = (0, _react.useState)(children.map(()=>'waiting'));
    const mergedChildState = (0, _react.useMemo)(()=>mergeChildStates(childStates), [
        childStates
    ]);
    // Optimize range vector selector fetches to give us the info we're looking for
    // more cheaply. E.g. 'foo[7w]' can be expensive to fully fetch, but wrapping it
    // in 'last_over_time(foo[7w])' is cheaper and also gives us all the info we
    // need (number of series and labels).
    let queryNode = node;
    if (queryNode.type === _ast.nodeType.matrixSelector) {
        queryNode = {
            type: _ast.nodeType.call,
            func: _functionSignatures.functionSignatures.last_over_time,
            args: [
                node
            ]
        };
    }
    // Individual query for the current node
    const { data: instantQueryResponse, isFetching, error } = (0, _query.useInstantQuery)((0, _serialize.default)(queryNode) ?? '', datasource, mergedChildState === 'success');
    // report the node state to the parent
    (0, _react.useEffect)(()=>{
        if (reportNodeState) {
            if (mergedChildState === 'error' || error) {
                reportNodeState(childIdx, 'error');
            } else if (isFetching) {
                reportNodeState(childIdx, 'running');
            }
        }
    }, [
        mergedChildState,
        error,
        isFetching,
        reportNodeState,
        childIdx
    ]);
    // This function is passed down to the child nodes so they can report their state.
    const childReportNodeState = (0, _react.useCallback)((childIdx, state)=>{
        setChildStates((prev)=>{
            const newStates = [
                ...prev
            ];
            newStates[childIdx] = state;
            return newStates;
        });
    }, [
        setChildStates
    ]);
    // Update the size and position of tree connector lines based on the node's and its parent's position.
    (0, _react.useLayoutEffect)(()=>{
        if (parentEl === undefined) {
            // We're the root node.
            return;
        }
        if (parentEl === null || nodeEl === null) {
            // Either of the two connected nodes hasn't been rendered yet.
            return;
        }
        const parentRect = parentEl.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();
        if (reverse) {
            setConnectorStyle((prevStyle)=>({
                    ...prevStyle,
                    top: 'calc(50% - 1px)',
                    bottom: nodeRect.bottom - parentRect.top,
                    borderTopLeftRadius: 10,
                    borderTopStyle: 'solid',
                    borderBottomLeftRadius: undefined
                }));
        } else {
            setConnectorStyle((prevStyle)=>({
                    ...prevStyle,
                    top: parentRect.bottom - nodeRect.top,
                    bottom: 'calc(50% - 1px)',
                    borderBottomLeftRadius: 10,
                    borderBottomStyle: 'solid',
                    borderTopLeftRadius: undefined
                }));
        }
    }, [
        parentEl,
        nodeEl,
        reverse,
        nodeRef,
        setConnectorStyle
    ]);
    // Update the node info state based on the query result.
    (0, _react.useEffect)(()=>{
        if (instantQueryResponse?.status !== 'success') {
            return;
        }
        if (reportNodeState) {
            reportNodeState(childIdx, 'success');
        }
        let resultSeries = 0;
        // labelValuesByName records the number of times each label value appears for each label name.
        const labelValuesByName = {};
        const { resultType, result } = instantQueryResponse.data;
        if (resultType === 'scalar' || resultType === 'string') {
            resultSeries = 1;
        } else if (result && result.length > 0) {
            resultSeries = result.length;
            result.forEach((s)=>{
                Object.entries(s.metric).forEach(([ln, lv])=>{
                    // TODO: If we ever want to include __name__ here again, we cannot use the
                    // last_over_time(foo[7d]) optimization since that removes the metric name.
                    if (ln !== '__name__') {
                        labelValuesByName[ln] = labelValuesByName[ln] ?? {};
                        labelValuesByName[ln][lv] = (labelValuesByName[ln][lv] ?? 0) + 1;
                    }
                });
            });
        }
        // labelCardinalities records the number of unique label values for each label name.
        const labelCardinalities = {};
        // labelExamples records the most common label values for each label name.
        const labelExamples = {};
        Object.entries(labelValuesByName).forEach(([ln, lvs])=>{
            labelCardinalities[ln] = Object.keys(lvs).length;
            // Sort label values by their number of occurrences within this label name.
            labelExamples[ln] = Object.entries(lvs).sort(([, aCnt], [, bCnt])=>bCnt - aCnt).slice(0, maxLabelValues).map(([lv, cnt])=>({
                    value: lv,
                    count: cnt
                }));
        });
        setResultStats({
            numSeries: resultSeries,
            sortedLabelCards: Object.entries(labelCardinalities).sort((a, b)=>b[1] - a[1]),
            labelExamples
        });
    }, [
        instantQueryResponse,
        reportNodeState,
        childIdx
    ]);
    const innerNode = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        gap: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                ref: nodeRef,
                sx: {
                    position: 'relative',
                    display: 'inline-block',
                    padding: 1,
                    marginBottom: 1.5,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.code
                },
                children: [
                    parentEl !== undefined && // Connector line between this node and its parent.
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        sx: {
                            position: 'absolute',
                            display: 'inline-block',
                            ...connectorStyle
                        }
                    }),
                    (0, _format.formatNode)(node, false, 1)
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(QueryStatus, {
                mergedChildState: mergedChildState,
                isFetching: isFetching,
                error: error,
                resultStats: resultStats,
                responseTime: instantQueryResponse?.responseTime
            })
        ]
    });
    if (node.type === _ast.nodeType.binaryExpr) {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    ml: nodeIndent,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(TreeNode, {
                        node: children[0],
                        parentEl: nodeEl,
                        reverse: true,
                        datasource: datasource,
                        childIdx: 0,
                        reportNodeState: childReportNodeState
                    })
                }),
                innerNode,
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    ml: nodeIndent,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(TreeNode, {
                        node: children[1],
                        parentEl: nodeEl,
                        reverse: false,
                        datasource: datasource,
                        childIdx: 1,
                        reportNodeState: childReportNodeState
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
        children: [
            innerNode,
            children.map((child, idx)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                    ml: nodeIndent,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(TreeNode, {
                        node: child,
                        parentEl: nodeEl,
                        reverse: false,
                        datasource: datasource,
                        childIdx: idx,
                        reportNodeState: childReportNodeState
                    })
                }, idx))
        ]
    });
}
function QueryStatus({ mergedChildState, isFetching, error, resultStats, responseTime }) {
    if (mergedChildState === 'waiting') {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ProgressState, {
            text: "Waiting for child query"
        });
    }
    if (mergedChildState === 'running') {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ProgressState, {
            text: "Running"
        });
    }
    if (mergedChildState === 'error') {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertCircle.default, {}),
                "Blocked on child query error"
            ]
        });
    }
    if (isFetching) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(ProgressState, {
            text: "Loading"
        });
    }
    if (error) {
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
            display: "flex",
            alignItems: "center",
            gap: 1,
            sx: {
                color: (theme)=>theme.palette.error.main
            },
            marginBottom: 1.5,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertCircle.default, {}),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                    variant: "body2",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                            children: "Error executing query:"
                        }),
                        " ",
                        error.message
                    ]
                })
            ]
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        gap: 1,
        alignItems: "center",
        marginBottom: 1.5,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                variant: "body2",
                component: "span",
                sx: {
                    color: (theme)=>theme.palette.grey[500]
                },
                children: [
                    resultStats.numSeries,
                    " result",
                    resultStats.numSeries !== 1 && 's',
                    "  –  ",
                    responseTime,
                    "ms",
                    resultStats.sortedLabelCards.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                        children: "  –"
                    })
                ]
            }),
            resultStats.sortedLabelCards.slice(0, maxLabelNames).map(([ln, cnt])=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                    title: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.List, {
                            dense: true,
                            children: [
                                resultStats.labelExamples[ln]?.map(({ value, count })=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ListItem, {
                                        sx: {
                                            display: 'flex',
                                            gap: 1,
                                            py: 0,
                                            px: 0.5
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Circle.default, {
                                                sx: {
                                                    fontSize: 8
                                                }
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                                variant: "body2",
                                                component: "span",
                                                sx: {
                                                    color: (theme)=>theme.palette.mode === 'dark' // TODO we shouldnt have to do that I guess..
                                                         ? theme.palette.warning.dark : theme.palette.warning.main,
                                                    fontFamily: 'monospace'
                                                },
                                                children: (0, _utils.escapeString)(value)
                                            }),
                                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                                variant: "body2",
                                                component: "span",
                                                children: [
                                                    "(",
                                                    count,
                                                    "x)"
                                                ]
                                            })
                                        ]
                                    }, value)),
                                cnt > maxLabelValues && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ListItem, {
                                    sx: {
                                        display: 'flex',
                                        gap: 1,
                                        py: 0,
                                        px: 0.5
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_Circle.default, {
                                            sx: {
                                                fontSize: 8
                                            }
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                            variant: "body2",
                                            children: ". . ."
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    arrow: true,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                        style: {
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                variant: "body2",
                                component: "span",
                                sx: {
                                    fontFamily: 'monospace',
                                    color: (theme)=>theme.palette.success.main
                                },
                                children: ln
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                variant: "body2",
                                component: "span",
                                sx: {
                                    color: (theme)=>theme.palette.grey[500]
                                },
                                children: [
                                    ": ",
                                    cnt
                                ]
                            })
                        ]
                    })
                }, ln)),
            resultStats.sortedLabelCards.length > maxLabelNames ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                variant: "body2",
                children: [
                    "...",
                    resultStats.sortedLabelCards.length - maxLabelNames,
                    " more..."
                ]
            }) : null
        ]
    });
}
function ProgressState({ text }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        display: "flex",
        alignItems: "center",
        gap: 1,
        marginBottom: 1.5,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {
                size: 16,
                color: "secondary"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                variant: "body2",
                color: "text.secondary",
                children: [
                    text,
                    "..."
                ]
            })
        ]
    });
}
