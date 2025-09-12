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
Object.defineProperty(exports, "TimeSeriesChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return TimeSeriesChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _immer = require("immer");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _timeserieschartmodel = require("./time-series-chart-model");
const _VisualOptionsEditor = require("./VisualOptionsEditor");
const _YAxisOptionsEditor = require("./YAxisOptionsEditor");
const _QuerySettingsEditor = require("./QuerySettingsEditor");
function TimeSeriesChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleLegendChange = (newLegend)=>{
        // TODO (sjcobb): fix type, add position, fix glitch
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    const handleVisualChange = (newVisual)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.visual = newVisual;
        }));
    };
    const handleYAxisChange = (newYAxis)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.yAxis = newYAxis;
        }));
    };
    const handleQuerySettingsChange = (newQuerySettings)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.querySettings = newQuerySettings;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.LegendOptionsEditor, {
                        value: value.legend,
                        onChange: handleLegendChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisualOptionsEditor.VisualOptionsEditor, {
                        value: value.visual ?? _timeserieschartmodel.DEFAULT_VISUAL,
                        onChange: handleVisualChange
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_YAxisOptionsEditor.YAxisOptionsEditor, {
                    value: value.yAxis ?? _timeserieschartmodel.DEFAULT_Y_AXIS,
                    onChange: handleYAxisChange
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ThresholdsEditor, {
                        hideDefault: true,
                        thresholds: value.thresholds,
                        onChange: handleThresholdsChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_QuerySettingsEditor.QuerySettingsEditor, {
                        querySettingsList: value.querySettings,
                        onChange: handleQuerySettingsChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                        title: "Reset Settings",
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                            variant: "outlined",
                            color: "secondary",
                            onClick: ()=>{
                                onChange((0, _immer.produce)(value, (draft)=>{
                                    // reset button removes all optional panel options
                                    draft.yAxis = undefined;
                                    draft.legend = undefined;
                                    draft.visual = undefined;
                                    draft.thresholds = undefined;
                                    draft.querySettings = undefined;
                                }));
                            },
                            children: "Reset To Defaults"
                        })
                    })
                ]
            })
        ]
    });
}
