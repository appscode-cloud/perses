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
Object.defineProperty(exports, "TempoTraceQuery", {
    enumerable: true,
    get: function() {
        return TempoTraceQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _gettracedata = require("./get-trace-data");
const _TempoTraceQueryEditor = require("./TempoTraceQueryEditor");
const TempoTraceQuery = {
    getTraceData: _gettracedata.getTraceData,
    OptionsEditorComponent: _TempoTraceQueryEditor.TempoTraceQueryEditor,
    createInitialOptions: ()=>({
            query: '',
            limit: 20,
            datasource: undefined
        }),
    dependsOn: (spec)=>{
        const datasourceVariables = (0, _pluginsystem.isVariableDatasource)(spec.datasource) ? (0, _pluginsystem.parseVariables)(spec.datasource ?? '') : [];
        return {
            variables: [
                ...datasourceVariables
            ]
        };
    }
};
