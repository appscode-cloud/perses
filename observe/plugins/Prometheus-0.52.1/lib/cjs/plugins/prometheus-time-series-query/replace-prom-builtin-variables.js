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
Object.defineProperty(exports, "replacePromBuiltinVariables", {
    enumerable: true,
    get: function() {
        return replacePromBuiltinVariables;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _core = require("@perses-dev/core");
function replacePromBuiltinVariables(query, minStepMs, intervalMs) {
    let updatedQuery = (0, _pluginsystem.replaceVariable)(query, '__interval_ms', intervalMs.toString());
    updatedQuery = (0, _pluginsystem.replaceVariable)(updatedQuery, '__interval', (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(intervalMs)));
    // The $__rate_interval variable is meant to be used with the rate() promQL function.
    // It is defined as max($__interval + Min step, 4 * Min step)
    const rateIntervalMs = Math.max(intervalMs + minStepMs, 4 * minStepMs);
    updatedQuery = (0, _pluginsystem.replaceVariable)(updatedQuery, '__rate_interval', (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(rateIntervalMs)));
    return updatedQuery;
}
