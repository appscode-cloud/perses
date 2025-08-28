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
Object.defineProperty(exports, "FlameChartOptionsEditorSettings", {
    enumerable: true,
    get: function() {
        return FlameChartOptionsEditorSettings;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _utils = require("../utils/utils");
const _PaletteSelector = require("./PaletteSelector");
const _SwitchSelector = require("./SwitchSelector");
function FlameChartOptionsEditorSettings(props) {
    const { value } = props;
    const { handlePaletteChange } = (0, _utils.usePaletteState)(props);
    const { handleShowSettingsChange } = (0, _utils.useShowSettingsState)(props);
    const { handleShowSeriesChange } = (0, _utils.useShowSeriesState)(props);
    const { handleShowTableChange } = (0, _utils.useShowTableState)(props);
    const { handleShowFlameGraphChange } = (0, _utils.useShowFlameGraphState)(props);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                    title: "Misc",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_PaletteSelector.PaletteSelector, {
                        value: value.palette,
                        onChange: handlePaletteChange
                    })
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.OptionsEditorGroup, {
                    title: "Panels to display",
                    children: [
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_SwitchSelector.SwitchSelector, {
                            label: "Show Options",
                            value: value.showSettings,
                            onChange: handleShowSettingsChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_SwitchSelector.SwitchSelector, {
                            label: "Show Series",
                            value: value.showSeries,
                            onChange: handleShowSeriesChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_SwitchSelector.SwitchSelector, {
                            label: "Show Table",
                            value: value.showTable,
                            onChange: handleShowTableChange
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_SwitchSelector.SwitchSelector, {
                            label: "Show Flame Graph",
                            value: value.showFlameGraph,
                            onChange: handleShowFlameGraphChange
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorColumn, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.OptionsEditorGroup, {
                    title: "Reset Settings",
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                        variant: "outlined",
                        color: "secondary",
                        onClick: ()=>(0, _utils.resetSettings)(props),
                        children: "Reset To Defaults"
                    })
                })
            })
        ]
    });
}
