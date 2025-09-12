import { ReactElement } from 'react';
import { EChartsOption } from 'echarts';
interface ScatterplotProps<T> {
    width: number;
    height: number;
    options: EChartsOption;
    onClick?: (data: T) => void;
}
export declare function Scatterplot<T>(props: ScatterplotProps<T>): ReactElement;
export {};
//# sourceMappingURL=Scatterplot.d.ts.map