import { PanelProps } from '@perses-dev/plugin-system';
import { QueryDefinition, TraceData } from '@perses-dev/core';
import { ReactElement } from 'react';
import { TraceLink } from './DataTable';
import { TraceTableOptions } from './trace-table-model';
export interface TraceTablePanelProps extends PanelProps<TraceTableOptions, TraceData> {
    /**
     * Specify a link for the traces in the table.
     * If this field is unset or undefined, a link to the Gantt chart on the explore page is configured.
     * Set this field explicitly to null to disable creating a link.
     */
    traceLink?: TraceLink | null;
}
export declare function defaultTraceLink({ query: originalQuery, traceId, }: {
    query: QueryDefinition;
    traceId: string;
}): string;
export declare function TraceTablePanel(props: TraceTablePanelProps): ReactElement;
//# sourceMappingURL=TraceTablePanel.d.ts.map