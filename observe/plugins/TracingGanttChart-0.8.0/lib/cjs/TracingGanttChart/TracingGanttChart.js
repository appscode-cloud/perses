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
Object.defineProperty(exports, "TracingGanttChart", {
    enumerable: true,
    get: function() {
        return TracingGanttChart;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _MiniGanttChart = require("./MiniGanttChart/MiniGanttChart");
const _DetailPane = require("./DetailPane/DetailPane");
const _GanttTable = require("./GanttTable/GanttTable");
const _GanttTableProvider = require("./GanttTable/GanttTableProvider");
const _ResizableDivider = require("./GanttTable/ResizableDivider");
const _trace = require("./trace");
const _TraceDetails = require("./TraceDetails");
function TracingGanttChart(props) {
    const { options, attributeLinks, trace: otlpTrace } = props;
    const theme = (0, _material.useTheme)();
    const trace = (0, _react.useMemo)(()=>{
        try {
            return (0, _trace.getTraceModel)(otlpTrace);
        } catch (e) {
            throw new Error(`Error: unable to parse trace: ${e}`);
        }
    }, [
        otlpTrace
    ]);
    const [viewport, setViewport] = (0, _react.useState)({
        startTimeUnixMs: trace.startTimeUnixMs,
        endTimeUnixMs: trace.endTimeUnixMs
    });
    const [selectedSpan, setSelectedSpan] = (0, _react.useState)(undefined);
    const ganttChart = (0, _react.useRef)(null);
    // tableWidth only comes to effect if the detail pane is visible.
    // setTableWidth() is only called by <ResizableDivider />
    const [tableWidth, setTableWidth] = (0, _react.useState)(0.82);
    const gap = 2;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        ref: ganttChart,
        direction: "row",
        sx: {
            height: '100%',
            minHeight: '240px',
            gap
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                sx: {
                    flexGrow: 1,
                    gap
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_TraceDetails.TraceDetails, {
                        trace: trace
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_MiniGanttChart.MiniGanttChart, {
                        options: options,
                        trace: trace,
                        viewport: viewport,
                        setViewport: setViewport
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_GanttTableProvider.GanttTableProvider, {
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_GanttTable.GanttTable, {
                            options: options,
                            trace: trace,
                            viewport: viewport,
                            selectedSpan: selectedSpan,
                            onSpanClick: setSelectedSpan
                        })
                    })
                ]
            }),
            selectedSpan && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_ResizableDivider.ResizableDivider, {
                        parentRef: ganttChart,
                        spacing: parseInt(theme.spacing(gap)),
                        onMove: setTableWidth
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        sx: {
                            width: `${(1 - tableWidth) * 100}%`,
                            overflow: 'auto'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DetailPane.DetailPane, {
                            attributeLinks: attributeLinks,
                            trace: trace,
                            span: selectedSpan,
                            onCloseBtnClick: ()=>setSelectedSpan(undefined)
                        })
                    })
                ]
            })
        ]
    });
}
