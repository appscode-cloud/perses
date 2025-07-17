import { TraceData } from '@perses-dev/core';
/**
 * Mock data we get from getTraceData() in @perses/tempo-plugin.
 */
export declare const MOCK_TRACE_SEARCH_RESULT: TraceData;
export declare const MOCK_TRACE_SEARCH_RESULT_EMPTY: TraceData;
/**
 * Mocks results obtained from useTraceQueries() in @perses/plugin-system/runtime.
 * This function uses then React TanStack function useQueries(fooQuery) to
 * handle fetching.
 */
export declare const MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT: {
    status: string;
    fetchStatus: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: TraceData;
    dataUpdatedAt: number;
    definition: {
        kind: string;
        spec: {
            plugin: {
                kind: string;
                spec: {
                    query: string;
                    datasource: {
                        kind: string;
                        name: string;
                    };
                };
            };
        };
    };
    error: null;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isRefetching: boolean;
    isLoadingError: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetchError: boolean;
    isStale: boolean;
}[];
export declare const MOCK_TRACE_SEARCH_RESULT_QUERY_RESULT_EMPTY: {
    status: string;
    fetchStatus: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: TraceData;
    dataUpdatedAt: number;
    error: null;
    errorUpdatedAt: number;
    failureCount: number;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isRefetching: boolean;
    isLoadingError: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetchError: boolean;
    isStale: boolean;
}[];
//# sourceMappingURL=mock-trace-data.d.ts.map