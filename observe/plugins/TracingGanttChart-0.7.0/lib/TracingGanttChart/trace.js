// Copyright 2024 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { sortedIndexBy } from 'lodash';
/**
 * getTraceModel builds a tree of spans from an OTLP trace,
 * and precomputes common fields, for example the start and end time of a trace.
 * Time complexity: O(2n)
 */ export function getTraceModel(trace) {
    // first pass: build lookup table <spanId, Span> and compute min/max
    const lookup = new Map();
    const rootSpans = [];
    let startTimeUnixMs = 0;
    let endTimeUnixMs = 0;
    for (const resourceSpan of trace.resourceSpans){
        const resource = parseResource(resourceSpan.resource);
        for (const scopeSpan of resourceSpan.scopeSpans){
            const scope = parseScope(scopeSpan.scope);
            for (const otelSpan of scopeSpan.spans){
                const span = {
                    resource,
                    scope,
                    childSpans: [],
                    ...parseSpan(otelSpan)
                };
                lookup.set(otelSpan.spanId, span);
                if (startTimeUnixMs === 0 || span.startTimeUnixMs < startTimeUnixMs) {
                    startTimeUnixMs = span.startTimeUnixMs;
                }
                if (endTimeUnixMs === 0 || span.endTimeUnixMs > endTimeUnixMs) {
                    endTimeUnixMs = span.endTimeUnixMs;
                }
            }
        }
    }
    // second pass: build tree based on parentSpanId property
    for (const [, span] of lookup){
        if (!span.parentSpanId) {
            rootSpans.push(span);
            continue;
        }
        const parent = lookup.get(span.parentSpanId);
        if (!parent) {
            console.trace(`span ${span.spanId} has parent ${span.parentSpanId} which has not been received yet`);
            rootSpans.push(span);
            continue;
        }
        span.parentSpan = parent;
        const insertChildSpanAt = sortedIndexBy(parent.childSpans, span, (s)=>s.startTimeUnixMs);
        parent.childSpans.splice(insertChildSpanAt, 0, span);
    }
    return {
        trace,
        rootSpans,
        startTimeUnixMs,
        endTimeUnixMs
    };
}
function parseResource(resource) {
    let serviceName = 'unknown';
    for (const attr of resource?.attributes ?? []){
        if (attr.key === 'service.name' && 'stringValue' in attr.value) {
            serviceName = attr.value.stringValue;
            break;
        }
    }
    return {
        serviceName,
        attributes: resource?.attributes ?? []
    };
}
function parseScope(scope) {
    return scope ?? {};
}
/**
 * parseSpan parses the Span API type to the internal representation
 * i.e. convert strings to numbers etc.
 */ function parseSpan(span) {
    return {
        traceId: span.traceId,
        spanId: span.spanId,
        parentSpanId: span.parentSpanId,
        name: span.name,
        kind: span.kind,
        startTimeUnixMs: parseInt(span.startTimeUnixNano) * 1e-6,
        endTimeUnixMs: parseInt(span.endTimeUnixNano) * 1e-6,
        attributes: span.attributes ?? [],
        events: (span.events ?? []).map(parseEvent),
        status: span.status ?? {}
    };
}
function parseEvent(event) {
    return {
        timeUnixMs: parseInt(event.timeUnixNano) * 1e-6,
        name: event.name,
        attributes: event.attributes ?? []
    };
}

//# sourceMappingURL=trace.js.map