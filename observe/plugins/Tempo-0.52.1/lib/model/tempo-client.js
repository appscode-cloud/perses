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
import { fetch, otlptracev1 } from '@perses-dev/core';
export const executeRequest = async (...args)=>{
    const response = await fetch(...args);
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
    const urlParams = buildSearchParams(params).toString();
    if (urlParams !== '') {
        url += '?' + urlParams;
    }
    const init = {
        method: 'GET',
        headers
    };
    return executeRequest(url, init);
}
function buildSearchParams(params) {
    const urlSearchParams = new URLSearchParams();
    for(const key in params){
        const value = params[key];
        switch(typeof value){
            case 'string':
                urlSearchParams.append(key, value);
                break;
            case 'number':
                urlSearchParams.append(key, value.toString());
                break;
        }
    }
    return urlSearchParams;
}
/**
 * Returns a summary report of traces that satisfy the query.
 */ export function search(params, queryOptions) {
    return fetchWithGet('/api/search', params, queryOptions);
}
/**
 * Returns an entire trace.
 */ export function query(params, queryOptions) {
    return fetchWithGet(`/api/traces/${encodeURIComponent(params.traceId)}`, {}, queryOptions);
}
/**
 * Returns a summary report of traces that satisfy the query.
 *
 * If the serviceStats field is missing in the response, fetches all traces
 * and calculates the serviceStats.
 *
 * Tempo computes the serviceStats field during ingestion since vParquet4,
 * this fallback is required for older block formats.
 */ export async function searchWithFallback(params, queryOptions) {
    // Get a list of traces that satisfy the query.
    const searchResponse = await search(params, queryOptions);
    if (!searchResponse.traces || searchResponse.traces.length === 0) {
        return {
            traces: []
        };
    }
    // exit early if fallback is not required (serviceStats are contained in the response)
    if (searchResponse.traces.every((t)=>t.serviceStats)) {
        return searchResponse;
    }
    // calculate serviceStats (number of spans and errors) per service
    return {
        traces: await Promise.all(searchResponse.traces.map(async (trace)=>{
            if (trace.serviceStats) {
                // fallback not required, serviceStats are contained in the response
                return trace;
            }
            const serviceStats = {};
            const searchTraceIDResponse = await query({
                traceId: trace.traceID
            }, queryOptions);
            // For every trace, get the full trace, and find the number of spans and errors.
            for (const batch of searchTraceIDResponse.batches){
                let serviceName = 'unknown';
                for (const attr of batch.resource?.attributes ?? []){
                    if (attr.key === 'service.name' && 'stringValue' in attr.value) {
                        serviceName = attr.value.stringValue;
                        break;
                    }
                }
                const stats = serviceStats[serviceName] ?? {
                    spanCount: 0
                };
                for (const scopeSpan of batch.scopeSpans){
                    stats.spanCount += scopeSpan.spans.length;
                    for (const span of scopeSpan.spans){
                        if (span.status?.code === otlptracev1.StatusCodeError) {
                            stats.errorCount = (stats.errorCount ?? 0) + 1;
                        }
                    }
                }
                serviceStats[serviceName] = stats;
            }
            return {
                ...trace,
                serviceStats
            };
        }))
    };
}
/**
 * Returns a list of all tag names for a given scope.
 */ export function searchTags(params, queryOptions) {
    return fetchWithGet('/api/v2/search/tags', params, queryOptions);
}
/**
 * Returns a list of all tag values for a given tag.
 */ export function searchTagValues(params, queryOptions) {
    const { tag, ...rest } = params;
    return fetchWithGet(`/api/v2/search/tag/${encodeURIComponent(tag)}/values`, rest, queryOptions);
}

//# sourceMappingURL=tempo-client.js.map