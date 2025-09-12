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
    formatItemValue: function() {
        return formatItemValue;
    },
    formatNanoDuration: function() {
        return formatNanoDuration;
    }
});
const _core = require("@perses-dev/core");
function formatNanoDuration(value) {
    // The value to format is in nanoseconds
    if (value < 1_000) {
        return (0, _core.formatValue)(value, {
            unit: 'decimal',
            decimalPlaces: 2,
            shortValues: true
        }) + 'ns';
    } else if (value < 1_000_000) {
        return (0, _core.formatValue)(value / 1_000, {
            unit: 'decimal',
            decimalPlaces: 2,
            shortValues: true
        }) + 'μs';
    } else {
        return (0, _core.formatDuration)((0, _core.msToPrometheusDuration)(value / 1_000_000));
    }
}
function formatItemValue(unit, value) {
    let valueWithUnit = '';
    switch(unit){
        case 'count':
            valueWithUnit = (0, _core.formatValue)(value, {
                unit: 'decimal',
                decimalPlaces: 2,
                shortValues: true
            });
            break;
        case 'samples':
            valueWithUnit = (0, _core.formatValue)(value, {
                unit: 'decimal',
                decimalPlaces: 2,
                shortValues: true
            });
            break;
        case 'objects':
            valueWithUnit = (0, _core.formatValue)(value, {
                unit: 'decimal',
                decimalPlaces: 2,
                shortValues: true
            });
            break;
        case 'bytes':
            valueWithUnit = (0, _core.formatValue)(value, {
                unit: 'bytes'
            });
            break;
        case 'nanoseconds':
            valueWithUnit = formatNanoDuration(value);
            break;
        default:
            valueWithUnit = `${value} ${unit}`;
            break;
    }
    return valueWithUnit;
}
