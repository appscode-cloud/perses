import { CalculationType, Definition, ThresholdOptions, FormatOptions, ValueMapping } from '@perses-dev/core';
import { FontSizeOption } from '@perses-dev/components';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
/**
 * The schema for a StatChart panel.
 */
export interface StatChartDefinition extends Definition<StatChartOptions> {
    kind: 'StatChart';
}
export interface StatChartOptions {
    calculation: CalculationType;
    format: FormatOptions;
    metricLabel?: string;
    thresholds?: ThresholdOptions;
    sparkline?: StatChartSparklineOptions;
    valueFontSize?: FontSizeOption;
    mappings?: ValueMapping[];
}
export interface StatChartSparklineOptions {
    color?: string;
    width?: number;
}
export type StatChartOptionsEditorProps = OptionsEditorProps<StatChartOptions>;
export declare function createInitialStatChartOptions(): StatChartOptions;
//# sourceMappingURL=stat-chart-model.d.ts.map