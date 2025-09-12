import { OptionsEditorProps } from '@perses-dev/plugin-system';
import { DurationString } from '@perses-dev/core';
import { PrometheusTimeSeriesQuerySpec } from './time-series-query-model';
export type PrometheusTimeSeriesQueryEditorProps = OptionsEditorProps<PrometheusTimeSeriesQuerySpec>;
/**
 * A hook for managing the `query` state in PrometheusTimeSeriesQuerySpec. Returns the `query` value, along with
 * `onChange` and `onBlur` event handlers to the input. Keeps a local copy of the user's input and only syncs those
 * changes with the overall spec value once the input is blurred to prevent re-running queries in the panel's preview
 * every time the user types.
 */
export declare function useQueryState(props: PrometheusTimeSeriesQueryEditorProps): {
    query: string;
    handleQueryChange: (e: string) => void;
    handleQueryBlur: () => void;
};
/**
 * Hook to manage `seriesNameFormat` state to ensure panel preview does not rerender until text input is blurred
 */
export declare function useFormatState(props: PrometheusTimeSeriesQueryEditorProps): {
    format: string | undefined;
    handleFormatChange: (e: string) => void;
    handleFormatBlur: () => void;
};
/**
 * Hook to manage `minStep` state to ensure panel preview does not rerender until text input is blurred
 */
export declare function useMinStepState(props: PrometheusTimeSeriesQueryEditorProps): {
    minStep: string | undefined;
    handleMinStepChange: (e: DurationString | undefined) => void;
    handleMinStepBlur: () => void;
};
//# sourceMappingURL=query-editor-model.d.ts.map