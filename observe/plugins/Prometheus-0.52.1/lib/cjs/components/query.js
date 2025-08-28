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
    useInstantQuery: function() {
        return useInstantQuery;
    },
    useParseQuery: function() {
        return useParseQuery;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _reactquery = require("@tanstack/react-query");
function useParseQuery(content, datasource, enabled) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client && enabled,
        queryKey: [
            'parseQuery',
            content,
            'datasource',
            datasource
        ],
        queryFn: async ()=>{
            const params = {
                query: content
            };
            return await client.parseQuery(params);
        }
    });
}
function useInstantQuery(content, datasource, enabled) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client && enabled,
        // TODO: for some reason the caching is not working: identical nodes still fire their requests after each change made to the promQL
        queryKey: [
            'instantQuery',
            content,
            'datasource',
            datasource.kind
        ],
        queryFn: async ()=>{
            const params = {
                query: content
            };
            const startTime = performance.now();
            const response = await client.instantQuery(params);
            const responseTime = performance.now() - startTime;
            return {
                ...response,
                responseTime
            };
        }
    });
}
