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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LabelValuesRow: function() {
        return LabelValuesRow;
    },
    LabelValuesTable: function() {
        return LabelValuesTable;
    },
    OverviewTab: function() {
        return OverviewTab;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _Check = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Check"));
const _Close = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Close"));
const _components = require("@perses-dev/components");
const _FilterInputs = require("../../filter/FilterInputs");
const _utils = require("../../utils");
const _MetricChip = require("../../display/MetricChip");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function LabelValuesRow({ label, valueCounters, onFilterAdd, ...props }) {
    const [isAddingFilter, setIsAddingFilter] = (0, _react.useState)(false);
    const [operator, setOperator] = (0, _react.useState)('=');
    const [value, setValue] = (0, _react.useState)('');
    const [showAllValues, setShowAllValues] = (0, _react.useState)(false);
    const isMobileSize = (0, _material.useMediaQuery)((0, _material.useTheme)().breakpoints.down('md'));
    const displayedValueCounters = (0, _react.useMemo)(()=>{
        if (showAllValues) {
            return valueCounters;
        }
        return valueCounters.slice(0, 5);
    }, [
        showAllValues,
        valueCounters
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        sx: {
            width: '100%'
        },
        direction: isMobileSize ? 'column' : 'row',
        alignItems: "center",
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                sx: {
                    width: '100%',
                    height: '100%'
                },
                justifyContent: "space-between",
                alignContent: "center",
                direction: isMobileSize ? 'column' : 'row',
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                        sx: {
                            fontFamily: 'monospace'
                        },
                        pl: isMobileSize ? 0 : 1,
                        children: label
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        direction: "row",
                        gap: 1,
                        alignItems: "center",
                        children: isAddingFilter ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                            children: [
                                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Select, {
                                    size: "small",
                                    value: operator,
                                    variant: "outlined",
                                    onChange: (event)=>{
                                        setOperator(event.target.value);
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                            value: "=",
                                            children: "="
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                            value: "!=",
                                            children: "!="
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                            value: "=~",
                                            children: "=~"
                                        }),
                                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                                            value: "!~",
                                            children: "!~"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
                                    freeSolo: true,
                                    limitTags: 1,
                                    disableClearable: true,
                                    options: valueCounters.map((counters)=>counters.labelValue),
                                    value: value,
                                    ListboxComponent: _FilterInputs.ListboxComponent,
                                    sx: {
                                        width: 250
                                    },
                                    renderInput: (params)=>{
                                        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                            ...params,
                                            label: "Value",
                                            variant: "outlined",
                                            fullWidth: true,
                                            size: "small"
                                        });
                                    },
                                    onInputChange: (_, newValue)=>{
                                        setValue(newValue);
                                    }
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                    "aria-label": "confirm",
                                    onClick: ()=>{
                                        onFilterAdd({
                                            label,
                                            labelValues: [
                                                value
                                            ],
                                            operator
                                        });
                                        setIsAddingFilter(false);
                                    },
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Check.default, {})
                                }),
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                    "aria-label": "cancel",
                                    onClick: ()=>{
                                        setIsAddingFilter(false);
                                    },
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Close.default, {})
                                })
                            ]
                        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
                            "aria-label": "add filter",
                            onClick: ()=>setIsAddingFilter(true),
                            children: "Add filter"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                sx: {
                    width: '100%'
                },
                gap: 0.5,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        direction: "row",
                        gap: 2,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                            variant: "subtitle1",
                            children: [
                                valueCounters.length,
                                " values"
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        sx: {
                            overflow: isMobileSize ? 'auto' : 'unset'
                        },
                        children: displayedValueCounters.map((labelValueCounter)=>/*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                                direction: "row",
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                        sx: {
                                            color: (theme)=>theme.palette.success.main,
                                            fontFamily: 'monospace',
                                            ':hover': {
                                                backgroundColor: 'rgba(127,127,127,0.35)',
                                                cursor: 'pointer'
                                            },
                                            textWrap: isMobileSize ? 'nowrap' : 'unset'
                                        },
                                        onClick: ()=>onFilterAdd({
                                                label,
                                                labelValues: [
                                                    labelValueCounter.labelValue
                                                ],
                                                operator: '='
                                            }),
                                        children: labelValueCounter.labelValue
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                        sx: {
                                            textWrap: 'nowrap'
                                        },
                                        children: [
                                            "(",
                                            labelValueCounter.counter,
                                            " series)"
                                        ]
                                    })
                                ]
                            }, `${label}-${labelValueCounter.labelValue}`))
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        width: "100%",
                        textAlign: isMobileSize ? 'center' : 'unset',
                        children: showAllValues ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: "text",
                            sx: {
                                width: 'fit-content'
                            },
                            onClick: ()=>setShowAllValues(false),
                            children: "Hide full values"
                        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                            children: valueCounters.length > 5 && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Button, {
                                variant: "text",
                                sx: {
                                    width: 'fit-content'
                                },
                                onClick: ()=>setShowAllValues(true),
                                children: [
                                    "Show ",
                                    valueCounters.length - 5,
                                    " more values"
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    }, label);
}
function LabelValuesTable({ labelValueCounters, isLoading, onFilterAdd, ...props }) {
    const labels = (0, _react.useMemo)(()=>{
        return [
            ...labelValueCounters.keys()
        ].sort();
    }, [
        labelValueCounters
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {})
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        sx: {
            width: '100%'
        },
        divider: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Divider, {
            flexItem: true,
            orientation: "horizontal"
        }),
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                gap: 2,
                direction: "row",
                sx: {
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        sx: {
                            width: '100%'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "h3",
                            children: "Label"
                        })
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                        sx: {
                            width: '100%'
                        },
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                            variant: "h3",
                            children: "Values"
                        })
                    })
                ]
            }),
            labels.map((label)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(LabelValuesRow, {
                    label: label,
                    valueCounters: labelValueCounters.get(label) ?? [],
                    onFilterAdd: onFilterAdd
                }, label))
        ]
    });
}
function OverviewTab({ metricName, datasource, filters, onFilterAdd, ...props }) {
    const { metadata, isLoading: isMetadataLoading, error: metadataError } = (0, _utils.useMetricMetadata)(metricName, datasource);
    const { series, labelValueCounters, isLoading, error } = (0, _utils.useSeriesStates)(metricName, filters, datasource);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                gap: 3,
                mt: 1,
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        gap: 1,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                variant: "h1",
                                sx: {
                                    fontFamily: 'monospace'
                                },
                                children: metricName
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                children: "Description:"
                            }),
                            isMetadataLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                                variant: "text",
                                width: 180
                            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                                style: {
                                    fontStyle: metadata?.help ? 'initial' : 'italic'
                                },
                                children: metadataError ? 'Failed to fetch metadata' : metadata?.help ?? 'unknown'
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                        gap: 1,
                        justifyContent: "center",
                        children: [
                            isMetadataLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                                variant: "rounded",
                                width: 75
                            }) : metadataError ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Chip, {
                                label: "failed to fetch",
                                color: "error",
                                sx: {
                                    fontStyle: 'italic'
                                }
                            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_MetricChip.MetricChip, {
                                label: metadata?.type ?? 'unknown'
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Typography, {
                                children: [
                                    "Result:",
                                    ' ',
                                    isLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Skeleton, {
                                        variant: "text",
                                        width: 20,
                                        sx: {
                                            display: 'inline-block'
                                        }
                                    }) : error ? /*#__PURE__*/ (0, _jsxruntime.jsx)("strong", {
                                        children: "failed to fetch series"
                                    }) : /*#__PURE__*/ (0, _jsxruntime.jsxs)("strong", {
                                        children: [
                                            series?.length ?? 'unknown',
                                            " series"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            error ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ErrorAlert, {
                error: {
                    name: `Failed to fetch series ${error?.status && `(${error.status})`}`,
                    message: error?.message ?? 'Failed to fetch series'
                }
            }) : series?.length === 0 ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
                ...props,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Typography, {
                    sx: {
                        color: (theme)=>theme.palette.warning.main
                    },
                    children: "No series found with current filters."
                })
            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(LabelValuesTable, {
                labelValueCounters: labelValueCounters,
                onFilterAdd: onFilterAdd,
                isLoading: isLoading
            })
        ]
    });
}
