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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PyroscopeProfileQueryEditor", {
    enumerable: true,
    get: function() {
        return PyroscopeProfileQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _pluginsystem = require("@perses-dev/plugin-system");
const _components = require("@perses-dev/components");
const _immer = require("immer");
const _material = require("@mui/material");
const _pyroscopeselectors = require("../../model/pyroscope-selectors");
const _components1 = require("../../components");
const _queryeditormodel = require("./query-editor-model");
function PyroscopeProfileQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _pyroscopeselectors.DEFAULT_PYROSCOPE;
    const datasourceSelectLabelID = (0, _components.useId)('pyroscope-datasource-label');
    const { maxNodes, handleMaxNodesChange, maxNodesHasError } = (0, _queryeditormodel.useMaxNodesState)(props);
    const { profileType, handleProfileTypeChange } = (0, _queryeditormodel.useProfileTypeState)(props);
    const { service, handleServiceChange } = (0, _queryeditormodel.useServiceState)(props);
    const { filters, handleFiltersChange } = (0, _queryeditormodel.useFiltersState)(props);
    const handleDatasourceChange = (next)=>{
        // Check if the next value is a DatasourceSelector
        if (typeof next === 'object' && 'kind' in next && 'name' in next) {
            if ((0, _pyroscopeselectors.isPyroscopeDatasourceSelector)(next)) {
                onChange((0, _immer.produce)(value, (draft)=>{
                    // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                    const nextDatasource = (0, _pyroscopeselectors.isDefaultPyroscopeSelector)(next) ? undefined : next;
                    draft.datasource = nextDatasource;
                }));
                return;
            }
        }
        throw new Error('Got unexpected non-Pyroscope datasource selector');
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.FormControl, {
                margin: "dense",
                fullWidth: false,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        id: datasourceSelectLabelID,
                        shrink: true,
                        children: "Pyroscope Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _pyroscopeselectors.PYROSCOPE_DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        labelId: datasourceSelectLabelID,
                        label: "Pyroscope Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                spacing: 0,
                sx: {
                    flexWrap: 'wrap',
                    rowGap: 1,
                    gap: 2
                },
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.Service, {
                        datasource: selectedDatasource,
                        value: service,
                        onChange: handleServiceChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.ProfileType, {
                        datasource: selectedDatasource,
                        value: profileType,
                        onChange: handleProfileTypeChange
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
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
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.Filters, {
                datasource: selectedDatasource,
                value: filters,
                onChange: handleFiltersChange
            })
        ]
    });
}
