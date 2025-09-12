import { ReactElement } from 'react';
import { otlptracev1 } from '@perses-dev/core';
import { TracingGanttChartOptions } from '../gantt-chart-model';
import { AttributeLinks } from './DetailPane/Attributes';
export interface TracingGanttChartProps {
    options: TracingGanttChartOptions;
    attributeLinks?: AttributeLinks;
    trace: otlptracev1.TracesData;
}
/**
 * The core GanttChart panel for Perses.
 *
 * The UI/UX of this panel is based on Jaeger UI, licensed under Apache License, Version 2.0.
 * https://github.com/jaegertracing/jaeger-ui
 */
export declare function TracingGanttChart(props: TracingGanttChartProps): ReactElement;
//# sourceMappingURL=TracingGanttChart.d.ts.map