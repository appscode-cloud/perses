import { Theme } from '@mui/material';
import { FormatOptions } from '@perses-dev/core';
import { HeatMapData } from './HeatMapChart';
interface CustomTooltipProps {
    data: HeatMapData;
    label: string;
    marker: string;
    xAxisCategories: number[];
    yAxisCategories: string[];
    theme: Theme;
    yAxisFormat?: FormatOptions;
    countFormat?: FormatOptions;
}
export declare function generateTooltipHTML({ data, label, marker, xAxisCategories, yAxisCategories, theme, yAxisFormat, countFormat, }: CustomTooltipProps): string;
export {};
//# sourceMappingURL=HeatMapTooltip.d.ts.map