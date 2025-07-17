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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
/**
 * GanttTableContext stores UI state of the rows.
 * Required for passing down state to deeply nested <SpanIndents>,
 * without re-rendering intermediate components.
 */ export const GanttTableContext = /*#__PURE__*/ createContext(undefined);
export function GanttTableProvider(props) {
    const { children } = props;
    const [collapsedSpans, setCollapsedSpans] = useState([]);
    const [visibleSpans, setVisibleSpans] = useState([]);
    const [hoveredParent, setHoveredParent] = useState(undefined);
    return /*#__PURE__*/ _jsx(GanttTableContext.Provider, {
        value: {
            collapsedSpans,
            setCollapsedSpans,
            visibleSpans,
            setVisibleSpans,
            hoveredParent,
            setHoveredParent
        },
        children: children
    });
}
export function useGanttTableContext() {
    const ctx = useContext(GanttTableContext);
    if (ctx === undefined) {
        throw new Error('No GanttTableContext found. Did you forget a Provider?');
    }
    return ctx;
}

//# sourceMappingURL=GanttTableProvider.js.map