import { ReactElement } from 'react';
import { Span, Trace } from '../trace';
import { AttributeLinks } from './Attributes';
export interface DetailPaneProps {
    attributeLinks?: AttributeLinks;
    trace: Trace;
    span: Span;
    onCloseBtnClick: () => void;
}
/**
 * DetailPane renders a sidebar showing the span attributes etc.
 */
export declare function DetailPane(props: DetailPaneProps): ReactElement;
//# sourceMappingURL=DetailPane.d.ts.map