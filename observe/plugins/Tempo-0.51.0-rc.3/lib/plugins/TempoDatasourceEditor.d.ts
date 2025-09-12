import { ReactElement } from 'react';
import { TempoDatasourceSpec } from './tempo-datasource-types';
export interface TempoDatasourceEditorProps {
    value: TempoDatasourceSpec;
    onChange: (next: TempoDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function TempoDatasourceEditor(props: TempoDatasourceEditorProps): ReactElement;
//# sourceMappingURL=TempoDatasourceEditor.d.ts.map