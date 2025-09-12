import { PersesChartsTheme } from '@perses-dev/components';
import { Theme } from '@mui/material';
import { Span } from './trace';
/**
 * Viewport contains the current zoom, i.e. which timeframe of the trace should be visible
 */
export interface Viewport {
    startTimeUnixMs: number;
    endTimeUnixMs: number;
}
/** minimum span width, i.e. increase width if the calculated width is too small to be visible */
export declare const minSpanWidthPx = 2;
export declare const rowHeight = "2rem";
export declare const spanHasError: (span: Span) => boolean;
export declare function getServiceColor(muiTheme: Theme, chartsTheme: PersesChartsTheme, paletteMode: 'auto' | 'categorical' | undefined, serviceName: string, error?: boolean): string;
export declare function getSpanColor(muiTheme: Theme, chartsTheme: PersesChartsTheme, paletteMode: 'auto' | 'categorical' | undefined, span: Span): string;
export declare function formatDuration(timeMs: number): string;
//# sourceMappingURL=utils.d.ts.map