import { RequestHeaders } from '@perses-dev/core';
import { DatasourceClient } from '@perses-dev/plugin-system';
import { InstantQueryRequestParameters, InstantQueryResponse, LabelNamesRequestParameters, LabelNamesResponse, LabelValuesRequestParameters, LabelValuesResponse, MetricMetadataRequestParameters, MetricMetadataResponse, ParseQueryRequestParameters, ParseQueryResponse, RangeQueryRequestParameters, RangeQueryResponse, SeriesRequestParameters, SeriesResponse } from './api-types';
interface PrometheusClientOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export interface PrometheusClient extends DatasourceClient {
    options: PrometheusClientOptions;
    instantQuery(params: InstantQueryRequestParameters, headers?: RequestHeaders): Promise<InstantQueryResponse>;
    rangeQuery(params: RangeQueryRequestParameters, headers?: RequestHeaders): Promise<RangeQueryResponse>;
    labelNames(params: LabelNamesRequestParameters, headers?: RequestHeaders): Promise<LabelNamesResponse>;
    labelValues(params: LabelValuesRequestParameters, headers?: RequestHeaders): Promise<LabelValuesResponse>;
    metricMetadata(params: MetricMetadataRequestParameters, headers?: RequestHeaders): Promise<MetricMetadataResponse>;
    series(params: SeriesRequestParameters, headers?: RequestHeaders): Promise<SeriesResponse>;
    parseQuery(params: ParseQueryRequestParameters, headers?: RequestHeaders): Promise<ParseQueryResponse>;
}
export interface QueryOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
/**
 * Calls the `/-/healthy` endpoint to check if the datasource is healthy.
 */
export declare function healthCheck(queryOptions: QueryOptions): () => Promise<boolean>;
/**
 * Calls the `/api/v1/query` endpoint to get metrics data.
 */
export declare function instantQuery(params: InstantQueryRequestParameters, queryOptions: QueryOptions): Promise<InstantQueryResponse>;
/**
 * Calls the `/api/v1/query_range` endpoint to get metrics data.
 */
export declare function rangeQuery(params: RangeQueryRequestParameters, queryOptions: QueryOptions): Promise<RangeQueryResponse>;
/**
 * Calls the `/api/v1/labels` endpoint to get a list of label names.
 */
export declare function labelNames(params: LabelNamesRequestParameters, queryOptions: QueryOptions): Promise<LabelNamesResponse>;
/**
 * Calls the `/api/v1/label/{labelName}/values` endpoint to get a list of values for a label.
 */
export declare function labelValues(params: LabelValuesRequestParameters, queryOptions: QueryOptions): Promise<LabelValuesResponse>;
/**
 * Calls the `/api/v1/label/{labelName}/values` endpoint to get a list of values for a label.
 */
export declare function metricMetadata(params: MetricMetadataRequestParameters, queryOptions: QueryOptions): Promise<MetricMetadataResponse>;
/**
 * Calls the `/api/v1/series` endpoint to finding series by label matchers.
 */
export declare function series(params: SeriesRequestParameters, queryOptions: QueryOptions): Promise<SeriesResponse>;
/**
 * Calls the `/api/v1/parse_query` to parse the given promQL expresion into an abstract syntax tree (AST).
 */
export declare function parseQuery(params: ParseQueryRequestParameters, queryOptions: QueryOptions): Promise<ParseQueryResponse>;
/**
 * Fetch JSON and parse warnings for query inspector
 */
export declare function fetchResults<T>(...args: Parameters<typeof global.fetch>): Promise<T>;
export {};
//# sourceMappingURL=prometheus-client.d.ts.map