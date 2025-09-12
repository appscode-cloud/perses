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
    getColorByPackageName: function() {
        return getColorByPackageName;
    },
    getColorByValue: function() {
        return getColorByValue;
    },
    getSpanColor: function() {
        return getSpanColor;
    }
});
const _palette = require("./palette");
const LESS_THAN_ONE_COLOR = '#dee2e6'; // use this color when the value is less than 1
const MORE_THAN_HUNDRED_COLOR = '#ffbdbd'; // use this color when the value is more than 100
const NOT_FOUND_COLOR = '#393d47';
// Palette of color to display the flame chart by value
const valueColorPalette = [
    '#fff85b',
    '#ffde4c',
    '#ffc252',
    '#ff8c00',
    '#f08c00',
    '#e67762',
    '#ff8c00',
    '#ff6f00',
    '#ff7070',
    '#ff3300',
    '#ff004c'
];
function getSpanColor(palette, functionName, value) {
    if (palette === 'package-name') {
        return getColorByPackageName(functionName, value);
    }
    return getColorByValue(value);
}
function getColorByValue(value) {
    if (value < 1) return LESS_THAN_ONE_COLOR;
    if (value > 100) return MORE_THAN_HUNDRED_COLOR;
    return valueColorPalette[Math.floor(value / (valueColorPalette.length - 1))] || NOT_FOUND_COLOR;
}
function getColorByPackageName(functionName, value) {
    // get package name from the function name.
    // It is the substring between the last '/' and the first '.' or the end of the string
    const packageName = functionName.split('/').pop()?.split('.')[0] || functionName;
    return value < 1 ? LESS_THAN_ONE_COLOR : (0, _palette.getConsistentColor)(packageName, false);
}
