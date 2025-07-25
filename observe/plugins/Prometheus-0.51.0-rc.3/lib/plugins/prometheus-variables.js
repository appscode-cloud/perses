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
import { FormControl, InputLabel, Stack, TextField } from '@mui/material';
import { DatasourceSelect, useDatasourceClient } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { PromQLEditor } from '../components';
import { DEFAULT_PROM, isDefaultPromSelector, isPrometheusDatasourceSelector, PROM_DATASOURCE_KIND } from '../model';
import { MatcherEditor } from './MatcherEditor';
export function PrometheusLabelValuesVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_PROM;
    const handleDatasourceChange = (next)=>{
        if (isPrometheusDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = isDefaultPromSelector(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                margin: "dense",
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: "PrometheusDatasource",
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        readOnly: props.isReadonly,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(TextField, {
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
            /*#__PURE__*/ _jsx(MatcherEditor, {
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
export function PrometheusLabelNamesVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_PROM;
    const handleDatasourceChange = (next)=>{
        if (isPrometheusDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = isDefaultPromSelector(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                margin: "dense",
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: "PrometheusDatasource",
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        disabled: props.isReadonly,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource"
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(MatcherEditor, {
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
export function PrometheusPromQLVariableEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_PROM;
    const { data: client } = useDatasourceClient(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const handleDatasourceChange = (next)=>{
        if (isPrometheusDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                draft.datasource = isDefaultPromSelector(next) ? undefined : next;
            }));
            return;
        }
        throw new Error('Got unexpected non-Prometheus datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsxs(FormControl, {
                margin: "dense",
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: "prom-datasource-label",
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: PROM_DATASOURCE_KIND,
                        value: selectedDatasource,
                        onChange: handleDatasourceChange,
                        labelId: "prom-datasource-label",
                        label: "Prometheus Datasource",
                        disabled: props.isReadonly
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(PromQLEditor, {
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
            /*#__PURE__*/ _jsx(TextField, {
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
export function capturingMatrix(matrix, labelName) {
    const captured = new Set();
    for (const sample of matrix.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
export function capturingVector(vector, labelName) {
    const captured = new Set();
    for (const sample of vector.result){
        const value = sample.metric[labelName];
        if (value !== undefined) {
            captured.add(value);
        }
    }
    return Array.from(captured.values());
}
/**
 * Takes a list of strings and returns a list of VariableOptions
 */ export const stringArrayToVariableOptions = (values)=>{
    if (!values) return [];
    return values.map((value)=>({
            value,
            label: value
        }));
};

//# sourceMappingURL=prometheus-variables.js.map