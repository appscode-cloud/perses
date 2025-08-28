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
Object.defineProperty(exports, "VisualOptionsEditor", {
    enumerable: true,
    get: function() {
        return VisualOptionsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _immer = require("immer");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _timeserieschartmodel = require("./time-series-chart-model");
function VisualOptionsEditor({ value, onChange }) {
    const handleLineWidthChange = (_, sliderValue)=>{
        const newValue = Array.isArray(sliderValue) ? sliderValue[0] : sliderValue;
        const symbolSize = newValue !== undefined ? newValue + _timeserieschartmodel.POINT_SIZE_OFFSET : _timeserieschartmodel.DEFAULT_POINT_RADIUS;
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.lineWidth = newValue;
            draft.pointRadius = symbolSize;
        }));
    };
    const handleAreaOpacityChange = (_, sliderValue)=>{
        const newValue = Array.isArray(sliderValue) ? sliderValue[0] : sliderValue;
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.areaOpacity = newValue;
        }));
    };
    const currentStack = value.stack ?? 'none';
    const stackConfig = _timeserieschartmodel.STACK_CONFIG[currentStack];
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
        title: "Visual",
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: "Display",
                control: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.ToggleButtonGroup, {
                    color: "primary",
                    exclusive: true,
                    value: value.display,
                    onChange: (__, newValue)=>{
                        onChange({
                            ...value,
                            display: newValue
                        });
                    },
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButton, {
                            value: "line",
                            selected: value.display === undefined || value.display === 'line',
                            "aria-label": "display line series",
                            children: "Line"
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.ToggleButton, {
                            value: "bar",
                            "aria-label": "display bar series",
                            children: "Bar"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.VISUAL_CONFIG.lineWidth.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Slider, {
                    "data-testid": _timeserieschartmodel.VISUAL_CONFIG.lineWidth.testId,
                    value: value.lineWidth ?? _timeserieschartmodel.DEFAULT_LINE_WIDTH,
                    valueLabelDisplay: "auto",
                    step: _timeserieschartmodel.VISUAL_CONFIG.lineWidth.step,
                    marks: true,
                    min: _timeserieschartmodel.VISUAL_CONFIG.lineWidth.min,
                    max: _timeserieschartmodel.VISUAL_CONFIG.lineWidth.max,
                    disabled: value.display === 'bar',
                    onChange: handleLineWidthChange
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.VISUAL_CONFIG.areaOpacity.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Slider, {
                    "data-testid": _timeserieschartmodel.VISUAL_CONFIG.areaOpacity.testId,
                    value: value.areaOpacity ?? _timeserieschartmodel.DEFAULT_AREA_OPACITY,
                    valueLabelDisplay: "auto",
                    step: _timeserieschartmodel.VISUAL_CONFIG.areaOpacity.step,
                    marks: true,
                    min: _timeserieschartmodel.VISUAL_CONFIG.areaOpacity.min,
                    max: _timeserieschartmodel.VISUAL_CONFIG.areaOpacity.max,
                    disabled: value.display === 'bar',
                    onChange: handleAreaOpacityChange
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.VISUAL_CONFIG.stack.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.SettingsAutocomplete, {
                    value: {
                        ...stackConfig,
                        id: currentStack
                    },
                    options: _timeserieschartmodel.STACK_OPTIONS,
                    onChange: (__, newValue)=>{
                        const updatedValue = {
                            ...value,
                            stack: newValue.id === 'none' ? undefined : newValue.id
                        };
                        // stacked area chart preset to automatically set area under a curve shading
                        if (newValue.id === 'all' && !value.areaOpacity) {
                            updatedValue.areaOpacity = 0.3;
                        }
                        onChange(updatedValue);
                    },
                    disabled: value === undefined,
                    disableClearable: true
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                label: _timeserieschartmodel.VISUAL_CONFIG.connectNulls.label,
                control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Switch, {
                    checked: value.connectNulls ?? _timeserieschartmodel.DEFAULT_CONNECT_NULLS,
                    disabled: value.display === 'bar',
                    onChange: (e)=>{
                        onChange({
                            ...value,
                            connectNulls: e.target.checked
                        });
                    }
                })
            })
        ]
    });
}
