import { ModeOption, SortOption } from '@perses-dev/components';
import { CalculationType, Definition, FormatOptions } from '@perses-dev/core';
import { LegendSpecOptions, OptionsEditorProps } from '@perses-dev/plugin-system';
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_SORT: SortOption;
export declare const DEFAULT_MODE: ModeOption;
export interface BarChartDefinition extends Definition<PieChartOptions> {
    kind: 'PieChart';
}
export interface PieChartOptions {
    legend?: LegendSpecOptions;
    calculation: CalculationType;
    radius: number;
    format?: FormatOptions;
    sort?: SortOption;
    mode?: ModeOption;
}
export type PieChartOptionsEditorProps = OptionsEditorProps<PieChartOptions>;
export declare function createInitialPieChartOptions(): PieChartOptions;
//# sourceMappingURL=pie-chart-model.d.ts.map