import { z } from 'zod';
import { STATUS } from '../constants/status.js';

// Common error schema
const errorSchema = z.object({
  field: z.string().optional(),
  message: z.string(),
});

// Common response schema
export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.enum([STATUS.SUCCESS, STATUS.ERROR]),
    message: z.string(),
    data: dataSchema.optional(),
    errors: z.array(errorSchema).optional(),
  });
