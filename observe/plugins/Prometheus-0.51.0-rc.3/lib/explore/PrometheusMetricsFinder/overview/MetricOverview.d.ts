import { StackProps } from '@mui/material';
import { ReactElement } from 'react';
import { DatasourceSelector } from '@perses-dev/core';
import { LabelFilter } from '../types';
export interface OverviewPanelProps extends StackProps {
    metricName: string;
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    type?: string;
    isLoading?: boolean;
}
export declare function OverviewPanel({ metricName, datasource, filters, type, isLoading, ...props }: OverviewPanelProps): ReactElement;
export interface MetricOverviewProps extends StackProps {
    metricName: string;
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    isMetadataEnabled?: boolean;
    isPanelEnabled?: boolean;
    onExplore?: (metricName: string) => void;
    onFiltersChange: (filters: LabelFilter[]) => void;
}
export declare function MetricOverview({ metricName, datasource, filters, isMetadataEnabled, isPanelEnabled, onExplore, onFiltersChange, ...props }: MetricOverviewProps): ReactElement;
//# sourceMappingURL=MetricOverview.d.ts.map