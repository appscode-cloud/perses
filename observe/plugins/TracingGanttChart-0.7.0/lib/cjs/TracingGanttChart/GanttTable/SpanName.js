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
Object.defineProperty(exports, "SpanName", {
    enumerable: true,
    get: function() {
        return SpanName;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _AlertCircleOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/AlertCircleOutline"));
const _utils = require("../utils");
const _SpanIndents = require("./SpanIndents");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function SpanName(props) {
    const { span, nameColumnWidth } = props;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        sx: {
            alignItems: 'center'
        },
        style: {
            width: `${nameColumnWidth * 100}%`
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_SpanIndents.SpanIndents, {
                span: span
            }),
            (0, _utils.spanHasError)(span) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_AlertCircleOutline.default, {
                titleAccess: "error",
                color: "error",
                sx: {
                    marginRight: '5px'
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
                sx: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("strong", {
                        children: [
                            span.resource.serviceName,
                            ":"
                        ]
                    }),
                    " ",
                    span.name
                ]
            })
        ]
    });
}
