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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { InputLabel, Stack, useTheme } from '@mui/material';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { isValidTraceId } from '@perses-dev/core';
import { TraceQLExtension } from './TraceQLExtension';
export function TraceQLEditor({ completionConfig, ...rest }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const traceQLExtension = useMemo(()=>{
        return TraceQLExtension(completionConfig);
    }, [
        completionConfig
    ]);
    const codemirrorTheme = useMemo(()=>{
        // https://github.com/mui/material-ui/blob/v5.16.7/packages/mui-material/src/OutlinedInput/OutlinedInput.js#L43
        const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
        return EditorView.theme({
            '&': {
                backgroundColor: 'transparent !important',
                border: `1px solid ${borderColor}`,
                borderRadius: `${theme.shape.borderRadius}px`
            },
            '&.cm-focused.cm-editor': {
                outline: 'none'
            },
            '.cm-content': {
                padding: '8px'
            }
        });
    }, [
        theme
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        position: "relative",
        sx: {
            flexGrow: 1
        },
        children: [
            /*#__PURE__*/ _jsx(InputLabel // reproduce the same kind of input label that regular MUI TextFields have
            , {
                shrink: true,
                sx: {
                    position: 'absolute',
                    top: '-6px',
                    left: '10px',
                    padding: '0 4px',
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    zIndex: 1
                },
                children: "TraceQL Expression"
            }),
            /*#__PURE__*/ _jsx(CodeMirror, {
                ...rest,
                theme: isDarkMode ? 'dark' : 'light',
                basicSetup: {
                    lineNumbers: false,
                    highlightActiveLine: false,
                    highlightActiveLineGutter: false,
                    foldGutter: false,
                    // The explore view accepts either a TraceQL query or a Trace ID as input. The lezer grammar marks Trace IDs as invalid,
                    // therefore let's disable syntax highlighting if the input is a Trace ID.
                    syntaxHighlighting: !isValidTraceId(rest.value ?? '')
                },
                extensions: [
                    EditorView.lineWrapping,
                    traceQLExtension,
                    codemirrorTheme
                ],
                placeholder: 'Example: {span.http.method = "GET"}'
            })
        ]
    });
}

//# sourceMappingURL=TraceQLEditor.js.map