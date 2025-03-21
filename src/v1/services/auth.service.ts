import { z } from 'zod';
import { FastifyBaseLogger } from 'fastify';
import { JWT } from '@fastify/jwt';

import prisma from '../utils/prisma.js';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';
import { STATUS } from '../constants/status.js';
import { v4 as uuidv4 } from 'uuid';

export async function signupService(
  data: z.infer<typeof signupRequestSchema>,
  logger: FastifyBaseLogger,
): Promise<z.infer<typeof signupResponseSchema>> {
  logger.info('data', data);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password_hash: data.password,
      two_factor_enabled: false,
    },
  });

  logger.info('New user created', newUser);

  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
  };
}

export async function loginService(
  data: z.infer<typeof loginRequestSchema>,
  logger: FastifyBaseLogger,
  jwt: JWT,
): Promise<z.infer<typeof loginResponseSchema>> {
  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
    data: {
      accessToken: jwt.sign({ email: data.email }),
    },
  };
}

export async function generateRefreshToken(): Promise<string> {
  return uuidv4();
}
