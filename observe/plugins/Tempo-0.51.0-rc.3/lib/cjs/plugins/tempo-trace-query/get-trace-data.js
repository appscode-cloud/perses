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
    getTraceData: function() {
        return getTraceData;
    },
    getUnixTimeRange: function() {
        return getUnixTimeRange;
    }
});
const _core = require("@perses-dev/core");
const _pluginsystem = require("@perses-dev/plugin-system");
const _datefns = require("date-fns");
const _model = require("../../model");
function getUnixTimeRange(timeRange) {
    const { start, end } = timeRange;
    return {
        start: Math.ceil((0, _datefns.getUnixTime)(start)),
        end: Math.ceil((0, _datefns.getUnixTime)(end))
    };
}
const getTraceData = async (spec, context)=>{
    if (spec.query === undefined || spec.query === null || spec.query === '') {
        // Do not make a request to the backend, instead return an empty TraceData
        console.error('TempoTraceQuery is undefined, null, or an empty string.');
        return {
            searchResult: []
        };
    }
    const defaultTempoDatasource = {
        kind: _model.TEMPO_DATASOURCE_KIND
    };
    const listDatasourceSelectItems = await context.datasourceStore.listDatasourceSelectItems(_model.TEMPO_DATASOURCE_KIND);
    const datasourceSelector = (0, _pluginsystem.datasourceSelectValueToSelector)(spec.datasource, context.variableState, listDatasourceSelectItems) ?? defaultTempoDatasource;
    const client = await context.datasourceStore.getDatasourceClient(datasourceSelector);
    const getQuery = ()=>{
        const params = {
            q: spec.query
        };
        // handle time range selection from UI drop down (e.g. last 5 minutes, last 1 hour )
        if (context.absoluteTimeRange) {
            const { start, end } = getUnixTimeRange(context.absoluteTimeRange);
            params.start = start;
            params.end = end;
        }
        if (spec.limit) {
            params.limit = spec.limit;
        }
        return params;
    };
    /**
   * determine type of query:
   * if the query is a valid traceId, fetch the trace by traceId
   * otherwise, execute a TraceQL query
   */ if ((0, _core.isValidTraceId)(spec.query)) {
        const response = await client.query({
            traceId: spec.query
        });
        return {
            trace: parseTraceResponse(response),
            metadata: {
                executedQueryString: spec.query
            }
        };
    } else {
        const response = await client.searchWithFallback(getQuery());
        return {
            searchResult: parseSearchResponse(response),
            metadata: {
                executedQueryString: spec.query
            }
        };
    }
};
function parseTraceResponse(response) {
    return {
        resourceSpans: response.batches
    };
}
function parseSearchResponse(response) {
    return response.traces.map((trace)=>({
            startTimeUnixMs: parseInt(trace.startTimeUnixNano) * 1e-6,
            durationMs: trace.durationMs ?? 0,
            traceId: trace.traceID,
            rootServiceName: trace.rootServiceName,
            rootTraceName: trace.rootTraceName,
            serviceStats: trace.serviceStats || {}
        }));
}
