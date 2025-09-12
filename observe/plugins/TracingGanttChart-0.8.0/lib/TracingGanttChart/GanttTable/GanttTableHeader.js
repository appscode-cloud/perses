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
import { Box, Stack, useTheme } from '@mui/material';
import { rowHeight } from '../utils';
import { TicksHeader } from '../Ticks';
export function GanttTableHeader(props) {
    const { trace, viewport, nameColumnWidth, divider } = props;
    const theme = useTheme();
    return /*#__PURE__*/ _jsxs(Stack, {
        direction: "row",
        alignItems: "center",
        sx: {
            height: rowHeight,
            fontSize: '0.9rem',
            borderBottom: `1px solid ${theme.palette.divider}`
        },
        children: [
            /*#__PURE__*/ _jsx(Box, {
                style: {
                    width: `${nameColumnWidth * 100}%`
                },
                children: /*#__PURE__*/ _jsx("span", {
                    style: {
                        padding: '.25rem'
                    },
                    children: "Service & Operation"
                })
            }),
            divider,
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    position: 'relative',
                    height: '100%',
                    flexGrow: 1
                },
                children: /*#__PURE__*/ _jsx(TicksHeader, {
                    trace: trace,
                    viewport: viewport
                })
            })
        ]
    });
}

//# sourceMappingURL=GanttTableHeader.js.map