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
Object.defineProperty(exports, "ClickQLEditor", {
    enumerable: true,
    get: function() {
        return ClickQLEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _reactcodemirror = /*#__PURE__*/ _interop_require_default(require("@uiw/react-codemirror"));
const _view = require("@codemirror/view");
const _material = require("@mui/material");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function ClickQLEditor(props) {
    const theme = (0, _material.useTheme)();
    const isDarkMode = theme.palette.mode === 'dark';
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        position: "relative",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                sx: {
                    fontWeight: 500,
                    marginBottom: '4px',
                    color: theme.palette.text.primary
                },
                children: "ClickHouse Query"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactcodemirror.default, {
                ...props,
                style: {
                    border: `1px solid ${theme.palette.divider}`
                },
                theme: isDarkMode ? 'dark' : 'light',
                basicSetup: {
                    highlightActiveLine: false,
                    highlightActiveLineGutter: false,
                    foldGutter: false,
                    syntaxHighlighting: true
                },
                extensions: [
                    _view.EditorView.lineWrapping,
                    _view.EditorView.theme({
                        '.cm-content': {
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            paddingRight: '40px'
                        }
                    })
                ],
                placeholder: "Write ClickHouse Query Here..."
            })
        ]
    });
}
