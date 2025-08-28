"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrometheusPromQLVariable", {
    enumerable: true,
    get: function() {
        return PrometheusPromQLVariable;
    }
});
const _pluginsystem = require("@perses-dev/plugin-system");
const _model = require("../model");
const _prometheusvariables = require("./prometheus-variables");
const PrometheusPromQLVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const client = await ctx.datasourceStore.getDatasourceClient(spec.datasource ?? _model.DEFAULT_PROM);
        // TODO we may want to manage a range query as well.
        const { data: options } = await client.instantQuery({
            query: (0, _pluginsystem.replaceVariables)(spec.expr, ctx.variables)
        });
        const labelName = (0, _pluginsystem.replaceVariables)(spec.labelName, ctx.variables);
        let values = [];
        if (options?.resultType === 'matrix') {
            values = (0, _prometheusvariables.capturingMatrix)(options, labelName);
        } else if (options?.resultType === 'vector') {
            values = (0, _prometheusvariables.capturingVector)(options, labelName);
        }
        return {
            data: (0, _prometheusvariables.stringArrayToVariableOptions)(values)
        };
    },
    dependsOn: (spec)=>{
        return {
            variables: (0, _pluginsystem.parseVariables)(spec.expr).concat((0, _pluginsystem.parseVariables)(spec.labelName))
        };
    },
    OptionsEditorComponent: _prometheusvariables.PrometheusPromQLVariableEditor,
    createInitialOptions: ()=>({
            expr: '',
            labelName: ''
        })
};
