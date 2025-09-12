import { StackProps } from '@mui/material';
import { ReactElement } from 'react';
import { ColumnSettings } from '../table-model';
type OmittedMuiProps = 'children' | 'value' | 'onChange';
export interface ColumnEditorProps extends Omit<StackProps, OmittedMuiProps> {
    column: ColumnSettings;
    onChange: (column: ColumnSettings) => void;
}
export declare function ColumnEditor({ column, onChange, ...others }: ColumnEditorProps): ReactElement;
export {};
//# sourceMappingURL=ColumnEditor.d.ts.map