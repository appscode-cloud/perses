

import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(1, 'Required')
  .max(75, 'Must be 75 or fewer characters long')
  .regex(/^[a-zA-Z0-9_.-]+$/, 'Must only contains alphanumerical characters and special characters _ . -');

export const metadataSchema = z.object({
  name: nameSchema,
});

export const projectMetadataSchema = metadataSchema.extend({
  project: nameSchema,
});
