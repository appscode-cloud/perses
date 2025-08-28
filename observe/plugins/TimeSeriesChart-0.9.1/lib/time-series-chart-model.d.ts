import { Definition, ThresholdOptions, FormatOptions } from '@perses-dev/core';
import { OptionsEditorProps, LegendSpecOptions } from '@perses-dev/plugin-system';
/**
 * The schema for a TimeSeriesChart panel.
 */
export interface TimeSeriesChartDefinition extends Definition<TimeSeriesChartOptions> {
    kind: 'TimeSeriesChart';
}
/**
 * The Options object supported by the TimeSeriesChartPanel plugin.
 */
export interface TimeSeriesChartOptions {
    legend?: LegendSpecOptions;
    yAxis?: TimeSeriesChartYAxisOptions;
    thresholds?: ThresholdOptions;
    visual?: TimeSeriesChartVisualOptions;
    tooltip?: TooltipSpecOptions;
    querySettings?: QuerySettingsOptions[];
}
export interface QuerySettingsOptions {
    queryIndex: number;
    colorMode: 'fixed' | 'fixed-single';
    colorValue: string;
}
export type TimeSeriesChartOptionsEditorProps = OptionsEditorProps<TimeSeriesChartOptions>;
export interface TimeSeriesChartYAxisOptions {
    show?: boolean;
    label?: string;
    format?: FormatOptions;
    min?: number;
    max?: number;
}
export interface TooltipSpecOptions {
    enablePinning: boolean;
}
export interface TimeSeriesChartPaletteOptions {
    mode: 'auto' | 'categorical';
}
export type TimeSeriesChartVisualOptions = {
    display?: 'line' | 'bar';
    lineWidth?: number;
    areaOpacity?: number;
    showPoints?: 'auto' | 'always';
    palette?: TimeSeriesChartPaletteOptions;
    pointRadius?: number;
    stack?: StackOptions;
    connectNulls?: boolean;
};
export declare const DEFAULT_FORMAT: FormatOptions;
export declare const DEFAULT_Y_AXIS: TimeSeriesChartYAxisOptions;
export declare const Y_AXIS_CONFIG: {
    show: {
        label: string;
    };
    label: {
        label: string;
    };
    unit: {
        label: string;
    };
    min: {
        label: string;
    };
    max: {
        label: string;
    };
};
export declare const DEFAULT_LINE_WIDTH = 1.25;
export declare const DEFAULT_AREA_OPACITY = 0;
export declare const POINT_SIZE_OFFSET = 1.5;
export declare const DEFAULT_POINT_RADIUS: number;
export declare const DEFAULT_CONNECT_NULLS = false;
export declare const DEFAULT_VISUAL: TimeSeriesChartVisualOptions;
export declare const THRESHOLD_PLOT_INTERVAL = 15;
export declare const VISUAL_CONFIG: {
    lineWidth: {
        label: string;
        testId: string;
        min: number;
        max: number;
        step: number;
    };
    pointRadius: {
        label: string;
        testId: string;
        min: number;
        max: number;
        step: number;
    };
    areaOpacity: {
        label: string;
        testId: string;
        min: number;
        max: number;
        step: number;
    };
    stack: {
        label: string;
    };
    connectNulls: {
        label: string;
    };
};
export type StackOptions = 'none' | 'all';
export declare const STACK_CONFIG: {
    none: {
        label: string;
    };
    all: {
        label: string;
    };
};
export declare const STACK_OPTIONS: ({
    label: string;
    id: StackOptions;
} | {
    label: string;
    id: StackOptions;
})[];
export declare const POSITIVE_MIN_VALUE_MULTIPLIER = 0.8;
export declare const NEGATIVE_MIN_VALUE_MULTIPLIER = 1.2;
/**
 * Creates an initial/empty options object for the TimeSeriesChartPanel.
 */
export declare function createInitialTimeSeriesChartOptions(): TimeSeriesChartOptions;
//# sourceMappingURL=time-series-chart-model.d.ts.map