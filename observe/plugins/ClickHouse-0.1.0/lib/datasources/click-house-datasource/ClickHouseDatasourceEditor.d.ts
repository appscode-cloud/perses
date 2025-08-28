import { ReactElement } from 'react';
import { ClickHouseDatasourceSpec } from './click-house-datasource-types';
export interface ClickHouseDatasourceEditorProps {
    value: ClickHouseDatasourceSpec;
    onChange: (next: ClickHouseDatasourceSpec) => void;
    isReadonly?: boolean;
}
export declare function ClickHouseDatasourceEditor(props: ClickHouseDatasourceEditorProps): ReactElement;
//# sourceMappingURL=ClickHouseDatasourceEditor.d.ts.map