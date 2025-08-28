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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { styled, useTheme } from '@mui/material';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';
import ChevronRightIcon from 'mdi-material-ui/ChevronRight';
import { useCallback } from 'react';
import { useGanttTableContext } from './GanttTableProvider';
const MIN_INDENT_WIDTH = 8;
const MAX_INDENT_WIDTH = 24;
/**
 * SpanIndents renders the indention boxes,
 * and handles the click and mouseOver events
 *
 * Note: This component gets re-rendered on every hover of any indention box,
 * therefore rendering performance is essential.
 */ export function SpanIndents(props) {
    const { span } = props;
    const { collapsedSpans, setCollapsedSpans, visibleSpans, hoveredParent, setHoveredParent } = useGanttTableContext();
    const theme = useTheme();
    const handleToggleClick = useCallback((e)=>{
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
    const handleIconMouseEnter = useCallback(()=>{
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
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: spans.map((span, i)=>/*#__PURE__*/ _jsx(SpanIndentBox, {
                style: {
                    width: i === spans.length - 1 || visibleSpans.length === 0 || visibleSpans.includes(span.spanId) ? MAX_INDENT_WIDTH : MIN_INDENT_WIDTH,
                    borderLeft: `${hoveredParent === (span.parentSpanId ?? '') ? 3 : 1}px solid ${theme.palette.divider}`
                },
                onMouseEnter: ()=>setHoveredParent(span.parentSpanId ?? ''),
                onMouseLeave: ()=>setHoveredParent(undefined),
                children: i === spans.length - 1 && span.childSpans.length > 0 && (collapsedSpans.includes(span.spanId) ? /*#__PURE__*/ _jsx(ChevronRightIcon, {
                    titleAccess: "expand",
                    onClick: handleToggleClick,
                    onMouseEnter: handleIconMouseEnter
                }) : /*#__PURE__*/ _jsx(ChevronDownIcon, {
                    titleAccess: "collapse",
                    onClick: handleToggleClick,
                    onMouseEnter: handleIconMouseEnter
                }))
            }, span.spanId))
    });
}
const SpanIndentBox = styled('div')({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexShrink: 0,
    transition: 'width 1s'
});

//# sourceMappingURL=SpanIndents.js.map