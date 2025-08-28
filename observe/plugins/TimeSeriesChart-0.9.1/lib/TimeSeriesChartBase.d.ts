import { MouseEvent } from 'react';
import { TimeScale, FormatOptions, TimeSeries } from '@perses-dev/core';
import type { EChartsCoreOption, GridComponentOption, YAXisComponentOption } from 'echarts';
import { ChartInstance, TimeChartSeriesMapping, TooltipConfig, ZoomEventData } from '@perses-dev/components';
export interface TimeChartProps {
    height: number;
    data: TimeSeries[];
    seriesMapping: TimeChartSeriesMapping;
    timeScale?: TimeScale;
    yAxis?: YAXisComponentOption;
    format?: FormatOptions;
    grid?: GridComponentOption;
    tooltipConfig?: TooltipConfig;
    noDataVariant?: 'chart' | 'message';
    syncGroup?: string;
    isStackedBar?: boolean;
    onDataZoom?: (e: ZoomEventData) => void;
    onDoubleClick?: (e: MouseEvent) => void;
    __experimentalEChartsOptionsOverride?: (options: EChartsCoreOption) => EChartsCoreOption;
}
export declare const TimeSeriesChartBase: import("react").ForwardRefExoticComponent<TimeChartProps & import("react").RefAttributes<ChartInstance>>;
//# sourceMappingURL=TimeSeriesChartBase.d.ts.map