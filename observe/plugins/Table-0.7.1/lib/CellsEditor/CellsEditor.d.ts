import { ReactElement } from 'react';
import { CellSettings } from '../table-model';
export interface CellsEditorProps {
    cellSettings: CellSettings[];
    onChange: (cellOptions: CellSettings[]) => void;
}
export declare function CellsEditor({ cellSettings, onChange }: CellsEditorProps): ReactElement;
//# sourceMappingURL=CellsEditor.d.ts.map