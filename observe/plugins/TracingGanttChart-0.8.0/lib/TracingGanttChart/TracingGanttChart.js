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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { MiniGanttChart } from './MiniGanttChart/MiniGanttChart';
import { DetailPane } from './DetailPane/DetailPane';
import { GanttTable } from './GanttTable/GanttTable';
import { GanttTableProvider } from './GanttTable/GanttTableProvider';
import { ResizableDivider } from './GanttTable/ResizableDivider';
import { getTraceModel } from './trace';
import { TraceDetails } from './TraceDetails';
/**
 * The core GanttChart panel for Perses.
 *
 * The UI/UX of this panel is based on Jaeger UI, licensed under Apache License, Version 2.0.
 * https://github.com/jaegertracing/jaeger-ui
 */ export function TracingGanttChart(props) {
    const { options, attributeLinks, trace: otlpTrace } = props;
    const theme = useTheme();
    const trace = useMemo(()=>{
        try {
            return getTraceModel(otlpTrace);
        } catch (e) {
            throw new Error(`Error: unable to parse trace: ${e}`);
        }
    }, [
        otlpTrace
    ]);
    const [viewport, setViewport] = useState({
        startTimeUnixMs: trace.startTimeUnixMs,
        endTimeUnixMs: trace.endTimeUnixMs
    });
    const [selectedSpan, setSelectedSpan] = useState(undefined);
    const ganttChart = useRef(null);
    // tableWidth only comes to effect if the detail pane is visible.
    // setTableWidth() is only called by <ResizableDivider />
    const [tableWidth, setTableWidth] = useState(0.82);
    const gap = 2;
    return /*#__PURE__*/ _jsxs(Stack, {
        ref: ganttChart,
        direction: "row",
        sx: {
            height: '100%',
            minHeight: '240px',
            gap
        },
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                sx: {
                    flexGrow: 1,
                    gap
                },
                children: [
                    /*#__PURE__*/ _jsx(TraceDetails, {
                        trace: trace
                    }),
                    /*#__PURE__*/ _jsx(MiniGanttChart, {
                        options: options,
                        trace: trace,
                        viewport: viewport,
                        setViewport: setViewport
                    }),
                    /*#__PURE__*/ _jsx(GanttTableProvider, {
                        children: /*#__PURE__*/ _jsx(GanttTable, {
                            options: options,
                            trace: trace,
                            viewport: viewport,
                            selectedSpan: selectedSpan,
                            onSpanClick: setSelectedSpan
                        })
                    })
                ]
            }),
            selectedSpan && /*#__PURE__*/ _jsxs(_Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(ResizableDivider, {
                        parentRef: ganttChart,
                        spacing: parseInt(theme.spacing(gap)),
                        onMove: setTableWidth
                    }),
                    /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            width: `${(1 - tableWidth) * 100}%`,
                            overflow: 'auto'
                        },
                        children: /*#__PURE__*/ _jsx(DetailPane, {
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

//# sourceMappingURL=TracingGanttChart.js.map