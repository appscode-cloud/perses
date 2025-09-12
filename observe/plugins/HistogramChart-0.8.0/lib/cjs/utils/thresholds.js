"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getColorFromThresholds", {
    enumerable: true,
    get: function() {
        return getColorFromThresholds;
    }
});
function getColorFromThresholds(value, thresholds, chartsTheme, defaultColor) {
    if (thresholds?.steps) {
        const matchingColors = thresholds.steps.map((step, index)=>{
            if (value >= step.value) {
                return step.color ?? chartsTheme.thresholds.palette[index] ?? thresholds.defaultColor ?? defaultColor;
            }
            return null;
        }).filter((color)=>color !== null);
        return matchingColors[matchingColors.length - 1] ?? thresholds.defaultColor ?? defaultColor;
    }
    return thresholds?.defaultColor ?? defaultColor;
}
