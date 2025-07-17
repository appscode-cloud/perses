import { ReactElement } from 'react';
import { otlpcommonv1 } from '@perses-dev/core';
export type AttributeLinks = Record<string, (attributes: Record<string, otlpcommonv1.AnyValue>) => string>;
export interface AttributeListProps {
    attributeLinks?: AttributeLinks;
    attributes: otlpcommonv1.KeyValue[];
}
export declare function AttributeList(props: AttributeListProps): ReactElement;
//# sourceMappingURL=Attributes.d.ts.map