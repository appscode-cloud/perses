import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { CompleteConfiguration } from '@prometheus-io/codemirror-promql';
import { ReactElement } from 'react';
import { PrometheusDatasourceSelector } from '../model';
export type PromQLEditorProps = {
    completeConfig: CompleteConfiguration;
    datasource: PrometheusDatasourceSelector;
} & Omit<ReactCodeMirrorProps, 'theme' | 'extensions'>;
export declare function PromQLEditor({ completeConfig, datasource, ...rest }: PromQLEditorProps): ReactElement;
//# sourceMappingURL=PromQLEditor.d.ts.map