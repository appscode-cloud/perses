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
import { IconButton, MenuItem, Stack, TextField, Tooltip, Typography, Grid2 as Grid } from '@mui/material';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import { OptionsColorPicker } from '@perses-dev/components';
import PlusIcon from 'mdi-material-ui/Plus';
function ConditionEditor({ condition, onChange, ...props }) {
    if (condition.kind === 'Value') {
        return /*#__PURE__*/ _jsx(Stack, {
            gap: 1,
            direction: "row",
            ...props,
            children: /*#__PURE__*/ _jsx(TextField, {
                label: "Value",
                placeholder: "Exact value",
                value: condition.spec?.value ?? '',
                onChange: (e)=>onChange({
                        ...condition,
                        spec: {
                            value: e.target.value
                        }
                    }),
                fullWidth: true
            })
        });
    } else if (condition.kind === 'Range') {
        return /*#__PURE__*/ _jsxs(Stack, {
            gap: 1,
            direction: "row",
            ...props,
            children: [
                /*#__PURE__*/ _jsx(TextField, {
                    label: "From",
                    placeholder: "Start of range",
                    value: condition.spec?.min ?? '',
                    onChange: (e)=>onChange({
                            ...condition,
                            spec: {
                                ...condition.spec,
                                min: +e.target.value
                            }
                        }),
                    fullWidth: true
                }),
                /*#__PURE__*/ _jsx(TextField, {
                    label: "To",
                    placeholder: "End of range (inclusive)",
                    value: condition.spec?.max ?? '',
                    onChange: (e)=>onChange({
                            ...condition,
                            spec: {
                                ...condition.spec,
                                max: +e.target.value
                            }
                        }),
                    fullWidth: true
                })
            ]
        });
    } else if (condition.kind === 'Regex') {
        return /*#__PURE__*/ _jsx(Stack, {
            gap: 1,
            direction: "row",
            ...props,
            children: /*#__PURE__*/ _jsx(TextField, {
                label: "Regular Expression",
                placeholder: "JavaScript regular expression",
                value: condition.spec?.expr ?? '',
                onChange: (e)=>onChange({
                        ...condition,
                        spec: {
                            expr: e.target.value
                        }
                    }),
                fullWidth: true
            })
        });
    } else if (condition.kind === 'Misc') {
        return /*#__PURE__*/ _jsx(Stack, {
            gap: 1,
            direction: "row",
            ...props,
            children: /*#__PURE__*/ _jsxs(TextField, {
                select: true,
                label: "Value",
                value: condition.spec?.value ?? '',
                onChange: (e)=>onChange({
                        ...condition,
                        spec: {
                            value: e.target.value
                        }
                    }),
                fullWidth: true,
                children: [
                    /*#__PURE__*/ _jsx(MenuItem, {
                        value: "empty",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            children: [
                                /*#__PURE__*/ _jsx(Typography, {
                                    children: "Empty"
                                }),
                                /*#__PURE__*/ _jsx(Typography, {
                                    variant: "caption",
                                    children: "Matches empty string"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(MenuItem, {
                        value: "null",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            children: [
                                /*#__PURE__*/ _jsx(Typography, {
                                    children: "Null"
                                }),
                                /*#__PURE__*/ _jsx(Typography, {
                                    variant: "caption",
                                    children: "Matches null or undefined"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(MenuItem, {
                        value: "NaN",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            children: [
                                /*#__PURE__*/ _jsx(Typography, {
                                    children: "NaN"
                                }),
                                /*#__PURE__*/ _jsx(Typography, {
                                    variant: "caption",
                                    children: "Matches Not a Number value"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(MenuItem, {
                        value: "true",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            children: [
                                /*#__PURE__*/ _jsx(Typography, {
                                    children: "True"
                                }),
                                /*#__PURE__*/ _jsx(Typography, {
                                    variant: "caption",
                                    children: "Matches true boolean"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsx(MenuItem, {
                        value: "false",
                        children: /*#__PURE__*/ _jsxs(Stack, {
                            children: [
                                /*#__PURE__*/ _jsx(Typography, {
                                    children: "False"
                                }),
                                /*#__PURE__*/ _jsx(Typography, {
                                    variant: "caption",
                                    children: "Matches false boolean"
                                })
                            ]
                        })
                    })
                ]
            })
        });
    }
    return null;
}
export function CellEditor({ cell, onChange, onDelete, ...props }) {
    return /*#__PURE__*/ _jsxs(Grid, {
        container: true,
        spacing: 2,
        ...props,
        children: [
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 5
                },
                children: /*#__PURE__*/ _jsxs(Stack, {
                    direction: "row",
                    gap: 1,
                    width: "100%",
                    children: [
                        /*#__PURE__*/ _jsxs(TextField, {
                            select: true,
                            label: "Type",
                            value: cell.condition.kind,
                            onChange: (e)=>onChange({
                                    ...cell,
                                    condition: {
                                        kind: e.target.value
                                    }
                                }),
                            required: true,
                            sx: {
                                width: '120px'
                            },
                            children: [
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Value",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Value"
                                            }),
                                            cell.condition.kind !== 'Value' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches an exact text value"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Range",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Range"
                                            }),
                                            cell.condition.kind !== 'Range' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against a numerical range"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Regex",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Regex"
                                            }),
                                            cell.condition.kind !== 'Regex' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against a regular expression"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _jsx(MenuItem, {
                                    value: "Misc",
                                    children: /*#__PURE__*/ _jsxs(Stack, {
                                        children: [
                                            /*#__PURE__*/ _jsx(Typography, {
                                                children: "Misc"
                                            }),
                                            cell.condition.kind !== 'Misc' && /*#__PURE__*/ _jsx(Typography, {
                                                variant: "caption",
                                                children: "Matches against empty, null and NaN values"
                                            })
                                        ]
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx(ConditionEditor, {
                            width: "100%",
                            condition: cell.condition,
                            onChange: (updatedCondition)=>onChange({
                                    ...cell,
                                    condition: updatedCondition
                                })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 4
                },
                children: /*#__PURE__*/ _jsx(TextField, {
                    label: "Display text",
                    value: cell.text,
                    onChange: (e)=>onChange({
                            ...cell,
                            text: e.target.value
                        }),
                    fullWidth: true
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ _jsx(Stack, {
                    direction: "row",
                    justifyContent: "center",
                    gap: 1,
                    children: cell.textColor ? /*#__PURE__*/ _jsx(OptionsColorPicker, {
                        label: "Text Color",
                        color: cell.textColor ?? '#000',
                        onColorChange: (color)=>onChange({
                                ...cell,
                                textColor: color
                            }),
                        onClear: ()=>onChange({
                                ...cell,
                                textColor: undefined
                            })
                    }) : /*#__PURE__*/ _jsx(IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                textColor: '#000'
                            }),
                        children: /*#__PURE__*/ _jsx(PlusIcon, {})
                    })
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                children: /*#__PURE__*/ _jsx(Stack, {
                    direction: "row",
                    justifyContent: "center",
                    children: cell.backgroundColor ? /*#__PURE__*/ _jsx(OptionsColorPicker, {
                        label: "Background Color",
                        color: cell.backgroundColor ?? '#fff',
                        onColorChange: (color)=>onChange({
                                ...cell,
                                backgroundColor: color
                            }),
                        onClear: ()=>onChange({
                                ...cell,
                                backgroundColor: undefined
                            })
                    }) : /*#__PURE__*/ _jsx(IconButton, {
                        onClick: ()=>onChange({
                                ...cell,
                                backgroundColor: '#000'
                            }),
                        children: /*#__PURE__*/ _jsx(PlusIcon, {})
                    })
                })
            }),
            /*#__PURE__*/ _jsx(Grid, {
                size: {
                    xs: 1
                },
                textAlign: "end",
                children: /*#__PURE__*/ _jsx(Tooltip, {
                    title: "Remove cell settings",
                    placement: "top",
                    children: /*#__PURE__*/ _jsx(IconButton, {
                        size: "small",
                        sx: {
                            marginLeft: 'auto'
                        },
                        onClick: onDelete,
                        children: /*#__PURE__*/ _jsx(DeleteIcon, {})
                    }, "delete-cell-button")
                })
            })
        ]
    });
}

//# sourceMappingURL=CellEditor.js.map