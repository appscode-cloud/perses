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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField } from '@mui/material';
import { FormatControls, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup, ThresholdsEditor } from '@perses-dev/components';
import { produce } from 'immer';
import merge from 'lodash/merge';
import { DEFAULT_FORMAT, DEFAULT_MAX_PERCENT, DEFAULT_MAX_PERCENT_DECIMAL, DEFAULT_MIN_PERCENT, DEFAULT_MIN_PERCENT_DECIMAL, DEFAULT_THRESHOLDS } from '../histogram-chart-model';
export function HistogramChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleUnitChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange(produce(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = merge({}, DEFAULT_FORMAT, value.format);
    const thresholds = merge({}, DEFAULT_THRESHOLDS, value.thresholds);
    // max only needs to be set explicitly for units other than percent and percent-decimal
    let minPlaceholder = 'Enter value';
    if (format.unit === 'percent') {
        minPlaceholder = DEFAULT_MIN_PERCENT.toString();
    } else if (format.unit === 'percent-decimal') {
        minPlaceholder = DEFAULT_MIN_PERCENT_DECIMAL.toString();
    }
    // max only needs to be set explicitly for units other than percent and percent-decimal
    let maxPlaceholder = 'Enter value';
    if (format.unit === 'percent') {
        maxPlaceholder = DEFAULT_MAX_PERCENT.toString();
    } else if (format.unit === 'percent-decimal') {
        maxPlaceholder = DEFAULT_MAX_PERCENT_DECIMAL.toString();
    }
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
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Min",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                type: "number",
                                value: value.min ?? '',
                                onChange: (e)=>{
                                    // ensure empty value resets to undef to allow chart to calculate max
                                    const newValue = e.target.value ? Number(e.target.value) : undefined;
                                    onChange(produce(value, (draft)=>{
                                        draft.min = newValue;
                                    }));
                                },
                                placeholder: minPlaceholder,
                                sx: {
                                    width: '100%'
                                }
                            })
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
                                placeholder: maxPlaceholder,
                                sx: {
                                    width: '100%'
                                }
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(ThresholdsEditor, {
                    thresholds: thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}

//# sourceMappingURL=HistogramChartOptionsEditorSettings.js.map