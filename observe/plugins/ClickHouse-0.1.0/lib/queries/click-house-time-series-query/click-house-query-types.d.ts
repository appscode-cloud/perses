import { DatasourceSelector } from '@perses-dev/core';
export interface ClickHouseTimeSeriesQuerySpec {
    query: string;
    datasource?: DatasourceSelector;
}
export type DatasourceQueryResponse = {
    status: string;
    data: any;
    warnings?: string[];
};
//# sourceMappingURL=click-house-query-types.d.ts.map