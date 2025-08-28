import { getCommonTimeScale } from '@perses-dev/core';
export function getCommonTimeScaleForQueries(queries) {
    const seriesData = queries.map((query)=>query.data);
    return getCommonTimeScale(seriesData);
}
export function generateCompleteTimestamps(timescale) {
    if (!timescale) {
        return [];
    }
    const { startMs, endMs, stepMs } = timescale;
    const timestamps = [];
    for(let time = startMs; time <= endMs; time += stepMs){
        timestamps.push(time);
    }
    return timestamps;
}

//# sourceMappingURL=data-transform.js.map