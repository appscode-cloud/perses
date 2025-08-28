import { PanelProps } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { TimeSeriesData } from '@perses-dev/core';
import { TableOptions } from './table-model';
export declare function getTablePanelQueryOptions(spec: TableOptions): {
    mode: 'instant' | 'range';
};
export type TableProps = PanelProps<TableOptions, TimeSeriesData>;
export declare function TablePanel({ contentDimensions, spec, queryResults }: TableProps): ReactElement | null;
//# sourceMappingURL=TablePanel.d.ts.map