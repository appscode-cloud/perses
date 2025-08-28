import { RequestHeaders } from '@perses-dev/core';
export interface ClickHouseQueryParams {
    query: string;
    database?: string;
}
export interface ClickHouseQueryOptions {
    datasourceUrl: string;
    headers?: RequestHeaders;
}
export interface ClickHouseQueryResponse {
    status: 'success' | 'error';
    data: any;
}
export interface ClickHouseClient {
    query: (params: {
        start: string;
        end: string;
        query: string;
    }) => Promise<ClickHouseQueryResponse>;
}
export declare function query(params: ClickHouseQueryParams, queryOptions: ClickHouseQueryOptions): Promise<ClickHouseQueryResponse>;
//# sourceMappingURL=click-house-client.d.ts.map