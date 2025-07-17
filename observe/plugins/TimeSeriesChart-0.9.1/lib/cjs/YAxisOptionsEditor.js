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
Object.defineProperty(exports, "YAxisOptionsEditor", {
    enumerable: true,
    get: function() {
        return YAxisOptionsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _timeserieschartmodel = require("./time-series-chart-model");
function YAxisOptionsEditor({ value, onChange }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
        title: "Y Axis",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: "Show",
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Switch, {
                    checked: value.show ?? _timeserieschartmodel.DEFAULT_Y_AXIS.show,
                    onChange: (e)=>{
                        onChange({
                            ...value,
                            show: e.target.checked
                        });
                    }
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                value: value.format ?? _timeserieschartmodel.DEFAULT_FORMAT,
                onChange: (newFormat)=>onChange({
                        ...value,
                        format: newFormat
                    })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.Y_AXIS_CONFIG.label.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    value: value.label ?? '',
                    inputProps: {
                        'aria-label': 'enter y axis label'
                    },
                    onChange: (e)=>onChange({
                            ...value,
                            label: e.target.value
                        }),
                    placeholder: "Default"
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.Y_AXIS_CONFIG.min.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    type: "number",
                    value: value.min ?? '',
                    onChange: (e)=>{
                        // ensure empty value resets to undef to allow chart to calculate min
                        const newValue = e.target.value ? Number(e.target.value) : undefined;
                        onChange({
                            ...value,
                            min: newValue
                        });
                    },
                    placeholder: "Default"
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.Y_AXIS_CONFIG.max.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                    type: "number",
                    value: value.max ?? '',
                    onChange: (e)=>{
                        // ensure empty value resets to undef to allow chart to calculate max
                        const newValue = e.target.value ? Number(e.target.value) : undefined;
                        onChange({
                            ...value,
                            max: newValue
                        });
                    },
                    placeholder: "Default"
                })
            })
        ]
    });
}
