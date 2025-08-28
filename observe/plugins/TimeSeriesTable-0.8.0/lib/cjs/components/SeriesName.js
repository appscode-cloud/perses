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
Object.defineProperty(exports, "SeriesName", {
    enumerable: true,
    get: function() {
        return SeriesName;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
function SeriesName({ name, labels, formattedName, isFormatted }) {
    if (isFormatted && labels && Object.keys(labels).length > 0) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(FormatedSeriesName, {
            labels: labels
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
        sx: {
            textWrap: 'auto'
        },
        children: formattedName ?? name
    });
}
function FormatedSeriesName({ labels }) {
    const { infoSnackbar } = (0, _components.useSnackbar)();
    const labelNodes = [];
    let first = true;
    function copyToClipboard(e) {
        const copyText = e.currentTarget.innerText || '';
        navigator.clipboard.writeText(copyText.trim()).then(()=>{
            infoSnackbar(`Copied label matcher: ${copyText}`);
        }).catch((reason)=>{
            console.error(`unable to copy text: ${reason}`);
        });
    }
    for(const label in labels){
        if (label === '__name__') {
            continue;
        }
        labelNodes.push(/*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
            children: [
                !first && ', ',
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                    display: "inline",
                    component: "span",
                    sx: {
                        '&:hover': {
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }
                    },
                    onClick: copyToClipboard,
                    title: "Click to copy label matcher",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                            children: label
                        }),
                        "=",
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                            children: [
                                '"',
                                labels[label],
                                '"'
                            ]
                        })
                    ]
                })
            ]
        }, label));
        if (first) {
            first = false;
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
        sx: {
            textWrap: 'auto'
        },
        children: [
            labels ? labels.__name__ : '',
            '{',
            labelNodes,
            '}'
        ]
    });
}
