import { FormatOptions } from '@perses-dev/core';
import { GaugeSeriesOption } from 'echarts/charts';
import { ReactElement } from 'react';
export type GaugeChartValue = number | null | undefined;
export type GaugeSeries = {
    value: GaugeChartValue;
    label: string;
};
export interface GaugeChartBaseProps {
    width: number;
    height: number;
    data: GaugeSeries;
    format: FormatOptions;
    axisLine: GaugeSeriesOption['axisLine'];
    max?: number;
}
export declare function GaugeChartBase(props: GaugeChartBaseProps): ReactElement;
/**
 * Responsive font size depending on number of characters, clamp used
 * to ensure size stays within given range
 */
export declare function getResponsiveValueSize(value: number | null, format: FormatOptions, width: number, height: number): string;
//# sourceMappingURL=GaugeChartBase.d.ts.map