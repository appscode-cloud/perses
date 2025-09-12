import { ReactElement } from 'react';
import { ColumnSettings } from '../table-model';
export interface ColumnsEditorProps {
    columnSettings: ColumnSettings[];
    onChange: (columnOptions: ColumnSettings[]) => void;
}
export declare function ColumnsEditor({ columnSettings, onChange }: ColumnsEditorProps): ReactElement;
//# sourceMappingURL=ColumnsEditor.d.ts.map