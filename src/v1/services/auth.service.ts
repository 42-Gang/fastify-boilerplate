import { z } from 'zod';
import { loginRequestSchema, loginResponseSchema } from '../schemas/auth.schema.js';
import { STATUS } from '../constants/status.js';

export async function signupService(data: any) {
  return {
    status: 'success',
    code: 200,
    message: 'User information retrieved successfully',
    data: {
      nickname: 'JohnDoe',
      avatar: 'https://example.com/avatar.jpg',
    },
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
