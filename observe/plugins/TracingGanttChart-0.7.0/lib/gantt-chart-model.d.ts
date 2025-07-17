/**
 * The Options object type supported by the TracingGanttChart panel plugin.
 */
export interface TracingGanttChartOptions {
    visual?: TracingGanttChartVisualOptions;
}
export interface TracingGanttChartVisualOptions {
    palette?: TracingGanttChartPaletteOptions;
}
export interface TracingGanttChartPaletteOptions {
    mode: 'auto' | 'categorical';
}
/**
 * Creates the initial/empty options for a TracingGanttChart panel.
 */
export declare function createInitialTracingGanttChartOptions(): Record<string, unknown>;
//# sourceMappingURL=gantt-chart-model.d.ts.map