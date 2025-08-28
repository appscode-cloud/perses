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
import { fetch, fetchJson } from '@perses-dev/core';
/**
 * Calls the `/-/healthy` endpoint to check if the datasource is healthy.
 */ export function healthCheck(queryOptions) {
    return async ()=>{
        const url = `${queryOptions.datasourceUrl}/-/healthy`;
        try {
            const resp = await fetch(url, {
                headers: queryOptions.headers
            });
            return resp.status === 200;
        } catch  {
            return false;
        }
    };
}
/**
 * Calls the `/api/v1/query` endpoint to get metrics data.
 */ export function instantQuery(params, queryOptions) {
    return fetchWithPost('/api/v1/query', params, queryOptions);
}
/**
 * Calls the `/api/v1/query_range` endpoint to get metrics data.
 */ export function rangeQuery(params, queryOptions) {
    return fetchWithPost('/api/v1/query_range', params, queryOptions);
}
/**
 * Calls the `/api/v1/labels` endpoint to get a list of label names.
 */ export function labelNames(params, queryOptions) {
    return fetchWithPost('/api/v1/labels', params, queryOptions);
}
/**
 * Calls the `/api/v1/label/{labelName}/values` endpoint to get a list of values for a label.
 */ export function labelValues(params, queryOptions) {
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
/**
 * Calls the `/api/v1/label/{labelName}/values` endpoint to get a list of values for a label.
 */ export function metricMetadata(params, queryOptions) {
    const apiURI = `/api/v1/metadata`;
    return fetchWithGet(apiURI, params, queryOptions);
}
/**
 * Calls the `/api/v1/series` endpoint to finding series by label matchers.
 */ export function series(params, queryOptions) {
    const apiURI = `/api/v1/series`;
    return fetchWithPost(apiURI, params, queryOptions);
}
/**
 * Calls the `/api/v1/parse_query` to parse the given promQL expresion into an abstract syntax tree (AST).
 */ export function parseQuery(params, queryOptions) {
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
    return fetchJson(url, {
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
/**
 * Fetch JSON and parse warnings for query inspector
 */ export async function fetchResults(...args) {
    const response = await fetch(...args);
    const json = await response.json();
    return {
        ...json,
        rawResponse: response
    };
}

//# sourceMappingURL=prometheus-client.js.map