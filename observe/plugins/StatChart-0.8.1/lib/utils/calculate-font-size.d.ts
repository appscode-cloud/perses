import { FontSizeOption } from '@perses-dev/components';
interface CalculateFontSize {
    text: string;
    fontWeight: number;
    width: number;
    height: number;
    lineHeight: number;
    maxSize?: number;
    fontSizeOverride?: FontSizeOption;
}
/**
 * Find the optimal font size given available space
 */
export declare function useOptimalFontSize({ text, fontWeight, width, height, lineHeight, maxSize, fontSizeOverride, }: CalculateFontSize): number;
export {};
//# sourceMappingURL=calculate-font-size.d.ts.map