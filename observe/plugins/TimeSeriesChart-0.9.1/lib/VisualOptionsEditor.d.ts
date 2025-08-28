import { ReactElement } from 'react';
import { TimeSeriesChartVisualOptions } from './time-series-chart-model';
export interface VisualOptionsEditorProps {
    value: TimeSeriesChartVisualOptions;
    onChange: (visual: TimeSeriesChartVisualOptions) => void;
}
export declare function VisualOptionsEditor({ value, onChange }: VisualOptionsEditorProps): ReactElement;
//# sourceMappingURL=VisualOptionsEditor.d.ts.map