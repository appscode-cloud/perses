import { LRLanguage } from '@codemirror/language';
import { Extension } from '@uiw/react-codemirror';
import { TimeRangeValue } from '@perses-dev/core';
import { TempoClient } from '../model/tempo-client';
export interface CompletionConfig {
    /** a TempoClient instance, can be created with TempoDatasource.createClient() */
    client?: TempoClient;
    /** search for tag values in a given time range */
    timeRange?: TimeRangeValue;
    /** limit number of returned tag values */
    limit?: number;
    /**
     * stop search early if number of cache hits exceeds this setting
     * https://grafana.com/docs/tempo/latest/api_docs/#search-tag-values-v2
     */
    maxStaleValues?: number;
}
export declare function TraceQLExtension(completionCfg: CompletionConfig): Array<LRLanguage | Extension>;
//# sourceMappingURL=TraceQLExtension.d.ts.map