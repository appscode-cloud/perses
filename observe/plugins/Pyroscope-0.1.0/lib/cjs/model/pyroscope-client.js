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
    executeRequest: function() {
        return executeRequest;
    },
    searchLabelNames: function() {
        return searchLabelNames;
    },
    searchLabelValues: function() {
        return searchLabelValues;
    },
    searchProfileTypes: function() {
        return searchProfileTypes;
    },
    searchProfiles: function() {
        return searchProfiles;
    },
    searchServices: function() {
        return searchServices;
    }
});
const _core = require("@perses-dev/core");
const executeRequest = async (...args)=>{
    const response = await (0, _core.fetch)(...args);
    try {
        return await response.json();
    } catch (e) {
        console.error('Invalid response from server', e);
        throw new Error('Invalid response from server');
    }
};
function fetchWithGet(apiURI, params, queryOptions) {
    const { datasourceUrl, headers = {} } = queryOptions;
    let url = `${datasourceUrl}${apiURI}`;
    if (params) {
        url += '?' + new URLSearchParams(params);
    }
    const init = {
        method: 'GET',
        headers
    };
    return executeRequest(url, init);
}
function fetchWithPost(apiURI, params, queryOptions, body) {
    const { datasourceUrl, headers = {} } = queryOptions;
    let url = `${datasourceUrl}${apiURI}`;
    if (params) {
        url += '?' + new URLSearchParams(params);
    }
    const init = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    return executeRequest(url, init);
}
function searchProfiles(params, queryOptions) {
    return fetchWithGet('/pyroscope/render', params, queryOptions);
}
function searchProfileTypes(params, queryOptions, body) {
    return fetchWithPost('/querier.v1.QuerierService/ProfileTypes', params, queryOptions, body);
}
function searchLabelNames(params, queryOptions, body) {
    return fetchWithPost('/querier.v1.QuerierService/LabelNames', params, queryOptions, body);
}
function searchLabelValues(params, queryOptions, body) {
    return fetchWithPost('/querier.v1.QuerierService/LabelValues', params, queryOptions, body);
}
function searchServices(params, queryOptions) {
    return fetchWithPost('/querier.v1.QuerierService/LabelValues', params, queryOptions, {
        name: 'service_name'
    });
}
