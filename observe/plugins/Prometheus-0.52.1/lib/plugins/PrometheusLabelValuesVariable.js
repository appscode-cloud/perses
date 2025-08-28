import { replaceVariables, parseVariables } from '@perses-dev/plugin-system';
import { DEFAULT_PROM, getPrometheusTimeRange } from '../model';
import { stringArrayToVariableOptions, PrometheusLabelValuesVariableEditor } from './prometheus-variables';
export const PrometheusLabelValuesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const pluginDef = spec;
        const client = await ctx.datasourceStore.getDatasourceClient(spec.datasource ?? DEFAULT_PROM);
        const match = pluginDef.matchers ? pluginDef.matchers.map((m)=>replaceVariables(m, ctx.variables)) : undefined;
        const timeRange = getPrometheusTimeRange(ctx.timeRange);
        const { data: options } = await client.labelValues({
            labelName: replaceVariables(pluginDef.labelName, ctx.variables),
            'match[]': match,
            ...timeRange
        });
        return {
            data: stringArrayToVariableOptions(options)
        };
    },
    dependsOn: (spec)=>{
        return {
            variables: spec.matchers?.map((m)=>parseVariables(m)).flat().concat(parseVariables(spec.labelName)) || []
        };
    },
    OptionsEditorComponent: PrometheusLabelValuesVariableEditor,
    createInitialOptions: ()=>({
            labelName: ''
        })
};

//# sourceMappingURL=PrometheusLabelValuesVariable.js.map