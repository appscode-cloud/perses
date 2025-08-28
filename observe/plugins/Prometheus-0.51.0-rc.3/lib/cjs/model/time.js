// Copyright 2023 The Perses Authors
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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getDurationStringSeconds: function() {
        return getDurationStringSeconds;
    },
    getPrometheusTimeRange: function() {
        return getPrometheusTimeRange;
    },
    getRangeStep: function() {
        return getRangeStep;
    }
});
const _core = require("@perses-dev/core");
const _datefns = require("date-fns");
function getPrometheusTimeRange(timeRange) {
    const { start, end } = timeRange;
    return {
        start: Math.ceil((0, _datefns.getUnixTime)(start)),
        end: Math.ceil((0, _datefns.getUnixTime)(end))
    };
}
// Max data points to allow returning from a Prom Query, used to calculate a
// "safe" step for a range query
const MAX_PROM_DATA_POINTS = 10000;
function getRangeStep(timeRange, minStepSeconds = 15, resolution = 1, suggestedStepMs = 0) {
    const suggestedStepSeconds = suggestedStepMs / 1000;
    const queryRangeSeconds = timeRange.end - timeRange.start;
    let safeStep = queryRangeSeconds / MAX_PROM_DATA_POINTS;
    if (safeStep > 1) {
        safeStep = Math.ceil(safeStep);
    }
    return Math.max(suggestedStepSeconds * resolution, minStepSeconds, safeStep);
}
function getDurationStringSeconds(durationString) {
    if (!durationString) return undefined;
    const duration = (0, _core.parseDurationString)(durationString);
    const ms = (0, _datefns.milliseconds)(duration);
    return Math.floor(ms / 1000);
}
