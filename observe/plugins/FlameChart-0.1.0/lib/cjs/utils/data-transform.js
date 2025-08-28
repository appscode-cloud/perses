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
    filterJson: function() {
        return filterJson;
    },
    findTotalSampleByName: function() {
        return findTotalSampleByName;
    },
    recursionJson: function() {
        return recursionJson;
    },
    tableRecursionJson: function() {
        return tableRecursionJson;
    }
});
const _palettegen = require("./palette-gen");
const _format = require("./format");
function filterJson(json, id) {
    if (id === null) {
        return json;
    }
    const recur = (item, id)=>{
        if (item.id === id) {
            return item;
        }
        for (const child of item.children || []){
            const temp = recur(child, id);
            if (temp) {
                item.children = [
                    temp
                ];
                // change the parents' values
                item.start = temp.start;
                item.end = temp.end;
                // item.self = temp.self;
                // item.total = temp.total;
                return item;
            }
        }
    };
    return recur(json, id) || json;
}
// build the name of the corresponding flamechart item
function formatName(item, rootVal, unit) {
    return item.total / rootVal * 100 < 1 ? '' : item.name + ` (${(0, _format.formatItemValue)(unit, item.total)})`;
}
/**
 * Search the total value of an item corresponding to a given ID
 */ function getCurrentTotalValue(json, id) {
    if (id === undefined) return 0;
    const recur = (item)=>{
        if (item.id === id) {
            return item.total;
        }
        for (const child of item.children || []){
            const total = recur(child);
            if (total !== undefined) {
                return total;
            }
        }
        return 0; // If not found, return 0
    };
    return recur(json);
}
function recursionJson(palette, metadata, jsonObj, searchValue, id) {
    const data = [];
    const filteredJson = filterJson(structuredClone(jsonObj), id);
    const rootVal = filteredJson.total; // total samples of root node
    const currentVal = getCurrentTotalValue(filteredJson, id); // total samples of the selected item, used to generate items colors
    const recur = (item)=>{
        const temp = {
            name: item.id,
            value: [
                item.level,
                item.start,
                item.end,
                formatName(item, currentVal ? currentVal : rootVal, metadata?.units),
                item.total / rootVal * 100,
                item.self / rootVal * 100,
                item.name,
                item.self,
                item.total
            ],
            itemStyle: {
                color: !isItemNameMatchesSearchFilters(item.name, searchValue) ? '#dee2e6' : (0, _palettegen.getSpanColor)(palette, item.name, item.total / (currentVal ? currentVal : rootVal) * 100)
            }
        };
        data.push(temp);
        for (const child of item.children || []){
            recur(child);
        }
    };
    // check is filteredJson is not empty before call recur
    if (filteredJson.id) recur(filteredJson);
    return data;
}
function tableRecursionJson(jsonObj, searchValue) {
    const data = [];
    const structuredJson = structuredClone(jsonObj);
    const recur = (item)=>{
        const temp = {
            id: item.id,
            name: item.name,
            self: item.self,
            total: item.total
        };
        if (isItemNameMatchesSearchFilters(temp.name, searchValue)) data.push(temp);
        for (const child of item.children || []){
            recur(child);
        }
    };
    // check is structuredJson is not empty before call recur
    if (structuredJson.id) recur(structuredJson);
    return data;
}
// Checks if an item name matches all parts of a search value.
function isItemNameMatchesSearchFilters(itemName, searchValue) {
    if (searchValue === '') return true;
    const filters = searchValue.trim().toLocaleLowerCase().split(/[^a-zA-Z0-9']+/).filter((s)=>s !== '');
    if (filters.length === 0) {
        return false;
    } else {
        return filters.every((filter)=>itemName.toLowerCase().includes(filter.trim()));
    }
}
function findTotalSampleByName(seriesData, name) {
    if (name === undefined || name === 0) return undefined;
    const item = seriesData.find((item)=>item.name === name);
    const totalSample = item?.value[8];
    return Number(totalSample);
}
