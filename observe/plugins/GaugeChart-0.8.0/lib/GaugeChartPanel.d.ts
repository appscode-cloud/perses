import { TimeSeriesData } from '@perses-dev/core';
import { PanelProps } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { GaugeChartOptions } from './gauge-chart-model';
export type GaugeChartPanelProps = PanelProps<GaugeChartOptions, TimeSeriesData>;
export declare function GaugeChartPanel(props: GaugeChartPanelProps): ReactElement | null;
export declare function GaugeChartLoading({ contentDimensions }: GaugeChartPanelProps): React.ReactElement | null;
//# sourceMappingURL=GaugeChartPanel.d.ts.map