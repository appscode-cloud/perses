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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, styled } from '@mui/material';
import { formatDuration } from './utils';
/**
 * TicksHeader renders all tick labels in the header
 */ export function TicksHeader(props) {
    const { trace, viewport } = props;
    const duration = viewport.endTimeUnixMs - viewport.startTimeUnixMs;
    const startAt = viewport.startTimeUnixMs - trace.startTimeUnixMs;
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '0%',
                    borderWidth: 0
                },
                children: formatDuration(startAt + duration * 0)
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '25%'
                },
                children: formatDuration(startAt + duration * 0.25)
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '50%'
                },
                children: formatDuration(startAt + duration * 0.5)
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '75%'
                },
                children: formatDuration(startAt + duration * 0.75)
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '100%'
                },
                children: /*#__PURE__*/ _jsx("span", {
                    style: {
                        position: 'absolute',
                        right: '.75rem'
                    },
                    children: formatDuration(startAt + duration * 1)
                })
            })
        ]
    });
}
/**
 * Ticks renders all ticks in the span duration
 */ export function Ticks() {
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '25%'
                }
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '50%'
                }
            }),
            /*#__PURE__*/ _jsx(TickBox, {
                style: {
                    left: '75%'
                }
            })
        ]
    });
}
const TickBox = styled(Box)(({ theme })=>({
        position: 'absolute',
        height: '100%',
        borderLeft: `1px solid ${theme.palette.divider}`,
        padding: '.25rem'
    }));

//# sourceMappingURL=Ticks.js.map