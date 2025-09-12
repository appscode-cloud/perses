import { AbsoluteTimeRange } from '@perses-dev/core';
import { TraceQueryPlugin } from '@perses-dev/plugin-system';
import { TempoTraceQuerySpec } from '../../model';
export declare function getUnixTimeRange(timeRange: AbsoluteTimeRange): {
    start: number;
    end: number;
};
export declare const getTraceData: TraceQueryPlugin<TempoTraceQuerySpec>['getTraceData'];
//# sourceMappingURL=get-trace-data.d.ts.map