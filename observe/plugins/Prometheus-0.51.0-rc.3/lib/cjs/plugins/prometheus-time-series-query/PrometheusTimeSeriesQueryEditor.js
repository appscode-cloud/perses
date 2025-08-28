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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrometheusTimeSeriesQueryEditor", {
    enumerable: true,
    get: function() {
        return PrometheusTimeSeriesQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _immer = require("immer");
const _pluginsystem = require("@perses-dev/plugin-system");
const _components = require("@perses-dev/components");
const _material = require("@mui/material");
const _model = require("../../model");
const _types = require("../types");
const _components1 = require("../../components");
const _queryeditormodel = require("./query-editor-model");
function PrometheusTimeSeriesQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? _model.DEFAULT_PROM;
    const datasourceSelectLabelID = (0, _components.useId)('prom-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _model.PROM_DATASOURCE_KIND);
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const { data: datasourceResource } = (0, _pluginsystem.useDatasource)(selectedDatasource);
    const { handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    const { format, handleFormatChange, handleFormatBlur } = (0, _queryeditormodel.useFormatState)(props);
    const { minStep, handleMinStepChange, handleMinStepBlur } = (0, _queryeditormodel.useMinStepState)(props);
    const minStepPlaceholder = minStep ?? (datasourceResource && (datasourceResource?.plugin.spec).scrapeInterval) ?? _types.DEFAULT_SCRAPE_INTERVAL;
    const handleDatasourceChange = (next)=>{
        if ((0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = (0, _model.isDefaultPromSelector)(next) ? undefined : next;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
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
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _model.PROM_DATASOURCE_KIND,
                        value: datasourceSelectValue,
                        onChange: handleDatasourceChange,
                        labelId: datasourceSelectLabelID,
                        label: "Prometheus Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.PromQLEditor, {
                completeConfig: {
                    remote: {
                        url: promURL
                    }
                },
                value: value.query,
                datasource: selectedDatasource,
                onChange: handleQueryChange,
                onBlur: handleQueryBlur
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                        fullWidth: true,
                        label: "Legend",
                        placeholder: "Example: '{{instance}}' will generate series names like 'webserver-123', 'webserver-456'...",
                        helperText: "Text to be displayed in the legend and the tooltip. Use {{label_name}} to interpolate label values.",
                        value: format ?? '',
                        onChange: (e)=>handleFormatChange(e.target.value),
                        onBlur: handleFormatBlur
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                        label: "Min Step",
                        placeholder: minStepPlaceholder,
                        helperText: "Lower bound for the step. If not provided, the scrape interval of the datasource is used.",
                        value: minStep,
                        onChange: (e)=>handleMinStepChange(e.target.value),
                        onBlur: handleMinStepBlur,
                        sx: {
                            width: '250px'
                        }
                    })
                ]
            })
        ]
    });
}
