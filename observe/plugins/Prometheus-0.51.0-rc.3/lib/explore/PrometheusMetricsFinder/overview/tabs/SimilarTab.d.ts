import { DatasourceSelector } from '@perses-dev/core';
import { StackProps } from '@mui/material';
import { ReactElement } from 'react';
import { LabelFilter } from '../../types';
export interface SimilarTabProps extends StackProps {
    filters: LabelFilter[];
    datasource: DatasourceSelector;
    isMetadataEnabled?: boolean;
    onExplore: (metricName: string) => void;
}
export declare function SimilarTab({ filters, datasource, isMetadataEnabled, onExplore, ...props }: SimilarTabProps): ReactElement;
//# sourceMappingURL=SimilarTab.d.ts.map