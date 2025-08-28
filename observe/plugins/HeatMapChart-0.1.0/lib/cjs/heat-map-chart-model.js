// Copyright 2025 The Perses Authors
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
    DEFAULT_FORMAT: function() {
        return DEFAULT_FORMAT;
    },
    DEFAULT_MAX_PERCENT: function() {
        return DEFAULT_MAX_PERCENT;
    },
    DEFAULT_MAX_PERCENT_DECIMAL: function() {
        return DEFAULT_MAX_PERCENT_DECIMAL;
    },
    DEFAULT_MIN_PERCENT: function() {
        return DEFAULT_MIN_PERCENT;
    },
    DEFAULT_MIN_PERCENT_DECIMAL: function() {
        return DEFAULT_MIN_PERCENT_DECIMAL;
    },
    createInitialHeatMapChartOptions: function() {
        return createInitialHeatMapChartOptions;
    }
});
const DEFAULT_FORMAT = {
    unit: 'decimal'
};
const DEFAULT_MIN_PERCENT = 0;
const DEFAULT_MAX_PERCENT = 100;
const DEFAULT_MIN_PERCENT_DECIMAL = 0;
const DEFAULT_MAX_PERCENT_DECIMAL = 1;
function createInitialHeatMapChartOptions() {
    return {
        yAxisFormat: DEFAULT_FORMAT,
        countFormat: DEFAULT_FORMAT,
        showVisualMap: true
    };
}
