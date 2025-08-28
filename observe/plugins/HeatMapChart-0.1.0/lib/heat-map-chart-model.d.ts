import { Definition, FormatOptions } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_MIN_PERCENT = 0;
export declare const DEFAULT_MAX_PERCENT = 100;
export declare const DEFAULT_MIN_PERCENT_DECIMAL = 0;
export declare const DEFAULT_MAX_PERCENT_DECIMAL = 1;
/**
 * The schema for a HeatMapChart panel.
 */
export interface HeatMapChartDefinition extends Definition<HeatMapChartOptions> {
    kind: 'HeatMapChart';
}
/**
 * The Options object type supported by the HeatMapChart panel plugin.
 */
export interface HeatMapChartOptions {
    yAxisFormat?: FormatOptions;
    countFormat?: FormatOptions;
    showVisualMap?: boolean;
}
export type HeatMapChartOptionsEditorProps = OptionsEditorProps<HeatMapChartOptions>;
/**
 * Creates the initial/empty options for a HeatMapChart panel.
 */
export declare function createInitialHeatMapChartOptions(): HeatMapChartOptions;
//# sourceMappingURL=heat-map-chart-model.d.ts.map