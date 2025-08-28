import { Viewport } from '../utils';
import { TracingGanttChartOptions } from '../../gantt-chart-model';
import { Span } from '../trace';
interface GanttTableRowProps {
    options: TracingGanttChartOptions;
    span: Span;
    viewport: Viewport;
    selected?: boolean;
    nameColumnWidth: number;
    divider: React.ReactNode;
    onClick: (span: Span) => void;
}
export declare const GanttTableRow: import("react").NamedExoticComponent<GanttTableRowProps>;
export {};
//# sourceMappingURL=GanttTableRow.d.ts.map