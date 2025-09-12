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
Object.defineProperty(exports, "GanttTableRow", {
    enumerable: true,
    get: function() {
        return GanttTableRow;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _utils = require("../utils");
const _SpanName = require("./SpanName");
const _SpanDuration = require("./SpanDuration");
const GanttTableRow = /*#__PURE__*/ (0, _react.memo)(function GanttTableRow(props) {
    const { options, span, viewport, selected, nameColumnWidth, divider, onClick } = props;
    const theme = (0, _material.useTheme)();
    const handleOnClick = ()=>{
        // ignore event if triggered by selecting text
        if (document.getSelection()?.type === 'Range') return;
        onClick(span);
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(RowContainer, {
        sx: {
            backgroundColor: selected ? theme.palette.action.selected : 'inherit'
        },
        direction: "row",
        onClick: handleOnClick,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_SpanName.SpanName, {
                span: span,
                nameColumnWidth: nameColumnWidth
            }),
            divider,
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_SpanDuration.SpanDuration, {
                options: options,
                span: span,
                viewport: viewport
            })
        ]
    });
});
const RowContainer = (0, _material.styled)(_material.Stack)(({ theme })=>({
        height: _utils.rowHeight,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    }));
