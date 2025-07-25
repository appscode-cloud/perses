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
    convertThresholds: function() {
        return convertThresholds;
    },
    defaultThresholdInput: function() {
        return defaultThresholdInput;
    }
});
const _zip = /*#__PURE__*/ _interop_require_default(require("lodash/zip"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const defaultThresholdInput = {
    steps: [
        {
            value: 0
        }
    ]
};
function convertThresholds(thresholds, unit, max, palette) {
    const defaultThresholdColor = thresholds.defaultColor ?? palette.defaultColor;
    const defaultThresholdSteps = [
        [
            0,
            defaultThresholdColor
        ]
    ];
    if (thresholds.steps !== undefined) {
        // https://echarts.apache.org/en/option.html#series-gauge.axisLine.lineStyle.color
        // color segments must be decimal between 0 and 1
        const segmentMax = 1;
        const valuesArr = thresholds.steps.map((step)=>{
            if (thresholds.mode === 'percent') {
                return step.value / 100;
            }
            return step.value / max;
        });
        valuesArr.push(segmentMax);
        const colorsArr = thresholds.steps.map((step, index)=>step.color ?? palette.palette[index]);
        colorsArr.unshift(defaultThresholdColor);
        const zippedArr = (0, _zip.default)(valuesArr, colorsArr);
        return zippedArr.map((elem)=>{
            const convertedValues = elem[0] ?? segmentMax;
            const convertedColors = elem[1] ?? defaultThresholdColor;
            return [
                convertedValues,
                convertedColors
            ];
        });
    } else {
        return defaultThresholdSteps;
    }
}
