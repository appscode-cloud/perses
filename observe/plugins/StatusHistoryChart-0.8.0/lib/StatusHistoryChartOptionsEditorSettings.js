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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LegendOptionsEditor } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { OptionsEditorGroup, OptionsEditorGrid, OptionsEditorColumn } from '@perses-dev/components';
import { Button } from '@mui/material';
export function StatusHistoryChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleLegendChange = (newLegend)=>{
        // TODO (sjcobb): fix type, add position, fix glitch
        onChange(produce(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(LegendOptionsEditor, {
                    showValuesEditor: false,
                    value: value.legend,
                    onChange: handleLegendChange
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                    title: "Reset Settings",
                    children: /*#__PURE__*/ _jsx(Button, {
                        variant: "outlined",
                        color: "secondary",
                        onClick: ()=>{
                            onChange(produce(value, (draft)=>{
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

//# sourceMappingURL=StatusHistoryChartOptionsEditorSettings.js.map