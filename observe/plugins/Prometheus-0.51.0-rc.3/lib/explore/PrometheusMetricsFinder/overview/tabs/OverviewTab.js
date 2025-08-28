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
import { useMemo, useState } from 'react';
import { Autocomplete, Button, Chip, CircularProgress, Divider, IconButton, MenuItem, Select, Skeleton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import PlusIcon from 'mdi-material-ui/Plus';
import CheckIcon from 'mdi-material-ui/Check';
import CloseIcon from 'mdi-material-ui/Close';
import { ErrorAlert } from '@perses-dev/components';
import { ListboxComponent } from '../../filter/FilterInputs';
import { useMetricMetadata, useSeriesStates } from '../../utils';
import { MetricChip } from '../../display/MetricChip';
export function LabelValuesRow({ label, valueCounters, onFilterAdd, ...props }) {
    const [isAddingFilter, setIsAddingFilter] = useState(false);
    const [operator, setOperator] = useState('=');
    const [value, setValue] = useState('');
    const [showAllValues, setShowAllValues] = useState(false);
    const isMobileSize = useMediaQuery(useTheme().breakpoints.down('md'));
    const displayedValueCounters = useMemo(()=>{
        if (showAllValues) {
            return valueCounters;
        }
        return valueCounters.slice(0, 5);
    }, [
        showAllValues,
        valueCounters
    ]);
    return /*#__PURE__*/ _jsxs(Stack, {
        sx: {
            width: '100%'
        },
        direction: isMobileSize ? 'column' : 'row',
        alignItems: "center",
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                sx: {
                    width: '100%',
                    height: '100%'
                },
                justifyContent: "space-between",
                alignContent: "center",
                direction: isMobileSize ? 'column' : 'row',
                children: [
                    /*#__PURE__*/ _jsx(Typography, {
                        sx: {
                            fontFamily: 'monospace'
                        },
                        pl: isMobileSize ? 0 : 1,
                        children: label
                    }),
                    /*#__PURE__*/ _jsx(Stack, {
                        direction: "row",
                        gap: 1,
                        alignItems: "center",
                        children: isAddingFilter ? /*#__PURE__*/ _jsxs(_Fragment, {
                            children: [
                                /*#__PURE__*/ _jsxs(Select, {
                                    size: "small",
                                    value: operator,
                                    variant: "outlined",
                                    onChange: (event)=>{
                                        setOperator(event.target.value);
                                    },
                                    children: [
                                        /*#__PURE__*/ _jsx(MenuItem, {
                                            value: "=",
                                            children: "="
                                        }),
                                        /*#__PURE__*/ _jsx(MenuItem, {
                                            value: "!=",
                                            children: "!="
                                        }),
                                        /*#__PURE__*/ _jsx(MenuItem, {
                                            value: "=~",
                                            children: "=~"
                                        }),
                                        /*#__PURE__*/ _jsx(MenuItem, {
                                            value: "!~",
                                            children: "!~"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsx(Autocomplete, {
                                    freeSolo: true,
                                    limitTags: 1,
                                    disableClearable: true,
                                    options: valueCounters.map((counters)=>counters.labelValue),
                                    value: value,
                                    ListboxComponent: ListboxComponent,
                                    sx: {
                                        width: 250
                                    },
                                    renderInput: (params)=>{
                                        return /*#__PURE__*/ _jsx(TextField, {
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
                                /*#__PURE__*/ _jsx(IconButton, {
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
                                    children: /*#__PURE__*/ _jsx(CheckIcon, {})
                                }),
                                /*#__PURE__*/ _jsx(IconButton, {
                                    "aria-label": "cancel",
                                    onClick: ()=>{
                                        setIsAddingFilter(false);
                                    },
                                    children: /*#__PURE__*/ _jsx(CloseIcon, {})
                                })
                            ]
                        }) : /*#__PURE__*/ _jsx(Button, {
                            startIcon: /*#__PURE__*/ _jsx(PlusIcon, {}),
                            "aria-label": "add filter",
                            onClick: ()=>setIsAddingFilter(true),
                            children: "Add filter"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                sx: {
                    width: '100%'
                },
                gap: 0.5,
                children: [
                    /*#__PURE__*/ _jsx(Stack, {
                        direction: "row",
                        gap: 2,
                        children: /*#__PURE__*/ _jsxs(Typography, {
                            variant: "subtitle1",
                            children: [
                                valueCounters.length,
                                " values"
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(Stack, {
                        sx: {
                            overflow: isMobileSize ? 'auto' : 'unset'
                        },
                        children: displayedValueCounters.map((labelValueCounter)=>/*#__PURE__*/ _jsxs(Stack, {
                                direction: "row",
                                gap: 2,
                                children: [
                                    /*#__PURE__*/ _jsx(Typography, {
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
                                    /*#__PURE__*/ _jsxs(Typography, {
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
                    /*#__PURE__*/ _jsx(Stack, {
                        width: "100%",
                        textAlign: isMobileSize ? 'center' : 'unset',
                        children: showAllValues ? /*#__PURE__*/ _jsx(Button, {
                            variant: "text",
                            sx: {
                                width: 'fit-content'
                            },
                            onClick: ()=>setShowAllValues(false),
                            children: "Hide full values"
                        }) : /*#__PURE__*/ _jsx(_Fragment, {
                            children: valueCounters.length > 5 && /*#__PURE__*/ _jsxs(Button, {
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
export function LabelValuesTable({ labelValueCounters, isLoading, onFilterAdd, ...props }) {
    const labels = useMemo(()=>{
        return [
            ...labelValueCounters.keys()
        ].sort();
    }, [
        labelValueCounters
    ]);
    if (isLoading) {
        return /*#__PURE__*/ _jsx(Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ _jsx(CircularProgress, {})
        });
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        sx: {
            width: '100%'
        },
        divider: /*#__PURE__*/ _jsx(Divider, {
            flexItem: true,
            orientation: "horizontal"
        }),
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                gap: 2,
                direction: "row",
                sx: {
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ _jsx(Stack, {
                        sx: {
                            width: '100%'
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "h3",
                            children: "Label"
                        })
                    }),
                    /*#__PURE__*/ _jsx(Stack, {
                        sx: {
                            width: '100%'
                        },
                        children: /*#__PURE__*/ _jsx(Typography, {
                            variant: "h3",
                            children: "Values"
                        })
                    })
                ]
            }),
            labels.map((label)=>/*#__PURE__*/ _jsx(LabelValuesRow, {
                    label: label,
                    valueCounters: labelValueCounters.get(label) ?? [],
                    onFilterAdd: onFilterAdd
                }, label))
        ]
    });
}
export function OverviewTab({ metricName, datasource, filters, onFilterAdd, ...props }) {
    const { metadata, isLoading: isMetadataLoading, error: metadataError } = useMetricMetadata(metricName, datasource);
    const { series, labelValueCounters, isLoading, error } = useSeriesStates(metricName, filters, datasource);
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 2,
        ...props,
        children: [
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                gap: 3,
                mt: 1,
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ _jsxs(Stack, {
                        gap: 1,
                        children: [
                            /*#__PURE__*/ _jsx(Typography, {
                                variant: "h1",
                                sx: {
                                    fontFamily: 'monospace'
                                },
                                children: metricName
                            }),
                            /*#__PURE__*/ _jsx(Typography, {
                                children: "Description:"
                            }),
                            isMetadataLoading ? /*#__PURE__*/ _jsx(Skeleton, {
                                variant: "text",
                                width: 180
                            }) : /*#__PURE__*/ _jsx(Typography, {
                                style: {
                                    fontStyle: metadata?.help ? 'initial' : 'italic'
                                },
                                children: metadataError ? 'Failed to fetch metadata' : metadata?.help ?? 'unknown'
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(Stack, {
                        gap: 1,
                        justifyContent: "center",
                        children: [
                            isMetadataLoading ? /*#__PURE__*/ _jsx(Skeleton, {
                                variant: "rounded",
                                width: 75
                            }) : metadataError ? /*#__PURE__*/ _jsx(Chip, {
                                label: "failed to fetch",
                                color: "error",
                                sx: {
                                    fontStyle: 'italic'
                                }
                            }) : /*#__PURE__*/ _jsx(MetricChip, {
                                label: metadata?.type ?? 'unknown'
                            }),
                            /*#__PURE__*/ _jsxs(Typography, {
                                children: [
                                    "Result:",
                                    ' ',
                                    isLoading ? /*#__PURE__*/ _jsx(Skeleton, {
                                        variant: "text",
                                        width: 20,
                                        sx: {
                                            display: 'inline-block'
                                        }
                                    }) : error ? /*#__PURE__*/ _jsx("strong", {
                                        children: "failed to fetch series"
                                    }) : /*#__PURE__*/ _jsxs("strong", {
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
            error ? /*#__PURE__*/ _jsx(ErrorAlert, {
                error: {
                    name: `Failed to fetch series ${error?.status && `(${error.status})`}`,
                    message: error?.message ?? 'Failed to fetch series'
                }
            }) : series?.length === 0 ? /*#__PURE__*/ _jsx(Stack, {
                ...props,
                children: /*#__PURE__*/ _jsx(Typography, {
                    sx: {
                        color: (theme)=>theme.palette.warning.main
                    },
                    children: "No series found with current filters."
                })
            }) : /*#__PURE__*/ _jsx(LabelValuesTable, {
                labelValueCounters: labelValueCounters,
                onFilterAdd: onFilterAdd,
                isLoading: isLoading
            })
        ]
    });
}

//# sourceMappingURL=OverviewTab.js.map