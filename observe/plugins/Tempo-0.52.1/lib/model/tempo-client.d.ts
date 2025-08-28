import { RequestHeaders } from '@perses-dev/core';
import { DatasourceClient } from '@perses-dev/plugin-system';
import { QueryRequestParameters, SearchRequestParameters, SearchTagsRequestParameters, SearchTagsResponse, QueryResponse, SearchResponse, SearchTagValuesRequestParameters, SearchTagValuesResponse } from './api-types';
interface TempoClientOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export interface TempoClient extends DatasourceClient {
    options: TempoClientOptions;
    query(params: QueryRequestParameters, headers?: RequestHeaders): Promise<QueryResponse>;
    search(params: SearchRequestParameters, headers?: RequestHeaders): Promise<SearchResponse>;
    searchWithFallback(params: SearchRequestParameters, headers?: RequestHeaders): Promise<SearchResponse>;
    searchTags(params: SearchTagsRequestParameters, headers?: RequestHeaders): Promise<SearchTagsResponse>;
    searchTagValues(params: SearchTagValuesRequestParameters, headers?: RequestHeaders): Promise<SearchTagValuesResponse>;
}
export interface QueryOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export declare const executeRequest: <T>(...args: Parameters<typeof global.fetch>) => Promise<T>;
/**
 * Returns a summary report of traces that satisfy the query.
 */
export declare function search(params: SearchRequestParameters, queryOptions: QueryOptions): Promise<SearchResponse>;
/**
 * Returns an entire trace.
 */
export declare function query(params: QueryRequestParameters, queryOptions: QueryOptions): Promise<QueryResponse>;
/**
 * Returns a summary report of traces that satisfy the query.
 *
 * If the serviceStats field is missing in the response, fetches all traces
 * and calculates the serviceStats.
 *
 * Tempo computes the serviceStats field during ingestion since vParquet4,
 * this fallback is required for older block formats.
 */
export declare function searchWithFallback(params: SearchRequestParameters, queryOptions: QueryOptions): Promise<SearchResponse>;
/**
 * Returns a list of all tag names for a given scope.
 */
export declare function searchTags(params: SearchTagsRequestParameters, queryOptions: QueryOptions): Promise<SearchTagsResponse>;
/**
 * Returns a list of all tag values for a given tag.
 */
export declare function searchTagValues(params: SearchTagValuesRequestParameters, queryOptions: QueryOptions): Promise<SearchTagValuesResponse>;
export {};
//# sourceMappingURL=tempo-client.d.ts.map