import { TimeSeriesData } from '@perses-dev/core';
export declare const MOCK_TIME_SERIES_QUERY_RESULT_MULTIVALUE: {
    status: string;
    fetchStatus: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: {
        timeRange: {
            start: Date;
            end: Date;
        };
        stepMs: number;
        series: {
            name: string;
            values: number[][];
            labels: {
                device: string;
                env: string;
                fstype: string;
                instance: string;
                job: string;
                mountpoint: string;
            };
        }[];
    };
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
export declare const MOCK_TIME_SERIES_QUERY_RESULT_SINGLEVALUE: {
    status: string;
    fetchStatus: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: {
        timeRange: {
            start: Date;
            end: Date;
        };
        stepMs: number;
        series: {
            name: string;
            values: number[][];
            labels: {
                device: string;
                env: string;
                fstype: string;
                instance: string;
                job: string;
                mountpoint: string;
            };
        }[];
    };
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
export declare const MOCK_TIME_SERIES_DATA_MULTIVALUE: TimeSeriesData;
export declare const MOCK_TIME_SERIES_DATA_SINGLEVALUE: TimeSeriesData;
export declare const MOCK_NULL_QUERY_RESULT: {
    status: string;
    fetchStatus: string;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: {
        timeRange: {
            start: Date;
            end: Date;
        };
        stepMs: number;
        series: {
            name: string;
            values: (number | null)[][];
            formattedName: string;
            labels: {
                env: string;
                instance: string;
                job: string;
            };
        }[];
    };
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
//# sourceMappingURL=mock-query-results.d.ts.map