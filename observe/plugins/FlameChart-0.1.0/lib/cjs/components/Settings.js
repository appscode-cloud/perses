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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Settings", {
    enumerable: true,
    get: function() {
        return Settings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _Refresh = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Refresh"));
const _Palette = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Palette"));
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _uitext = require("../utils/ui-text");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function Settings(props) {
    const { value, selectedId, onSelectedIdChange, onChangePalette, onDisplayChange } = props;
    const theme = (0, _material.useTheme)();
    const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
    const open = Boolean(anchorEl);
    const customButtonStyle = {
        fontSize: '12px',
        padding: '2px 6px',
        minWidth: 'auto'
    };
    const handleChangeColorShemeClick = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleByPackageNameClick = ()=>{
        onChangePalette('package-name');
        handleClose();
    };
    const handleByValueClick = ()=>{
        onChangePalette('value');
        handleClose();
    };
    const handleClose = ()=>{
        setAnchorEl(null);
    };
    const isTableSelected = ()=>selectedView === 'table';
    const isFlameGraphSelected = ()=>selectedView === 'flame-graph';
    const isBothSelected = ()=>selectedView === 'both';
    // Update selected view based on the value of showTable and showFlameGraph
    const selectedView = (0, _react.useMemo)(()=>{
        if (!value.showTable && !value.showFlameGraph) {
            return 'none';
        } else if (value.showTable && value.showFlameGraph) {
            return 'both';
        } else if (value.showTable) {
            return 'table';
        } else {
            return 'flame-graph';
        }
    }, [
        value.showTable,
        value.showFlameGraph
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: "10px",
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        children: [
            selectedId !== 0 && /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                description: _uitext.TOOLTIP_TEXT.resetFlameGraph,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ToolbarIconButton, {
                    "aria-label": _uitext.TOOLTIP_TEXT.resetFlameGraph,
                    onClick: ()=>onSelectedIdChange(0),
                    color: "primary",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Refresh.default, {
                        fontSize: "small"
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                        description: _uitext.TOOLTIP_TEXT.changeColorSheme,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ToolbarIconButton, {
                            id: "change-color-sheme-button",
                            "aria-label": _uitext.TOOLTIP_TEXT.changeColorSheme,
                            "aria-controls": open ? 'change-color-sheme-menu' : undefined,
                            "aria-haspopup": "true",
                            "aria-expanded": open ? 'true' : undefined,
                            onClick: handleChangeColorShemeClick,
                            color: "primary",
                            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Palette.default, {
                                fontSize: "small"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Menu, {
                        id: "change-color-sheme-menu",
                        slotProps: {
                            list: {
                                'aria-labelledby': 'change-color-sheme-button'
                            }
                        },
                        anchorEl: anchorEl,
                        open: open,
                        onClose: handleClose,
                        slots: {
                            transition: _material.Fade
                        },
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center'
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                        },
                        sx: {
                            mt: 1,
                            '& .MuiPaper-root': {
                                backgroundColor: theme.palette.background.paper,
                                padding: '0 5px'
                            },
                            '& .MuiMenuItem-root:hover': {
                                backgroundColor: theme.palette.action.hover
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                onClick: handleByPackageNameClick,
                                selected: value.palette === 'package-name',
                                children: "By package name"
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                onClick: handleByValueClick,
                                selected: value.palette === 'value',
                                children: "By value"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                sx: {
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    padding: '2px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                        description: _uitext.TOOLTIP_TEXT.showTable,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: isTableSelected() ? 'contained' : 'text',
                            color: "primary",
                            size: "small",
                            onClick: ()=>onDisplayChange('table'),
                            sx: customButtonStyle,
                            children: "Table"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                        description: _uitext.TOOLTIP_TEXT.showFlameGraph,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: isFlameGraphSelected() ? 'contained' : 'text',
                            color: "primary",
                            size: "small",
                            onClick: ()=>onDisplayChange('flame-graph'),
                            sx: customButtonStyle,
                            children: "Flame Graph"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.InfoTooltip, {
                        description: _uitext.TOOLTIP_TEXT.showBoth,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: isBothSelected() ? 'contained' : 'text',
                            color: "primary",
                            size: "small",
                            onClick: ()=>onDisplayChange('both'),
                            sx: customButtonStyle,
                            children: "Both"
                        })
                    })
                ]
            })
        ]
    });
}
