import { UnknownSpec, QueryDefinition } from '@perses-dev/core';
export type TraceQueryDefinition<PluginSpec = UnknownSpec> = QueryDefinition<'TraceQuery', PluginSpec>;
/**
 * The Options object type supported by the ScatterChart panel plugin.
 */
export interface ScatterChartOptions {
    /** range of the circles diameter */
    sizeRange?: [number, number];
}
/**
 * Creates the initial/empty options for a ScatterChart panel.
 */
export declare function createInitialScatterChartOptions(): Record<string, unknown>;
//# sourceMappingURL=scatter-chart-model.d.ts.map