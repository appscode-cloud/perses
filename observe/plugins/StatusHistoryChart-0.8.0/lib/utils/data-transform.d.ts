import { LegendItem } from '@perses-dev/components';
import { TimeScale, TimeSeriesData } from '@perses-dev/core';
import { PanelData } from '@perses-dev/plugin-system';
import { StatusHistoryChartOptions } from '../status-history-model';
import { StatusHistoryDataItem } from '../StatusHistoryChartBase';
interface StatusHistoryDataModel {
    legendItems: LegendItem[];
    statusHistoryData: StatusHistoryDataItem[];
    xAxisCategories: number[];
    yAxisCategories: string[];
    timeScale?: TimeScale;
    colors: Array<{
        value: string | number;
        color: string;
    }>;
}
export declare function useStatusHistoryDataModel(queryResults: Array<PanelData<TimeSeriesData>>, themeColors: string[], spec: StatusHistoryChartOptions): StatusHistoryDataModel;
export {};
//# sourceMappingURL=data-transform.d.ts.map