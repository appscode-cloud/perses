import { LegendComponentOption } from 'echarts/components';
import { TimeScale } from '@perses-dev/core';
import { FC } from 'react';
export type StatusHistoryData = [number, number, number | undefined];
export interface StatusHistoryDataItem {
    value: StatusHistoryData;
    label?: string;
    itemStyle?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
    };
}
export interface StatusHistoryChartBaseProps {
    height: number;
    data: StatusHistoryDataItem[];
    xAxisCategories: number[];
    yAxisCategories: string[];
    legend?: LegendComponentOption;
    timeScale?: TimeScale;
    colors?: Array<{
        value: number | string;
        color: string;
    }>;
}
export declare const StatusHistoryChartBase: FC<StatusHistoryChartBaseProps>;
//# sourceMappingURL=StatusHistoryChartBase.d.ts.map