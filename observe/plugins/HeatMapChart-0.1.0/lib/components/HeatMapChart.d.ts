import { ReactElement } from 'react';
import { FormatOptions, TimeScale } from '@perses-dev/core';
export type HeatMapData = [number, number, number | undefined];
export interface HeatMapDataItem {
    value: HeatMapData;
    label: string;
    itemStyle?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
    };
}
export interface HeatMapChartProps {
    width: number;
    height: number;
    data: HeatMapDataItem[];
    xAxisCategories: number[];
    yAxisCategories: string[];
    yAxisFormat?: FormatOptions;
    countFormat?: FormatOptions;
    countMin?: number;
    countMax?: number;
    timeScale?: TimeScale;
    showVisualMap?: boolean;
}
export declare function HeatMapChart({ width, height, data, xAxisCategories, yAxisCategories, yAxisFormat, countFormat, countMin, countMax, timeScale, showVisualMap, }: HeatMapChartProps): ReactElement | null;
//# sourceMappingURL=HeatMapChart.d.ts.map