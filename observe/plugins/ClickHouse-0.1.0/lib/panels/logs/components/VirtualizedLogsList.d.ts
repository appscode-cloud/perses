import React from 'react';
import { LogEntry } from '../../../model/click-house-data-types';
interface VirtualizedLogsListProps {
    logs: LogEntry[];
    expandedRows: Set<number>;
    onToggleExpand: (index: number) => void;
}
export declare const VirtualizedLogsList: React.FC<VirtualizedLogsListProps>;
export {};
//# sourceMappingURL=VirtualizedLogsList.d.ts.map