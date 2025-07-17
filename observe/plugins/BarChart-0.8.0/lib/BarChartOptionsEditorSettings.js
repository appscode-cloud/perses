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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@mui/material';
import { FormatControls, ModeSelector, OptionsEditorColumn, OptionsEditorGrid, OptionsEditorGroup, SortSelector } from '@perses-dev/components';
import { DEFAULT_CALCULATION, isPercentUnit } from '@perses-dev/core';
import { CalculationSelector } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import merge from 'lodash/merge';
import { DEFAULT_FORMAT, DEFAULT_MODE, DEFAULT_SORT } from './bar-chart-model';
export function BarChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleCalculationChange = (newCalculation)=>{
        onChange(produce(value, (draft)=>{
            draft.calculation = newCalculation;
        }));
    };
    const handleUnitChange = (newFormat)=>{
        onChange(produce(value, (draft)=>{
            draft.format = newFormat;
        }));
    };
    const handleSortChange = (newSort)=>{
        onChange(produce(value, (draft)=>{
            draft.sort = newSort;
        }));
    };
    const handleModeChange = (newMode)=>{
        onChange(produce(value, (draft)=>{
            draft.mode = newMode;
        }));
    };
    const handleResetSettings = ()=>{
        onChange(produce(value, (draft)=>{
            draft.calculation = DEFAULT_CALCULATION;
            draft.format = DEFAULT_FORMAT;
            draft.sort = DEFAULT_SORT;
            draft.mode = DEFAULT_MODE;
        }));
    };
    // ensures decimalPlaces defaults to correct value
    const format = merge({}, DEFAULT_FORMAT, value.format);
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Misc",
                    children: [
                        /*#__PURE__*/ _jsx(FormatControls, {
                            value: format,
                            onChange: handleUnitChange,
                            disabled: value.mode === 'percentage'
                        }),
                        /*#__PURE__*/ _jsx(CalculationSelector, {
                            value: value.calculation,
                            onChange: handleCalculationChange
                        }),
                        /*#__PURE__*/ _jsx(SortSelector, {
                            value: value.sort,
                            onChange: handleSortChange
                        }),
                        /*#__PURE__*/ _jsx(ModeSelector, {
                            value: value.mode,
                            onChange: handleModeChange,
                            disablePercentageMode: isPercentUnit(format)
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
                        onClick: handleResetSettings,
                        children: "Reset To Defaults"
                    })
                })
            })
        ]
    });
}

//# sourceMappingURL=BarChartOptionsEditorSettings.js.map