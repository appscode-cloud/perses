import { replaceVariables, parseVariables } from '@perses-dev/plugin-system';
import { DEFAULT_PROM, getPrometheusTimeRange } from '../model';
import { stringArrayToVariableOptions, PrometheusLabelNamesVariableEditor } from './prometheus-variables';
export const PrometheusLabelNamesVariable = {
    getVariableOptions: async (spec, ctx)=>{
        const client = await ctx.datasourceStore.getDatasourceClient(spec.datasource ?? DEFAULT_PROM);
        const match = spec.matchers ? spec.matchers.map((m)=>replaceVariables(m, ctx.variables)) : undefined;
        const timeRange = getPrometheusTimeRange(ctx.timeRange);
        const { data: options } = await client.labelNames({
            'match[]': match,
            ...timeRange
        });
        return {
            data: stringArrayToVariableOptions(options)
        };
    },
    dependsOn: (spec)=>{
        return {
            variables: spec.matchers?.map((m)=>parseVariables(m)).flat() || []
        };
    },
    OptionsEditorComponent: PrometheusLabelNamesVariableEditor,
    createInitialOptions: ()=>({})
};

//# sourceMappingURL=PrometheusLabelNamesVariable.js.map