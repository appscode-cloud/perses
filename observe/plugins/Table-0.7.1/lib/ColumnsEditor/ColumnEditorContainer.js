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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import EyeIcon from 'mdi-material-ui/EyeOutline';
import EyeOffIcon from 'mdi-material-ui/EyeOffOutline';
import { DragAndDropElement, DragButton } from '@perses-dev/components';
import { ColumnEditor } from './ColumnEditor';
export function ColumnEditorContainer({ column, isCollapsed, onChange, onCollapse, onDelete, onMoveUp, onMoveDown }) {
    function handleHideColumn() {
        onChange({
            ...column,
            hide: !column.hide
        });
    }
    return /*#__PURE__*/ _jsxs(DragAndDropElement, {
        data: column,
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                alignItems: "center",
                borderBottom: 1,
                borderColor: (theme)=>theme.palette.divider,
                justifyContent: "space-between",
                gap: 4,
                children: [
                    /*#__PURE__*/ _jsxs(Stack, {
                        direction: "row",
                        gap: 1,
                        children: [
                            /*#__PURE__*/ _jsx(IconButton, {
                                "data-testid": `column-toggle#${column.name}`,
                                size: "small",
                                onClick: ()=>onCollapse(!isCollapsed),
                                children: isCollapsed ? /*#__PURE__*/ _jsx(ChevronRight, {}) : /*#__PURE__*/ _jsx(ChevronDown, {})
                            }),
                            /*#__PURE__*/ _jsxs(Typography, {
                                variant: "overline",
                                component: "h4",
                                sx: {
                                    textTransform: 'none'
                                },
                                children: [
                                    "COLUMN:",
                                    ' ',
                                    column.header ? /*#__PURE__*/ _jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ _jsx("strong", {
                                                children: column.header
                                            }),
                                            " (",
                                            column.name,
                                            ")"
                                        ]
                                    }) : /*#__PURE__*/ _jsx("strong", {
                                        children: column.name
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(Stack, {
                        direction: "row",
                        gap: 1,
                        children: [
                            isCollapsed && /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(Tooltip, {
                                        title: column.hide ? 'Show column' : 'Hide column',
                                        placement: "top",
                                        children: /*#__PURE__*/ _jsx(IconButton, {
                                            size: "small",
                                            sx: {
                                                marginLeft: 'auto'
                                            },
                                            onClick: handleHideColumn,
                                            children: column.hide ? /*#__PURE__*/ _jsx(EyeOffIcon, {}) : /*#__PURE__*/ _jsx(EyeIcon, {})
                                        }, "hide-column")
                                    }),
                                    /*#__PURE__*/ _jsx(Divider, {
                                        flexItem: true,
                                        orientation: "vertical",
                                        variant: "middle"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx(Tooltip, {
                                title: "Remove column settings",
                                placement: "top",
                                children: /*#__PURE__*/ _jsx(IconButton, {
                                    size: "small",
                                    sx: {
                                        marginLeft: 'auto'
                                    },
                                    onClick: onDelete,
                                    children: /*#__PURE__*/ _jsx(DeleteIcon, {})
                                }, "delete-column-button")
                            }),
                            /*#__PURE__*/ _jsx(Tooltip, {
                                title: "Reorder column settings",
                                placement: "top",
                                children: /*#__PURE__*/ _jsx(DragButton, {
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
            !isCollapsed && /*#__PURE__*/ _jsx("div", {
                children: /*#__PURE__*/ _jsx(ColumnEditor, {
                    column: column,
                    onChange: onChange
                })
            })
        ]
    });
}

//# sourceMappingURL=ColumnEditorContainer.js.map