import { Theme } from '@mui/material';
import { StatusHistoryData } from './StatusHistoryChartBase';
interface CustomTooltipProps {
    data: StatusHistoryData;
    label?: string;
    marker: string;
    xAxisCategories: number[];
    yAxisCategories: string[];
    theme: Theme;
}
export declare function generateTooltipHTML({ data, label, marker, xAxisCategories, yAxisCategories, theme, }: CustomTooltipProps): string;
export {};
//# sourceMappingURL=StatusHistoryTooltip.d.ts.map