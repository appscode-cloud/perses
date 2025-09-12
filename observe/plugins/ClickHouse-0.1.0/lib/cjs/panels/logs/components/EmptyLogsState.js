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
Object.defineProperty(exports, "EmptyLogsState", {
    enumerable: true,
    get: function() {
        return EmptyLogsState;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const EmptyLogsState = ({ message = 'No logs to display' })=>{
    const theme = (0, _material.useTheme)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            variant: "body2",
            sx: {
                color: theme.palette.text.secondary,
                fontSize: '14px'
            },
            children: message
        })
    });
};
