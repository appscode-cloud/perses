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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ColumnsEditor", {
    enumerable: true,
    get: function() {
        return ColumnsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _components = require("@perses-dev/components");
const _ColumnEditorContainer = require("./ColumnEditorContainer");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function ColumnsEditor({ columnSettings, onChange }) {
    const [columnsCollapsed, setColumnsCollapsed] = (0, _react.useState)(columnSettings.map(()=>true));
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
    (0, _components.useDragAndDropMonitor)({
        elements: columnSettings,
        accessKey: 'name',
        onChange: onChange
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1,
        children: [
            columnSettings.map((column, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_ColumnEditorContainer.ColumnEditorContainer, {
                    column: column,
                    isCollapsed: columnsCollapsed[i] ?? true,
                    onChange: (updatedColumn)=>handleColumnChange(i, updatedColumn),
                    onDelete: ()=>handleColumnDelete(i),
                    onCollapse: (collapsed)=>handleColumnCollapseExpand(i, collapsed),
                    onMoveUp: ()=>onChange((0, _components.handleMoveUp)(column, columnSettings)),
                    onMoveDown: ()=>onChange((0, _components.handleMoveDown)(column, columnSettings))
                }, i)),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleColumnAdd,
                children: "Add Column Settings"
            })
        ]
    });
}
