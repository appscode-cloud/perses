import { ReactElement } from 'react';
interface GanttTableContextType {
    collapsedSpans: string[];
    setCollapsedSpans: (s: string[]) => void;
    visibleSpans: string[];
    setVisibleSpans: (s: string[]) => void;
    /** can be a spanId, an empty string for the root span or undefined for no hover */
    hoveredParent?: string;
    setHoveredParent: (s?: string) => void;
}
/**
 * GanttTableContext stores UI state of the rows.
 * Required for passing down state to deeply nested <SpanIndents>,
 * without re-rendering intermediate components.
 */
export declare const GanttTableContext: import("react").Context<GanttTableContextType | undefined>;
interface GanttTableProviderProps {
    children?: React.ReactNode;
}
export declare function GanttTableProvider(props: GanttTableProviderProps): ReactElement;
export declare function useGanttTableContext(): GanttTableContextType;
export {};
//# sourceMappingURL=GanttTableProvider.d.ts.map