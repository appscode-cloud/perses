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
import React from 'react';
import { Table, TableBody, TableRow, TableCell, useTheme, alpha } from '@mui/material';
export const LogDetailsTable = ({ log })=>{
    const theme = useTheme();
    return /*#__PURE__*/ _jsx(Table, {
        size: "small",
        sx: {
            border: `1px solid ${theme.palette.divider}`,
            '& .MuiTableCell-root': {
                border: 'none',
                padding: '6px 8px',
                fontSize: '12px'
            }
        },
        children: /*#__PURE__*/ _jsx(TableBody, {
            children: Object.entries(log).map(([key, value])=>/*#__PURE__*/ _jsxs(TableRow, {
                    sx: {
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.action.hover, 0.04)
                        }
                    },
                    children: [
                        /*#__PURE__*/ _jsx(TableCell, {
                            sx: {
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                width: '33%'
                            },
                            children: key
                        }),
                        /*#__PURE__*/ _jsx(TableCell, {
                            sx: {
                                color: theme.palette.text.primary,
                                wordBreak: 'break-word',
                                width: '67%'
                            },
                            children: value !== undefined && value !== null && value !== '' ? value : '--'
                        })
                    ]
                }, key))
        })
    });
};

//# sourceMappingURL=LogDetailsTable.js.map