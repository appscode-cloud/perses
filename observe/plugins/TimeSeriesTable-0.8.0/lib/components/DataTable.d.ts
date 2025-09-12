import { ReactElement, ReactNode } from 'react';
import { TimeSeriesData, HistogramValue } from '@perses-dev/core';
import { PanelData } from '@perses-dev/plugin-system';
export interface DataTableProps {
    queryResults: Array<PanelData<TimeSeriesData>>;
}
/**
 * Designed to display timeseries data in a prometheus like table format.
 * The first column will contain the metric name and label combination, and the second column will contain the values.
 * This is inspired by prometheus DataTable.
 * https://github.com/prometheus/prometheus/blob/2524a915915d7eb1b1207152d2e0ce5771193404/web/ui/react-app/src/pages/graph/DataTable.tsx
 * @param result timeseries query result
 * @constructor
 */
export declare const DataTable: ({ queryResults }: DataTableProps) => ReactElement | null;
export declare const bucketRangeString: ([boundaryRule, leftBoundary, rightBoundary]: [number, string, string, string]) => string;
export declare const histogramTable: (h: HistogramValue) => ReactNode;
//# sourceMappingURL=DataTable.d.ts.map