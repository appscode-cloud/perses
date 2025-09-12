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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Typography } from '@mui/material';
import { useTimeZone } from '@perses-dev/components';
import { formatDuration } from './utils';
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
export function TraceDetails(props) {
    const { trace } = props;
    const { dateFormatOptionsWithUserTimeZone } = useTimeZone();
    const dateFormatOptions = dateFormatOptionsWithUserTimeZone(DATE_FORMAT_OPTIONS);
    const dateFormatter = new Intl.DateTimeFormat(undefined, dateFormatOptions);
    const rootSpan = trace.rootSpans[0];
    if (!rootSpan) {
        return /*#__PURE__*/ _jsx(Typography, {
            children: "Trace contains no spans."
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        direction: "row",
        sx: {
            justifyContent: 'space-between'
        },
        children: [
            /*#__PURE__*/ _jsxs(Typography, {
                variant: "h3",
                children: [
                    rootSpan.resource.serviceName,
                    ": ",
                    rootSpan.name,
                    " (",
                    formatDuration(trace.endTimeUnixMs - trace.startTimeUnixMs),
                    ")"
                ]
            }),
            /*#__PURE__*/ _jsxs(Typography, {
                variant: "h4",
                children: [
                    /*#__PURE__*/ _jsxs(Typography, {
                        component: "span",
                        sx: {
                            px: 1
                        },
                        children: [
                            /*#__PURE__*/ _jsx("strong", {
                                children: "Start:"
                            }),
                            " ",
                            dateFormatter.format(trace.startTimeUnixMs)
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(Typography, {
                        component: "span",
                        sx: {
                            px: 1
                        },
                        children: [
                            /*#__PURE__*/ _jsx("strong", {
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

//# sourceMappingURL=TraceDetails.js.map