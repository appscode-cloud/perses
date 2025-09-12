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
import { FormControl, Stack, TextField } from '@mui/material';
import { useId } from '@perses-dev/components';
import { DatasourceSelect, useDatasourceClient, useDatasourceSelectValueToSelector, useTimeRange } from '@perses-dev/plugin-system';
import { produce } from 'immer';
import { useMemo } from 'react';
import { TraceQLEditor } from '../../components';
import { DEFAULT_TEMPO, isDefaultTempoSelector, isTempoDatasourceSelector, TEMPO_DATASOURCE_KIND } from '../../model/tempo-selectors';
import { useLimitState, useQueryState } from './query-editor-model';
export function TempoTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? DEFAULT_TEMPO;
    const selectedDatasource = useDatasourceSelectValueToSelector(datasourceSelectValue, TEMPO_DATASOURCE_KIND);
    const datasourceSelectLabelID = useId('tempo-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const { data: client } = useDatasourceClient(selectedDatasource);
    const { timeRange } = useTimeRange();
    const completionConfig = useMemo(()=>{
        return {
            client,
            timeRange
        };
    }, [
        client,
        timeRange
    ]);
    const { query, handleQueryChange, handleQueryBlur } = useQueryState(props);
    const { limit, handleLimitChange, handleLimitBlur, limitHasError } = useLimitState(props);
    const handleDatasourceChange = (next)=>{
        if (isTempoDatasourceSelector(next)) {
            onChange(produce(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = isDefaultTempoSelector(next) ? undefined : next;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non-Tempo datasource selector');
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ _jsx(FormControl, {
                margin: "dense",
                fullWidth: false,
                children: /*#__PURE__*/ _jsx(DatasourceSelect, {
                    datasourcePluginKind: TEMPO_DATASOURCE_KIND,
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    labelId: datasourceSelectLabelID,
                    label: "Tempo Datasource",
                    notched: true
                })
            }),
            /*#__PURE__*/ _jsxs(Stack, {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ _jsx(TraceQLEditor, {
                        completionConfig: completionConfig,
                        value: query,
                        onChange: handleQueryChange,
                        onBlur: handleQueryBlur
                    }),
                    /*#__PURE__*/ _jsx(TextField, {
                        size: "small",
                        label: "Max Traces",
                        value: limit,
                        error: limitHasError,
                        onChange: (e)=>handleLimitChange(e.target.value),
                        onBlur: handleLimitBlur,
                        sx: {
                            width: '110px'
                        }
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=TempoTraceQueryEditor.js.map