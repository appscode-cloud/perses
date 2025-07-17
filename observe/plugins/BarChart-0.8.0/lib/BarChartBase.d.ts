import { ReactElement } from 'react';
import { ModeOption } from '@perses-dev/components';
import { FormatOptions } from '@perses-dev/core';
export interface BarChartData {
    label: string;
    value: number | null;
}
export interface BarChartBaseProps {
    width: number;
    height: number;
    data: BarChartData[] | null;
    format?: FormatOptions;
    mode?: ModeOption;
}
export declare function BarChartBase(props: BarChartBaseProps): ReactElement;
//# sourceMappingURL=BarChartBase.d.ts.map