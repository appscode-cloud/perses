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
Object.defineProperty(exports, "Canvas", {
    enumerable: true,
    get: function() {
        return Canvas;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _useresizeobserver = /*#__PURE__*/ _interop_require_default(require("use-resize-observer"));
const _react = require("react");
const _core = require("@perses-dev/core");
const _components = require("@perses-dev/components");
const _Ticks = require("../Ticks");
const _utils = require("../utils");
const _draw = require("./draw");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const CANVAS_HEIGHT = 60;
function Canvas(props) {
    const { options, trace, viewport, setViewport } = props;
    const muiTheme = (0, _material.useTheme)();
    const chartsTheme = (0, _components.useChartsTheme)();
    // the <canvas> element must have an absolute width and height to avoid rendering problems
    // the wrapper box is required to get the available dimensions for the <canvas> element
    const { width, ref: wrapperRef } = (0, _useresizeobserver.default)();
    const height = CANVAS_HEIGHT;
    const canvasRef = (0, _react.useRef)(null);
    const [mouseState, setMouseState] = (0, _react.useState)({
        type: 'none'
    });
    const traceDuration = trace.endTimeUnixMs - trace.startTimeUnixMs;
    const relativeCutoffLeft = (viewport.startTimeUnixMs - trace.startTimeUnixMs) / traceDuration;
    const relativeCutoffRight = (trace.endTimeUnixMs - viewport.endTimeUnixMs) / traceDuration;
    const spanColorGenerator = (0, _react.useCallback)((span)=>(0, _utils.getSpanColor)(muiTheme, chartsTheme, options.visual?.palette?.mode, span), [
        muiTheme,
        chartsTheme,
        options.visual?.palette?.mode
    ]);
    (0, _react.useEffect)(()=>{
        if (!canvasRef.current || !width || !height) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        (0, _draw.drawSpans)(ctx, width, height, trace, spanColorGenerator);
    }, [
        width,
        height,
        trace,
        spanColorGenerator
    ]);
    const translateCursorToTime = (e)=>{
        if (!canvasRef.current || !width) return 0;
        // e.nativeEvent.offsetX doesn't work when sliding over a tick box
        const offsetX = e.clientX - canvasRef.current.getBoundingClientRect().left;
        return trace.startTimeUnixMs + offsetX / width * traceDuration;
    };
    const handleMouseDown = (e)=>{
        e.preventDefault();
        if (!(e.target instanceof HTMLElement)) return;
        const isDefaultViewport = viewport.startTimeUnixMs === trace.startTimeUnixMs && viewport.endTimeUnixMs === trace.endTimeUnixMs;
        const elem = e.target.dataset['elem'];
        const cursor = translateCursorToTime(e);
        if (elem === 'resizerLeft') {
            setMouseState({
                type: 'resize',
                fixedPoint: viewport.endTimeUnixMs
            });
        } else if (elem === 'resizerRight') {
            setMouseState({
                type: 'resize',
                fixedPoint: viewport.startTimeUnixMs
            });
        } else if (elem === 'cutoffBox' || isDefaultViewport) {
            setMouseState({
                type: 'resize',
                fixedPoint: cursor
            });
            setViewport({
                startTimeUnixMs: cursor,
                endTimeUnixMs: cursor
            });
        } else {
            setMouseState({
                type: 'drag',
                start: cursor - viewport.startTimeUnixMs,
                end: viewport.endTimeUnixMs - cursor
            });
        }
    };
    // need stable reference for window.removeEventListener() in useEffect() below
    const handleMouseMove = (0, _core.useEvent)((e)=>{
        e.preventDefault();
        switch(mouseState.type){
            case 'none':
                return;
            case 'resize':
                {
                    const pointA = mouseState.fixedPoint;
                    const pointB = translateCursorToTime(e);
                    let start, end;
                    if (pointA < pointB) {
                        start = pointA;
                        end = pointB;
                    } else {
                        start = pointB;
                        end = pointA;
                    }
                    setViewport({
                        startTimeUnixMs: Math.max(start, trace.startTimeUnixMs),
                        endTimeUnixMs: Math.min(end, trace.endTimeUnixMs)
                    });
                    return;
                }
            case 'drag':
                {
                    // avoid using e.movementX here, as it skips events in chrome,
                    // resulting in the mouse pointer moving faster than the viewport box
                    const { start, end } = mouseState;
                    let cursor = translateCursorToTime(e);
                    if (cursor - start < trace.startTimeUnixMs) {
                        cursor = trace.startTimeUnixMs + start;
                    }
                    if (cursor + end > trace.endTimeUnixMs) {
                        cursor = trace.endTimeUnixMs - end;
                    }
                    setViewport({
                        startTimeUnixMs: cursor - start,
                        endTimeUnixMs: cursor + end
                    });
                    return;
                }
        }
    });
    // need stable reference for window.removeEventListener() in useEffect() below
    const handleMouseUp = (0, _core.useEvent)((e)=>{
        e.preventDefault();
        setMouseState({
            type: 'none'
        });
        // reset viewport if start === end, i.e. a click without movement
        if (viewport.startTimeUnixMs === viewport.endTimeUnixMs) {
            setViewport({
                startTimeUnixMs: trace.startTimeUnixMs,
                endTimeUnixMs: trace.endTimeUnixMs
            });
        }
    });
    // capture mouseMove and mouseUp outside the element by attaching them to the window object
    (0, _react.useEffect)(()=>{
        function startMouseAction() {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = mouseState.type === 'resize' ? 'col-resize' : 'move';
        }
        function stopMouseAction() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'inherit';
        }
        if (mouseState.type === 'none') {
            stopMouseAction();
        } else {
            startMouseAction();
        }
        return stopMouseAction;
    }, [
        mouseState,
        handleMouseMove,
        handleMouseUp
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Box, {
        ref: wrapperRef,
        sx: {
            position: 'relative',
            height
        },
        onMouseDown: handleMouseDown,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("canvas", {
                ref: canvasRef,
                width: width,
                height: height,
                style: {
                    position: 'absolute'
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Ticks.Ticks, {}),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(CutoffBox, {
                "data-elem": "cutoffBox",
                style: {
                    left: 0,
                    width: `${relativeCutoffLeft * 100}%`
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(Resizer, {
                "data-elem": "resizerLeft",
                style: {
                    left: `${relativeCutoffLeft * 100}%`
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(Resizer, {
                "data-elem": "resizerRight",
                style: {
                    right: `${relativeCutoffRight * 100}%`
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(CutoffBox, {
                "data-elem": "cutoffBox",
                style: {
                    right: 0,
                    width: `${relativeCutoffRight * 100}%`
                }
            })
        ]
    });
}
const CutoffBox = (0, _material.styled)(_material.Box)({
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(225, 225, 225, .5)'
});
const Resizer = (0, _material.styled)(_material.Box)(({ theme })=>({
        position: 'absolute',
        height: '100%',
        backgroundColor: theme.palette.divider,
        width: '2px',
        cursor: 'col-resize',
        // increase clickable area from 2px to 8px
        '&:before': {
            position: 'absolute',
            width: '8px',
            left: '-3px',
            top: 0,
            bottom: 0,
            content: '" "',
            zIndex: 1
        }
    }));
