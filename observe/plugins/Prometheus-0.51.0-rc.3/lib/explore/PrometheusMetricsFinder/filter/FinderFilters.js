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
import { Button, FormControl, InputLabel, Stack } from '@mui/material';
import { DatasourceSelect, datasourceSelectValueToSelector, useListDatasourceSelectItems } from '@perses-dev/plugin-system';
import PlusIcon from 'mdi-material-ui/Plus';
import { PROM_DATASOURCE_KIND } from '../../../model/prometheus-selectors';
import { LabelFilterInput } from './FilterInputs';
export function FinderFilters({ datasource, filters, filteredFilters, onDatasourceChange, onFiltersChange, ...props }) {
    const { data } = useListDatasourceSelectItems(PROM_DATASOURCE_KIND);
    function handleDatasourceChange(next) {
        const datasourceSelector = datasourceSelectValueToSelector(next, {}, data) ?? {
            kind: PROM_DATASOURCE_KIND
        };
        onDatasourceChange(datasourceSelector);
    }
    return /*#__PURE__*/ _jsxs(Stack, {
        ...props,
        direction: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: PROM_DATASOURCE_KIND,
                        value: datasource,
                        onChange: handleDatasourceChange,
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            filters.map((filter, index)=>/*#__PURE__*/ _jsx(LabelFilterInput, {
                    datasource: datasource,
                    filters: filteredFilters,
                    value: filter,
                    onChange: (next)=>{
                        const nextFilters = [
                            ...filters
                        ];
                        nextFilters[index] = next;
                        onFiltersChange(nextFilters);
                    },
                    onDelete: ()=>{
                        const nextFilters = [
                            ...filters
                        ];
                        nextFilters.splice(index, 1);
                        onFiltersChange(nextFilters);
                    }
                }, index)),
            /*#__PURE__*/ _jsx(Button, {
                startIcon: /*#__PURE__*/ _jsx(PlusIcon, {}),
                "aria-label": "add filter",
                onClick: ()=>{
                    onFiltersChange([
                        ...filters,
                        {
                            label: '',
                            labelValues: [],
                            operator: '=~'
                        }
                    ]);
                },
                children: "Add filter"
            })
        ]
    });
}

//# sourceMappingURL=FinderFilters.js.map