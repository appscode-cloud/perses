import { Metric } from '../model/api-types';
/**
 * Types for metric labels, used in seriesNameFormat implementation
 */
export type SeriesLabels = Record<string, string>;
export declare function formatSeriesName(inputFormat: string, seriesLabels: SeriesLabels): string;
export declare function getUniqueKeyForPrometheusResult(metricLabels: {
    [key: string]: string;
}, { removeExprWrap }?: {
    removeExprWrap?: boolean;
}): string;
export declare function getFormattedPrometheusSeriesName(query: string, metric: Metric, formatter?: string): {
    name: string;
    formattedName: string;
};
//# sourceMappingURL=utils.d.ts.map