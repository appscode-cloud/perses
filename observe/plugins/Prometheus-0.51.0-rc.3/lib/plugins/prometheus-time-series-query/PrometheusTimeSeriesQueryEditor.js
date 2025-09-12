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
import { produce } from 'immer';
import { DatasourceSelect, useDatasource, useDatasourceClient, useDatasourceSelectValueToSelector } from '@perses-dev/plugin-system';
import { useId } from '@perses-dev/components';
import { FormControl, InputLabel, Stack, TextField } from '@mui/material';
import { DEFAULT_PROM, isDefaultPromSelector, isPrometheusDatasourceSelector, PROM_DATASOURCE_KIND } from '../../model';
import { DEFAULT_SCRAPE_INTERVAL } from '../types';
import { PromQLEditor } from '../../components';
import { useQueryState, useFormatState, useMinStepState } from './query-editor-model';
/**
 * The options editor component for editing a PrometheusTimeSeriesQuery's spec.
 */ export function PrometheusTimeSeriesQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? DEFAULT_PROM;
    const datasourceSelectLabelID = useId('prom-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, PROM_DATASOURCE_KIND);
    const { data: client } = useDatasourceClient(selectedDatasource);
    const promURL = client?.options.datasourceUrl;
    const { data: datasourceResource } = useDatasource(selectedDatasource);
    const { handleQueryChange, handleQueryBlur } = useQueryState(props);
    const { format, handleFormatChange, handleFormatBlur } = useFormatState(props);
    const { minStep, handleMinStepChange, handleMinStepBlur } = useMinStepState(props);
    const minStepPlaceholder = minStep ?? (datasourceResource && (datasourceResource?.plugin.spec).scrapeInterval) ?? DEFAULT_SCRAPE_INTERVAL;
    const handleDatasourceChange = (next)=>{
        if (isPrometheusDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = isDefaultPromSelector(next) ? undefined : next;
                draft.datasource = nextDatasource;
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
                fullWidth: false,
                children: [
                    /*#__PURE__*/ _jsx(InputLabel, {
                        id: datasourceSelectLabelID,
                        shrink: true,
                        children: "Prometheus Datasource"
                    }),
                    /*#__PURE__*/ _jsx(DatasourceSelect, {
                        datasourcePluginKind: PROM_DATASOURCE_KIND,
                        value: datasourceSelectValue,
                        onChange: handleDatasourceChange,
                        labelId: datasourceSelectLabelID,
                        label: "Prometheus Datasource",
                        notched: true
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(PromQLEditor, {
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
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ _jsx(TextField, {
                        fullWidth: true,
                        label: "Legend",
                        placeholder: "Example: '{{instance}}' will generate series names like 'webserver-123', 'webserver-456'...",
                        helperText: "Text to be displayed in the legend and the tooltip. Use {{label_name}} to interpolate label values.",
                        value: format ?? '',
                        onChange: (e)=>handleFormatChange(e.target.value),
                        onBlur: handleFormatBlur
                    }),
                    /*#__PURE__*/ _jsx(TextField, {
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

//# sourceMappingURL=PrometheusTimeSeriesQueryEditor.js.map