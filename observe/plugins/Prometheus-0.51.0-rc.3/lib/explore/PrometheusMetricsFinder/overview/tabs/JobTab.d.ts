import { DatasourceSelector } from '@perses-dev/core';
import { StackProps } from '@mui/material';
import { ReactElement } from 'react';
import { LabelFilter } from '../../types';
export interface JobList extends StackProps {
    job: string;
    filters: LabelFilter[];
    datasource: DatasourceSelector;
    isMetadataEnabled?: boolean;
    onExplore: (metricName: string) => void;
}
export declare function JobList({ job, filters, datasource, isMetadataEnabled, onExplore, ...props }: JobList): ReactElement;
export interface JobSection extends StackProps {
    jobs: string[];
    filters: LabelFilter[];
    datasource: DatasourceSelector;
    isMetadataEnabled?: boolean;
    onExplore: (metricName: string) => void;
}
export declare function JobSection({ jobs, filters, datasource, isMetadataEnabled, onExplore, ...props }: JobSection): ReactElement;
export interface JobTabProps extends StackProps {
    filters: LabelFilter[];
    datasource: DatasourceSelector;
    isMetadataEnabled?: boolean;
    onExplore: (metricName: string) => void;
}
export declare function JobTab({ filters, datasource, isMetadataEnabled, onExplore, ...props }: JobTabProps): ReactElement;
//# sourceMappingURL=JobTab.d.ts.map