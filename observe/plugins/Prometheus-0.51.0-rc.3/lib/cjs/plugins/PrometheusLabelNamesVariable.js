"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrometheusLabelNamesVariable", {
    enumerable: true,
    get: function() {
        return PrometheusLabelNamesVariable;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _model = require("../model");
const _prometheusvariables = require("./prometheus-variables");
const PrometheusLabelNamesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const client = await ctx.datasourceStore.getDatasourceClient(spec.datasource ?? _model.DEFAULT_PROM);
        const match = spec.matchers ? spec.matchers.map((m)=>(0, _pluginsystem.replaceVariables)(m, ctx.variables)) : undefined;
        const timeRange = (0, _model.getPrometheusTimeRange)(ctx.timeRange);
        const { data: options } = await client.labelNames({
            'match[]': match,
            ...timeRange
        });
        return {
            data: (0, _prometheusvariables.stringArrayToVariableOptions)(options)
        };
    },
    dependsOn: (spec)=>{
        return {
            variables: spec.matchers?.map((m)=>(0, _pluginsystem.parseVariables)(m)).flat() || []
        };
    },
    OptionsEditorComponent: _prometheusvariables.PrometheusLabelNamesVariableEditor,
    createInitialOptions: ()=>({})
};
