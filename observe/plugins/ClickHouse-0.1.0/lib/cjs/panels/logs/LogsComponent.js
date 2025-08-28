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
Object.defineProperty(exports, "LogsComponent", {
    enumerable: true,
    get: function() {
        return LogsComponent;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _LogsList = /*#__PURE__*/ _interop_require_default(require("./components/LogsList"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function LogsComponent(props) {
    const { queryResults, spec } = props;
    if (queryResults[0]?.data.logs === undefined) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            variant: "h3",
            sx: {
                textAlign: 'center',
                marginTop: 4
            },
            children: "No logs to display"
        });
    }
    const logs = queryResults[0]?.data.logs.entries;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_LogsList.default, {
        logs: logs
    });
}
