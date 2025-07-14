

import { z } from 'zod';

export const pluginSchema = z.object({
  kind: z.string().min(1, 'Required'),
  spec: z.record(z.string(), z.any()),
});

export type PluginSchemaType = z.infer<typeof pluginSchema>;
export type PluginSchema = typeof pluginSchema;
