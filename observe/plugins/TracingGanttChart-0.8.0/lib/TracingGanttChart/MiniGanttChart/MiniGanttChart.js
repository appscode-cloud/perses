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
import { Box, useTheme } from '@mui/material';
import { TicksHeader } from '../Ticks';
import { rowHeight } from '../utils';
import { Canvas } from './Canvas';
export function MiniGanttChart(props) {
    const { options, trace, viewport, setViewport } = props;
    const theme = useTheme();
    return /*#__PURE__*/ _jsxs(Box, {
        sx: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${theme.shape.borderRadius}px`
        },
        children: [
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    position: 'relative',
                    height: rowHeight,
                    borderBottom: `1px solid ${theme.palette.divider}`
                },
                children: /*#__PURE__*/ _jsx(TicksHeader, {
                    trace: trace,
                    viewport: {
                        startTimeUnixMs: trace.startTimeUnixMs,
                        endTimeUnixMs: trace.endTimeUnixMs
                    }
                })
            }),
            /*#__PURE__*/ _jsx(Canvas, {
                options: options,
                trace: trace,
                viewport: viewport,
                setViewport: setViewport
            })
        ]
    });
}

//# sourceMappingURL=MiniGanttChart.js.map