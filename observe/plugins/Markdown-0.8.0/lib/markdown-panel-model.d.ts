import { Definition } from '@perses-dev/core';
/**
 * The schema for a Markdown panel.
 */
export interface MarkdownPanelDefinition extends Definition<MarkdownPanelOptions> {
    kind: 'Markdown';
}
export interface MarkdownPanelOptions {
    text: string;
}
export declare function createInitialMarkdownPanelOptions(): MarkdownPanelOptions;
//# sourceMappingURL=markdown-panel-model.d.ts.map