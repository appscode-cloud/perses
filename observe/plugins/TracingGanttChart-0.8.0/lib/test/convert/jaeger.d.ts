import { otlptracev1 } from '@perses-dev/core';
export interface JaegerTrace {
    traceID: string;
    spans: Span[];
    processes: unknown;
    warnings: unknown;
}
interface Span {
    traceID: string;
    spanID: string;
    hasChildren: boolean;
    childSpanIds: string[];
    depth: number;
    processID: string;
    process: Process;
    operationName: string;
    /** start time in microseconds */
    startTime: number;
    relativeStartTime: number;
    duration: number;
    tags: Tag[];
    references: unknown;
    logs: unknown;
    warnings: unknown;
}
interface Process {
    serviceName: string;
    tags: Tag[];
}
type Tag = {
    type: 'string';
    key: string;
    value: string;
} | {
    type: 'int64';
    key: string;
    value: number;
};
export declare function jaegerTraceToOTLP(jaegerTrace: JaegerTrace): otlptracev1.TracesData;
export {};
//# sourceMappingURL=jaeger.d.ts.map