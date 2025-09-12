import { TimeSeriesData } from '@perses-dev/core';
export interface LogLabels {
    [key: string]: any;
}
export interface LogEntry {
    timestamp: number;
    labels: LogLabels;
    line?: string;
}
export interface LogsData {
    entries: LogEntry[];
    totalCount: number;
    hasMore?: boolean;
}
export interface ClickHouseTimeSeriesData extends TimeSeriesData {
    logs?: LogsData;
}
export interface TimeSeriesEntry {
    time: string;
    log_count: number | string;
}
//# sourceMappingURL=click-house-data-types.d.ts.map