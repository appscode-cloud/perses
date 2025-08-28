import { ModeOption, SortOption } from '@perses-dev/components';
import { CalculationType, Definition, FormatOptions } from '@perses-dev/core';
import { OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_SORT: SortOption;
export declare const DEFAULT_MODE: ModeOption;
/**
 * The schema for a BarChart panel.
 */
export interface BarChartDefinition extends Definition<BarChartOptions> {
    kind: 'BarChart';
}
/**
 * The Options object type supported by the BarChart panel plugin.
 */
export interface BarChartOptions {
    calculation: CalculationType;
    format?: FormatOptions;
    sort?: SortOption;
    mode?: ModeOption;
}
export type BarChartOptionsEditorProps = OptionsEditorProps<BarChartOptions>;
/**
 * Creates the initial/empty options for a BarChart panel.
 */
export declare function createInitialBarChartOptions(): BarChartOptions;
//# sourceMappingURL=bar-chart-model.d.ts.map