import { ThresholdColorPalette, ThresholdOptions, FormatOptions } from '@perses-dev/core';
export type GaugeColorStop = [number, string];
export type EChartsAxisLineColors = GaugeColorStop[];
export declare const defaultThresholdInput: ThresholdOptions;
export declare function convertThresholds(thresholds: ThresholdOptions, unit: FormatOptions, max: number, palette: ThresholdColorPalette): EChartsAxisLineColors;
//# sourceMappingURL=tresholds.d.ts.map