import { DatasourceSelector } from '@perses-dev/core';
import { DatasourceSelectValue } from '@perses-dev/plugin-system';
export declare const TEMPO_DATASOURCE_KIND: "TempoDatasource";
/**
 * DatasourceSelector for Tempo Datasources.
 */
export interface TempoDatasourceSelector extends DatasourceSelector {
    kind: typeof TEMPO_DATASOURCE_KIND;
}
/**
 * A default selector that asks for the default Tempo Datasource.
 */
export declare const DEFAULT_TEMPO: TempoDatasourceSelector;
/**
 * Returns true if the provided datasourceSelectValue is the default TempoDatasourceSelector.
 */
export declare function isDefaultTempoSelector(datasourceSelectValue: DatasourceSelectValue): boolean;
/**
 * Type guard to make sure a datasourceSelectValue is a Tempo one.
 */
export declare function isTempoDatasourceSelector(datasourceSelectValue: DatasourceSelectValue): datasourceSelectValue is TempoDatasourceSelector;
//# sourceMappingURL=tempo-selectors.d.ts.map