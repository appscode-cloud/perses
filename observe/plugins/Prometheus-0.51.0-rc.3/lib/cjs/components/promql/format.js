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
// Forked from https://github.com/prometheus/prometheus/blob/65f610353919b1c7b42d3776c3a95b68046a6bba/web/ui/mantine-ui/src/promql/format.tsx
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
    formatNode: function() {
        return formatNode;
    },
    labelNameList: function() {
        return labelNameList;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
const _core = require("@perses-dev/core");
const _ast = require("./ast");
const _utils = require("./utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Styled components that reproduce the theming of CodeMirror:
const PromQLCode = (0, _material.styled)('span')(()=>({
        fontFamily: '"DejaVu Sans Mono", monospace'
    }));
const PromQLKeyword = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#708'
    }));
const PromQLFunction = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#61afef' : '#2a2e42'
    }));
const PromQLMetricName = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e06c75' : '#2a2e42'
    }));
const PromQLLabelName = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#61afef' : '#219'
    }));
const PromQLString = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#98c379' : '#a31515'
    }));
const PromQLEllipsis = (0, _material.styled)('span')(()=>({
        color: '#aaaaaa'
    }));
const PromQLDuration = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#09885a'
    }));
const PromQLNumber = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#164'
    }));
const PromQLOperator = (0, _material.styled)('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#56b6c2' : '#708'
    }));
const labelNameList = (labels)=>{
    return labels.map((l, i)=>{
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
            children: [
                i !== 0 && ', ',
                /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLLabelName, {
                    children: l
                })
            ]
        }, i);
    });
};
const formatAtAndOffset = (timestamp, startOrEnd, offset)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            timestamp !== null ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                        children: "@"
                    }),
                    " ",
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLNumber, {
                        children: (timestamp / 1000).toFixed(3)
                    })
                ]
            }) : startOrEnd !== null ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                        children: "@"
                    }),
                    " ",
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                        children: startOrEnd
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        children: "("
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        children: ")"
                    })
                ]
            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {}),
            offset === 0 ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {}) : offset > 0 ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                        children: "offset"
                    }),
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLDuration, {
                        children: (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(offset))
                    })
                ]
            }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                        children: "offset"
                    }),
                    ' ',
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(PromQLDuration, {
                        children: [
                            "-",
                            (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(-offset))
                        ]
                    })
                ]
            })
        ]
    });
