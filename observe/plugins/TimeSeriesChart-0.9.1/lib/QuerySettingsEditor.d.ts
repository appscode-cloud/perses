import { ReactElement, RefObject } from 'react';
import { QuerySettingsOptions } from './time-series-chart-model';
export interface QuerySettingsEditorProps {
    querySettingsList?: QuerySettingsOptions[];
    onChange: (querySettingsList: QuerySettingsOptions[]) => void;
}
export declare function QuerySettingsEditor({ querySettingsList, onChange }: QuerySettingsEditorProps): ReactElement;
export interface QuerySettingsInputProps {
    querySettings: QuerySettingsOptions;
    availableQueryIndexes: number[];
    onQueryIndexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onColorModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onColorValueChange: (colorValue: string) => void;
    onDelete: () => void;
    inputRef?: RefObject<HTMLInputElement | null>;
}
export declare function QuerySettingsInput({ querySettings: { queryIndex, colorMode, colorValue }, availableQueryIndexes, onQueryIndexChange, onColorModeChange, onColorValueChange, onDelete, inputRef, }: QuerySettingsInputProps): ReactElement;
//# sourceMappingURL=QuerySettingsEditor.d.ts.map