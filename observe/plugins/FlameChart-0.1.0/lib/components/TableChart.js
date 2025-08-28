// Copyright 2025 The Perses Authors
// Licensed under the Apache License |  Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing |  software
// distributed under the License is distributed on an "AS IS" BASIS |
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND |  either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Stack, useTheme, Link } from '@mui/material';
import { Table } from '@perses-dev/components';
import { tableRecursionJson } from '../utils/data-transform';
import { formatItemValue } from '../utils/format';
import { SearchBar } from './SearchBar';
const LARGE_PANEL_TRESHOLD = 600; // heigth treshold to switch to large panel mode
const PADDING_TOP = 8;
const SCROLL_BAR_WIDTH = 15;
const SEARCH_BAR_HEIGHT = 50;
export function TableChart(props) {
    const { width, height, data, searchValue, onSearchValueChange, onSelectedIdChange } = props;
    const theme = useTheme();
    const availableHeight = height;
    const availableWidth = width - 10;
    const tableData = useMemo(()=>{
        return tableRecursionJson(data.profile.stackTrace, searchValue);
    }, [
        data,
        searchValue
    ]);
    const columns = useMemo(()=>{
        const unit = data.metadata?.units || '';
        const columnSettings = [
            {
                accessorKey: 'name',
                header: 'Name',
                headerDescription: 'Function name',
                align: 'left',
                enableSorting: true,
                width: 0.5 * availableWidth,
                cell: (ctx)=>{
                    const cellValue = ctx.getValue();
                    return /*#__PURE__*/ _jsx(Link, {
                        href: "#",
                        underline: "hover",
                        onClick: (e)=>{
                            e.preventDefault();
                            const currentSample = ctx.row.original;
                            onSelectedIdChange(currentSample.id); // focus on this item in the flame graph
                            onSearchValueChange(currentSample.name);
                        },
                        children: cellValue
                    });
                },
                cellDescription: ()=>''
            },
            {
                accessorKey: 'self',
                header: 'Self',
                headerDescription: 'Function self samples',
                align: 'right',
                enableSorting: true,
                width: 0.25 * availableWidth - SCROLL_BAR_WIDTH,
                cell: (ctx)=>{
                    const cellValue = ctx.getValue();
                    return formatItemValue(unit, cellValue);
                }
            },
            {
                accessorKey: 'total',
                header: 'Total',
                headerDescription: 'Function total samples',
                align: 'right',
                enableSorting: true,
                width: 0.25 * availableWidth,
                cell: (ctx)=>{
                    const cellValue = ctx.getValue();
                    return formatItemValue(unit, cellValue);
                }
            }
        ];
        return columnSettings;
    }, [
        data.metadata?.units,
        availableWidth,
        onSearchValueChange,
        onSelectedIdChange
    ]);
    const [sorting, setSorting] = useState([
        {
            id: 'total',
            desc: true
        }
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        width: availableWidth,
        height: availableHeight,
        gap: 1,
        sx: {
            '& .MuiTable-root': {
                borderCollapse: 'collapse'
            },
            '& .MuiTableCell-root': {
                borderBottom: `1px solid ${theme.palette.divider}`,
                borderRight: `1px solid ${theme.palette.divider}`,
                '&:last-child': {
                    borderRight: 'none'
                }
            }
        },
        children: [
            /*#__PURE__*/ _jsx(SearchBar, {
                searchValue: searchValue,
                onSearchValueChange: onSearchValueChange
            }),
            /*#__PURE__*/ _jsx(Table, {
                data: tableData,
                columns: columns,
                height: availableHeight - PADDING_TOP - SEARCH_BAR_HEIGHT,
                width: availableWidth,
                density: availableHeight < LARGE_PANEL_TRESHOLD ? 'compact' : 'standard',
                defaultColumnWidth: "auto",
                defaultColumnHeight: "auto",
                sorting: sorting,
                onSortingChange: setSorting
            })
        ]
    });
}

//# sourceMappingURL=TableChart.js.map