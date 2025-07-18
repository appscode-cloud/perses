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
Object.defineProperty(exports, "GanttTable", {
    enumerable: true,
    get: function() {
        return GanttTable;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _reactvirtuoso = require("react-virtuoso");
const _react = require("react");
const _material = require("@mui/material");
const _GanttTableProvider = require("./GanttTableProvider");
const _GanttTableRow = require("./GanttTableRow");
const _GanttTableHeader = require("./GanttTableHeader");
const _ResizableDivider = require("./ResizableDivider");
function GanttTable(props) {
    const { options, trace, viewport, selectedSpan, onSpanClick } = props;
    const { collapsedSpans, setVisibleSpans } = (0, _GanttTableProvider.useGanttTableContext)();
    const [nameColumnWidth, setNameColumnWidth] = (0, _react.useState)(0.25);
    const tableRef = (0, _react.useRef)(null);
    const theme = (0, _material.useTheme)();
    const rows = (0, _react.useMemo)(()=>{
        const rows = [];
        for (const rootSpan of trace.rootSpans){
            treeToRows(rows, rootSpan, collapsedSpans);
        }
        return rows;
    }, [
        trace.rootSpans,
        collapsedSpans
    ]);
    const divider = /*#__PURE__*/ (0, _jsxruntime.jsx)(_ResizableDivider.ResizableDivider, {
        parentRef: tableRef,
        onMove: setNameColumnWidth
    });
    // update currently visible spans
    function handleRangeChange({ startIndex, endIndex }) {
        const visibleSpans = [];
        for(let i = startIndex; i <= endIndex; i++){
            visibleSpans.push(rows[i].spanId);
        }
        setVisibleSpans(visibleSpans);
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        ref: tableRef,
        sx: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius}px`
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_GanttTableHeader.GanttTableHeader, {
                trace: trace,
                viewport: viewport,
                nameColumnWidth: nameColumnWidth,
                divider: divider
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactvirtuoso.Virtuoso, {
                data: rows,
                itemContent: (_, span)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_GanttTableRow.GanttTableRow, {
                        options: options,
                        span: span,
                        viewport: viewport,
                        selected: span === selectedSpan,
                        nameColumnWidth: nameColumnWidth,
                        divider: divider,
                        onClick: onSpanClick
                    }),
                rangeChanged: handleRangeChange
            })
        ]
    });
}
/**
 * treeToRows recursively transforms the span tree to a list of rows and
 * hides collapsed child spans.
 */ function treeToRows(rows, span, collapsedSpans) {
    rows.push(span);
    if (!collapsedSpans.includes(span.spanId)) {
        for (const child of span.childSpans){
            treeToRows(rows, child, collapsedSpans);
        }
    }
}
