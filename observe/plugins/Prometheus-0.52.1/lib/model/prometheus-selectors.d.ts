import { DatasourceSelector } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
export declare const PROM_DATASOURCE_KIND: "PrometheusDatasource";
/**
 * DatasourceSelector for Prom Datasources.
 */
export interface PrometheusDatasourceSelector extends DatasourceSelector {
    kind: typeof PROM_DATASOURCE_KIND;
}
/**
 * A default selector that asks for the default Prom Datasource.
 */
export declare const DEFAULT_PROM: PrometheusDatasourceSelector;
/**
 * Returns true if the provided datasourceSelectValue is the default PrometheusDatasourceSelector.
 */
export declare function isDefaultPromSelector(datasourceSelectValue: DatasourceSelectValue): boolean;
/**
 * Type guard to make sure a datasourceSelectValue is a Prometheus one.
 */
export declare function isPrometheusDatasourceSelector(datasourceSelectValue: DatasourceSelectValue): datasourceSelectValue is PrometheusDatasourceSelector;
//# sourceMappingURL=prometheus-selectors.d.ts.map