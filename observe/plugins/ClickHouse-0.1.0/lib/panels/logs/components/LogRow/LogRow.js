// Copyright 2025 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
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
import React, { memo, useCallback } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import { LogTimestamp } from './LogTimestamp';
import { LogRowContainer, LogRowContent, ExpandButton, LogText } from './LogsStyles';
import { LogDetailsTable } from './LogDetailsTable';
export const LogRow = /*#__PURE__*/ memo(({ log, isExpanded, index, onToggle, isExpandable = true, time = false, wrap = false })=>{
    const theme = useTheme();
    const severityColor = theme.palette.text.secondary;
    const handleToggle = useCallback(()=>{
        if (isExpandable) {
            onToggle(index);
        }
    }, [
        isExpandable,
        onToggle,
        index
    ]);
    if (!log) return null;
    return /*#__PURE__*/ _jsxs(LogRowContainer, {
        severityColor: severityColor,
        children: [
            /*#__PURE__*/ _jsxs(LogRowContent, {
                onClick: handleToggle,
                isExpandable: isExpandable,
                time: time,
                children: [
                    isExpandable && /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            display: 'flex',
                            alignItems: 'center',
                            width: '16px',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ _jsx(ExpandButton, {
                            size: "small",
                            isExpanded: isExpanded,
                            children: /*#__PURE__*/ _jsx(ChevronRight, {
                                sx: {
                                    fontSize: '12px'
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ _jsx(LogTimestamp, {
                        timestamp: log?.timestamp
                    }),
                    /*#__PURE__*/ _jsx(Box, {
                        sx: {
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '36px'
                        },
                        children: /*#__PURE__*/ _jsx(LogText, {
                            variant: "body2",
                            wrap: wrap,
                            children: log?.line
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Collapse, {
                in: isExpanded,
                timeout: 200,
                children: /*#__PURE__*/ _jsx(Box, {
                    sx: {
                        padding: '8px'
                    },
                    children: /*#__PURE__*/ _jsxs(Box, {
                        sx: {
                            display: 'grid',
                            gridTemplateColumns: !time ? '1fr' : '8px minmax(160px, max-content) 1fr',
                            gap: '12px'
                        },
                        children: [
                            time && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(Box, {}),
                                    /*#__PURE__*/ _jsx(Box, {})
                                ]
                            }),
                            /*#__PURE__*/ _jsx(Box, {
                                children: /*#__PURE__*/ _jsx(LogDetailsTable, {
                                    log: log.labels
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
});
LogRow.displayName = 'LogRow';

//# sourceMappingURL=LogRow.js.map