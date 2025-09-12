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
Object.defineProperty(exports, "PrometheusDatasource", {
    enumerable: true,
    get: function() {
        return PrometheusDatasource;
    }
});
const _model = require("../model");
const _PrometheusDatasourceEditor = require("./PrometheusDatasourceEditor");
/**
 * Creates a PrometheusClient for a specific datasource spec.
 */ const createClient = (spec, options)=>{
    const { directUrl, proxy } = spec;
    const { proxyUrl } = options;
    // Use the direct URL if specified, but fallback to the proxyUrl by default if not specified
    const datasourceUrl = directUrl ?? proxyUrl;
    if (datasourceUrl === undefined) {
        throw new Error('No URL specified for Prometheus client. You can use directUrl in the spec to configure it.');
    }
    const specHeaders = proxy?.spec.headers;
    // Could think about this becoming a class, although it definitely doesn't have to be
    return {
        options: {
            datasourceUrl
        },
        healthCheck: (0, _model.healthCheck)({
            datasourceUrl,
            headers: specHeaders
        }),
        instantQuery: (params, headers)=>(0, _model.instantQuery)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        rangeQuery: (params, headers)=>(0, _model.rangeQuery)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        labelNames: (params, headers)=>(0, _model.labelNames)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        labelValues: (params, headers)=>(0, _model.labelValues)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        metricMetadata: (params, headers)=>(0, _model.metricMetadata)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        series: (params, headers)=>(0, _model.series)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            }),
        parseQuery: (params, headers)=>(0, _model.parseQuery)(params, {
                datasourceUrl,
                headers: headers ?? specHeaders
            })
    };
};
const getBuiltinVariableDefinitions = ()=>{
    return [
        {
            kind: 'BuiltinVariable',
            spec: {
                name: '__interval',
                value: ()=>'$__interval',
                source: 'Prometheus',
                display: {
                    name: '__interval',
                    description: 'For dynamic queries that adapt across different time ranges, use $__interval instead of hardcoded intervals. It represents the actual spacing between data points: it’s calculated based on the current time range and the panel pixel width (taking the "Min step" as a lower bound).',
                    hidden: true
                }
            }
        },
        {
            kind: 'BuiltinVariable',
            spec: {
                name: '__interval_ms',
                value: ()=>'$__interval_ms',
                source: 'Prometheus',
                display: {
                    name: '__interval_ms',
                    description: 'Same as $__interval but in milliseconds.',
                    hidden: true
                }
            }
        },
        {
            kind: 'BuiltinVariable',
            spec: {
                name: '__rate_interval',
                value: ()=>'$__rate_interval',
                source: 'Prometheus',
                display: {
                    name: '__rate_interval',
                    description: 'Use this one rather than $__interval as the range parameter of functions like rate, increase, etc. With such function it is advised to choose a range that is at least 4x the scrape interval (this is to allow for various races, and to be resilient to a failed scrape). $__rate_interval provides that, as it is defined as `max($__interval + Min Step, 4 * Min Step)`, where Min Step value should represent the scrape interval of the metrics.',
                    hidden: true
                }
            }
        }
    ];
};
const PrometheusDatasource = {
    createClient,
    getBuiltinVariableDefinitions,
    OptionsEditorComponent: _PrometheusDatasourceEditor.PrometheusDatasourceEditor,
    createInitialOptions: ()=>({
            directUrl: ''
        })
};
