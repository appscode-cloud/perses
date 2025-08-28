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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OptionsEditorGroup, OptionsEditorGrid, OptionsEditorColumn } from '@perses-dev/components';
import { Button } from '@mui/material';
import { usePaletteState, useShowSettingsState, useShowSeriesState, useShowTableState, useShowFlameGraphState, resetSettings } from '../utils/utils';
import { PaletteSelector } from './PaletteSelector';
import { SwitchSelector } from './SwitchSelector';
export function FlameChartOptionsEditorSettings(props) {
    const { value } = props;
    const { handlePaletteChange } = usePaletteState(props);
    const { handleShowSettingsChange } = useShowSettingsState(props);
    const { handleShowSeriesChange } = useShowSeriesState(props);
    const { handleShowTableChange } = useShowTableState(props);
    const { handleShowFlameGraphChange } = useShowFlameGraphState(props);
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                    title: "Misc",
                    children: /*#__PURE__*/ _jsx(PaletteSelector, {
                        value: value.palette,
                        onChange: handlePaletteChange
                    })
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Panels to display",
                    children: [
                        /*#__PURE__*/ _jsx(SwitchSelector, {
                            label: "Show Options",
                            value: value.showSettings,
                            onChange: handleShowSettingsChange
                        }),
                        /*#__PURE__*/ _jsx(SwitchSelector, {
                            label: "Show Series",
                            value: value.showSeries,
                            onChange: handleShowSeriesChange
                        }),
                        /*#__PURE__*/ _jsx(SwitchSelector, {
                            label: "Show Table",
                            value: value.showTable,
                            onChange: handleShowTableChange
                        }),
                        /*#__PURE__*/ _jsx(SwitchSelector, {
                            label: "Show Flame Graph",
                            value: value.showFlameGraph,
                            onChange: handleShowFlameGraphChange
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                    title: "Reset Settings",
                    children: /*#__PURE__*/ _jsx(Button, {
                        variant: "outlined",
                        color: "secondary",
                        onClick: ()=>resetSettings(props),
                        children: "Reset To Defaults"
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=FlameChartOptionsEditorSettings.js.map