import { DurationString } from '@perses-dev/core';
import ASTNode from '../components/promql/ast';
export type { DurationString };
export interface SuccessResponse<T> {
    status: 'success';
    data: T;
    rawResponse?: Response;
    warnings?: string[];
}
export interface ErrorResponse<T> {
    status: 'error';
    data?: T;
    errorType: string;
    error: string;
}
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse<T>;
export type DurationSeconds = number;
export type UnixTimestampSeconds = number;
export type ValueTuple = [unixTimeSeconds: UnixTimestampSeconds, sampleValue: string];
export type BucketTuple = [bucket: number, upperBound: string, lowerBound: string, count: string];
export type HistogramValue = {
    count: number;
    sum: string;
    buckets?: BucketTuple[];
};
export type HistogramTuple = [unixTimeSeconds: UnixTimestampSeconds, value: HistogramValue];
export type Metric = Record<string, string>;
export interface VectorData {
    resultType: 'vector';
    result: Array<{
        metric: Metric;
        value: ValueTuple;
        histogram?: HistogramTuple;
    }>;
}
export interface MatrixData {
    resultType: 'matrix';
    result: Array<{
        metric: Metric;
        values: ValueTuple[];
        histograms?: HistogramTuple[];
    }>;
}
export interface ScalarData {
    resultType: 'scalar';
    result: ValueTuple;
}
export interface StringData {
    resultType: 'string';
    result: ValueTuple;
}
export interface InstantQueryRequestParameters {
    query: string;
    time?: UnixTimestampSeconds;
    timeout?: DurationString;
}
export type InstantQueryResultType = MatrixData | VectorData | ScalarData | StringData;
export type InstantQueryResponse = ApiResponse<InstantQueryResultType>;
export type MonitoredInstantQueryResponse = InstantQueryResponse & {
    responseTime: number;
};
export interface RangeQueryRequestParameters {
    query: string;
    start: UnixTimestampSeconds;
    end: UnixTimestampSeconds;
    step: DurationSeconds;
    timeout?: DurationString;
}
export type RangeQueryResponse = ApiResponse<MatrixData>;
export interface SeriesRequestParameters {
    'match[]': string[];
    start?: UnixTimestampSeconds;
    end?: UnixTimestampSeconds;
    limit?: number;
}
export type SeriesResponse = ApiResponse<Metric[]>;
export interface LabelNamesRequestParameters {
    start?: UnixTimestampSeconds;
    end?: UnixTimestampSeconds;
    'match[]'?: string[];
    limit?: number;
}
export type LabelNamesResponse = ApiResponse<string[]>;
export interface LabelValuesRequestParameters {
    labelName: string;
    start?: UnixTimestampSeconds;
    end?: UnixTimestampSeconds;
    'match[]'?: string[];
    limit?: number;
}
export type LabelValuesResponse = ApiResponse<string[]>;
export interface MetricMetadata {
    type: string;
    help: string;
    unit?: string;
}
export interface MetricMetadataRequestParameters {
    limit?: number;
    metric?: string;
}
export type MetricMetadataResponse = ApiResponse<Record<string, MetricMetadata[]>>;
export interface ParseQueryRequestParameters {
    query: string;
}
export type ParseQueryResponse = ApiResponse<ASTNode>;
//# sourceMappingURL=api-types.d.ts.map