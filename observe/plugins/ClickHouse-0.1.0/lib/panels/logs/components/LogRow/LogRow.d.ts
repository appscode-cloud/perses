import React from 'react';
import { LogEntry } from '../../../../model/click-house-data-types';
interface LogRowProps {
    log?: LogEntry;
    index: number;
    isExpanded: boolean;
    onToggle: (index: number) => void;
    isExpandable?: boolean;
    time?: boolean;
    wrap?: boolean;
}
export declare const LogRow: React.FC<LogRowProps>;
export {};
//# sourceMappingURL=LogRow.d.ts.map