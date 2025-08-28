import { ReactElement } from 'react';
import { Viewport } from '../utils';
import { TracingGanttChartOptions } from '../../gantt-chart-model';
import { Span } from '../trace';
export interface SpanDurationProps {
    options: TracingGanttChartOptions;
    span: Span;
    viewport: Viewport;
}
/**
 * SpanDuration renders the right column of a SpanRow, i.e. the span bar and span duration
 */
export declare function SpanDuration(props: SpanDurationProps): ReactElement;
//# sourceMappingURL=SpanDuration.d.ts.map