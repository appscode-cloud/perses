import { QueryDefinition, TraceData } from '@perses-dev/core';
import { PanelData } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { TraceTableOptions } from './trace-table-model';
export type TraceLink = (params: {
    query: QueryDefinition;
    traceId: string;
}) => string;
export interface DataTableProps {
    options: TraceTableOptions;
    result: Array<PanelData<TraceData>>;
    traceLink?: TraceLink;
}
export declare function DataTable(props: DataTableProps): ReactElement;
//# sourceMappingURL=DataTable.d.ts.map