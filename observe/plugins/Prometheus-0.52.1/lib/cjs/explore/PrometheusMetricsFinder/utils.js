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
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    useLabelValues: function() {
        return useLabelValues;
    },
    useLabels: function() {
        return useLabels;
    },
    useMetricMetadata: function() {
        return useMetricMetadata;
    },
    useSeriesStates: function() {
        return useSeriesStates;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _reactquery = require("@tanstack/react-query");
const _react = require("react");
const _types = require("./types");
function useMetricMetadata(metricName, datasource, enabled) {
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    // histograms and summaries timeseries desc are not always added to prefixed timeseries
    const name = metricName.replace(/(_count|_sum|_bucket)$/, '');
    const { data, isLoading, error } = (0, _reactquery.useQuery)({
        enabled: !!client && enabled,
        queryKey: [
            'metricMetadata',
            name
        ],
        queryFn: async ()=>{
            const params = {
                metric: name
            };
            return await client.metricMetadata(params);
        }
    });
    // Find the first result with help text
    const metadata = (0, _react.useMemo)(()=>{
        for (const metric of data?.data?.[name] ?? []){
            if (metric.help.length > 0) {
                return metric;
            }
        }
        return undefined;
    }, [
        data,
        name
    ]);
    return {
        metadata,
        isLoading,
        error
    };
}
function useLabels(filters, datasource) {
    const { absoluteTimeRange: { start, end } } = (0, _pluginsystem.useTimeRange)();
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'labels',
            'datasource',
            datasource.name,
            'start',
            start,
            'end',
            end,
            'filters',
            ...filters
        ],
        queryFn: async ()=>{
            const params = {
                start: start.valueOf() / 1000,
                end: end.valueOf() / 1000
            };
            if (filters.length) {
                params['match[]'] = [
                    `{${(0, _types.computeFilterExpr)(filters)}}`
                ];
            }
            return await client.labelNames(params);
        }
    });
}
function useLabelValues(labelName, filters, datasource) {
    const { absoluteTimeRange: { start, end } } = (0, _pluginsystem.useTimeRange)();
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    return (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'labelValues',
            labelName,
            'datasource',
            datasource.name,
            'start',
            start,
            'end',
            'filters',
            ...filters
        ],
        queryFn: async ()=>{
            const params = {
                labelName: labelName,
                start: start.valueOf() / 1000,
                end: end.valueOf() / 1000
            };
            if (filters.length) {
                params['match[]'] = [
                    `{${(0, _types.computeFilterExpr)(filters)}}`
                ];
            }
            return await client.labelValues(params);
        }
    });
}
function useSeriesStates(metricName, filters, datasource) {
    const { absoluteTimeRange: { start, end } } = (0, _pluginsystem.useTimeRange)();
    const { data: client } = (0, _pluginsystem.useDatasourceClient)(datasource);
    const { data: seriesData, isLoading, isError, error } = (0, _reactquery.useQuery)({
        enabled: !!client,
        queryKey: [
            'series',
            metricName,
            'datasource',
            datasource,
            'start',
            start,
            'end',
            'filters',
            ...filters
        ],
        queryFn: async ()=>{
            const params = {
                'match[]': [
                    `{${(0, _types.computeFilterExpr)(filters)}}`
                ],
                start: start.valueOf() / 1000,
                end: end.valueOf() / 1000
            };
            return await client.series(params);
        }
    });
    const labelValueCounters = (0, _react.useMemo)(()=>{
        const result = new Map();
        if (seriesData?.data === undefined) {
            return result;
        }
        for (const series of seriesData.data){
            for (const [label, value] of Object.entries(series)){
                const labelCounters = result.get(label);
                if (labelCounters === undefined) {
                    result.set(label, [
                        {
                            labelValue: value,
                            counter: 1
                        }
                    ]);
                    continue;
                }
                const labelValueCounter = labelCounters.find((counter)=>counter.labelValue === value);
                if (labelValueCounter === undefined) {
                    labelCounters.push({
                        labelValue: value,
                        counter: 1
                    });
                } else {
                    labelValueCounter.counter += 1;
                }
            }
        }
        return result;
    }, [
        seriesData
    ]);
    return {
        series: seriesData?.data,
        labelValueCounters,
        isLoading,
        isError,
        error
    };
}
