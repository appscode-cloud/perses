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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { LogRow } from './LogRow/LogRow';
export const VirtualizedLogsList = ({ logs, expandedRows, onToggleExpand })=>{
    const theme = useTheme();
    const renderLogRow = (index)=>{
        const log = logs[index];
        if (!log) return null;
        return /*#__PURE__*/ _jsx(LogRow, {
            log: log,
            index: index,
            isExpanded: expandedRows.has(index),
            onToggle: onToggleExpand
        });
    };
    return /*#__PURE__*/ _jsx(Box, {
        sx: {
            height: '100%',
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden',
            boxShadow: theme.shadows[1]
        },
        children: /*#__PURE__*/ _jsx(Virtuoso, {
            style: {
                height: '100%'
            },
            totalCount: logs.length,
            itemContent: renderLogRow
        })
    });
};

//# sourceMappingURL=VirtualizedLogsList.js.map