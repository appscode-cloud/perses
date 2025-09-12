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
Object.defineProperty(exports, "TraceDetails", {
    enumerable: true,
    get: function() {
        return TraceDetails;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _utils = require("./utils");
const DATE_FORMAT_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
    timeZoneName: 'short'
};
function TraceDetails(props) {
    const { trace } = props;
    const { dateFormatOptionsWithUserTimeZone } = (0, _components.useTimeZone)();
    const dateFormatOptions = dateFormatOptionsWithUserTimeZone(DATE_FORMAT_OPTIONS);
    const dateFormatter = new Intl.DateTimeFormat(undefined, dateFormatOptions);
    const rootSpan = trace.rootSpans[0];
    if (!rootSpan) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
            children: "Trace contains no spans."
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        sx: {
            justifyContent: 'space-between'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                variant: "h3",
                children: [
                    rootSpan.resource.serviceName,
                    ": ",
                    rootSpan.name,
                    " (",
                    (0, _utils.formatDuration)(trace.endTimeUnixMs - trace.startTimeUnixMs),
                    ")"
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                variant: "h4",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                        component: "span",
                        sx: {
                            px: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                                children: "Start:"
                            }),
                            " ",
                            dateFormatter.format(trace.startTimeUnixMs)
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                        component: "span",
                        sx: {
                            px: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                                children: "Trace ID:"
                            }),
                            " ",
                            rootSpan.traceId
                        ]
                    })
                ]
            })
        ]
    });
}
