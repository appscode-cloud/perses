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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, TextField } from '@mui/material';
import { OptionsEditorControl, OptionsEditorGroup, FormatControls } from '@perses-dev/components';
import { DEFAULT_FORMAT, DEFAULT_Y_AXIS, Y_AXIS_CONFIG } from './time-series-chart-model';
export function YAxisOptionsEditor({ value, onChange }) {
    return /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
        title: "Y Axis",
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: "Show",
                control: /*#__PURE__*/ _jsx(Switch, {
                    checked: value.show ?? DEFAULT_Y_AXIS.show,
                    onChange: (e)=>{
                        onChange({
                            ...value,
                            show: e.target.checked
                        });
                    }
                })
            }),
            /*#__PURE__*/ _jsx(FormatControls, {
                value: value.format ?? DEFAULT_FORMAT,
                onChange: (newFormat)=>onChange({
                        ...value,
                        format: newFormat
                    })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: Y_AXIS_CONFIG.label.label,
                control: /*#__PURE__*/ _jsx(TextField, {
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
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: Y_AXIS_CONFIG.min.label,
                control: /*#__PURE__*/ _jsx(TextField, {
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
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: Y_AXIS_CONFIG.max.label,
                control: /*#__PURE__*/ _jsx(TextField, {
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

//# sourceMappingURL=YAxisOptionsEditor.js.map