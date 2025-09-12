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
    MOCK_TRACE_SEARCH_RESULT: function() {
        return MOCK_TRACE_SEARCH_RESULT;
    },
    MOCK_TRACE_SEARCH_RESULT_EMPTY: function() {
        return MOCK_TRACE_SEARCH_RESULT_EMPTY;
    },
    MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT: function() {
        return MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT;
    },
    MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT_EMPTY: function() {
        return MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT_EMPTY;
    }
});
const MOCK_TRACE_SEARCH_RESULT = {
    searchResult: [
        {
            startTimeUnixMs: 1702915645000,
            durationMs: 100,
            serviceStats: {
                'service-name': {
                    spanCount: 10
                },
                'second-service-name': {
                    spanCount: 3,
                    errorCount: 2
                }
            },
            traceId: '123',
            rootServiceName: 'service-name',
            rootTraceName: 'span-name'
        }
    ],
    metadata: {
        executedQueryString: '{duration > 500ms}'
    }
};
const MOCK_TRACE_SEARCH_RESULT_EMPTY = {
    searchResult: [],
    metadata: {
        executedQueryString: '{duration > 500ms}'
    }
};
const MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT = [
    {
        status: 'success',
        fetchStatus: 'idle',
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: MOCK_TRACE_SEARCH_RESULT,
        dataUpdatedAt: 1666500979895,
        definition: {
            kind: 'TraceQuery',
            spec: {
                plugin: {
                    kind: 'TempoTraceQuery',
                    spec: {
                        query: '{}',
                        datasource: {
                            kind: 'TempoDatasource',
                            name: 'tempolocal'
                        }
                    }
                }
            }
        },
        error: null,
        errorUpdatedAt: 0,
        failureCount: 0,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isFetching: false,
        isRefetching: false,
        isLoadingError: false,
        isPaused: false,
        isPlaceholderData: false,
        isPreviousData: false,
        isRefetchError: false,
        isStale: true
    }
];
const MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT_EMPTY = [
    {
        status: 'success',
        fetchStatus: 'idle',
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: MOCK_TRACE_SEARCH_RESULT_EMPTY,
        dataUpdatedAt: 1666500979895,
        error: null,
        errorUpdatedAt: 0,
        failureCount: 0,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isFetching: false,
        isRefetching: false,
        isLoadingError: false,
        isPaused: false,
        isPlaceholderData: false,
        isPreviousData: false,
        isRefetchError: false,
        isStale: true
    }
];
