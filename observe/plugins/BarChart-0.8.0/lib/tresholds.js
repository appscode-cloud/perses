import zip from 'lodash/zip';
export const defaultThresholdInput = {
    steps: [
        {
            value: 0
        }
    ]
};
export function convertThresholds(thresholds, unit, max, palette) {
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
        const zippedArr = zip(valuesArr, colorsArr);
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

//# sourceMappingURL=tresholds.js.map