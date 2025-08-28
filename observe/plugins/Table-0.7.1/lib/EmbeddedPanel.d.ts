import { PanelData } from '@perses-dev/plugin-system';
import { QueryDataType, UnknownSpec } from '@perses-dev/core';
interface EmbeddedPanelProps {
    kind: string;
    spec: UnknownSpec;
    queryResults: Array<PanelData<QueryDataType>>;
}
export declare function EmbeddedPanel({ kind, spec, queryResults }: EmbeddedPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmbeddedPanel.d.ts.map