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
import { DatasourceSelect, isVariableDatasource } from '@perses-dev/plugin-system';
import { useCallback, useEffect, useState } from 'react';
import { DATASOURCE_KIND, DEFAULT_DATASOURCE } from './constants';
import { ClickQLEditor } from '../../components';
import { Stack } from '@mui/material';
import { queryExample } from '../../components/constants';
export function ClickHouseTimeSeriesQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const selectedDatasource = datasource ?? DEFAULT_DATASOURCE;
    const [localQuery, setLocalQuery] = useState(value.query || '');
    const handleDatasourceChange = (newDatasourceSelection)=>{
        if (!isVariableDatasource(newDatasourceSelection) && newDatasourceSelection.kind === DATASOURCE_KIND) {
            onChange({
                ...value,
                datasource: newDatasourceSelection
            });
            return;
        }
        throw new Error('Got unexpected non ClickHouse datasource selection');
    };
    const handleQueryChange = useCallback((newQuery)=>{
        setLocalQuery(newQuery);
    }, []);
    const handleQueryExecute = useCallback((query)=>{
        onChange({
            ...value,
            query
        });
    }, [
        onChange,
        value
    ]);
    useEffect(()=>{
        setLocalQuery(value.query || '');
    }, [
        value.query
    ]);
    const examplesStyle = {
        fontSize: '11px',
        color: '#777',
        backgroundColor: '#f5f5f5',
        padding: '8px',
        borderRadius: '4px',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.3'
    };
    return /*#__PURE__*/ _jsxs(Stack, {
        spacing: 1.5,
        children: [
            /*#__PURE__*/ _jsx(DatasourceSelect, {
                datasourcePluginKind: DATASOURCE_KIND,
                value: selectedDatasource,
                onChange: handleDatasourceChange,
                label: "ClickHouse Datasource",
                notched: true
            }),
            /*#__PURE__*/ _jsx(ClickQLEditor, {
                value: localQuery,
                onChange: handleQueryChange,
                onBlur: ()=>handleQueryExecute(localQuery),
                onKeyDown: (event)=>{
                    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                        event.preventDefault();
                        handleQueryExecute(localQuery);
                    }
                },
                placeholder: "Enter ClickHouse SQL query"
            }),
            /*#__PURE__*/ _jsxs("details", {
                children: [
                    /*#__PURE__*/ _jsx("summary", {
                        style: {
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: '8px'
                        },
                        children: "Query Examples"
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        style: examplesStyle,
                        children: queryExample
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=ClickHouseQueryEditor.js.map