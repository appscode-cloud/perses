import { FC } from 'react';
import { FormatOptions } from '@perses-dev/core';
import { LineSeriesOption } from 'echarts/charts';
import { FontSizeOption, GraphSeries } from '@perses-dev/components';
export interface StatChartData {
    color: string;
    calculatedValue?: string | number | null;
    seriesData?: GraphSeries;
}
export interface StatChartProps {
    width: number;
    height: number;
    data: StatChartData;
    format?: FormatOptions;
    sparkline?: LineSeriesOption;
    showSeriesName?: boolean;
    valueFontSize?: FontSizeOption;
}
export declare const StatChartBase: FC<StatChartProps>;
//# sourceMappingURL=StatChartBase.d.ts.map