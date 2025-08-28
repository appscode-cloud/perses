import { PanelProps } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { TraceData } from '@perses-dev/core';
import { TracingGanttChartOptions } from './gantt-chart-model';
import { AttributeLinks } from './TracingGanttChart/DetailPane/Attributes';
export interface TracingGanttChartPanelProps extends PanelProps<TracingGanttChartOptions, TraceData> {
    /**
     * Allows custom links for each attribute in the detail pane.
     * Example:
     * {
     *   'k8s.pod.name': (attrs) => `/my/console/namespace/${attrs['k8s.namespace.name']?.stringValue}/${attrs['k8s.pod.name']?.stringValue}/detail`
     * }
     */
    attributeLinks?: AttributeLinks;
}
export declare function TracingGanttChartPanel(props: TracingGanttChartPanelProps): ReactElement;
//# sourceMappingURL=TracingGanttChartPanel.d.ts.map