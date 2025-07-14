

import { z } from 'zod';

export const displaySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});
