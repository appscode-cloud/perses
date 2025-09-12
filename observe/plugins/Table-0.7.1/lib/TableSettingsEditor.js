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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Switch, TextField } from '@mui/material';
import { DEFAULT_COLUMN_HEIGHT, DEFAULT_COLUMN_WIDTH, DensitySelector, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup } from '@perses-dev/components';
function DefaultColumnsDimensionsControl({ label, defaultValue, value, onChange }) {
    function handleAutoSwitchChange(_, checked) {
        if (checked) {
            return onChange('auto');
        }
        onChange(defaultValue);
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: `Auto Columns ${label}`,
                control: /*#__PURE__*/ _jsx(Switch, {
                    checked: value === undefined || value === 'auto',
                    onChange: handleAutoSwitchChange
                })
            }),
            value !== undefined && value !== 'auto' && /*#__PURE__*/ _jsx(OptionsEditorControl, {
                label: `Default Columns ${label}`,
                control: /*#__PURE__*/ _jsx(TextField, {
                    type: "number",
                    value: value ?? defaultValue,
                    InputProps: {
                        inputProps: {
                            min: 1,
                            step: 1
                        }
                    },
                    onChange: (e)=>onChange(parseInt(e.target.value))
                })
            })
        ]
    });
}
export function TableSettingsEditor({ onChange, value }) {
    function handleDensityChange(density) {
        onChange({
            ...value,
            density: density
        });
    }
    function handlePaginationChange(_event, newValue) {
        onChange({
            ...value,
            pagination: newValue
        });
    }
    function handleAutoWidthChange(newValue) {
        onChange({
            ...value,
            defaultColumnWidth: newValue
        });
    }
    function handleAutoHeightChange(newValue) {
        onChange({
            ...value,
            defaultColumnHeight: newValue
        });
    }
    return /*#__PURE__*/ _jsx(OptionsEditorGrid, {
        children: /*#__PURE__*/ _jsx(OptionsEditorColumn, {
            children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                title: "Display",
                children: [
                    /*#__PURE__*/ _jsx(DensitySelector, {
                        value: value.density,
                        onChange: handleDensityChange
                    }),
                    /*#__PURE__*/ _jsx(OptionsEditorControl, {
                        label: "Pagination",
                        control: /*#__PURE__*/ _jsx(Switch, {
                            checked: !!value.pagination,
                            onChange: handlePaginationChange
                        })
                    }),
                    /*#__PURE__*/ _jsx(DefaultColumnsDimensionsControl, {
                        label: "Width",
                        defaultValue: DEFAULT_COLUMN_WIDTH,
                        value: value.defaultColumnWidth,
                        onChange: handleAutoWidthChange
                    }),
                    /*#__PURE__*/ _jsx(DefaultColumnsDimensionsControl, {
                        label: "Height",
                        defaultValue: DEFAULT_COLUMN_HEIGHT,
                        value: value.defaultColumnHeight,
                        onChange: handleAutoHeightChange
                    })
                ]
            })
        })
    });
}

//# sourceMappingURL=TableSettingsEditor.js.map