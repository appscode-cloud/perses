// Copyright 2024 The Perses Authors
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
Object.defineProperty(exports, "PieChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return PieChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _components = require("@perses-dev/components");
const _core = require("@perses-dev/core");
const _material = require("@mui/material");
const _piechartmodel = require("./pie-chart-model");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function PieChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleCalculationChange = (newCalculation)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.calculation = newCalculation;
        }));
    };
    const handleLegendChange = (newLegend)=>{
        // TODO (sjcobb): fix type, add position, fix glitch
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSortChange = (newSort)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.sort = newSort;
        }));
    };
    const handleModeChange = (newMode)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.mode = newMode;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = (0, _merge.default)({}, _piechartmodel.DEFAULT_FORMAT, value.format);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.LegendOptionsEditor, {
                        value: value.legend,
                        onChange: handleLegendChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                        title: "Misc",
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                                value: format,
                                onChange: handleUnitChange,
                                disabled: value.mode === 'percentage'
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.CalculationSelector, {
                                value: value.calculation,
                                onChange: handleCalculationChange
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.SortSelector, {
                                value: value.sort,
                                onChange: handleSortChange
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ModeSelector, {
                                value: value.mode,
                                onChange: handleModeChange,
                                disablePercentageMode: (0, _core.isPercentUnit)(format)
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                    title: "Reset Settings",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                        variant: "outlined",
                        color: "secondary",
                        onClick: ()=>{
                            onChange((0, _immer.produce)(value, (draft)=>{
                                // reset button removes all optional panel options
                                draft.legend = undefined;
                            }));
                        },
                        children: "Reset To Defaults"
                    })
                })
            })
        ]
    });
}
