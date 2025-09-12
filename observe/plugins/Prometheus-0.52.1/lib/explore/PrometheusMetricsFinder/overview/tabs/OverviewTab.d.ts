import { DatasourceSelector } from '@perses-dev/core';
import { ReactElement } from 'react';
import { StackProps } from '@mui/material';
import { LabelFilter, LabelValueCounter } from '../../types';
export interface LabelValuesRowProps extends StackProps {
    label: string;
    valueCounters: LabelValueCounter[];
    onFilterAdd: (filter: LabelFilter) => void;
    orderBy?: 'asc' | 'amount';
}
export declare function LabelValuesRow({ label, valueCounters, onFilterAdd, ...props }: LabelValuesRowProps): ReactElement;
export interface LabelValuesTableProps extends StackProps {
    labelValueCounters: Map<string, LabelValueCounter[]>;
    isLoading?: boolean;
    onFilterAdd: (filter: LabelFilter) => void;
}
export declare function LabelValuesTable({ labelValueCounters, isLoading, onFilterAdd, ...props }: LabelValuesTableProps): ReactElement;
export interface OverviewTabProps extends StackProps {
    metricName: string;
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    onFilterAdd: (filter: LabelFilter) => void;
}
export declare function OverviewTab({ metricName, datasource, filters, onFilterAdd, ...props }: OverviewTabProps): ReactElement;
//# sourceMappingURL=OverviewTab.d.ts.map