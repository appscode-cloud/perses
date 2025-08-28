import { CalculationType, Definition, ThresholdOptions, FormatOptions } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_MAX_PERCENT = 100;
export declare const DEFAULT_MAX_PERCENT_DECIMAL = 1;
/**
 * The schema for a GaugeChart panel.
 */
export interface GaugeChartDefinition extends Definition<GaugeChartOptions> {
    kind: 'GaugeChart';
}
/**
 * The Options object type supported by the GaugeChart panel plugin.
 */
export interface GaugeChartOptions {
    calculation: CalculationType;
    format?: FormatOptions;
    thresholds?: ThresholdOptions;
    max?: number;
}
export type GaugeChartOptionsEditorProps = OptionsEditorProps<GaugeChartOptions>;
/**
 * Creates the initial/empty options for a GaugeChart panel.
 */
export declare function createInitialGaugeChartOptions(): GaugeChartOptions;
//# sourceMappingURL=gauge-chart-model.d.ts.map