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
Object.defineProperty(exports, "useStatusHistoryDataModel", {
    enumerable: true,
    get: function() {
        return useStatusHistoryDataModel;
    }
});
const _core = require("@perses-dev/core");
const _react = require("react");
const _getcolor = require("./get-color");
const _gettimescale = require("./get-timescale");
function generateCompleteTimestamps(timescale) {
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
function useStatusHistoryDataModel(queryResults, themeColors, spec) {
    return (0, _react.useMemo)(()=>{
        if (!queryResults || queryResults.length === 0) {
            return {
                legendItems: [],
                statusHistoryData: [],
                xAxisCategories: [],
                yAxisCategories: [],
                colors: []
            };
        }
        const timeScale = (0, _gettimescale.getCommonTimeScaleForQueries)(queryResults);
        const statusHistoryData = [];
        const yAxisCategories = [];
        const legendSet = new Set();
        const hasValueMappings = spec.mappings?.length;
        const xAxisCategories = generateCompleteTimestamps(timeScale);
        queryResults.forEach(({ data })=>{
            if (!data) {
                return;
            }
            data.series.forEach((item)=>{
                const instance = item.formattedName || '';
                yAxisCategories.push(instance);
                const yIndex = yAxisCategories.length - 1;
                item.values.forEach(([time, value])=>{
                    const itemIndexOnXaxis = xAxisCategories.findIndex((v)=>v === time);
                    if (value !== null && itemIndexOnXaxis !== -1) {
                        let itemLabel = value;
                        if (hasValueMappings) {
                            const mappedValue = (0, _core.applyValueMapping)(value, spec.mappings);
                            itemLabel = mappedValue.value;
                        }
                        legendSet.add(value);
                        statusHistoryData.push({
                            value: [
                                itemIndexOnXaxis,
                                yIndex,
                                value
                            ],
                            label: String(itemLabel)
                        });
                    }
                });
            });
        });
        const uniqueValues = Array.from(legendSet);
        const colorsForValues = (0, _getcolor.getColorsForValues)(uniqueValues, themeColors);
        // get colors from theme and generate colors if not provided
        const colors = uniqueValues.map((value, index)=>{
            let valueColor = colorsForValues[index] ?? _getcolor.FALLBACK_COLOR;
            if (hasValueMappings) {
                const mappedValue = (0, _core.applyValueMapping)(value, spec.mappings);
                valueColor = mappedValue.color ?? valueColor;
            }
            return {
                value,
                color: valueColor
            };
        });
        const legendItems = uniqueValues.map((value, idx)=>{
            let label = String(value);
            if (hasValueMappings) {
                const mappedValue = (0, _core.applyValueMapping)(value, spec.mappings);
                label = String(mappedValue.value);
            }
            const color = colors.find((i)=>i.value === value)?.color || _getcolor.FALLBACK_COLOR;
            return {
                id: `${idx}-${value}`,
                label,
                color
            };
        });
        return {
            xAxisCategories,
            yAxisCategories,
            legendItems,
            statusHistoryData,
            timeScale,
            colors
        };
    }, [
        queryResults,
        spec.mappings,
        themeColors
    ]);
}
