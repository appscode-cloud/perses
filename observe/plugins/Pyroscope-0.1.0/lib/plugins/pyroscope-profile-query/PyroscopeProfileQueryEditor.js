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
import { DatasourceSelect } from '@perses-dev/plugin-system';
import { useId } from '@perses-dev/components';
import { produce } from 'immer';
import { FormControl, InputLabel, Stack, TextField } from '@mui/material';
import { DEFAULT_PYROSCOPE, isDefaultPyroscopeSelector, isPyroscopeDatasourceSelector, PYROSCOPE_DATASOURCE_KIND } from '../../model/pyroscope-selectors';
import { ProfileType, Service, Filters } from '../../components';
import { useMaxNodesState, useProfileTypeState, useServiceState, useFiltersState } from './query-editor-model';
export function PyroscopeProfileQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_PYROSCOPE;
    const datasourceSelectLabelID = useId('pyroscope-datasource-label');
    const { maxNodes, handleMaxNodesChange, maxNodesHasError } = useMaxNodesState(props);
    const { profileType, handleProfileTypeChange } = useProfileTypeState(props);
    const { service, handleServiceChange } = useServiceState(props);
    const { filters, handleFiltersChange } = useFiltersState(props);
    const handleDatasourceChange = (next)=>{
        // Check if the next value is a DatasourceSelector
        if (typeof next === 'object' && 'kind' in next && 'name' in next) {
            if (isPyroscopeDatasourceSelector(next)) {
                onChange(produce(value, (draft)=>{
                    // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                    const nextDatasource = isDefaultPyroscopeSelector(next) ? undefined : next;
                    draft.datasource = nextDatasource;
                }));
                return;
            }
        }
        throw new Error('Got unexpected non-Pyroscope datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                margin: "dense",
                fullWidth: false,
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: datasourceSelectLabelID,
                        shrink: true,
                        children: "Pyroscope Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: PYROSCOPE_DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        labelId: datasourceSelectLabelID,
                        label: "Pyroscope Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                spacing: 0,
                sx: {
                    flexWrap: 'wrap',
                    rowGap: 1,
                    gap: 2
                },
                children: [
                    /*#__PURE__*/ _jsx(Service, {
                        datasource: selectedDatasource,
                        value: service,
                        onChange: handleServiceChange
                    }),
                    /*#__PURE__*/ _jsx(ProfileType, {
                        datasource: selectedDatasource,
                        value: profileType,
                        onChange: handleProfileTypeChange
                    }),
                    /*#__PURE__*/ _jsx(TextField, {
                        size: "small",
                        label: "Max Nodes",
                        value: maxNodes,
                        error: maxNodesHasError,
                        onChange: (e)=>handleMaxNodesChange(e.target.value),
                        sx: {
                            width: '110px'
                        }
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Filters, {
                datasource: selectedDatasource,
                value: filters,
                onChange: handleFiltersChange
            })
        ]
    });
}

//# sourceMappingURL=PyroscopeProfileQueryEditor.js.map