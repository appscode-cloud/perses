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
Object.defineProperty(exports, "MiniGanttChart", {
    enumerable: true,
    get: function() {
        return MiniGanttChart;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _Ticks = require("../Ticks");
const _utils = require("../utils");
const _Canvas = require("./Canvas");
function MiniGanttChart(props) {
    const { options, trace, viewport, setViewport } = props;
    const theme = (0, _material.useTheme)();
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        sx: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius}px`
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                sx: {
                    position: 'relative',
                    height: _utils.rowHeight,
                    borderBottom: `1px solid ${theme.palette.divider}`
                },
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Ticks.TicksHeader, {
                    trace: trace,
                    viewport: {
                        startTimeUnixMs: trace.startTimeUnixMs,
                        endTimeUnixMs: trace.endTimeUnixMs
                    }
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Canvas.Canvas, {
                options: options,
                trace: trace,
                viewport: viewport,
                setViewport: setViewport
            })
        ]
    });
}
