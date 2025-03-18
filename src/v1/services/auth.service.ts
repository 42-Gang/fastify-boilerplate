import { z } from 'zod';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';
import { STATUS } from '../constants/status.js';

export async function signupService(
  data: z.infer<typeof signupRequestSchema>,
): Promise<z.infer<typeof signupResponseSchema>> {
  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
  };
}
export async function loginService(
  data: z.infer<typeof loginRequestSchema>,
): Promise<z.infer<typeof loginResponseSchema>> {
  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
    data: {
      accessToken: 'tmp-access-token',
    },
  };
}
