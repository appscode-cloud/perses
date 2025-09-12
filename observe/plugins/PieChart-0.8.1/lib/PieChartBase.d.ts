import { LegendComponentOption } from 'echarts/components';
import { ReactElement } from 'react';
export interface PieChartData {
    name: string;
    value: number | null;
}
export interface PieChartBaseProps {
    width: number;
    height: number;
    data: PieChartData[] | null;
    legend?: LegendComponentOption;
}
export declare function PieChartBase(props: PieChartBaseProps): ReactElement;
//# sourceMappingURL=PieChartBase.d.ts.map