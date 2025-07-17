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
import { Stack, styled, useTheme } from '@mui/material';
import { memo } from 'react';
import { rowHeight } from '../utils';
import { SpanName } from './SpanName';
import { SpanDuration } from './SpanDuration';
export const GanttTableRow = /*#__PURE__*/ memo(function GanttTableRow(props) {
    const { options, span, viewport, selected, nameColumnWidth, divider, onClick } = props;
    const theme = useTheme();
    const handleOnClick = ()=>{
        // ignore event if triggered by selecting text
        if (document.getSelection()?.type === 'Range') return;
        onClick(span);
    };
    return /*#__PURE__*/ _jsxs(RowContainer, {
        sx: {
            backgroundColor: selected ? theme.palette.action.selected : 'inherit'
        },
        direction: "row",
        onClick: handleOnClick,
        children: [
            /*#__PURE__*/ _jsx(SpanName, {
                span: span,
                nameColumnWidth: nameColumnWidth
            }),
            divider,
            /*#__PURE__*/ _jsx(SpanDuration, {
                options: options,
                span: span,
                viewport: viewport
            })
        ]
    });
});
const RowContainer = styled(Stack)(({ theme })=>({
        height: rowHeight,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    }));

//# sourceMappingURL=GanttTableRow.js.map