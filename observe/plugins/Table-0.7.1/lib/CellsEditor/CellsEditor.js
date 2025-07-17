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
import { Button, Divider, Stack, Typography, Grid2 as Grid } from '@mui/material';
import AddIcon from 'mdi-material-ui/Plus';
import { CellEditor } from './CellEditor';
export function CellsEditor({ cellSettings, onChange }) {
    function handleCellChange(index, cell) {
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells[index] = cell;
        onChange(updatedCells);
    }
    function handleAddCellEditor() {
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells.push({
            condition: {
                kind: 'Value',
                spec: {
                    value: ''
                }
            }
        });
        onChange(updatedCells);
    }
    function handleCellDelete(index) {
        const updatedCells = [
            ...cellSettings
        ];
        updatedCells.splice(index, 1);
        onChange(updatedCells);
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 1,
        children: [
            /*#__PURE__*/ _jsxs(Grid, {
                container: true,
                spacing: 2,
                children: [
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 5
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Condition"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 4
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Display Text"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Color"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "subtitle1",
                            children: "Background"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Grid, {
                        size: {
                            xs: 1
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Stack, {
                gap: 1.5,
                divider: /*#__PURE__*/ _jsx(Divider, {
                    flexItem: true,
                    orientation: "horizontal"
                }),
                children: cellSettings.map((cell, i)=>/*#__PURE__*/ _jsx(CellEditor, {
                        cell: cell,
                        onChange: (updatedCell)=>handleCellChange(i, updatedCell),
                        onDelete: ()=>handleCellDelete(i)
                    }, i))
            }),
            /*#__PURE__*/ _jsx(Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ _jsx(AddIcon, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleAddCellEditor,
                children: "Add Cell Settings"
            })
        ]
    });
}

//# sourceMappingURL=CellsEditor.js.map