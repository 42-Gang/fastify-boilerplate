import { z } from 'zod';
import { createResponseSchema } from './core.schema.js';

export const loginRequestSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
});

export const loginResponseSchema = createResponseSchema(
  z.object({
    accessToken: z.string(),
  }),
);
