import { DatasourceSelector } from '@perses-dev/core';
export type Operator = '=' | '!=' | '=~' | '!~';
export interface Settings {
    isMetadataEnabled: boolean;
    isPanelEnabled: boolean;
}
export interface FinderQueryParams {
    datasource?: DatasourceSelector;
    filters?: LabelFilter[];
    exploredMetric?: string;
}
export interface LabelFilter {
    label: string;
    labelValues: string[];
    operator: Operator;
}
export declare function computeFilterExpr(filters: LabelFilter[]): string;
export interface LabelValueCounter {
    labelValue: string;
    counter: number;
}
//# sourceMappingURL=types.d.ts.map