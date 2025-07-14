

import { z } from 'zod';
import { Link, PanelDefinition, PanelDisplay, PanelEditorValues, PanelSpec, QueryDefinition } from '../model';
import { PluginSchema, pluginSchema } from './plugin';

export const panelDisplaySpec: z.ZodSchema<PanelDisplay> = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().optional(),
});

export const querySpecSchema: z.ZodSchema<QueryDefinition> = z.object({
  kind: z.string().min(1),
  spec: z.object({
    plugin: pluginSchema,
  }),
});

export const linkSchema: z.ZodSchema<Link> = z.object({
  name: z.string().optional(),
  url: z.string().min(1),
  tooltip: z.string().optional(),
  renderVariables: z.boolean().optional(),
  targetBlank: z.boolean().optional(),
});

export const panelSpecSchema: z.ZodSchema<PanelSpec> = z.object({
  display: panelDisplaySpec,
  plugin: pluginSchema,
  queries: z.array(querySpecSchema).optional(),
  links: z.array(linkSchema).optional(),
});

export function buildPanelSpecSchema(pluginSchema: PluginSchema): z.ZodSchema<PanelSpec> {
  return z.object({
    display: panelDisplaySpec,
    plugin: pluginSchema,
    queries: z.array(querySpecSchema).optional(),
    links: z.array(linkSchema).optional(),
  });
}

export const panelDefinitionSchema: z.ZodSchema<PanelDefinition> = z.object({
  kind: z.literal('Panel'),
  spec: panelSpecSchema,
});

export function buildPanelDefinitionSchema(pluginSchema: PluginSchema): z.ZodSchema<PanelDefinition> {
  return z.object({
    kind: z.literal('Panel'),
    spec: buildPanelSpecSchema(pluginSchema),
  });
}

export const panelEditorSchema: z.ZodSchema<PanelEditorValues> = z.object({
  groupId: z.number(),
  panelDefinition: panelDefinitionSchema,
});

export function buildPanelEditorSchema(pluginSchema: PluginSchema): z.ZodSchema<PanelEditorValues> {
  return z.object({
    groupId: z.number(),
    panelDefinition: buildPanelDefinitionSchema(pluginSchema),
  });
}
