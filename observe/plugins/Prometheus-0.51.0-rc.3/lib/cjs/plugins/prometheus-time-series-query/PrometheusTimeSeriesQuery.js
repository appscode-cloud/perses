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
Object.defineProperty(exports, "PrometheusTimeSeriesQuery", {
    enumerable: true,
    get: function() {
        return PrometheusTimeSeriesQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _gettimeseriesdata = require("./get-time-series-data");
const _PrometheusTimeSeriesQueryEditor = require("./PrometheusTimeSeriesQueryEditor");
const PrometheusTimeSeriesQuery = {
    getTimeSeriesData: _gettimeseriesdata.getTimeSeriesData,
    OptionsEditorComponent: _PrometheusTimeSeriesQueryEditor.PrometheusTimeSeriesQueryEditor,
    createInitialOptions: ()=>({
            query: '',
            datasource: undefined
        }),
    dependsOn: (spec)=>{
        // Variables can be used in the query and/or in the legend format string
        const queryVariables = (0, _pluginsystem.parseVariables)(spec.query);
        const legendVariables = (0, _pluginsystem.parseVariables)(spec.seriesNameFormat || '');
        const datasourceVariable = (0, _pluginsystem.isVariableDatasource)(spec.datasource) ? (0, _pluginsystem.parseVariables)(spec.datasource ?? '') : [];
        const allVariables = [
            ...new Set([
                ...queryVariables,
                ...legendVariables,
                ...datasourceVariable
            ])
        ];
        return {
            variables: allVariables
        };
    }
};
