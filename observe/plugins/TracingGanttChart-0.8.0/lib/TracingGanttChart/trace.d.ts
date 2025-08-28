import { otlpcommonv1, otlptracev1 } from '@perses-dev/core';
/** holds the trace and computed properties required for the Gantt chart */
export interface Trace {
    trace: otlptracev1.TracesData;
    /**
     * if a trace is incomplete (e.g. a parent span has not been received yet),
     * this branch of the span tree will be appended to the root
     */
    rootSpans: Span[];
    startTimeUnixMs: number;
    endTimeUnixMs: number;
}
export interface Span {
    resource: Resource;
    scope: otlpcommonv1.InstrumentationScope;
    parentSpan?: Span;
    /** child spans, sorted by startTime */
    childSpans: Span[];
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    name: string;
    kind?: string;
    startTimeUnixMs: number;
    endTimeUnixMs: number;
    attributes: otlpcommonv1.KeyValue[];
    events: Event[];
    status: otlptracev1.Status;
}
export interface Resource {
    serviceName?: string;
    attributes: otlpcommonv1.KeyValue[];
}
export interface Event {
    timeUnixMs: number;
    name: string;
    attributes: otlpcommonv1.KeyValue[];
}
/**
 * getTraceModel builds a tree of spans from an OTLP trace,
 * and precomputes common fields, for example the start and end time of a trace.
 * Time complexity: O(2n)
 */
export declare function getTraceModel(trace: otlptracev1.TracesData): Trace;
//# sourceMappingURL=trace.d.ts.map