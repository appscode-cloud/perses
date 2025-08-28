// Copyright 2025 The Perses Authors
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
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _EmptyLogsState = require("./EmptyLogsState");
const _useExpandedRows = require("./hooks/useExpandedRows");
const _VirtualizedLogsList = require("./VirtualizedLogsList");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const LogsList = ({ logs })=>{
    const { expandedRows, toggleExpand } = (0, _useExpandedRows.useExpandedRows)();
    if (!logs.length) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_EmptyLogsState.EmptyLogsState, {});
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_VirtualizedLogsList.VirtualizedLogsList, {
        logs: logs,
        expandedRows: expandedRows,
        onToggleExpand: toggleExpand
    });
};
const _default = LogsList;
