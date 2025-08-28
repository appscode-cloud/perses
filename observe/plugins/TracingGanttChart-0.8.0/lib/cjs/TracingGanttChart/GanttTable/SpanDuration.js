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
Object.defineProperty(exports, "SpanDuration", {
    enumerable: true,
    get: function() {
        return SpanDuration;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _utils = require("../utils");
const _Ticks = require("../Ticks");
function SpanDuration(props) {
    const { options, span, viewport } = props;
    const muiTheme = (0, _material.useTheme)();
    const chartsTheme = (0, _components.useChartsTheme)();
    const spanDuration = span.endTimeUnixMs - span.startTimeUnixMs;
    const viewportDuration = viewport.endTimeUnixMs - viewport.startTimeUnixMs;
    const relativeDuration = spanDuration / viewportDuration;
    const relativeStart = (span.startTimeUnixMs - viewport.startTimeUnixMs) / viewportDuration;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        sx: {
            position: 'relative',
            height: '100%',
            flexGrow: 1,
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Ticks.Ticks, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                "data-testid": "span-duration-bar",
                sx: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    margin: 'auto',
                    minWidth: `${_utils.minSpanWidthPx}px`,
                    height: '8px',
                    borderRadius: muiTheme.shape.borderRadius
                },
                style: {
                    left: `${relativeStart * 100}%`,
                    width: `${relativeDuration * 100}%`,
                    backgroundColor: (0, _utils.getSpanColor)(muiTheme, chartsTheme, options.visual?.palette?.mode, span)
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                sx: {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '0 8px',
                    color: muiTheme.palette.grey[700],
                    fontSize: '.7rem'
                },
                style: /* print span duration on right side of the span bar, if there is space */ relativeStart + relativeDuration < 0.95 ? {
                    left: `${(relativeStart + relativeDuration) * 100}%`
                } : {
                    left: `${relativeStart * 100}%`,
                    transform: 'translateY(-50%) translateX(-100%)'
                },
                children: (0, _utils.formatDuration)(spanDuration)
            })
        ]
    });
}
