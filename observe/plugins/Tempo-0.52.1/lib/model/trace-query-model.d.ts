import { DatasourceSelectValue } from '@perses-dev/plugin-system';
import { TempoDatasourceSelector } from './tempo-selectors';
/**
 * The spec/options for the TempoTraceQuery plugin.
 */
export interface TempoTraceQuerySpec {
    query: string;
    limit?: number;
    datasource?: DatasourceSelectValue<TempoDatasourceSelector>;
}
//# sourceMappingURL=trace-query-model.d.ts.map