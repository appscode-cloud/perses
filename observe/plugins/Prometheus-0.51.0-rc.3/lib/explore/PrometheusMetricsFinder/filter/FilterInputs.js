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
import { cloneElement, forwardRef, useMemo, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import CheckIcon from 'mdi-material-ui/Check';
import DeleteIcon from 'mdi-material-ui/Delete';
import { Virtuoso } from 'react-virtuoso';
import { useLabels, useLabelValues } from '../utils';
// TODO: fix when a filter is deleted => refresh data
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
    const [isEditingLabelName, setIsEditingLabelName] = useState(value.labelValues.length === 0);
    const [labelName, setLabelName] = useState(value.label);
    function handleLabelConfirmation() {
        setIsEditingLabelName(false);
        onChange({
            label: labelName,
            labelValues: value.labelValues,
            operator: value.operator
        });
    }
    function handleKeyPress(event) {
        if (isEditingLabelName && event.key === 'Enter') {
            handleLabelConfirmation();
        }
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Autocomplete, {
                freeSolo: true,
                disableClearable: true,
                options: labelOptions ?? [],
                value: value.label,
                sx: {
                    minWidth: 250,
                    display: isEditingLabelName ? 'block' : 'none'
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
                        InputProps: {
                            ...params.InputProps,
                            endAdornment: /*#__PURE__*/ _jsxs(InputAdornment, {
                                position: "end",
                                children: [
                                    isLabelOptionsLoading ? /*#__PURE__*/ _jsx(CircularProgress, {
                                        color: "inherit",
                                        size: 20
                                    }) : null,
                                    /*#__PURE__*/ _jsx(IconButton, {
                                        "aria-label": "validate label name",
                                        onClick: ()=>handleLabelConfirmation(),
                                        edge: "end",
                                        children: /*#__PURE__*/ _jsx(CheckIcon, {})
                                    })
                                ]
                            })
                        }
                    });
                },
                onKeyDown: handleKeyPress,
                onInputChange: (_, newValue)=>{
                    setLabelName(newValue ?? '');
                }
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
                    minWidth: 250,
                    display: isEditingLabelName ? 'none' : 'block'
                },
                loading: isLabelValuesOptionsLoading,
                renderInput: (params)=>{
                    return /*#__PURE__*/ _jsx(TextField, {
                        ...params,
                        label: value.label,
                        variant: "outlined",
                        fullWidth: true,
                        size: "medium",
                        InputProps: {
                            ...params.InputProps,
                            startAdornment: /*#__PURE__*/ _jsxs(_Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(InputAdornment, {
                                        position: "start",
                                        children: value.operator
                                    }),
                                    params.InputProps.startAdornment
                                ]
                            }),
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
                    });
                },
                onChange: (_, newValue)=>{
                    if (typeof newValue === 'string') {
                        onChange({
                            label: value.label,
                            labelValues: [
                                newValue
                            ],
                            operator: value.operator
                        });
                    }
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