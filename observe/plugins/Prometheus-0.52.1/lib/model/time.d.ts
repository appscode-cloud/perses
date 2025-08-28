import { AbsoluteTimeRange, DurationString } from '@perses-dev/core';
import { UnixTimestampSeconds } from './api-types';
export interface PrometheusTimeRange {
    start: UnixTimestampSeconds;
    end: UnixTimestampSeconds;
}
/**
 * Converts an AbsoluteTimeRange to Prometheus time in Unix time (i.e. in seconds).
 */
export declare function getPrometheusTimeRange(timeRange: AbsoluteTimeRange): {
    start: number;
    end: number;
};
/**
 * Gets the step to use for a Prom range query. Tries to take into account a suggested step size (probably based on the
 * width of a visualization where the data will be graphed), any minimum step/resolution set by the user, and a "safe"
 * step based on the max data points we want to allow returning from a Prom query.
 */
export declare function getRangeStep(timeRange: PrometheusTimeRange, minStepSeconds?: number, resolution?: number, suggestedStepMs?: number): number;
/**
 * Converts a DurationString to seconds, rounding down.
 */
export declare function getDurationStringSeconds(durationString?: DurationString): number | undefined;
//# sourceMappingURL=time.d.ts.map