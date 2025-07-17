import { StackProps } from '@mui/material';
import { DatasourceSelector } from '@perses-dev/core';
import { ReactElement } from 'react';
import { LabelFilter } from '../types';
export interface ExplorerFiltersProps extends StackProps {
    datasource: DatasourceSelector;
    filters: LabelFilter[];
    filteredFilters: LabelFilter[];
    onDatasourceChange: (next: DatasourceSelector) => void;
    onFiltersChange: (next: LabelFilter[]) => void;
}
export declare function FinderFilters({ datasource, filters, filteredFilters, onDatasourceChange, onFiltersChange, ...props }: ExplorerFiltersProps): ReactElement;
//# sourceMappingURL=FinderFilters.d.ts.map