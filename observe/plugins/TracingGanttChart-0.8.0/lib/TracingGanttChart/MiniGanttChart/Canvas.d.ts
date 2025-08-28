import { ReactElement } from 'react';
import { Viewport } from '../utils';
import { TracingGanttChartOptions } from '../../gantt-chart-model';
import { Trace } from '../trace';
interface CanvasProps {
    options: TracingGanttChartOptions;
    trace: Trace;
    viewport: Viewport;
    setViewport: (v: Viewport) => void;
}
export declare function Canvas(props: CanvasProps): ReactElement;
export {};
//# sourceMappingURL=Canvas.d.ts.map