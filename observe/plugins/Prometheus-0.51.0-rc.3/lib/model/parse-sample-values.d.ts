import { ValueTuple } from './api-types';
/**
 * ValueTuple from the Prom server, parsed into ms and floating point number
 */
export type ParsedValueTuple = [unixTimeMs: number, value: number];
/**
 * Parse a ValueTuple from a PromServer response into the a millisecond-based
 * unix time and a numeric sample value.
 */
export declare function parseValueTuple(data: ValueTuple): ParsedValueTuple;
/**
 * Parses a string sample value from Prometheus, usually included as the
 * second member of a ValueTuple.
 */
export declare function parseSampleValue(sampleValue: ValueTuple[1]): number;
//# sourceMappingURL=parse-sample-values.d.ts.map