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
Object.defineProperty(exports, "CellsEditor", {
    enumerable: true,
    get: function() {
        return CellsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _CellEditor = require("./CellEditor");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function CellsEditor({ cellSettings, onChange }) {
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 1,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Grid2, {
                container: true,
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 5
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Condition"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 4
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Display Text"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Color"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        },
                        textAlign: "center",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "subtitle1",
                            children: "Background"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Grid2, {
                        size: {
                            xs: 1
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                gap: 1.5,
                divider: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
                    flexItem: true,
                    orientation: "horizontal"
                }),
                children: cellSettings.map((cell, i)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_CellEditor.CellEditor, {
                        cell: cell,
                        onChange: (updatedCell)=>handleCellChange(i, updatedCell),
                        onDelete: ()=>handleCellDelete(i)
                    }, i))
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                variant: "contained",
                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
                sx: {
                    marginTop: 1
                },
                onClick: handleAddCellEditor,
                children: "Add Cell Settings"
            })
        ]
    });
}
