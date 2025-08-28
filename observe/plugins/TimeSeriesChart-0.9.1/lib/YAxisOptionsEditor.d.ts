import { ReactElement } from 'react';
import { TimeSeriesChartYAxisOptions } from './time-series-chart-model';
export interface YAxisOptionsEditorProps {
    value: TimeSeriesChartYAxisOptions;
    onChange: (yAxis: TimeSeriesChartYAxisOptions) => void;
}
export declare function YAxisOptionsEditor({ value, onChange }: YAxisOptionsEditorProps): ReactElement;
//# sourceMappingURL=YAxisOptionsEditor.d.ts.map