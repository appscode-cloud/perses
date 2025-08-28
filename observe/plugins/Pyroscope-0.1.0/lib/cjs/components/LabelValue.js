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
Object.defineProperty(exports, "LabelValue", {
    enumerable: true,
    get: function() {
        return LabelValue;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _usequery = require("../utils/use-query");
function LabelValue(props) {
    const { datasource, value, labelName, onChange } = props;
    const { data: labelValuesOptions, isLoading: isLabelValuesOptionsLoading } = (0, _usequery.useLabelValues)(datasource, labelName);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Select, {
        sx: {
            borderRadius: '0'
        },
        value: value,
        size: "small",
        onChange: (event)=>onChange?.(event.target.value),
        displayEmpty: true,
        disabled: !labelName || labelName === '',
        renderValue: (selected)=>{
            if (selected === '') {
                return 'Select label value';
            }
            return selected;
        },
        children: isLabelValuesOptionsLoading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Stack, {
            width: "100%",
            sx: {
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.CircularProgress, {
                color: "inherit",
                size: 20
            })
        }) : labelValuesOptions?.names && labelValuesOptions?.names.map((labelValue)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.MenuItem, {
                value: labelValue,
                children: labelValue
            }, labelValue))
    });
}
