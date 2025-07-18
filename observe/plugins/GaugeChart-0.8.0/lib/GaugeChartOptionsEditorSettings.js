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
import { TextField } from '@mui/material';
import { FormatControls, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup, ThresholdsEditor } from '@perses-dev/components';
import { CalculationSelector } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import merge from 'lodash/merge';
import { DEFAULT_FORMAT, DEFAULT_MAX_PERCENT, DEFAULT_MAX_PERCENT_DECIMAL } from './gauge-chart-model';
export function GaugeChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleCalculationChange = (newCalculation)=>{
        onChange(produce(value, (draft)=>{
            draft.calculation = newCalculation;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = merge({}, DEFAULT_FORMAT, value.format);
    // max only needs to be set explicitly for units other than percent and percent-decimal
    let maxPlaceholder = 'Enter value';
    if (format.unit === 'percent') {
        maxPlaceholder = DEFAULT_MAX_PERCENT.toString();
    } else if (format.unit === 'percent-decimal') {
        maxPlaceholder = DEFAULT_MAX_PERCENT_DECIMAL.toString();
    }
    const handleThresholdsChange = (thresholds)=>{
        onChange(produce(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Misc",
                    children: [
                        /*#__PURE__*/ _jsx(FormatControls, {
                            value: format,
                            onChange: handleUnitChange
                        }),
                        /*#__PURE__*/ _jsx(CalculationSelector, {
                            value: value.calculation,
                            onChange: handleCalculationChange
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Max",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                type: "number",
                                value: value.max ?? '',
                                onChange: (e)=>{
                                    // ensure empty value resets to undef to allow chart to calculate max
                                    const newValue = e.target.value ? Number(e.target.value) : undefined;
                                    onChange(produce(value, (draft)=>{
                                        draft.max = newValue;
                                    }));
                                },
                                placeholder: maxPlaceholder
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(ThresholdsEditor, {
                    thresholds: value.thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}

//# sourceMappingURL=GaugeChartOptionsEditorSettings.js.map