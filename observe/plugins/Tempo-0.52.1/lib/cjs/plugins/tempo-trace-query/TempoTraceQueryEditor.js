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
Object.defineProperty(exports, "TempoTraceQueryEditor", {
    enumerable: true,
    get: function() {
        return TempoTraceQueryEditor;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _material = require("@mui/material");
const _components = require("@perses-dev/components");
const _pluginsystem = require("@perses-dev/plugin-system");
const _immer = require("immer");
const _react = require("react");
const _components1 = require("../../components");
const _temposelectors = require("../../model/tempo-selectors");
const _queryeditormodel = require("./query-editor-model");
function TempoTraceQueryEditor(props) {
    const { onChange, value } = props;
    const { datasource } = value;
    const datasourceSelectValue = datasource ?? _temposelectors.DEFAULT_TEMPO;
    const selectedDatasource = (0, _pluginsystem.useDatasourceSelectValueToSelector)(datasourceSelectValue, _temposelectors.TEMPO_DATASOURCE_KIND);
    const datasourceSelectLabelID = (0, _components.useId)('tempo-datasource-label'); // for panels with multiple queries, this component is rendered multiple times on the same page
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(selectedDatasource);
    const { timeRange } = (0, _pluginsystem.useTimeRange)();
    const completionConfig = (0, _react.useMemo)(()=>{
        return {
            client,
            timeRange
        };
    }, [
        client,
        timeRange
    ]);
    const { query, handleQueryChange, handleQueryBlur } = (0, _queryeditormodel.useQueryState)(props);
    const { limit, handleLimitChange, handleLimitBlur, limitHasError } = (0, _queryeditormodel.useLimitState)(props);
    const handleDatasourceChange = (next)=>{
        if ((0, _temposelectors.isTempoDatasourceSelector)(next)) {
            onChange((0, _immer.produce)(value, (draft)=>{
                // If they're using the default, just omit the datasource prop (i.e. set to undefined)
                const nextDatasource = (0, _temposelectors.isDefaultTempoSelector)(next) ? undefined : next;
                draft.datasource = nextDatasource;
            }));
            return;
        }
        throw new Error('Got unexpected non-Tempo datasource selector');
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
        spacing: 2,
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.FormControl, {
                margin: "dense",
                fullWidth: false,
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_pluginsystem.DatasourceSelect, {
                    datasourcePluginKind: _temposelectors.TEMPO_DATASOURCE_KIND,
                    value: datasourceSelectValue,
                    onChange: handleDatasourceChange,
                    labelId: datasourceSelectLabelID,
                    label: "Tempo Datasource",
                    notched: true
                })
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_material.Stack, {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_components1.TraceQLEditor, {
                        completionConfig: completionConfig,
                        value: query,
                        onChange: handleQueryChange,
                        onBlur: handleQueryBlur
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_material.TextField, {
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
