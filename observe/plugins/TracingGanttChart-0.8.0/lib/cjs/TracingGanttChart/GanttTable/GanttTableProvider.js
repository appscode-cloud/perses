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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    GanttTableContext: function() {
        return GanttTableContext;
    },
    GanttTableProvider: function() {
        return GanttTableProvider;
    },
    useGanttTableContext: function() {
        return useGanttTableContext;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const GanttTableContext = /*#__PURE__*/ (0, _react.createContext)(undefined);
function GanttTableProvider(props) {
    const { children } = props;
    const [collapsedSpans, setCollapsedSpans] = (0, _react.useState)([]);
    const [visibleSpans, setVisibleSpans] = (0, _react.useState)([]);
    const [hoveredParent, setHoveredParent] = (0, _react.useState)(undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(GanttTableContext.Provider, {
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
function useGanttTableContext() {
    const ctx = (0, _react.useContext)(GanttTableContext);
    if (ctx === undefined) {
        throw new Error('No GanttTableContext found. Did you forget a Provider?');
    }
    return ctx;
}
