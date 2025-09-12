import { DurationString, HTTPProxy } from '@perses-dev/core';
import { PrometheusDatasourceSelector } from '../model';
export declare const DEFAULT_SCRAPE_INTERVAL: DurationString;
export interface PrometheusDatasourceSpec {
    directUrl?: string;
    proxy?: HTTPProxy;
    scrapeInterval?: DurationString;
}
export interface PrometheusVariableOptionsBase {
    datasource?: PrometheusDatasourceSelector;
}
export type PrometheusLabelNamesVariableOptions = PrometheusVariableOptionsBase & {
    matchers?: string[];
};
export type PrometheusLabelValuesVariableOptions = PrometheusVariableOptionsBase & {
    labelName: string;
    matchers?: string[];
};
export type PrometheusPromQLVariableOptions = PrometheusVariableOptionsBase & {
    expr: string;
    labelName: string;
};
//# sourceMappingURL=types.d.ts.map