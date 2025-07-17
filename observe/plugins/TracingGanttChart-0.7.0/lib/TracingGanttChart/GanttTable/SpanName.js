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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Stack } from '@mui/material';
import AlertIcon from 'mdi-material-ui/AlertCircleOutline';
import { spanHasError } from '../utils';
import { SpanIndents } from './SpanIndents';
/**
 * SpanName renders the entire left column of a SpanRow, i.e. the hierarchy and the service and span name
 */ export function SpanName(props) {
    const { span, nameColumnWidth } = props;
    return /*#__PURE__*/ _jsxs(Stack, {
        direction: "row",
        sx: {
            alignItems: 'center'
        },
        style: {
            width: `${nameColumnWidth * 100}%`
        },
        children: [
            /*#__PURE__*/ _jsx(SpanIndents, {
                span: span
            }),
            spanHasError(span) && /*#__PURE__*/ _jsx(AlertIcon, {
                titleAccess: "error",
                color: "error",
                sx: {
                    marginRight: '5px'
                }
            }),
            /*#__PURE__*/ _jsxs(Box, {
                sx: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ _jsxs("strong", {
                        children: [
                            span.resource.serviceName,
                            ":"
                        ]
                    }),
                    " ",
                    span.name
                ]
            })
        ]
    });
}

//# sourceMappingURL=SpanName.js.map