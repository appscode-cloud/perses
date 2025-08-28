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
Object.defineProperty(exports, "StatusHistoryChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return StatusHistoryChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
function StatusHistoryChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleLegendChange = (newLegend)=>{
        // TODO (sjcobb): fix type, add position, fix glitch
        onChange((0, _immer.produce)(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.LegendOptionsEditor, {
                    showValuesEditor: false,
                    value: value.legend,
                    onChange: handleLegendChange
                })
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
