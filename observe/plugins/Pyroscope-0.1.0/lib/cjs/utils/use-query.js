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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    filterLabelNamesOptions: function() {
        return filterLabelNamesOptions;
    },
    useLabelNames: function() {
        return useLabelNames;
    },
    useLabelValues: function() {
        return useLabelValues;
    },
    useProfileTypes: function() {
        return useProfileTypes;
    },
    useServices: function() {
        return useServices;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _reactquery = require("@tanstack/react-query");
function useLabelNames(datasource) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'searchLabelNames',
            'datasource',
            datasource
        ],
        queryFn: async ()=>{
            return await client.searchLabelNames({}, {
                'content-type': 'application/json'
            }, {});
        }
    });
}
function useLabelValues(datasource, labelName) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'searchLabelValues',
            labelName,
            'datasource',
            datasource
        ],
        queryFn: async ()=>{
            return await client.searchLabelValues({}, {
                'content-type': 'application/json'
            }, {
                name: labelName
            });
        }
    });
}
function useProfileTypes(datasource) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'searchProfileTypes',
            'datasource',
            datasource
        ],
        queryFn: async ()=>{
            return await client.searchProfileTypes({}, {
                'content-type': 'application/json'
            }, {});
        }
    });
}
function useServices(datasource) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'searchServices',
            'datasource',
            datasource
        ],
        queryFn: async ()=>{
            return await client.searchServices({}, {
                'content-type': 'application/json'
            });
        }
    });
}
function filterLabelNamesOptions(labelNamesOptions) {
    const regex = /^__.*__$/;
    return labelNamesOptions.filter((labelName)=>!regex.test(labelName) && labelName !== 'service_name');
}
