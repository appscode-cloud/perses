/**
 * The Options object type supported by the TraceTable panel plugin.
 */
export interface TraceTableOptions {
    visual?: TraceTableVisualOptions;
}
export interface TraceTableVisualOptions {
    palette?: TraceTablePaletteOptions;
}
export interface TraceTablePaletteOptions {
    mode: 'auto' | 'categorical';
}
/**
 * Creates the initial/empty options for a TraceTable panel.
 */
export declare function createInitialTraceTableOptions(): TraceTableOptions;
//# sourceMappingURL=trace-table-model.d.ts.map