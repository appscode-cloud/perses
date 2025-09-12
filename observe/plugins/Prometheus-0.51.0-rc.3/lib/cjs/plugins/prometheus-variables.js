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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrometheusLabelNamesVariableEditor: function() {
        return PrometheusLabelNamesVariableEditor;
    },
    PrometheusLabelValuesVariableEditor: function() {
        return PrometheusLabelValuesVariableEditor;
    },
    PrometheusPromQLVariableEditor: function() {
        return PrometheusPromQLVariableEditor;
    },
    capturingMatrix: function() {
        return capturingMatrix;
    },
    capturingVector: function() {
        return capturingVector;
    },
    stringArrayToVariableOptions: function() {
        return stringArrayToVariableOptions;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _components = require("../components");
const _model = require("../model");
const _MatcherEditor = require("./MatcherEditor");
function PrometheusLabelValuesVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _model.DEFAULT_PROM;
    const handleDatasourceChange = (next)=>{
        if ((0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = (0, _model.isDefaultPromSelector)(next) ? undefined : next;
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
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: "PrometheusDatasource",
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        readOnly: props.isReadonly,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                label: "Label Name",
                required: true,
                value: props.value.labelName,
                onChange: (e)=>{
                    props.onChange({
                        ...props.value,
                        labelName: e.target.value
                    });
                },
                InputProps: {
                    readOnly: props.isReadonly
                }
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_MatcherEditor.MatcherEditor, {
                matchers: props.value.matchers ?? [],
                onChange: (e)=>{
                    props.onChange({
                        ...props.value,
                        matchers: e
                    });
                },
                isReadonly: props.isReadonly
            })
        ]
    });
}
function PrometheusLabelNamesVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _model.DEFAULT_PROM;
    const handleDatasourceChange = (next)=>{
        if ((0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = (0, _model.isDefaultPromSelector)(next) ? undefined : next;
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
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: "PrometheusDatasource",
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        disabled: props.isReadonly,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_MatcherEditor.MatcherEditor, {
                matchers: props.value.matchers ?? [],
                isReadonly: props.isReadonly,
                onChange: (e)=>{
                    props.onChange({
                        ...props.value,
                        matchers: e
                    });
                }
            })
        ]
    });
}
function PrometheusPromQLVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? _model.DEFAULT_PROM;
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const handleDatasourceChange = (next)=>{
        if ((0, _model.isPrometheusDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = (0, _model.isDefaultPromSelector)(next) ? undefined : next;
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
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                        datasourcePluginKind: _model.PROM_DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource",
                        disabled: props.isReadonly
                    })
                ]
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.PromQLEditor, {
                completeConfig: {
                    remote: {
                        url: promURL
                    }
                },
                value: value.expr,
                datasource: selectedDatasource,
                onBlur: (event)=>{
                    props.onChange({
                        ...props.value,
                        expr: event.target.textContent ?? ''
                    });
                },
                readOnly: props.isReadonly,
                width: "100%"
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
                label: "Label Name",
                value: props.value.labelName,
                InputProps: {
                    readOnly: props.isReadonly
                },
                onChange: (e)=>{
                    props.onChange({
                        ...props.value,
                        labelName: e.target.value
                    });
                }
            })
        ]
    });
}
function capturingMatrix(matrix, labelName) {
    const captured = new Set();
    for (const sample of matrix.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
function capturingVector(vector, labelName) {
    const captured = new Set();
    for (const sample of vector.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
const stringArrayToVariableOptions = (values)=>{
    if (!values) return [];
    return values.map((value)=>({
            value,
            label: value
        }));
};
