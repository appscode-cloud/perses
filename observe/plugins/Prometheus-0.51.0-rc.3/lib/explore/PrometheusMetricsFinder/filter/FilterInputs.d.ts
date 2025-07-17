import { HTMLAttributes, ReactElement } from 'react';
import { DatasourceSelector } from '@perses-dev/core';
import { LabelFilter } from '../types';
export interface LabelFilterInputProps {
    datasource: DatasourceSelector;
    value: LabelFilter;
    filters: LabelFilter[];
    onChange: (next: LabelFilter) => void;
    onDelete: () => void;
}
export declare function LabelFilterInput({ datasource, value, filters, onChange, onDelete, }: LabelFilterInputProps): ReactElement;
export declare const ListboxComponent: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & import("react").RefAttributes<HTMLUListElement>>;
export interface RawFilterInputProps {
    value: LabelFilter;
    labelOptions?: string[];
    labelValuesOptions?: string[];
    isLabelOptionsLoading?: boolean;
    isLabelValuesOptionsLoading?: boolean;
    onChange: (next: LabelFilter) => void;
    onDelete: () => void;
}
export declare function RawFilterInput({ value, labelOptions, labelValuesOptions, isLabelOptionsLoading, isLabelValuesOptionsLoading, onChange, onDelete, }: RawFilterInputProps): ReactElement;
//# sourceMappingURL=FilterInputs.d.ts.map