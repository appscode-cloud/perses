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
Object.defineProperty(exports, "FlameChart", {
    enumerable: true,
    get: function() {
        return FlameChart;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _react = require("react");
const _components = require("@perses-dev/components");
const _Refresh = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Refresh"));
const _EyeOutline = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/EyeOutline"));
const _ContentCopy = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/ContentCopy"));
const _datatransform = require("../utils/data-transform");
const _tooltip = require("../utils/tooltip");
const _CustomBreadcrumb = require("./CustomBreadcrumb");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ITEM_GAP = 2; // vertical gap between flame chart items
const Y_MIN_SMALL = 6; // min value of y axis for small containers
const Y_MIN_LARGE = 20; // min value of y axis for large containers
const LARGE_CONTAINER_THRESHOLD = 600;
const CONTAINER_PADDING = 10;
const BREADCRUMB_SPACE = 50;
function FlameChart(props) {
    const { width, height, data, palette, selectedId, searchValue, onSelectedIdChange } = props;
    const theme = (0, _material.useTheme)();
    const chartsTheme = (0, _components.useChartsTheme)();
    const [menuPosition, setMenuPosition] = (0, _react.useState)(null);
    const [selectedItem, setSelectedItem] = (0, _react.useState)({
        id: 0,
        name: ''
    });
    const [isCopied, setIsCopied] = (0, _react.useState)(false);
    const seriesData = (0, _react.useMemo)(()=>(0, _datatransform.recursionJson)(palette, data.metadata, data.profile.stackTrace, searchValue, selectedId), [
        palette,
        data.metadata,
        data.profile.stackTrace,
        selectedId,
        searchValue
    ]);
    const handleItemClick = (params)=>{
        const data = params.data;
        const functionName = data.value[6];
        const functionId = data.name;
        setSelectedItem({
            id: functionId,
            name: functionName
        });
        // To ensure that the cursor is positioned inside the menu when it opens,
        // we adjust the click event coordinates as follows:
        if ('event' in params) {
            const mouseEvent = params.event;
            setMenuPosition({
                mouseX: mouseEvent.event.clientX - 2,
                mouseY: mouseEvent.event.clientY - 4
            });
        }
    };
    const handleFocusBlock = ()=>{
        onSelectedIdChange(selectedItem.id);
        handleClose();
    };
    const handleCopyFunctionName = ()=>{
        if ((selectedId || selectedId === 0) && selectedItem.name) {
            navigator.clipboard.writeText(selectedItem.name);
        }
        setIsCopied(true);
    };
    const handleResetGraph = ()=>{
        if (selectedId) {
            onSelectedIdChange(0);
        }
        handleClose();
    };
    const handleClose = ()=>{
        setMenuPosition(null);
        if (isCopied) setIsCopied(false);
    };
    const renderItem = (params, api)=>{
        const level = api.value(0);
        const start = api.coord([
            api.value(1),
            level
        ]);
        const end = api.coord([
            api.value(2),
            level
        ]);
        const height = (api.size && api.size([
            0,
            1
        ]) || [
            0,
            20
        ])[1];
        const width = (end?.[0] ?? 0) - (start?.[0] ?? 0);
        return {
            type: 'rect',
            transition: [
                'shape'
            ],
            shape: {
                x: start?.[0],
                y: (start?.[1] ?? 0) - (height ?? 0) / 2,
                width,
                height: (height ?? ITEM_GAP) - ITEM_GAP,
                r: 0
            },
            style: {
                fill: api.visual('color')
            },
            emphasis: {
                style: {
                    stroke: '#000'
                }
            },
            textConfig: {
                position: 'insideLeft'
            },
            textContent: {
                style: {
                    text: api.value(3),
                    fill: '#000',
                    width: width - 4,
                    overflow: 'truncate',
                    ellipsis: '..',
                    truncateMinChar: 1
                },
                emphasis: {
                    style: {
                        stroke: '#000',
                        lineWidth: 0.5
                    }
                }
            }
        };
    };
    const option = (0, _react.useMemo)(()=>{
        if (data.profile.stackTrace === undefined) return chartsTheme.noDataOption;
        const maxDepth = Math.max(...seriesData.map((s)=>s.value[0])); // maximum depth of the stack trace
        const yAxisMax = Math.max(height > LARGE_CONTAINER_THRESHOLD ? Y_MIN_LARGE : Y_MIN_SMALL, maxDepth);
        const totalStart = seriesData[0]?.value[1]; // start value of the total function
        const totalEnd = seriesData[0]?.value[2]; // end value of the total function
        const xAxisMin = totalStart;
        const xAxisMax = totalEnd;
        // compute flame chart padding top and bottom
        const padding = (height / (yAxisMax - 1) - ITEM_GAP) / 2 + 1;
        const option = {
            tooltip: {
                appendToBody: true,
                confine: true,
                formatter: (params)=>(0, _tooltip.generateTooltip)(params, data.metadata?.units),
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.background.paper,
                textStyle: {
                    color: theme.palette.text.primary
                }
            },
            xAxis: {
                show: false,
                min: xAxisMin,
                max: xAxisMax,
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                show: false,
                max: yAxisMax,
                inverse: true,
                axisLabel: {
                    show: false
                }
            },
            axisLabel: {
                overflow: 'truncate',
                width: width / 3
            },
            grid: {
                left: 5,
                right: 5,
                top: padding + 5,
                bottom: padding
            },
            series: [
                {
                    type: 'custom',
                    renderItem,
                    encode: {
                        x: [
                            0,
                            1,
                            2
                        ],
                        y: 0
                    },
                    data: seriesData
                }
            ]
        };
        return option;
    }, [
        data,
        chartsTheme,
        theme,
        width,
        seriesData,
        height
    ]);
    // Use useMemo to memoize the flame chart component and prevent unnecessary re-renders.
    // This ensures the chart does not re-render when the onClick event updates state variables
    // like menuPosition or selectedId.
    const flameChart = (0, _react.useMemo)(()=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_components.EChart, {
            sx: {
                width: width,
                height: height - 2 * CONTAINER_PADDING - BREADCRUMB_SPACE
            },
            option: option,
            theme: chartsTheme.echartsTheme,
            onEvents: {
                click: handleItemClick
            }
        }), [
        chartsTheme.echartsTheme,
        height,
        option,
        width
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        style: {
            width: width,
            height: height
        },
        alignItems: "center",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomBreadcrumb.CustomBreadcrumb, {
                totalValue: seriesData[0]?.value[3] || '',
                totalSample: seriesData[0]?.value[8] || 0,
                otherItemSample: (0, _datatransform.findTotalSampleByName)(seriesData, selectedId),
                onSelectedIdChange: onSelectedIdChange
            }),
            flameChart,
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Menu, {
                sx: {
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        padding: '5px',
                        paddingBottom: '0px'
                    },
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover
                        }
                    }
                },
                open: menuPosition !== null,
                onClose: handleClose,
                anchorReference: "anchorPosition",
                anchorPosition: menuPosition !== null ? {
                    top: menuPosition.mouseY,
                    left: menuPosition.mouseX
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Box, {
                        sx: {
                            paddingLeft: '16px',
                            paddingBottom: '8px'
                        },
                        children: selectedItem.name
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
                        sx: {
                            backgroundColor: theme.palette.divider
                        }
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                        onClick: handleFocusBlock,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_EyeOutline.default, {
                                fontSize: "small",
                                color: "secondary",
                                sx: {
                                    marginRight: '10px'
                                }
                            }),
                            "Focus block"
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                        onClick: handleCopyFunctionName,
                        disabled: isCopied,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_ContentCopy.default, {
                                fontSize: "small",
                                color: "secondary",
                                sx: {
                                    marginRight: '10px'
                                }
                            }),
                            isCopied ? 'Copied' : 'Copy function name'
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.MenuItem, {
                        onClick: handleResetGraph,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Refresh.default, {
                                fontSize: "small",
                                color: "secondary",
                                sx: {
                                    marginRight: '10px'
                                }
                            }),
                            "Reset graph"
                        ]
                    })
                ]
            })
        ]
    });
}
