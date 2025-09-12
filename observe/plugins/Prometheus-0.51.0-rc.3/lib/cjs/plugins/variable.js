// Copyright 2023 The Perses Authors
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
Object.defineProperty(exports, "StaticListVariable", {
    enumerable: true,
    get: function() {
        return StaticListVariable;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
function StaticListVariableOptionEditor(props) {
    const value = props.value.values.map((v)=>{
        if (typeof v === 'string') {
            return v;
        } else {
            return v.value;
        }
    });
    const onChange = (__, value)=>{
        props.onChange({
            values: value.map((v)=>{
                return {
                    value: v,
                    label: v
                };
            })
        });
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Autocomplete, {
            onPaste: (e)=>{
                // Append new values on paste
                const v = e.clipboardData.getData('text/plain');
                if (v) {
                    const values = v.split(',');
                    onChange(null, value.concat(values));
                    e.preventDefault();
                }
            },
            multiple: true,
            value: value,
            onChange: onChange,
            options: [],
            freeSolo: true,
            clearOnBlur: true,
            readOnly: props.isReadonly,
            renderInput: (params)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    ...params,
                    label: "Values",
                    placeholder: "Values",
                    helperText: 'Type new value then press "Enter" to add.'
                })
        })
    });
}
const StaticListVariable = {
    getVariableOptions: async (spec)=>{
        const values = spec.values?.map((v)=>{
            if (typeof v === 'string') {
                return {
                    label: v,
                    value: v
                };
            }
            return v;
        });
        return {
            data: values
        };
    },
    dependsOn: ()=>{
        return {
            variables: []
        };
    },
    OptionsEditorComponent: StaticListVariableOptionEditor,
    createInitialOptions: ()=>({
            values: []
        })
};
