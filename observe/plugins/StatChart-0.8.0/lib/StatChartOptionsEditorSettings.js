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
import { Switch } from '@mui/material';
import { FontSizeSelector, FormatControls, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup, ThresholdsEditor } from '@perses-dev/components';
import { CalculationSelector, MetricLabelInput } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import merge from 'lodash/merge';
const DEFAULT_FORMAT = {
    unit: 'percent-decimal'
};
export function StatChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    // ensures decimalPlaces defaults to correct value
    const format = merge({}, DEFAULT_FORMAT, value.format);
    const handleCalculationChange = (metricLabel)=>{
        onChange(produce(value, (draft)=>{
            draft.calculation = metricLabel;
        }));
    };
    const handleMetricLabelChange = (newCalculation)=>{
        onChange(produce(value, (draft)=>{
            draft.metricLabel = newCalculation;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSparklineChange = (_, checked)=>{
        onChange(produce(value, (draft)=>{
            // For now, setting to an empty object when checked, so the stat chart
            // uses the default chart color and line styles. In the future, this
            // will likely be configurable in the UI.
            draft.sparkline = checked ? {} : undefined;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange(produce(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    const handleFontSizeChange = (fontSize)=>{
        onChange(produce(value, (draft)=>{
            draft.valueFontSize = fontSize;
        }));
    };
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Misc",
                    children: [
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Sparkline",
                            control: /*#__PURE__*/ _jsx(Switch, {
                                checked: !!value.sparkline,
                                onChange: handleSparklineChange
                            })
                        }),
                        /*#__PURE__*/ _jsx(FormatControls, {
                            value: format,
                            onChange: handleUnitChange
                        }),
                        /*#__PURE__*/ _jsx(CalculationSelector, {
                            value: value.calculation,
                            onChange: handleCalculationChange
                        }),
                        /*#__PURE__*/ _jsx(MetricLabelInput, {
                            value: value.metricLabel,
                            onChange: handleMetricLabelChange
                        }),
                        /*#__PURE__*/ _jsx(FontSizeSelector, {
                            value: value.valueFontSize,
                            onChange: handleFontSizeChange
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(ThresholdsEditor, {
                    disablePercentMode: true,
                    thresholds: value.thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}

//# sourceMappingURL=StatChartOptionsEditorSettings.js.map