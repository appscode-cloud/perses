import { ReactElement } from 'react';
import { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { CompletionConfig } from './TraceQLExtension';
export interface TraceQLEditorProps extends Omit<ReactCodeMirrorProps, 'theme' | 'extensions'> {
    completionConfig: CompletionConfig;
}
export declare function TraceQLEditor({ completionConfig, ...rest }: TraceQLEditorProps): ReactElement;
//# sourceMappingURL=TraceQLEditor.d.ts.map