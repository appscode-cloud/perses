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
import { produce } from 'immer';
import { OptionsEditorGroup, OptionsEditorGrid, OptionsEditorColumn, ThresholdsEditor } from '@perses-dev/components';
import { LegendOptionsEditor } from '@perses-dev/plugin-system';
import { DEFAULT_VISUAL, DEFAULT_Y_AXIS } from './time-series-chart-model';
import { VisualOptionsEditor } from './VisualOptionsEditor';
import { YAxisOptionsEditor } from './YAxisOptionsEditor';
import { QuerySettingsEditor } from './QuerySettingsEditor';
export function TimeSeriesChartOptionsEditorSettings(props) {
    const { onChange, value } = props;
    const handleLegendChange = (newLegend)=>{
        // TODO (sjcobb): fix type, add position, fix glitch
        onChange(produce(value, (draft)=>{
            draft.legend = newLegend;
        }));
    };
    const handleVisualChange = (newVisual)=>{
        onChange(produce(value, (draft)=>{
            draft.visual = newVisual;
        }));
    };
    const handleYAxisChange = (newYAxis)=>{
        onChange(produce(value, (draft)=>{
            draft.yAxis = newYAxis;
        }));
    };
    const handleQuerySettingsChange = (newQuerySettings)=>{
        onChange(produce(value, (draft)=>{
            draft.querySettings = newQuerySettings;
        }));
    };
    const handleThresholdsChange = (thresholds)=>{
        onChange(produce(value, (draft)=>{
            draft.thresholds = thresholds;
        }));
    };
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        children: [
            /*#__PURE__*/ _jsxs(OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ _jsx(LegendOptionsEditor, {
                        value: value.legend,
                        onChange: handleLegendChange
                    }),
                    /*#__PURE__*/ _jsx(VisualOptionsEditor, {
                        value: value.visual ?? DEFAULT_VISUAL,
                        onChange: handleVisualChange
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsx(YAxisOptionsEditor, {
                    value: value.yAxis ?? DEFAULT_Y_AXIS,
                    onChange: handleYAxisChange
                })
            }),
            /*#__PURE__*/ _jsxs(OptionsEditorColumn, {
                children: [
                    /*#__PURE__*/ _jsx(ThresholdsEditor, {
                        hideDefault: true,
                        thresholds: value.thresholds,
                        onChange: handleThresholdsChange
                    }),
                    /*#__PURE__*/ _jsx(QuerySettingsEditor, {
                        querySettingsList: value.querySettings,
                        onChange: handleQuerySettingsChange
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorGroup, {
                        title: "Reset Settings",
                        children: /*#__PURE__*/ _jsx(Button, {
                            variant: "outlined",
                            color: "secondary",
                            onClick: ()=>{
                                onChange(produce(value, (draft)=>{
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

//# sourceMappingURL=TimeSeriesChartOptionsEditorSettings.js.map