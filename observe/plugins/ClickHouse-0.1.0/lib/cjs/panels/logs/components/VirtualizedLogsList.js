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
Object.defineProperty(exports, "VirtualizedLogsList", {
    enumerable: true,
    get: function() {
        return VirtualizedLogsList;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _material = require("@mui/material");
const _reactvirtuoso = require("react-virtuoso");
const _LogRow = require("./LogRow/LogRow");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const VirtualizedLogsList = ({ logs, expandedRows, onToggleExpand })=>{
    const theme = (0, _material.useTheme)();
    const renderLogRow = (index)=>{
        const log = logs[index];
        if (!log) return null;
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogRow.LogRow, {
            log: log,
            index: index,
            isExpanded: expandedRows.has(index),
            onToggle: onToggleExpand
        });
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
        sx: {
            height: '100%',
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden',
            boxShadow: theme.shadows[1]
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactvirtuoso.Virtuoso, {
            style: {
                height: '100%'
            },
            totalCount: logs.length,
            itemContent: renderLogRow
        })
    });
};
