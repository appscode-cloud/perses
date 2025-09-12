import { DurationString } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
import { PrometheusDatasourceSelector } from '../../model';
/**
 * The spec/options for the PrometheusTimeSeriesQuery plugin.
 */
export interface PrometheusTimeSeriesQuerySpec {
    query: string;
    seriesNameFormat?: string;
    minStep?: DurationString;
    resolution?: number;
    datasource?: DatasourceSelectValue<PrometheusDatasourceSelector>;
}
//# sourceMappingURL=time-series-query-model.d.ts.map