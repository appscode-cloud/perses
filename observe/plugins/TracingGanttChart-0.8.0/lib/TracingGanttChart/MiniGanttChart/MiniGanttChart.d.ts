import { ReactElement } from 'react';
import { Viewport } from '../utils';
import { TracingGanttChartOptions } from '../../gantt-chart-model';
import { Trace } from '../trace';
interface MiniGanttChartProps {
    options: TracingGanttChartOptions;
    trace: Trace;
    viewport: Viewport;
    setViewport: (v: Viewport) => void;
}
export declare function MiniGanttChart(props: MiniGanttChartProps): ReactElement;
export {};
//# sourceMappingURL=MiniGanttChart.d.ts.map