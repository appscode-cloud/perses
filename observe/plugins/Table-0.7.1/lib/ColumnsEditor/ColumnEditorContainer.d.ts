import { ReactElement } from 'react';
import { ColumnEditorProps } from './ColumnEditor';
export interface ColumnEditorContainerProps extends ColumnEditorProps {
    isCollapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    onDelete: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}
export declare function ColumnEditorContainer({ column, isCollapsed, onChange, onCollapse, onDelete, onMoveUp, onMoveDown, }: ColumnEditorContainerProps): ReactElement;
//# sourceMappingURL=ColumnEditorContainer.d.ts.map