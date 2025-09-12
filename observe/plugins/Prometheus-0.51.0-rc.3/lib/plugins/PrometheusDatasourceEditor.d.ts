import { ReactElement } from 'react';
import { PrometheusDatasourceSpec } from './types';
export interface PrometheusDatasourceEditorProps {
    value: PrometheusDatasourceSpec;
    onChange: (next: PrometheusDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function PrometheusDatasourceEditor(props: PrometheusDatasourceEditorProps): ReactElement;
//# sourceMappingURL=PrometheusDatasourceEditor.d.ts.map