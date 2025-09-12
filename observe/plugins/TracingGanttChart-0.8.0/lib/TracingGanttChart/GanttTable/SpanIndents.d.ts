import { ReactElement } from 'react';
import { Span } from '../trace';
export interface SpanIndentsProps {
    span: Span;
}
/**
 * SpanIndents renders the indention boxes,
 * and handles the click and mouseOver events
 *
 * Note: This component gets re-rendered on every hover of any indention box,
 * therefore rendering performance is essential.
 */
export declare function SpanIndents(props: SpanIndentsProps): ReactElement;
//# sourceMappingURL=SpanIndents.d.ts.map