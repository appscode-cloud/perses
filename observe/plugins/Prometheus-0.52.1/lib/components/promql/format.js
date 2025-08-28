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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { styled } from '@mui/material';
import { formatDuration, msToPrometheusDuration } from '@perses-dev/core';
import { matchType, vectorMatchCardinality, nodeType } from './ast';
import { maybeParenthesizeBinopChild, escapeString } from './utils';
// Styled components that reproduce the theming of CodeMirror:
const PromQLCode = styled('span')(()=>({
        fontFamily: '"DejaVu Sans Mono", monospace'
    }));
const PromQLKeyword = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#708'
    }));
const PromQLFunction = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#61afef' : '#2a2e42'
    }));
const PromQLMetricName = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e06c75' : '#2a2e42'
    }));
const PromQLLabelName = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#61afef' : '#219'
    }));
const PromQLString = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#98c379' : '#a31515'
    }));
const PromQLEllipsis = styled('span')(()=>({
        color: '#aaaaaa'
    }));
const PromQLDuration = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#09885a'
    }));
const PromQLNumber = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#e5c07b' : '#164'
    }));
const PromQLOperator = styled('span')(({ theme })=>({
        color: theme.palette.mode === 'dark' ? '#56b6c2' : '#708'
    }));
export const labelNameList = (labels)=>{
    return labels.map((l, i)=>{
        return /*#__PURE__*/ _jsxs("span", {
            children: [
                i !== 0 && ', ',
                /*#__PURE__*/ _jsx(PromQLLabelName, {
                    children: l
                })
            ]
        }, i);
    });
};
const formatAtAndOffset = (timestamp, startOrEnd, offset)=>/*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            timestamp !== null ? /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ _jsx(PromQLOperator, {
                        children: "@"
                    }),
                    " ",
                    /*#__PURE__*/ _jsx(PromQLNumber, {
                        children: (timestamp / 1000).toFixed(3)
                    })
                ]
            }) : startOrEnd !== null ? /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ _jsx(PromQLOperator, {
                        children: "@"
                    }),
                    " ",
                    /*#__PURE__*/ _jsx(PromQLKeyword, {
                        children: startOrEnd
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        children: "("
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        children: ")"
                    })
                ]
            }) : /*#__PURE__*/ _jsx(_Fragment, {}),
            offset === 0 ? /*#__PURE__*/ _jsx(_Fragment, {}) : offset > 0 ? /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ _jsx(PromQLKeyword, {
                        children: "offset"
                    }),
                    ' ',
                    /*#__PURE__*/ _jsx(PromQLDuration, {
                        children: formatDuration(msToPrometheusDuration(offset))
                    })
                ]
            }) : /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    ' ',
                    /*#__PURE__*/ _jsx(PromQLKeyword, {
                        children: "offset"
                    }),
                    ' ',
                    /*#__PURE__*/ _jsxs(PromQLDuration, {
                        children: [
                            "-",
                            formatDuration(msToPrometheusDuration(-offset))
                        ]
                    })
                ]
            })
        ]
    });
