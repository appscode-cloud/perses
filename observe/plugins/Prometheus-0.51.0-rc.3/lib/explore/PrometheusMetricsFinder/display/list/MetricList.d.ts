import { StackProps } from '@mui/material';
import { FuzzyMatchingInterval } from '@nexucis/fuzzy';
import { DatasourceSelector } from '@perses-dev/core';
import { ReactElement, ReactNode } from 'react';
import { LabelFilter } from '../../types';
export interface MetricRowProps {
    children?: ReactNode;
    metricName: string;
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    isMetadataEnabled?: boolean;
    onExplore?: (metricName: string) => void;
}
export declare function MetricRow({ children, metricName, datasource, filters, isMetadataEnabled, onExplore, }: MetricRowProps): ReactElement;
export interface MetricListProps extends StackProps {
    metricNames: string[];
    filteredResults?: Array<{
        original: string;
        intervals?: FuzzyMatchingInterval[];
    }>;
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    isMetadataEnabled?: boolean;
    onExplore?: (metricName: string) => void;
}
export declare function MetricList({ metricNames, filteredResults, datasource, filters, isMetadataEnabled, onExplore, ...props }: MetricListProps): ReactElement;
//# sourceMappingURL=MetricList.d.ts.map