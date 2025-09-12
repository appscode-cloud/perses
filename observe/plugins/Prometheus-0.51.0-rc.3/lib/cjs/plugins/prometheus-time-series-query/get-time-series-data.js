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
Object.defineProperty(exports, "getTimeSeriesData", {
    enumerable: true,
    get: function() {
        return getTimeSeriesData;
    }
});
const _core = require("@perses-dev/core");
const _pluginsystem = require("@perses-dev/plugin-system");
const _datefns = require("date-fns");
const _model = require("../../model");
const _utils = require("../../utils");
const _types = require("../types");
const _replaceprombuiltinvariables = require("./replace-prom-builtin-variables");
const getTimeSeriesData = async (spec, context)=>{
    if (spec.query === undefined || spec.query === null || spec.query === '') {
        // Do not make a request to the backend, instead return an empty TimeSeriesData
        return {
            series: []
        };
    }
    const listDatasourceSelectItems = await context.datasourceStore.listDatasourceSelectItems(_model.PROM_DATASOURCE_KIND);
    const selectedDatasource = (0, _pluginsystem.datasourceSelectValueToSelector)(spec.datasource ?? _model.DEFAULT_PROM, context.variableState, listDatasourceSelectItems) ?? _model.DEFAULT_PROM;
    const datasource = await context.datasourceStore.getDatasource(selectedDatasource);
    const datasourceScrapeInterval = Math.trunc((0, _datefns.milliseconds)((0, _core.parseDurationString)(datasource.plugin.spec.scrapeInterval ?? _types.DEFAULT_SCRAPE_INTERVAL)) / 1000);
    // Min step is the lower bound of the interval between data points
    // If no value is provided for it, it should default to the scrape interval of the datasource
    const minStep = (0, _model.getDurationStringSeconds)(// resolve any variable that may have been provided
    // TODO add a validation check to make sure the variable is a DurationString, to avoid the back & forth cast here
    (0, _pluginsystem.replaceVariables)(spec.minStep, context.variableState)) ?? datasourceScrapeInterval;
    const timeRange = (0, _model.getPrometheusTimeRange)(context.timeRange);
    const step = (0, _model.getRangeStep)(timeRange, minStep, undefined, context.suggestedStepMs); // TODO: resolution
    // Align the time range so that it's a multiple of the step
    let { start, end } = timeRange;
    const utcOffsetSec = new Date().getTimezoneOffset() * 60;
    const alignedEnd = Math.floor((end + utcOffsetSec) / step) * step - utcOffsetSec;
    const alignedStart = Math.floor((start + utcOffsetSec) / step) * step - utcOffsetSec;
    start = alignedStart;
    end = alignedEnd;
    // Replace variable placeholders in PromQL query
    const intervalMs = step * 1000;
    const minStepMs = minStep * 1000;
    let query = (0, _replaceprombuiltinvariables.replacePromBuiltinVariables)(spec.query, minStepMs, intervalMs);
    query = (0, _pluginsystem.replaceVariables)(query, context.variableState);
    let seriesNameFormat = spec.seriesNameFormat;
    // if series name format is defined, replace variable placeholders in series name format
    if (seriesNameFormat) {
        seriesNameFormat = (0, _pluginsystem.replaceVariables)(seriesNameFormat, context.variableState);
    }
    // Get the datasource, using the default Prom Datasource if one isn't specified in the query
    const client = await context.datasourceStore.getDatasourceClient(selectedDatasource);
    // Make the request to Prom
    let response;
    switch(context.mode){
        case 'instant':
            response = await client.instantQuery({
                query,
                time: end
            });
            break;
        case 'range':
        default:
            response = await client.rangeQuery({
                query,
                start,
                end,
                step
            });
            break;
    }
    // TODO: What about error responses from Prom that have a response body?
    const result = response.data;
    // Custom display for response header warnings, configurable error responses display coming next
    const notices = [];
    if (response.status === 'success') {
        const warnings = response.warnings ?? [];
        const warningMessage = warnings[0] ?? '';
        if (warningMessage !== '') {
            notices.push({
                type: 'warning',
                message: warningMessage
            });
        }
    }
    // Transform response
    const chartData = {
        // Return the time range and step we actually used for the query
        timeRange: {
            start: (0, _datefns.fromUnixTime)(start),
            end: (0, _datefns.fromUnixTime)(end)
        },
        stepMs: step * 1000,
        series: buildTimeSeries(query, result, seriesNameFormat),
        metadata: {
            notices,
            executedQueryString: query
        }
    };
    return chartData;
};
function buildVectorData(query, data, seriesNameFormat) {
    return data.result.map((res)=>{
        const { metric, value, histogram } = res;
        // Account for seriesNameFormat from query editor when determining name to show in legend, tooltip, etc.
        const { name, formattedName } = (0, _utils.getFormattedPrometheusSeriesName)(query, metric, seriesNameFormat);
        if (histogram) {
            return {
                name,
                formattedName,
                labels: metric,
                values: [
                    (0, _model.parseValueTuple)([
                        histogram[0],
                        histogram[1].sum
                    ])
                ],
                histograms: [
                    histogram
                ]
            };
        }
        return {
            name,
            formattedName,
            labels: metric,
            values: [
                (0, _model.parseValueTuple)(value)
            ]
        };
    });
}
function buildMatrixData(query, data, seriesNameFormat) {
    return data.result.map((res)=>{
        const { metric, values, histograms } = res;
        // Account for seriesNameFormat from query editor when determining name to show in legend, tooltip, etc.
        const { name, formattedName } = (0, _utils.getFormattedPrometheusSeriesName)(query, metric, seriesNameFormat);
        if (histograms) {
            return {
                name,
                formattedName,
                labels: metric,
                values: histograms.map((histogram)=>(0, _model.parseValueTuple)([
                        histogram[0],
                        histogram[1].sum
                    ])),
                histograms: histograms.map((histogram)=>histogram)
            };
        }
        return {
            name,
            formattedName,
            labels: metric,
            values: values.map(_model.parseValueTuple)
        };
    });
}
function buildScalarData(query, data, seriesNameFormat) {
    const { name, formattedName } = (0, _utils.getFormattedPrometheusSeriesName)(query, {}, seriesNameFormat);
    return [
        {
            name,
            values: [
                (0, _model.parseValueTuple)(data.result)
            ],
            formattedName
        }
    ];
}
function buildTimeSeries(query, data, seriesNameFormat) {
    if (!data) {
        return [];
    }
    const resultType = data.resultType;
    switch(resultType){
        case 'vector':
            return buildVectorData(query, data, seriesNameFormat);
        case 'matrix':
            return buildMatrixData(query, data, seriesNameFormat);
        case 'scalar':
            return buildScalarData(query, data, seriesNameFormat);
        default:
            console.warn('Unknown result type', resultType, data);
            return [];
    }
}
