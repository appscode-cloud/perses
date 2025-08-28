import { Grid2Props as GridProps } from '@mui/material';
import { ReactElement } from 'react';
import { CellSettings } from '../table-model';
export interface CellEditorProps extends Omit<GridProps, 'onChange'> {
    cell: CellSettings;
    onChange: (cell: CellSettings) => void;
    onDelete: () => void;
}
export declare function CellEditor({ cell, onChange, onDelete, ...props }: CellEditorProps): ReactElement;
//# sourceMappingURL=CellEditor.d.ts.map