const formatSelector = (node)=>{
    const matchLabels = node.matchers.filter((m)=>!(m.name === '__name__' && m.type === _ast.matchType.equal && m.value === node.name)).map((m, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
            children: [
                i !== 0 && ',',
                /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLLabelName, {
                    children: m.name
                }),
                m.type,
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(PromQLString, {
                    children: [
                        '"',
                        (0, _utils.escapeString)(m.value),
                        '"'
                    ]
                })
            ]
        }, i));
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLMetricName, {
                children: node.name
            }),
            matchLabels.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    '{',
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        children: matchLabels
                    }),
                    '}'
                ]
            }),
            node.type === _ast.nodeType.matrixSelector && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    "[",
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLDuration, {
                        children: (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(node.range))
                    }),
                    "]"
                ]
            }),
            formatAtAndOffset(node.timestamp, node.startOrEnd, node.offset)
        ]
    });
};
const ellipsis = /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLEllipsis, {
    children: "…"
});
const formatNodeInternal = (node, showChildren, maxDepth)=>{
    if (maxDepth === 0) {
        return ellipsis;
    }
    const childMaxDepth = maxDepth === undefined ? undefined : maxDepth - 1;
    switch(node.type){
        case _ast.nodeType.aggregation:
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                        children: node.op
                    }),
                    node.without ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                        children: [
                            ' ',
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                                children: "without"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: "("
                            }),
                            labelNameList(node.grouping),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: ")"
                            }),
                            ' '
                        ]
                    }) : node.grouping.length > 0 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                        children: [
                            ' ',
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                                children: "by"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: "("
                            }),
                            labelNameList(node.grouping),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: ")"
                            }),
                            ' '
                        ]
                    }),
                    showChildren && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: "("
                            }),
                            node.param !== null && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                children: [
                                    formatNode(node.param, showChildren, childMaxDepth),
                                    ", "
                                ]
                            }),
                            formatNode(node.expr, showChildren, childMaxDepth),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                children: ")"
                            })
                        ]
                    })
                ]
            });
        case _ast.nodeType.subquery:
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth),
                    "[",
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLDuration, {
                        children: (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(node.range))
                    }),
                    ":",
                    node.step !== 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLDuration, {
                        children: (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(node.step))
                    }),
                    "]",
                    formatAtAndOffset(node.timestamp, node.startOrEnd, node.offset)
                ]
            });
        case _ast.nodeType.parenExpr:
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        children: "("
                    }),
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                        children: ")"
                    })
                ]
            });
        case _ast.nodeType.call:
            {
                const children = childMaxDepth === undefined || childMaxDepth > 0 ? node.args.map((arg, i)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                        children: [
                            i !== 0 && ', ',
                            formatNode(arg, showChildren)
                        ]
                    }, i)) : node.args.length > 0 ? ellipsis : '';
                return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLFunction, {
                            children: node.func.name
                        }),
                        showChildren && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: "("
                                }),
                                children,
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: ")"
                                })
                            ]
                        })
                    ]
                });
            }
        case _ast.nodeType.matrixSelector:
            return formatSelector(node);
        case _ast.nodeType.vectorSelector:
            return formatSelector(node);
        case _ast.nodeType.numberLiteral:
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLNumber, {
                children: node.val
            });
        case _ast.nodeType.stringLiteral:
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(PromQLString, {
                children: [
                    '"',
                    (0, _utils.escapeString)(node.val),
                    '"'
                ]
            });
        case _ast.nodeType.unaryExpr:
            return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                        children: node.op
                    }),
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth)
                ]
            });
        case _ast.nodeType.binaryExpr:
            {
                let matching = /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {});
                let grouping = /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {});
                const vm = node.matching;
                if (vm !== null && (vm.labels.length > 0 || vm.on)) {
                    if (vm.on) {
                        matching = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                                    children: "on"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: "("
                                }),
                                labelNameList(vm.labels),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: ")"
                                })
                            ]
                        });
                    } else {
                        matching = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                                    children: "ignoring"
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: "("
                                }),
                                labelNameList(vm.labels),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: ")"
                                })
                            ]
                        });
                    }
                    if (vm.card === _ast.vectorMatchCardinality.manyToOne || vm.card === _ast.vectorMatchCardinality.oneToMany) {
                        grouping = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(PromQLKeyword, {
                                    children: [
                                        ' ',
                                        "group_",
                                        vm.card === _ast.vectorMatchCardinality.manyToOne ? 'left' : 'right'
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: "("
                                }),
                                labelNameList(vm.include),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                    children: ")"
                                })
                            ]
                        });
                    }
                }
                return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                    children: [
                        showChildren && formatNode((0, _utils.maybeParenthesizeBinopChild)(node.op, node.lhs), showChildren, childMaxDepth),
                        ' ',
                        [
                            'atan2',
                            'and',
                            'or',
                            'unless'
                        ].includes(node.op) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                            children: node.op
                        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLOperator, {
                            children: node.op
                        }),
                        node.bool && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLKeyword, {
                                    children: "bool"
                                })
                            ]
                        }),
                        matching,
                        grouping,
                        ' ',
                        showChildren && formatNode((0, _utils.maybeParenthesizeBinopChild)(node.op, node.rhs), showChildren, childMaxDepth)
                    ]
                });
            }
        case _ast.nodeType.placeholder:
            // TODO: Include possible children of placeholders somehow?
            return ellipsis;
        default:
            throw new Error('unsupported node type');
    }
};
const formatNode = (node, showChildren, maxDepth)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(PromQLCode, {
        children: formatNodeInternal(node, showChildren, maxDepth)
    });
