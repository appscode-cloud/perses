import { DatasourceSelector, StatusError } from '@perses-dev/core';
import { UseQueryResult } from '@tanstack/react-query';
import { LabelValuesResponse, Metric, MetricMetadata } from '../../model';
import { LabelFilter } from './types';
export declare function useMetricMetadata(metricName: string, datasource: DatasourceSelector, enabled?: boolean): {
    isLoading: false | true;
    metadata: MetricMetadata | undefined;
    error: StatusError | null;
};
export declare function useLabels(filters: LabelFilter[], datasource: DatasourceSelector): UseQueryResult<LabelValuesResponse, StatusError>;
export declare function useLabelValues(labelName: string, filters: LabelFilter[], datasource: DatasourceSelector): UseQueryResult<LabelValuesResponse, StatusError>;
export declare function useSeriesStates(metricName: string, filters: LabelFilter[], datasource: DatasourceSelector): {
    series: Metric[] | undefined;
    labelValueCounters: Map<string, Array<{
        labelValue: string;
        counter: number;
    }>>;
    isLoading: boolean;
    isError: boolean;
    error: StatusError | null;
};
//# sourceMappingURL=utils.d.ts.map