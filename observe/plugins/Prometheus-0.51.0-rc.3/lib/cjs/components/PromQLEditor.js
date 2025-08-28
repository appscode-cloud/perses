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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PromQLEditor", {
    enumerable: true,
    get: function() {
        return PromQLEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _reactcodemirror = /*#__PURE__*/ _interop_require_default(require("@uiw/react-codemirror"));
const _codemirrorpromql = require("@prometheus-io/codemirror-promql");
const _view = require("@codemirror/view");
const _material = require("@mui/material");
const _FileTree = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/FileTree"));
const _react = require("react");
const _components = require("@perses-dev/components");
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _pluginsystem = require("@perses-dev/plugin-system");
const _replaceprombuiltinvariables = require("../plugins/prometheus-time-series-query/replace-prom-builtin-variables");
const _query = require("./query");
const _TreeNode = /*#__PURE__*/ _interop_require_default(require("./TreeNode"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const treeViewStr = 'Tree View';
const treeViewOpenStr = 'Open ' + treeViewStr;
const treeViewCloseStr = 'Close ' + treeViewStr;
function PromQLEditor({ completeConfig, datasource, ...rest }) {
    const theme = (0, _material.useTheme)();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isTreeViewVisible, setTreeViewVisible] = (0, _react.useState)(false);
    const promQLExtension = (0, _react.useMemo)(()=>{
        return new _codemirrorpromql.PromQLExtension().activateLinter(false).setComplete(completeConfig).asExtension();
    }, [
        completeConfig
    ]);
    let queryExpr = (0, _pluginsystem.useReplaceVariablesInString)(rest.value);
    if (queryExpr) {
        // TODO placeholder values for steps to be replaced with actual values
        // Looks like providing proper values involves some refactoring: currently we'd need to rely on the timeseries query context,
        // but these step values are actually computed independently / before the queries are getting fired, so it's useless to fire
        // queries here, so maybe we should extract this part to independant hook(s), to be reused here?
        queryExpr = (0, _replaceprombuiltinvariables.replacePromBuiltinVariables)(queryExpr, 12345, 12345);
    }
    const { data: parseQueryResponse, isLoading, error } = (0, _query.useParseQuery)(queryExpr ?? '', datasource, isTreeViewVisible);
    const handleShowTreeView = ()=>{
        setTreeViewVisible(!isTreeViewVisible);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        position: "relative",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material // reproduce the same kind of input label that regular MUI TextFields have
            .InputLabel, {
                shrink: true,
                sx: {
                    position: 'absolute',
                    top: '-8px',
                    left: '10px',
                    padding: '0 4px',
                    color: theme.palette.text.primary,
                    zIndex: 1
                },
                children: "PromQL Expression"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactcodemirror.default, {
                ...rest,
                style: {
                    border: `1px solid ${theme.palette.divider}`
                },
                theme: isDarkMode ? 'dark' : 'light',
                basicSetup: {
                    highlightActiveLine: false,
                    highlightActiveLineGutter: false,
                    foldGutter: false
                },
                extensions: [
                    _view.EditorView.lineWrapping,
                    promQLExtension,
                    _view.EditorView.theme({
                        '.cm-content': {
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingRight: '40px'
                        }
                    })
                ],
                placeholder: "Example: sum(rate(http_requests_total[5m]))"
            }),
            queryExpr && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                        title: isTreeViewVisible ? treeViewCloseStr : treeViewOpenStr,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                            "aria-label": isTreeViewVisible ? treeViewCloseStr : treeViewOpenStr,
                            onClick: handleShowTreeView,
                            sx: {
                                position: 'absolute',
                                right: '5px',
                                top: '5px'
                            },
                            size: "small",
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_FileTree.default, {
                                sx: {
                                    fontSize: '18px'
                                }
                            })
                        }, "tree-view-button")
                    }),
                    isTreeViewVisible && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        style: {
                            border: `1px solid ${theme.palette.divider}`,
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                                title: treeViewCloseStr,
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                    "aria-label": treeViewCloseStr,
                                    onClick: ()=>setTreeViewVisible(false),
                                    sx: {
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px'
                                    },
                                    size: "small",
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {
                                        sx: {
                                            fontSize: '18px'
                                        }
                                    })
                                }, "tree-view-close-button")
                            }),
                            error ? // Here the user is able to hide the error alert
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ErrorAlert, {
                                error: {
                                    name: `${treeViewStr} not available`,
                                    message: error.message
                                }
                            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                style: {
                                    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)} 0 ${theme.spacing(1.5)}`,
                                    overflowX: 'auto',
                                    backgroundColor: theme.palette.background.default
                                },
                                children: isLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {}) : parseQueryResponse?.data ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_TreeNode.default, {
                                    node: parseQueryResponse.data,
                                    reverse: false,
                                    childIdx: 0,
                                    datasource: datasource
                                }) : null
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
