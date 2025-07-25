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
import { useChartsTheme } from '@perses-dev/components';
import { formatDuration, getSpanColor, minSpanWidthPx } from '../utils';
import { Ticks } from '../Ticks';
/**
 * SpanDuration renders the right column of a SpanRow, i.e. the span bar and span duration
 */ export function SpanDuration(props) {
    const { options, span, viewport } = props;
    const muiTheme = useTheme();
    const chartsTheme = useChartsTheme();
    const spanDuration = span.endTimeUnixMs - span.startTimeUnixMs;
    const viewportDuration = viewport.endTimeUnixMs - viewport.startTimeUnixMs;
    const relativeDuration = spanDuration / viewportDuration;
    const relativeStart = (span.startTimeUnixMs - viewport.startTimeUnixMs) / viewportDuration;
    return /*#__PURE__*/ _jsxs(Box, {
        sx: {
            position: 'relative',
            height: '100%',
            flexGrow: 1,
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ _jsx(Ticks, {}),
            /*#__PURE__*/ _jsx(Box, {
                "data-testid": "span-duration-bar",
                sx: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    margin: 'auto',
                    minWidth: `${minSpanWidthPx}px`,
                    height: '8px',
                    borderRadius: muiTheme.shape.borderRadius
                },
                style: {
                    left: `${relativeStart * 100}%`,
                    width: `${relativeDuration * 100}%`,
                    backgroundColor: getSpanColor(muiTheme, chartsTheme, options.visual?.palette?.mode, span)
                }
            }),
            /*#__PURE__*/ _jsx(Box, {
                sx: {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '0 8px',
                    color: muiTheme.palette.grey[700],
                    fontSize: '.7rem'
                },
                style: /* print span duration on right side of the span bar, if there is space */ relativeStart + relativeDuration < 0.95 ? {
                    left: `${(relativeStart + relativeDuration) * 100}%`
                } : {
                    left: `${relativeStart * 100}%`,
                    transform: 'translateY(-50%) translateX(-100%)'
                },
                children: formatDuration(spanDuration)
            })
        ]
    });
}

//# sourceMappingURL=SpanDuration.js.map