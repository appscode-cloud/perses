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
Object.defineProperty(exports, "HistogramChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return HistogramChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _immer = require("immer");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _histogramchartmodel = require("../histogram-chart-model");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function HistogramChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleUnitChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = (0, _merge.default)({}, _histogramchartmodel.DEFAULT_FORMAT, value.format);
    const thresholds = (0, _merge.default)({}, _histogramchartmodel.DEFAULT_THRESHOLDS, value.thresholds);
    // max only needs to be set explicitly for units other than percent and percent-decimal
    let minPlaceholder = 'Enter value';
    if (format.unit === 'percent') {
        minPlaceholder = _histogramchartmodel.DEFAULT_MIN_PERCENT.toString();
    } else if (format.unit === 'percent-decimal') {
        minPlaceholder = _histogramchartmodel.DEFAULT_MIN_PERCENT_DECIMAL.toString();
    }
    // max only needs to be set explicitly for units other than percent and percent-decimal
    let maxPlaceholder = 'Enter value';
    if (format.unit === 'percent') {
        maxPlaceholder = _histogramchartmodel.DEFAULT_MAX_PERCENT.toString();
    } else if (format.unit === 'percent-decimal') {
        maxPlaceholder = _histogramchartmodel.DEFAULT_MAX_PERCENT_DECIMAL.toString();
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                    title: "Misc",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                            value: format,
                            onChange: handleUnitChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                            label: "Min",
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                type: "number",
                                value: value.min ?? '',
                                onChange: (e)=>{
                                    // ensure empty value resets to undef to allow chart to calculate max
                                    const newValue = e.target.value ? Number(e.target.value) : undefined;
                                    onChange((0, _immer.produce)(value, (draft)=>{
                                        draft.min = newValue;
                                    }));
                                },
                                placeholder: minPlaceholder,
                                sx: {
                                    width: '100%'
                                }
                            })
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                            label: "Max",
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                                type: "number",
                                value: value.max ?? '',
                                onChange: (e)=>{
                                    // ensure empty value resets to undef to allow chart to calculate max
                                    const newValue = e.target.value ? Number(e.target.value) : undefined;
                                    onChange((0, _immer.produce)(value, (draft)=>{
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ThresholdsEditor, {
                    thresholds: thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}
