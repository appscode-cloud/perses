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
    fetchResults: function() {
        return fetchResults;
    },
    healthCheck: function() {
        return healthCheck;
    },
    instantQuery: function() {
        return instantQuery;
    },
    labelNames: function() {
        return labelNames;
    },
    labelValues: function() {
        return labelValues;
    },
    metricMetadata: function() {
        return metricMetadata;
    },
    parseQuery: function() {
        return parseQuery;
    },
    rangeQuery: function() {
        return rangeQuery;
    },
    series: function() {
        return series;
    }
});
const _core = require("@perses-dev/core");
function healthCheck(queryOptions) {
    return async ()=>{
        const url = `${queryOptions.datasourceUrl}/-/healthy`;
        try {
            const resp = await (0, _core.fetch)(url, {
                headers: queryOptions.headers
            });
            return resp.status === 200;
        } catch  {
            return false;
        }
    };
}
function instantQuery(params, queryOptions) {
    return fetchWithPost('/api/v1/query', params, queryOptions);
}
function rangeQuery(params, queryOptions) {
    return fetchWithPost('/api/v1/query_range', params, queryOptions);
}
function labelNames(params, queryOptions) {
    return fetchWithPost('/api/v1/labels', params, queryOptions);
}
function labelValues(params, queryOptions) {
    const { labelName, ...searchParams } = params;
    // In case label name is empty, we'll receive a 404, so we can replace it by an empty list, which is less confusing.
    // Note that an empty list is the prometheus result if the label does not exist.
    if (labelName.length === 0) {
        return new Promise((resolve)=>{
            resolve({
                data: []
            });
        });
    }
    const apiURI = `/api/v1/label/${encodeURIComponent(labelName)}/values`;
    return fetchWithGet(apiURI, searchParams, queryOptions);
}
function metricMetadata(params, queryOptions) {
    const apiURI = `/api/v1/metadata`;
    return fetchWithGet(apiURI, params, queryOptions);
}
function series(params, queryOptions) {
    const apiURI = `/api/v1/series`;
    return fetchWithPost(apiURI, params, queryOptions);
}
function parseQuery(params, queryOptions) {
    const apiURI = `/api/v1/parse_query`;
    return fetchWithPost(apiURI, params, queryOptions);
}
function fetchWithGet(apiURI, params, queryOptions) {
    const { datasourceUrl, headers } = queryOptions;
    let url = `${datasourceUrl}${apiURI}`;
    const urlParams = createSearchParams(params).toString();
    if (urlParams !== '') {
        url += `?${urlParams}`;
    }
    return (0, _core.fetchJson)(url, {
        method: 'GET',
        headers
    });
}
function fetchWithPost(apiURI, params, queryOptions) {
    const { datasourceUrl, headers } = queryOptions;
    const url = `${datasourceUrl}${apiURI}`;
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers
        },
        body: createSearchParams(params)
    };
    return fetchResults(url, init);
}
/**
 * Creates URLSearchParams from a request params object.
 */ function createSearchParams(params) {
    const searchParams = new URLSearchParams();
    for(const key in params){
        const value = params[key];
        if (value === undefined) continue;
        if (typeof value === 'string') {
            searchParams.append(key, value);
            continue;
        }
        if (typeof value === 'number') {
            searchParams.append(key, value.toString());
            continue;
        }
        for (const val of value){
            searchParams.append(key, val);
        }
    }
    return searchParams;
}
async function fetchResults(...args) {
    const response = await (0, _core.fetch)(...args);
    const json = await response.json();
    return {
        ...json,
        rawResponse: response
    };
}
