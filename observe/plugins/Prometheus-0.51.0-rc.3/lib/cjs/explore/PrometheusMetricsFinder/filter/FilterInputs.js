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
    LabelFilterInput: function() {
        return LabelFilterInput;
    },
    ListboxComponent: function() {
        return ListboxComponent;
    },
    RawFilterInput: function() {
        return RawFilterInput;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _material = require("@mui/material");
const _Check = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Check"));
const _Delete = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Delete"));
const _reactvirtuoso = require("react-virtuoso");
const _utils = require("../utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function LabelFilterInput({ datasource, value, filters, onChange, onDelete }) {
    const filtersWithoutCurrent = (0, _react.useMemo)(()=>filters.filter((filter)=>filter.label !== value.label), [
        filters,
        value.label
    ]);
    const { data: labelOptions, isLoading: isLabelOptionsLoading } = (0, _utils.useLabels)(filtersWithoutCurrent, datasource);
    const { data: labelValuesOptions, isLoading: isLabelValuesOptionsLoading } = (0, _utils.useLabelValues)(value.label, filtersWithoutCurrent, datasource);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(RawFilterInput, {
        value: value,
        labelOptions: labelOptions?.data ?? [],
        labelValuesOptions: labelValuesOptions?.data ?? [],
        isLabelOptionsLoading: isLabelOptionsLoading,
        isLabelValuesOptionsLoading: isLabelValuesOptionsLoading,
        onChange: onChange,
        onDelete: onDelete
    });
}
const ListboxComponent = /*#__PURE__*/ (0, _react.forwardRef)(({ children, ...rest }, ref)=>{
    const data = children;
    const localRef = (0, _react.useRef)('500px');
    const [height, setHeight] = (0, _react.useState)(0);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("ul", {
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
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_reactvirtuoso.Virtuoso, {
            style: {
                height: localRef.current,
                padding: '10px 0'
            },
            data: data,
            totalListHeightChanged: setHeight,
            itemContent: (index, child)=>{
                return /*#__PURE__*/ (0, _react.cloneElement)(child, {
                    index,
                    title: child.props.children
                });
            }
        })
    });
});
ListboxComponent.displayName = 'ListboxComponent';
function RawFilterInput({ value, labelOptions, labelValuesOptions, isLabelOptionsLoading, isLabelValuesOptionsLoading, onChange, onDelete }) {
    const [isEditingLabelName, setIsEditingLabelName] = (0, _react.useState)(value.labelValues.length === 0);
    const [labelName, setLabelName] = (0, _react.useState)(value.label);
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
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
                    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                        ...params,
                        label: "Label Name",
                        variant: "outlined",
                        fullWidth: true,
                        size: "medium",
                        InputProps: {
                            ...params.InputProps,
                            endAdornment: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.InputAdornment, {
                                position: "end",
                                children: [
                                    isLabelOptionsLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {
                                        color: "inherit",
                                        size: 20
                                    }) : null,
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                        "aria-label": "validate label name",
                                        onClick: ()=>handleLabelConfirmation(),
                                        edge: "end",
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Check.default, {})
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
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
                    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                        ...params,
                        label: value.label,
                        variant: "outlined",
                        fullWidth: true,
                        size: "medium",
                        InputProps: {
                            ...params.InputProps,
                            startAdornment: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputAdornment, {
                                        position: "start",
                                        children: value.operator
                                    }),
                                    params.InputProps.startAdornment
                                ]
                            }),
                            endAdornment: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.InputAdornment, {
                                position: "end",
                                children: [
                                    isLabelValuesOptionsLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {
                                        color: "inherit",
                                        size: 20
                                    }) : null,
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.IconButton, {
                                        "aria-label": "delete label filter",
                                        onClick: ()=>onDelete(),
                                        edge: "end",
                                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Delete.default, {})
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
