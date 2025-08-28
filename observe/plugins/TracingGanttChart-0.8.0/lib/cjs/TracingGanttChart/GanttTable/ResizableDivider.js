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
Object.defineProperty(exports, "ResizableDivider", {
    enumerable: true,
    get: function() {
        return ResizableDivider;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _core = require("@perses-dev/core");
function ResizableDivider(props) {
    const { parentRef, spacing = 0, onMove } = props;
    const [isResizing, setResizing] = (0, _react.useState)(false);
    const handleMouseDown = (e)=>{
        // disable any default actions (text selection, etc.)
        e.preventDefault();
        setResizing(true);
    };
    // need stable reference for window.removeEventListener() in useEffect() below
    const handleMouseMove = (0, _core.useEvent)((e)=>{
        if (!parentRef.current) return;
        const offsetX = e.clientX - parentRef.current.getBoundingClientRect().left + spacing;
        const leftPercent = offsetX / parentRef.current.getBoundingClientRect().width;
        if (0.05 <= leftPercent && leftPercent <= 0.95) {
            onMove(leftPercent);
        }
    });
    // need stable reference for window.removeEventListener() in useEffect() below
    const handleMouseUp = (0, _core.useEvent)(()=>{
        setResizing(false);
    });
    // capture mouseMove and mouseUp outside the element by attaching them to the window object
    (0, _react.useEffect)(()=>{
        function startMouseAction() {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
        }
        function stopMouseAction() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'inherit';
        }
        if (isResizing) {
            startMouseAction();
        } else {
            stopMouseAction();
        }
        return stopMouseAction;
    }, [
        isResizing,
        handleMouseMove,
        handleMouseUp
    ]);
    // prevent onClick event when clicking on a divider
    const stopEventPropagation = (e)=>e.stopPropagation();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(ResizableDividerBox, {
        onMouseDown: handleMouseDown,
        onClick: stopEventPropagation
    });
}
const ResizableDividerBox = (0, _material.styled)(_material.Box)(({ theme })=>({
        position: 'relative',
        width: '1px',
        height: '100%',
        backgroundColor: theme.palette.divider,
        cursor: 'col-resize',
        // increase clickable area from 1px to 7px
        '&:before': {
            position: 'absolute',
            width: '7px',
            left: '-3px',
            top: 0,
            bottom: 0,
            content: '" "',
            zIndex: 1
        }
    }));
