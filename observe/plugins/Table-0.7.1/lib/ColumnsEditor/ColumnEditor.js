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
import { Button, ButtonGroup, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { AlignSelector, FormatControls, OptionsEditorColumn, OptionsEditorControl, OptionsEditorGrid, OptionsEditorGroup, SortSelectorButtons } from '@perses-dev/components';
import { PluginKindSelect } from '@perses-dev/plugin-system';
const DEFAULT_FORMAT = {
    unit: 'decimal',
    shortValues: true
};
export function ColumnEditor({ column, onChange, ...others }) {
    const [width, setWidth] = useState(column.width === undefined || column.width === 'auto' ? 100 : column.width);
    return /*#__PURE__*/ _jsxs(OptionsEditorGrid, {
        ...others,
        children: [
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Column",
                    children: [
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Name*",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                value: column.name,
                                onChange: (e)=>onChange({
                                        ...column,
                                        name: e.target.value
                                    }),
                                required: true
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Header",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                value: column.header ?? '',
                                onChange: (e)=>onChange({
                                        ...column,
                                        header: e.target.value ? e.target.value : undefined
                                    })
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Header Tooltip",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                value: column.headerDescription ?? '',
                                onChange: (e)=>onChange({
                                        ...column,
                                        headerDescription: e.target.value ? e.target.value : undefined
                                    })
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Cell Tooltip",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                value: column.cellDescription ?? '',
                                onChange: (e)=>onChange({
                                        ...column,
                                        cellDescription: e.target.value ? e.target.value : undefined
                                    })
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Enable sorting",
                            control: /*#__PURE__*/ _jsx(Switch, {
                                checked: column.enableSorting ?? false,
                                onChange: (e)=>onChange({
                                        ...column,
                                        enableSorting: e.target.checked
                                    })
                            })
                        }),
                        column.enableSorting && /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Default Sort",
                            control: /*#__PURE__*/ _jsx(SortSelectorButtons, {
                                size: "medium",
                                value: column.sort,
                                sx: {
                                    margin: 0.5
                                },
                                onChange: (sort)=>onChange({
                                        ...column,
                                        sort: sort
                                    })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx(OptionsEditorColumn, {
                children: /*#__PURE__*/ _jsxs(OptionsEditorGroup, {
                    title: "Visual",
                    children: [
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Show column",
                            control: /*#__PURE__*/ _jsx(Switch, {
                                checked: !(column.hide ?? false),
                                onChange: (e)=>onChange({
                                        ...column,
                                        hide: !e.target.checked
                                    })
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Display",
                            control: /*#__PURE__*/ _jsxs(ButtonGroup, {
                                "aria-label": "Display",
                                size: "small",
                                children: [
                                    /*#__PURE__*/ _jsx(Button, {
                                        variant: !column.plugin ? 'contained' : 'outlined',
                                        onClick: ()=>onChange({
                                                ...column,
                                                plugin: undefined
                                            }),
                                        children: "Text"
                                    }),
                                    /*#__PURE__*/ _jsx(Button, {
                                        variant: column.plugin ? 'contained' : 'outlined',
                                        onClick: ()=>onChange({
                                                ...column,
                                                plugin: {
                                                    kind: 'StatChart',
                                                    spec: {}
                                                }
                                            }),
                                        children: "Embedded Panel"
                                    })
                                ]
                            })
                        }),
                        column.plugin ? /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Panel Type",
                            control: /*#__PURE__*/ _jsx(PluginKindSelect, {
                                pluginTypes: [
                                    'Panel'
                                ],
                                value: {
                                    type: 'Panel',
                                    kind: column.plugin.kind
                                },
                                onChange: (event)=>onChange({
                                        ...column,
                                        plugin: {
                                            kind: event.kind,
                                            spec: {}
                                        }
                                    })
                            })
                        }) : /*#__PURE__*/ _jsx(FormatControls, {
                            value: column.format ?? DEFAULT_FORMAT,
                            onChange: (newFormat)=>onChange({
                                    ...column,
                                    format: newFormat
                                })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Alignment",
                            control: /*#__PURE__*/ _jsx(AlignSelector, {
                                size: "small",
                                value: column.align ?? 'left',
                                onChange: (align)=>onChange({
                                        ...column,
                                        align: align
                                    })
                            })
                        }),
                        /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Custom width",
                            control: /*#__PURE__*/ _jsx(Switch, {
                                checked: column.width !== undefined && column.width !== 'auto',
                                onChange: (e)=>onChange({
                                        ...column,
                                        width: e.target.checked ? width : 'auto'
                                    })
                            })
                        }),
                        column.width !== undefined && column.width !== 'auto' && /*#__PURE__*/ _jsx(OptionsEditorControl, {
                            label: "Width",
                            control: /*#__PURE__*/ _jsx(TextField, {
                                type: "number",
                                value: width,
                                slotProps: {
                                    htmlInput: {
                                        min: 1
                                    }
                                },
                                onChange: (e)=>{
                                    setWidth(+e.target.value);
                                    onChange({
                                        ...column,
                                        width: +e.target.value
                                    });
                                }
                            })
                        })
                    ]
                })
            })
        ]
    });
}

//# sourceMappingURL=ColumnEditor.js.map