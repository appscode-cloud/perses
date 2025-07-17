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
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import AddIcon from 'mdi-material-ui/Plus';
import { handleMoveDown, handleMoveUp, useDragAndDropMonitor } from '@perses-dev/components';
import { ColumnEditorContainer } from './ColumnEditorContainer';
export function ColumnsEditor({ columnSettings, onChange }) {
    const [columnsCollapsed, setColumnsCollapsed] = useState(columnSettings.map(()=>true));
    function handleColumnChange(index, column) {
        const updatedColumns = [
            ...columnSettings
        ];
        updatedColumns[index] = column;
        onChange(updatedColumns);
    }
    function handleColumnAdd() {
        const columnName = `column_${Object.keys(columnSettings).length}`;
        const updatedColumns = [
            ...columnSettings
        ];
        updatedColumns.push({
            name: columnName
        });
        onChange(updatedColumns);
        setColumnsCollapsed((prev)=>{
            prev.push(false);
            return [
                ...prev
            ];
        });
    }
    function handleColumnDelete(index) {
        const updatedColumns = [
            ...columnSettings
        ];
        updatedColumns.splice(index, 1);
        onChange(updatedColumns);
        setColumnsCollapsed((prev)=>{
            prev.splice(index, 1);
            return [
                ...prev
            ];
        });
    }
    function handleColumnCollapseExpand(index, collapsed) {
        setColumnsCollapsed((prev)=>{
            prev[index] = collapsed;
            return [
                ...prev
            ];
        });
    }
    useDragAndDropMonitor({
        elements: columnSettings,
        accessKey: 'name',
        onChange: onChange
    });
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 1,
        children: [
            columnSettings.map((column, i)=>/*#__PURE__*/ _jsx(ColumnEditorContainer, {
                    column: column,
                    isCollapsed: columnsCollapsed[i] ?? true,
                    onChange: (updatedColumn)=>handleColumnChange(i, updatedColumn),
                    onDelete: ()=>handleColumnDelete(i),
                    onCollapse: (collapsed)=>handleColumnCollapseExpand(i, collapsed),
                    onMoveUp: ()=>onChange(handleMoveUp(column, columnSettings)),
                    onMoveDown: ()=>onChange(handleMoveDown(column, columnSettings))
                }, i)),
            /*#__PURE__*/ _jsx(Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ _jsx(AddIcon, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleColumnAdd,
                children: "Add Column Settings"
            })
        ]
    });
}

//# sourceMappingURL=ColumnsEditor.js.map