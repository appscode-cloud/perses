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
Object.defineProperty(exports, "StatChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return StatChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DEFAULT_FORMAT = {
    unit: 'percent-decimal'
};
function StatChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    // ensures decimalPlaces defaults to correct value
    const format = (0, _merge.default)({}, DEFAULT_FORMAT, value.format);
    const handleCalculationChange = (metricLabel)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.calculation = metricLabel;
        }));
    };
    const handleMetricLabelChange = (newCalculation)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.metricLabel = newCalculation;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSparklineChange = (_, checked)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            // For now, setting to an empty object when checked, so the stat chart
            // uses the default chart color and line styles. In the future, this
            // will likely be configurable in the UI.
            draft.sparkline = checked ? {} : undefined;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    const handleFontSizeChange = (fontSize)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.valueFontSize = fontSize;
        }));
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                    title: "Misc",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                            label: "Sparkline",
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Switch, {
                                checked: !!value.sparkline,
                                onChange: handleSparklineChange
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                            value: format,
                            onChange: handleUnitChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.CalculationSelector, {
                            value: value.calculation,
                            onChange: handleCalculationChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.MetricLabelInput, {
                            value: value.metricLabel,
                            onChange: handleMetricLabelChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FontSizeSelector, {
                            value: value.valueFontSize,
                            onChange: handleFontSizeChange
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ThresholdsEditor, {
                    disablePercentMode: true,
                    thresholds: value.thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}
