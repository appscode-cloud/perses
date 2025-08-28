import { OptionsEditorProps, VariableOption } from '@perses-dev/plugin-system';
import { ReactElement } from 'react';
import { MatrixData, VectorData } from '../model';
import { PrometheusLabelNamesVariableOptions, PrometheusLabelValuesVariableOptions, PrometheusPromQLVariableOptions } from './types';
export declare function PrometheusLabelValuesVariableEditor(props: OptionsEditorProps<PrometheusLabelValuesVariableOptions>): ReactElement;
export declare function PrometheusLabelNamesVariableEditor(props: OptionsEditorProps<PrometheusLabelNamesVariableOptions>): ReactElement;
export declare function PrometheusPromQLVariableEditor(props: OptionsEditorProps<PrometheusPromQLVariableOptions>): ReactElement;
export declare function capturingMatrix(matrix: MatrixData, labelName: string): string[];
export declare function capturingVector(vector: VectorData, labelName: string): string[];
/**
 * Takes a list of strings and returns a list of VariableOptions
 */
export declare const stringArrayToVariableOptions: (values?: string[]) => VariableOption[];
//# sourceMappingURL=prometheus-variables.d.ts.map