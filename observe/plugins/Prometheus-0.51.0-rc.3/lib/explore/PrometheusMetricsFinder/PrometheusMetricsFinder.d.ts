import { StackProps } from '@mui/material';
import { DatasourceSelector } from '@perses-dev/core';
import { ReactElement } from 'react';
import { LabelFilter, Settings } from './types';
export interface SettingsMenuProps {
    value: Settings;
    onChange: (value: Settings) => void;
}
export declare function SettingsMenu({ value, onChange }: SettingsMenuProps): ReactElement;
export interface MetricNameExplorerProps extends StackProps {
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    isMetadataEnabled?: boolean;
    onExplore?: (metricName: string) => void;
}
export declare function MetricNameExplorer({ datasource, filters, isMetadataEnabled, onExplore, ...props }: MetricNameExplorerProps): ReactElement;
export interface PrometheusMetricsFinderProps extends Omit<StackProps, 'onChange'> {
    value: {
        datasource: DatasourceSelector;
        filters: LabelFilter[];
        exploredMetric?: string;
    };
    onChange: ({ datasource, filters, exploredMetric, }: {
        datasource: DatasourceSelector;
        filters: LabelFilter[];
        exploredMetric?: string;
    }) => void;
    onExplore?: (metricName: string) => void;
}
export declare function PrometheusMetricsFinder({ value: { datasource, filters, exploredMetric }, onChange, onExplore, ...props }: PrometheusMetricsFinderProps): ReactElement;
//# sourceMappingURL=PrometheusMetricsFinder.d.ts.map