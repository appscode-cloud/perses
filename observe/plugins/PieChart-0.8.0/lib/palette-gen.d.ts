export interface SeriesColorProps {
    categoricalPalette: string[];
    muiPrimaryColor: string;
    seriesName: string;
}
/**
 * Get line color as well as color for tooltip and legend, account for whether palette is 'categorical' or 'auto' aka generative
 */
export declare function getSeriesColor(props: SeriesColorProps): string;
/**
 * Get color from generative color palette, this approaches uses series name as the seed and
 * allows for consistent colors across panels (when all panels use this approach).
 */
export declare function getAutoPaletteColor(name: string, fallbackColor: string): string;
/**
 * Default classical qualitative palette that cycles through the colors array by index.
 */
export declare function getCategoricalPaletteColor(palette: string[], seriesIndex: number, fallbackColor: string): string;
export declare function getConsistentSeriesNameColor(inputString: string): string;
//# sourceMappingURL=palette-gen.d.ts.map