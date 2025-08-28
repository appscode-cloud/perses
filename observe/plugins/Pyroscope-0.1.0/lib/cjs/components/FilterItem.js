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
Object.defineProperty(exports, "FilterItem", {
    enumerable: true,
    get: function() {
        return FilterItem;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _LabelName = require("./LabelName");
const _Operator = require("./Operator");
const _LabelValue = require("./LabelValue");
const _DeleteFilterItem = require("./DeleteFilterItem");
function FilterItem(props) {
    const { datasource, value, onChange, deleteItem } = props;
    const handleLabelNameChange = (label)=>{
        onChange?.({
            labelName: label,
            labelValue: '',
            operator: value.operator
        });
    };
    const handleOperatorChange = (op)=>{
        onChange?.({
            labelName: value.labelName,
            labelValue: value.labelValue,
            operator: op
        });
    };
    const handleLabelValueChange = (val)=>{
        onChange?.({
            labelName: value.labelName,
            labelValue: val,
            operator: value.operator
        });
    };
    const handleDeleteClick = ()=>{
        deleteItem?.();
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        direction: "row",
        spacing: 0,
        sx: {
            flexWrap: 'wrap',
            maxWidth: '100%'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_LabelName.LabelName, {
                datasource: datasource,
                value: value.labelName,
                onChange: handleLabelNameChange
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Operator.Operator, {
                value: value.operator,
                onChange: handleOperatorChange
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_LabelValue.LabelValue, {
                datasource: datasource,
                value: value.labelValue,
                labelName: value.labelName,
                onChange: handleLabelValueChange
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_DeleteFilterItem.DeleteFilterItem, {
                onClick: handleDeleteClick
            })
        ]
    });
}
