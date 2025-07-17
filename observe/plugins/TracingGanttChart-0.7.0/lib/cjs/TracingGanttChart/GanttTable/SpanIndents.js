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
Object.defineProperty(exports, "SpanIndents", {
    enumerable: true,
    get: function() {
        return SpanIndents;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _ChevronDown = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronDown"));
const _ChevronRight = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronRight"));
const _react = require("react");
const _GanttTableProvider = require("./GanttTableProvider");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const MIN_INDENT_WIDTH = 8;
const MAX_INDENT_WIDTH = 24;
function SpanIndents(props) {
    const { span } = props;
    const { collapsedSpans, setCollapsedSpans, visibleSpans, hoveredParent, setHoveredParent } = (0, _GanttTableProvider.useGanttTableContext)();
    const theme = (0, _material.useTheme)();
    const handleToggleClick = (0, _react.useCallback)((e)=>{
        e.stopPropagation();
        if (collapsedSpans.includes(span.spanId)) {
            setCollapsedSpans(collapsedSpans.filter((spanId)=>spanId !== span.spanId));
        } else {
            setCollapsedSpans([
                ...collapsedSpans,
                span.spanId
            ]);
        }
    }, [
        span,
        collapsedSpans,
        setCollapsedSpans
    ]);
    const handleIconMouseEnter = (0, _react.useCallback)(()=>{
        setHoveredParent(span.spanId);
    }, [
        span,
        setHoveredParent
    ]);
    const spans = [
        span
    ];
    let parent = span.parentSpan;
    while(parent){
        spans.unshift(parent);
        parent = parent.parentSpan;
    }
    // on first render visibleSpans is empty, therefore let's use MAX_INDENT_WIDTH to avoid an animation on page load.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: spans.map((span, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(SpanIndentBox, {
                style: {
                    width: i === spans.length - 1 || visibleSpans.length === 0 || visibleSpans.includes(span.spanId) ? MAX_INDENT_WIDTH : MIN_INDENT_WIDTH,
                    borderLeft: `${hoveredParent === (span.parentSpanId ?? '') ? 3 : 1}px solid ${theme.palette.divider}`
                },
                onMouseEnter: ()=>setHoveredParent(span.parentSpanId ?? ''),
                onMouseLeave: ()=>setHoveredParent(undefined),
                children: i === spans.length - 1 && span.childSpans.length > 0 && (collapsedSpans.includes(span.spanId) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronRight.default, {
                    titleAccess: "expand",
                    onClick: handleToggleClick,
                    onMouseEnter: handleIconMouseEnter
                }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronDown.default, {
                    titleAccess: "collapse",
                    onClick: handleToggleClick,
                    onMouseEnter: handleIconMouseEnter
                }))
            }, span.spanId))
    });
}
const SpanIndentBox = (0, _material.styled)('div')({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    transition: 'width 1s'
});
