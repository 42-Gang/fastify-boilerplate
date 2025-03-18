import { z } from 'zod';

// Common error schema
const errorSchema = z.object({
  field: z.string().optional(),
  message: z.string(),
});

// Common response schema
export const coreResponseSchema = z.object({
  status: z.enum(['SUCCES', 'ERROR']),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(errorSchema).optional(),
});
