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
Object.defineProperty(exports, "LogsSettingsEditor", {
    enumerable: true,
    get: function() {
        return LogsSettingsEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
function LogsSettingsEditor(props) {
    const { onChange, value } = props;
    const handleLegendChange = (newLegend)=>{
        onChange({
            ...value,
            legend: newLegend
        });
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange({
            ...value,
            thresholds
        });
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.LegendOptionsEditor, {
                    value: value.legend,
                    onChange: handleLegendChange
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.ThresholdsEditor, {
                    hideDefault: true,
                    thresholds: value.thresholds,
                    onChange: handleThresholdsChange
                })
            })
        ]
    });
}
