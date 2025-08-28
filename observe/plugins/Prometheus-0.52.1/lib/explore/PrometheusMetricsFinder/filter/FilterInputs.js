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
import { cloneElement, forwardRef, useMemo, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, IconButton, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import DeleteIcon from 'mdi-material-ui/Delete';
import { Virtuoso } from 'react-virtuoso';
import { useLabels, useLabelValues } from '../utils';
export function LabelFilterInput({ datasource, value, filters, onChange, onDelete }) {
    const filtersWithoutCurrent = useMemo(()=>filters.filter((filter)=>filter.label !== value.label), [
        filters,
        value.label
    ]);
    const { data: labelOptions, isLoading: isLabelOptionsLoading } = useLabels(filtersWithoutCurrent, datasource);
    const { data: labelValuesOptions, isLoading: isLabelValuesOptionsLoading } = useLabelValues(value.label, filtersWithoutCurrent, datasource);
    return /*#__PURE__*/ _jsx(RawFilterInput, {
        value: value,
        labelOptions: labelOptions?.data ?? [],
        labelValuesOptions: labelValuesOptions?.data ?? [],
        isLabelOptionsLoading: isLabelOptionsLoading,
        isLabelValuesOptionsLoading: isLabelValuesOptionsLoading,
        onChange: onChange,
        onDelete: onDelete
    });
}
// https://stackoverflow.com/questions/69060738/material-ui-autocomplete-virtualization-w-react-virtuoso
export const ListboxComponent = /*#__PURE__*/ forwardRef(({ children, ...rest }, ref)=>{
    const data = children;
    const localRef = useRef('500px');
    const [height, setHeight] = useState(0);
    return /*#__PURE__*/ _jsx("ul", {
        style: {
            overflow: 'hidden',
            padding: '0',
            height: height ? `min(40vh, ${height}px)` : '40vh'
        },
        ref: (reference)=>{
            const maxHeight = reference ? getComputedStyle(reference).maxHeight : null;
            if (maxHeight && maxHeight !== localRef.current) {
                localRef.current = maxHeight;
            }
            if (typeof ref === 'function') {
                ref(reference);
            }
        },
        ...rest,
        children: /*#__PURE__*/ _jsx(Virtuoso, {
            style: {
                height: localRef.current,
                padding: '10px 0'
            },
            data: data,
            totalListHeightChanged: setHeight,
            itemContent: (index, child)=>{
                return /*#__PURE__*/ cloneElement(child, {
                    index,
                    title: child.props.children
                });
            }
        })
    });
});
ListboxComponent.displayName = 'ListboxComponent';
export function RawFilterInput({ value, labelOptions, labelValuesOptions, isLabelOptionsLoading, isLabelValuesOptionsLoading, onChange, onDelete }) {
    return /*#__PURE__*/ _jsxs(Stack, {
        gap: 0,
        flexDirection: "row",
        alignItems: "center",
        children: [
            /*#__PURE__*/ _jsx(Autocomplete, {
                freeSolo: true,
                disableClearable: true,
                options: labelOptions ?? [],
                value: value.label,
                sx: {
                    minWidth: 200
                },
                ListboxComponent: ListboxComponent,
                loading: isLabelOptionsLoading,
                renderInput: (params)=>{
                    return /*#__PURE__*/ _jsx(TextField, {
                        ...params,
                        label: "Label Name",
                        variant: "outlined",
                        fullWidth: true,
                        size: "medium",
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }
                        }
                    });
                },
                onInputChange: (_, newValue)=>{
                    onChange({
                        label: newValue ?? '',
                        labelValues: value.labelValues,
                        operator: value.operator
                    });
                }
            }),
            /*#__PURE__*/ _jsxs(Select, {
                value: value.operator,
                variant: "outlined",
                onChange: (event)=>{
                    onChange({
                        label: value.label,
                        labelValues: value.labelValues,
                        operator: event.target.value
                    });
                },
                size: "medium",
                sx: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
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
                multiple: value.operator === '=~' || value.operator === '!~',
                limitTags: 1,
                disableClearable: true,
                options: labelValuesOptions ?? [],
                value: value.labelValues,
                ListboxComponent: ListboxComponent,
                sx: {
                    minWidth: 200
                },
                loading: isLabelValuesOptionsLoading,
                renderInput: (params)=>{
                    return /*#__PURE__*/ _jsx(TextField, {
                        ...params,
                        label: value.operator === '=~' || value.operator === '!~' ? 'Label Values' : 'Label Value',
                        variant: "outlined",
                        fullWidth: true,
                        size: "medium",
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }
                        },
                        slotProps: {
                            input: {
                                ...params.InputProps,
                                style: {
                                    maxHeight: '53.13px'
                                },
                                endAdornment: /*#__PURE__*/ _jsxs(InputAdornment, {
                                    position: "end",
                                    children: [
                                        isLabelValuesOptionsLoading ? /*#__PURE__*/ _jsx(CircularProgress, {
                                            color: "inherit",
                                            size: 20
                                        }) : null,
                                        /*#__PURE__*/ _jsx(IconButton, {
                                            "aria-label": "delete label filter",
                                            onClick: ()=>onDelete(),
                                            edge: "end",
                                            children: /*#__PURE__*/ _jsx(DeleteIcon, {})
                                        })
                                    ]
                                })
                            }
                        }
                    });
                },
                onInputChange: (_, newValue)=>{
                    if (value.operator === '=' || value.operator === '!=') {
                        onChange({
                            label: value.label,
                            labelValues: [
                                newValue
                            ],
                            operator: value.operator
                        });
                    }
                },
                onChange: (_, newValue)=>{
                    if (Array.isArray(newValue)) {
                        onChange({
                            label: value.label,
                            labelValues: newValue,
                            operator: value.operator
                        });
                    }
                }
            })
        ]
    });
}

//# sourceMappingURL=FilterInputs.js.map