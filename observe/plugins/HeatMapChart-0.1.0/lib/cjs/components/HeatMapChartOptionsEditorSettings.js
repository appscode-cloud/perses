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
Object.defineProperty(exports, "HeatMapChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return HeatMapChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _immer = require("immer");
const _merge = /*#__PURE__*/ _interop_require_default(require("lodash/merge"));
const _heatmapchartmodel = require("../heat-map-chart-model");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function HeatMapChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleYAxisFormatChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.yAxisFormat = newFormat;
        }));
    };
    const handleCountFormatChange = (newFormat)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.countFormat = newFormat;
        }));
    };
    const handleShowVisualMapChange = (_, checked)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.showVisualMap = checked;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const yAxisFormat = (0, _merge.default)({}, _heatmapchartmodel.DEFAULT_FORMAT, value.yAxisFormat);
    const countFormat = (0, _merge.default)({}, _heatmapchartmodel.DEFAULT_FORMAT, value.countFormat);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                    title: "Bucket Count",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                            value: countFormat,
                            onChange: handleCountFormatChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorControl, {
                            label: "Show Visual Map",
                            control: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Switch, {
                                checked: !!value.showVisualMap,
                                onChange: handleShowVisualMapChange
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                    title: "Y Axis",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.FormatControls, {
                        value: yAxisFormat,
                        onChange: handleYAxisFormatChange
                    })
                })
            })
        ]
    });
}
