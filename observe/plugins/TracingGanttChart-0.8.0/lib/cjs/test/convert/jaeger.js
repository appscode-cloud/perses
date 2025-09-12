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
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jaegerTraceToOTLP", {
    enumerable: true,
    get: function() {
        return jaegerTraceToOTLP;
    }
});
function jaegerTraceToOTLP(jaegerTrace) {
    return {
        resourceSpans: jaegerTrace.spans.map(buildResourceSpan)
    };
}
function buildResourceSpan(span) {
    return {
        resource: buildResource(span.process),
        scopeSpans: [
            {
                scope: {
                    name: ''
                },
                spans: [
                    {
                        traceId: span.traceID,
                        spanId: span.spanID,
                        name: span.operationName,
                        kind: '',
                        startTimeUnixNano: (span.startTime * 1000).toString(),
                        endTimeUnixNano: ((span.startTime + span.duration) * 1000).toString(),
                        attributes: span.tags.map(buildKeyValue),
                        events: [],
                        status: {}
                    }
                ]
            }
        ]
    };
}
function buildResource(process) {
    return {
        attributes: [
            {
                key: 'service.name',
                value: {
                    stringValue: process.serviceName
                }
            },
            ...process.tags.map(buildKeyValue)
        ]
    };
}
function buildKeyValue(tag) {
    return {
        key: tag.key,
        value: buildAnyValue(tag)
    };
}
function buildAnyValue(tags) {
    switch(tags.type){
        case 'string':
            return {
                stringValue: tags.value
            };
        case 'int64':
            return {
                intValue: tags.value.toString()
            };
        default:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            throw new Error(`unknown jaeger tag type ${tags.type}`);
    }
}
