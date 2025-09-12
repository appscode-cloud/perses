export interface QuerySettingsOptions {
    queryIndex: number;
    colorMode: 'fixed' | 'fixed-single';
    colorValue: string;
}
export interface ChartPaletteOptions {
    mode: 'auto' | 'categorical';
}
export type StackOptions = 'none' | 'all';
export type ChartVisualOptions = {
    display?: 'line' | 'bar';
    lineWidth?: number;
    areaOpacity?: number;
    showPoints?: 'auto' | 'always';
    palette?: ChartPaletteOptions;
    pointRadius?: number;
    stack?: StackOptions;
    connectNulls?: boolean;
};
//# sourceMappingURL=model.d.ts.map