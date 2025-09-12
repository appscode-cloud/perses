// Copyright 2023 The Perses Authors
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
Object.defineProperty(exports, "MarkdownPanelOptionsEditor", {
    enumerable: true,
    get: function() {
        return MarkdownPanelOptionsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const MARKDOWN_GUIDE_URL = 'https://commonmark.org/help/';
const TEXT_INPUT_NUM_ROWS = 20;
function MarkdownPanelOptionsEditor(props) {
    const { onChange, value: { text } } = props;
    const handleChange = (e)=>{
        onChange({
            text: e.target.value
        });
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Link, {
                sx: {
                    alignSelf: 'end',
                    textDecoration: 'none'
                },
                href: MARKDOWN_GUIDE_URL,
                target: "_blank",
                rel: "noopener",
                children: "Markdown Guide"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                label: "Text",
                // Multiline
                multiline: true,
                rows: TEXT_INPUT_NUM_ROWS,
                // Value
                value: text,
                onChange: handleChange
            })
        ]
    });
}
