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
Object.defineProperty(exports, "ColumnEditorContainer", {
    enumerable: true,
    get: function() {
        return ColumnEditorContainer;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _ChevronRight = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronRight"));
const _ChevronDown = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ChevronDown"));
const _DeleteOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/DeleteOutline"));
const _EyeOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/EyeOutline"));
const _EyeOffOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/EyeOffOutline"));
const _components = require("@perses-dev/components");
const _ColumnEditor = require("./ColumnEditor");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function ColumnEditorContainer({ column, isCollapsed, onChange, onCollapse, onDelete, onMoveUp, onMoveDown }) {
    function handleHideColumn() {
        onChange({
            ...column,
            hide: !column.hide
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.DragAndDropElement, {
        data: column,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                alignItems: "center",
                borderBottom: 1,
                borderColor: (theme)=>theme.palette.divider,
                justifyContent: "space-between",
                gap: 4,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        direction: "row",
                        gap: 1,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                "data-testid": `column-toggle#${column.name}`,
                                size: "small",
                                onClick: ()=>onCollapse(!isCollapsed),
                                children: isCollapsed ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronRight.default, {}) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_ChevronDown.default, {})
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                variant: "overline",
                                component: "h4",
                                sx: {
                                    textTransform: 'none'
                                },
                                children: [
                                    "COLUMN:",
                                    ' ',
                                    column.header ? /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                                                children: column.header
                                            }),
                                            " (",
                                            column.name,
                                            ")"
                                        ]
                                    }) : /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                                        children: column.name
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        direction: "row",
                        gap: 1,
                        children: [
                            isCollapsed && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                                        title: column.hide ? 'Show column' : 'Hide column',
                                        placement: "top",
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                            size: "small",
                                            sx: {
                                                marginLeft: 'auto'
                                            },
                                            onClick: handleHideColumn,
                                            children: column.hide ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_EyeOffOutline.default, {}) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_EyeOutline.default, {})
                                        }, "hide-column")
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
                                        flexItem: true,
                                        orientation: "vertical",
                                        variant: "middle"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                                title: "Remove column settings",
                                placement: "top",
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                    size: "small",
                                    sx: {
                                        marginLeft: 'auto'
                                    },
                                    onClick: onDelete,
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_DeleteOutline.default, {})
                                }, "delete-column-button")
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Tooltip, {
                                title: "Reorder column settings",
                                placement: "top",
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.DragButton, {
                                    onMoveUp: onMoveUp,
                                    onMoveDown: onMoveDown,
                                    menuSx: {
                                        '.MuiPaper-root': {
                                            backgroundColor: (theme)=>theme.palette.background.lighter
                                        }
                                    }
                                }, "reorder-column-button")
                            })
                        ]
                    })
                ]
            }),
            !isCollapsed && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ColumnEditor.ColumnEditor, {
                    column: column,
                    onChange: onChange
                })
            })
        ]
    });
}
