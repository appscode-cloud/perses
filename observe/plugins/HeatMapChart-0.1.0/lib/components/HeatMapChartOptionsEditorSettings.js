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
import { Switch } from '@mui/material';
import { FormatControls, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup } from '@perses-dev/components';
import { produce } from 'immer';
import merge from 'lodash/merge';
import { DEFAULT_FORMAT } from '../heat-map-chart-model';
export function HeatMapChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleYAxisFormatChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.yAxisFormat = newFormat;
        }));
    };
    const handleCountFormatChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.countFormat = newFormat;
        }));
    };
    const handleShowVisualMapChange = (_, checked)=>{
        onChange(produce(value, (draft)=>{
            draft.showVisualMap = checked;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const yAxisFormat = merge({}, DEFAULT_FORMAT, value.yAxisFormat);
    const countFormat = merge({}, DEFAULT_FORMAT, value.countFormat);
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Bucket Count",
                    children: [
                        /*#__PURE__*/ _jsx(FormatControls, {
                            value: countFormat,
                            onChange: handleCountFormatChange
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Show Visual Map",
                            control: /*#__PURE__*/ _jsx(Switch, {
                                checked: !!value.showVisualMap,
                                onChange: handleShowVisualMapChange
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                    title: "Y Axis",
                    children: /*#__PURE__*/ _jsx(FormatControls, {
                        value: yAxisFormat,
                        onChange: handleYAxisFormatChange
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=HeatMapChartOptionsEditorSettings.js.map