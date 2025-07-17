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
