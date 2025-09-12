import { ReactElement } from 'react';
import { otlpcommonv1 } from '@perses-dev/core';
import { Span, Trace } from '../trace';
export type AttributeLinks = Record<string, (attributes: Record<string, otlpcommonv1.AnyValue>) => string>;
export interface TraceAttributesProps {
    trace: Trace;
    span: Span;
    attributeLinks?: AttributeLinks;
}
export declare function TraceAttributes(props: TraceAttributesProps): import("react/jsx-runtime").JSX.Element;
export interface AttributeListProps {
    attributeLinks?: AttributeLinks;
    attributes: otlpcommonv1.KeyValue[];
}
export declare function AttributeList(props: AttributeListProps): ReactElement;
//# sourceMappingURL=Attributes.d.ts.map