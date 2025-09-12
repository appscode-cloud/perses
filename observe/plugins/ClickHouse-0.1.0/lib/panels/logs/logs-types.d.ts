import { ThresholdOptions } from '@perses-dev/core';
import { PanelProps, LegendSpecOptions } from '@perses-dev/plugin-system';
import { ClickHouseTimeSeriesData } from '../../model/click-house-data-types';
export type QueryData = ClickHouseTimeSeriesData;
export type LogsProps = PanelProps<LogsOptions, QueryData>;
export interface QuerySettingsOptions {
    queryIndex: number;
    colorMode: 'fixed' | 'fixed-single';
    colorValue: string;
}
export interface LogsOptions {
    legend?: LegendSpecOptions;
    thresholds?: ThresholdOptions;
    querySettings?: QuerySettingsOptions;
}
//# sourceMappingURL=logs-types.d.ts.map