import { z } from 'zod';
import { FastifyBaseLogger } from 'fastify';

import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';
import { STATUS } from '../constants/status.ts';

export async function signupService(
  data: z.infer<typeof signupRequestSchema>,
  logger: FastifyBaseLogger,
): Promise<z.infer<typeof signupResponseSchema>> {
  logger.info('data', data);

  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
  };
}
export async function loginService(
  data: z.infer<typeof loginRequestSchema>,
  logger: FastifyBaseLogger,
): Promise<z.infer<typeof loginResponseSchema>> {
  logger.info('data', data);

  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
    data: {
      accessToken: 'tmp-access-token',
    },
  };
}
