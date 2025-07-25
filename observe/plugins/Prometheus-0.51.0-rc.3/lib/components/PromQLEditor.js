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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CodeMirror from '@uiw/react-codemirror';
import { PromQLExtension } from '@prometheus-io/codemirror-promql';
import { EditorView } from '@codemirror/view';
import { useTheme, CircularProgress, InputLabel, Stack, IconButton, Tooltip } from '@mui/material';
import FileTreeIcon from 'mdi-material-ui/FileTree';
import { useMemo, useState } from 'react';
import { ErrorAlert } from '@perses-dev/components';
import CloseIcon from 'mdi-material-ui/Close';
import { useReplaceVariablesInString } from '@perses-dev/plugin-system';
import { replacePromBuiltinVariables } from '../plugins/prometheus-time-series-query/replace-prom-builtin-variables';
import { useParseQuery } from './query';
import TreeNode from './TreeNode';
const treeViewStr = 'Tree View';
const treeViewOpenStr = 'Open ' + treeViewStr;
const treeViewCloseStr = 'Close ' + treeViewStr;
export function PromQLEditor({ completeConfig, datasource, ...rest }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const [isTreeViewVisible, setTreeViewVisible] = useState(false);
    const promQLExtension = useMemo(()=>{
        return new PromQLExtension().activateLinter(false).setComplete(completeConfig).asExtension();
    }, [
        completeConfig
    ]);
    let queryExpr = useReplaceVariablesInString(rest.value);
    if (queryExpr) {
        // TODO placeholder values for steps to be replaced with actual values
        // Looks like providing proper values involves some refactoring: currently we'd need to rely on the timeseries query context,
        // but these step values are actually computed independently / before the queries are getting fired, so it's useless to fire
        // queries here, so maybe we should extract this part to independant hook(s), to be reused here?
        queryExpr = replacePromBuiltinVariables(queryExpr, 12345, 12345);
    }
    const { data: parseQueryResponse, isLoading, error } = useParseQuery(queryExpr ?? '', datasource, isTreeViewVisible);
    const handleShowTreeView = ()=>{
        setTreeViewVisible(!isTreeViewVisible);
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        position: "relative",
        children: [
            /*#__PURE__*/ _jsx(InputLabel // reproduce the same kind of input label that regular MUI TextFields have
            , {
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
            /*#__PURE__*/ _jsx(CodeMirror, {
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
                    EditorView.lineWrapping,
                    promQLExtension,
                    EditorView.theme({
                        '.cm-content': {
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingRight: '40px'
                        }
                    })
                ],
                placeholder: "Example: sum(rate(http_requests_total[5m]))"
            }),
            queryExpr && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(Tooltip, {
                        title: isTreeViewVisible ? treeViewCloseStr : treeViewOpenStr,
                        children: /*#__PURE__*/ _jsx(IconButton, {
                            "aria-label": isTreeViewVisible ? treeViewCloseStr : treeViewOpenStr,
                            onClick: handleShowTreeView,
                            sx: {
                                position: 'absolute',
                                right: '5px',
                                top: '5px'
                            },
                            size: "small",
                            children: /*#__PURE__*/ _jsx(FileTreeIcon, {
                                sx: {
                                    fontSize: '18px'
                                }
                            })
                        }, "tree-view-button")
                    }),
                    isTreeViewVisible && /*#__PURE__*/ _jsxs("div", {
                        style: {
                            border: `1px solid ${theme.palette.divider}`,
                            position: 'relative'
                        },
                        children: [
                            /*#__PURE__*/ _jsx(Tooltip, {
                                title: treeViewCloseStr,
                                children: /*#__PURE__*/ _jsx(IconButton, {
                                    "aria-label": treeViewCloseStr,
                                    onClick: ()=>setTreeViewVisible(false),
                                    sx: {
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px'
                                    },
                                    size: "small",
                                    children: /*#__PURE__*/ _jsx(CloseIcon, {
                                        sx: {
                                            fontSize: '18px'
                                        }
                                    })
                                }, "tree-view-close-button")
                            }),
                            error ? // Here the user is able to hide the error alert
                            /*#__PURE__*/ _jsx(ErrorAlert, {
                                error: {
                                    name: `${treeViewStr} not available`,
                                    message: error.message
                                }
                            }) : /*#__PURE__*/ _jsx("div", {
                                style: {
                                    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)} 0 ${theme.spacing(1.5)}`,
                                    overflowX: 'auto',
                                    backgroundColor: theme.palette.background.default
                                },
                                children: isLoading ? /*#__PURE__*/ _jsx(CircularProgress, {}) : parseQueryResponse?.data ? /*#__PURE__*/ _jsx(TreeNode, {
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

//# sourceMappingURL=PromQLEditor.js.map