const formatSelector = (node)=>{
    const matchLabels = node.matchers.filter((m)=>!(m.name === '__name__' && m.type === matchType.equal && m.value === node.name)).map((m, i)=>/*#__PURE__*/ _jsxs("span", {
            children: [
                i !== 0 && ',',
                /*#__PURE__*/ _jsx(PromQLLabelName, {
                    children: m.name
                }),
                m.type,
                /*#__PURE__*/ _jsxs(PromQLString, {
                    children: [
                        '"',
                        escapeString(m.value),
                        '"'
                    ]
                })
            ]
        }, i));
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(PromQLMetricName, {
                children: node.name
            }),
            matchLabels.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    '{',
                    /*#__PURE__*/ _jsx("span", {
                        children: matchLabels
                    }),
                    '}'
                ]
            }),
            node.type === nodeType.matrixSelector && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    "[",
                    /*#__PURE__*/ _jsx(PromQLDuration, {
                        children: formatDuration(msToPrometheusDuration(node.range))
                    }),
                    "]"
                ]
            }),
            formatAtAndOffset(node.timestamp, node.startOrEnd, node.offset)
        ]
    });
};
const ellipsis = /*#__PURE__*/ _jsx(PromQLEllipsis, {
    children: "…"
});
const formatNodeInternal = (node, showChildren, maxDepth)=>{
    if (maxDepth === 0) {
        return ellipsis;
    }
    const childMaxDepth = maxDepth === undefined ? undefined : maxDepth - 1;
    switch(node.type){
        case nodeType.aggregation:
            return /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(PromQLOperator, {
                        children: node.op
                    }),
                    node.without ? /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                            ' ',
                            /*#__PURE__*/ _jsx(PromQLKeyword, {
                                children: "without"
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                children: "("
                            }),
                            labelNameList(node.grouping),
                            /*#__PURE__*/ _jsx("span", {
                                children: ")"
                            }),
                            ' '
                        ]
                    }) : node.grouping.length > 0 && /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                            ' ',
                            /*#__PURE__*/ _jsx(PromQLKeyword, {
                                children: "by"
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                children: "("
                            }),
                            labelNameList(node.grouping),
                            /*#__PURE__*/ _jsx("span", {
                                children: ")"
                            }),
                            ' '
                        ]
                    }),
                    showChildren && /*#__PURE__*/ _jsxs(_Fragment, {
                        children: [
                            /*#__PURE__*/ _jsx("span", {
                                children: "("
                            }),
                            node.param !== null && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    formatNode(node.param, showChildren, childMaxDepth),
                                    ", "
                                ]
                            }),
                            formatNode(node.expr, showChildren, childMaxDepth),
                            /*#__PURE__*/ _jsx("span", {
                                children: ")"
                            })
                        ]
                    })
                ]
            });
        case nodeType.subquery:
            return /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth),
                    "[",
                    /*#__PURE__*/ _jsx(PromQLDuration, {
                        children: formatDuration(msToPrometheusDuration(node.range))
                    }),
                    ":",
                    node.step !== 0 && /*#__PURE__*/ _jsx(PromQLDuration, {
                        children: formatDuration(msToPrometheusDuration(node.step))
                    }),
                    "]",
                    formatAtAndOffset(node.timestamp, node.startOrEnd, node.offset)
                ]
            });
        case nodeType.parenExpr:
            return /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        children: "("
                    }),
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth),
                    /*#__PURE__*/ _jsx("span", {
                        children: ")"
                    })
                ]
            });
        case nodeType.call:
            {
                const children = childMaxDepth === undefined || childMaxDepth > 0 ? node.args.map((arg, i)=>/*#__PURE__*/ _jsxs("span", {
                        children: [
                            i !== 0 && ', ',
                            formatNode(arg, showChildren)
                        ]
                    }, i)) : node.args.length > 0 ? ellipsis : '';
                return /*#__PURE__*/ _jsxs(_Fragment, {
                    children: [
                        /*#__PURE__*/ _jsx(PromQLFunction, {
                            children: node.func.name
                        }),
                        showChildren && /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                /*#__PURE__*/ _jsx("span", {
                                    children: "("
                                }),
                                children,
                                /*#__PURE__*/ _jsx("span", {
                                    children: ")"
                                })
                            ]
                        })
                    ]
                });
            }
        case nodeType.matrixSelector:
            return formatSelector(node);
        case nodeType.vectorSelector:
            return formatSelector(node);
        case nodeType.numberLiteral:
            return /*#__PURE__*/ _jsx(PromQLNumber, {
                children: node.val
            });
        case nodeType.stringLiteral:
            return /*#__PURE__*/ _jsxs(PromQLString, {
                children: [
                    '"',
                    escapeString(node.val),
                    '"'
                ]
            });
        case nodeType.unaryExpr:
            return /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(PromQLOperator, {
                        children: node.op
                    }),
                    showChildren && formatNode(node.expr, showChildren, childMaxDepth)
                ]
            });
        case nodeType.binaryExpr:
            {
                let matching = /*#__PURE__*/ _jsx(_Fragment, {});
                let grouping = /*#__PURE__*/ _jsx(_Fragment, {});
                const vm = node.matching;
                if (vm !== null && (vm.labels.length > 0 || vm.on)) {
                    if (vm.on) {
                        matching = /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ _jsx(PromQLKeyword, {
                                    children: "on"
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    children: "("
                                }),
                                labelNameList(vm.labels),
                                /*#__PURE__*/ _jsx("span", {
                                    children: ")"
                                })
                            ]
                        });
                    } else {
                        matching = /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ _jsx(PromQLKeyword, {
                                    children: "ignoring"
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    children: "("
                                }),
                                labelNameList(vm.labels),
                                /*#__PURE__*/ _jsx("span", {
                                    children: ")"
                                })
                            ]
                        });
                    }
                    if (vm.card === vectorMatchCardinality.manyToOne || vm.card === vectorMatchCardinality.oneToMany) {
                        grouping = /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                /*#__PURE__*/ _jsxs(PromQLKeyword, {
                                    children: [
                                        ' ',
                                        "group_",
                                        vm.card === vectorMatchCardinality.manyToOne ? 'left' : 'right'
                                    ]
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    children: "("
                                }),
                                labelNameList(vm.include),
                                /*#__PURE__*/ _jsx("span", {
                                    children: ")"
                                })
                            ]
                        });
                    }
                }
                return /*#__PURE__*/ _jsxs(_Fragment, {
                    children: [
                        showChildren && formatNode(maybeParenthesizeBinopChild(node.op, node.lhs), showChildren, childMaxDepth),
                        ' ',
                        [
                            'atan2',
                            'and',
                            'or',
                            'unless'
                        ].includes(node.op) ? /*#__PURE__*/ _jsx(PromQLOperator, {
                            children: node.op
                        }) : /*#__PURE__*/ _jsx(PromQLOperator, {
                            children: node.op
                        }),
                        node.bool && /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                ' ',
                                /*#__PURE__*/ _jsx(PromQLKeyword, {
                                    children: "bool"
                                })
                            ]
                        }),
                        matching,
                        grouping,
                        ' ',
                        showChildren && formatNode(maybeParenthesizeBinopChild(node.op, node.rhs), showChildren, childMaxDepth)
                    ]
                });
            }
        case nodeType.placeholder:
            // TODO: Include possible children of placeholders somehow?
            return ellipsis;
        default:
            throw new Error('unsupported node type');
    }
};
export const formatNode = (node, showChildren, maxDepth)=>/*#__PURE__*/ _jsx(PromQLCode, {
        children: formatNodeInternal(node, showChildren, maxDepth)
    });

//# sourceMappingURL=format.js.map