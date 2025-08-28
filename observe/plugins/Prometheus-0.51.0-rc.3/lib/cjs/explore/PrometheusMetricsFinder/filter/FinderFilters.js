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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FinderFilters", {
    enumerable: true,
    get: function() {
        return FinderFilters;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _Plus = /*#__PURE__*/ _interop_require_default(require("mdi-material-ui/Plus"));
const _prometheusselectors = require("../../../model/prometheus-selectors");
const _FilterInputs = require("./FilterInputs");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function FinderFilters({ datasource, filters, filteredFilters, onDatasourceChange, onFiltersChange, ...props }) {
    const { data } = (0, _pluginsystem.useListDatasourceSelectItems)(_prometheusselectors.PROM_DATASOURCE_KIND);
    function handleDatasourceChange(next) {
        const datasourceSelector = (0, _pluginsystem.datasourceSelectValueToSelector)(next, {}, data) ?? {
            kind: _prometheusselectors.PROM_DATASOURCE_KIND
        };
        onDatasourceChange(datasourceSelector);
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        ...props,
        direction: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        sx: {
            width: '100%'
        },
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.FormControl, {
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _prometheusselectors.PROM_DATASOURCE_KIND,
                        value: datasource,
                        onChange: handleDatasourceChange,
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            filters.map((filter, index)=>/*#__PURE__*/ (0, _jsxruntime.jsx)(_FilterInputs.LabelFilterInput, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.Button, {
                startIcon: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Plus.default, {}),
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
