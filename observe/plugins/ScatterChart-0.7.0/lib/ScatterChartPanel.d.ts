import { PanelProps } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { QueryDefinition, TraceData, TraceSearchResult } from '@perses-dev/core';
import { ScatterChartOptions } from './scatter-chart-model';
export interface EChartTraceValue extends Omit<TraceSearchResult, 'startTimeUnixMs' | 'serviceStats'> {
    name: string;
    query: QueryDefinition;
    startTime: Date;
    spanCount: number;
    errorCount: number;
}
export interface ScatterChartPanelProps extends PanelProps<ScatterChartOptions, TraceData> {
    /**
     * Custom onClick event handler.
     * If this field is unset or undefined, a default handler which links to the Gantt chart on the explore page is configured.
     * Set this field explicitly to null to disable handling the click event.
     */
    onClick?: ((data: EChartTraceValue) => void) | null;
}
/**
 * ScatterChartPanel receives data from the DataQueriesProvider and transforms it
 * into a `dataset` object that Apache ECharts can consume. Additionally,
 * data formatting is also dictated in this component. Formatting includes
 * datapoint size and color.
 *
 * Documentation for data structures accepted by Apache ECharts:
 *  https://echarts.apache.org/handbook/en/concepts/dataset
 *
 * Examples for scatter chart formatting in Apache ECharts:
 *  https://echarts.apache.org/examples/en/index.html#chart-type-scatter
 *
 * @returns a `ScatterPlot` component that contains an EChart which will handle
 * visualization of the data.
 */
export declare function ScatterChartPanel(props: ScatterChartPanelProps): ReactElement | null;
export declare function getSymbolSize(spanCount: number, spanCountRange: [number, number], sizeRange: [number, number]): number;
//# sourceMappingURL=ScatterChartPanel.d.ts.map