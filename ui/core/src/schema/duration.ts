

import { z } from 'zod';
import { DURATION_REGEX } from '../model';

export const durationValidationSchema = z
  .string()
  .min(1, 'Required')
  .regex(DURATION_REGEX, 'Must be a valid duration string');
