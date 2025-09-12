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
import { replaceVariables } from '@perses-dev/plugin-system';
import { DEFAULT_DATASOURCE } from './constants';
function buildTimeSeries(response) {
    if (!response || !response.data || response.data.length === 0) {
        return [];
    }
    const values = response.data.map((row)=>{
        const timestamp = new Date(row.time).getTime();
        const value = Number(row.log_count);
        return [
            timestamp,
            value
        ];
    });
    return [
        {
            name: 'log_count',
            values
        }
    ];
}
function flattenObject(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)){
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }
    return result;
}
function convertStreamsToLogs(streams) {
    const entries = streams.map((entry)=>{
        const flattened = flattenObject(entry);
        if (!flattened.Timestamp && flattened.log_time) {
            flattened.Timestamp = flattened.log_time;
        }
        const sortedEntry = {};
        Object.keys(flattened).sort((a, b)=>a.localeCompare(b)).forEach((key)=>{
            sortedEntry[key] = flattened[key];
        });
        const line = Object.entries(sortedEntry).filter(([key])=>key !== 'Timestamp').map(([key, value])=>`<${key}> ${value === '' || value === null || value === undefined ? '--' : value}`).join(' ');
        return {
            timestamp: sortedEntry?.Timestamp,
            labels: sortedEntry,
            line
        };
    });
    return {
        entries,
        totalCount: entries.length
    };
}
export const getTimeSeriesData = async (spec, context)=>{
    if (spec.query === undefined || spec.query === null || spec.query === '') {
        return {
            series: []
        };
    }
    const query = replaceVariables(spec.query, context.variableState);
    const client = await context.datasourceStore.getDatasourceClient(spec.datasource ?? DEFAULT_DATASOURCE);
    const { start, end } = context.timeRange;
    const response = await client.query({
        start: start.getTime().toString(),
        end: end.getTime().toString(),
        query
    });
    return {
        series: buildTimeSeries(response),
        timeRange: {
            start,
            end
        },
        stepMs: 30 * 1000,
        logs: convertStreamsToLogs(response.data),
        metadata: {
            executedQueryString: query
        }
    };
};

//# sourceMappingURL=get-click-house-data.js.map