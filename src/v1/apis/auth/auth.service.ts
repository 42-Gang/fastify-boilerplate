import { z } from 'zod';
import { FastifyBaseLogger } from 'fastify';
import { JWT } from '@fastify/jwt';
import { v4 as uuidv4 } from 'uuid';

import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../auth/auth.schema.js';
import { STATUS } from '../../common/constants/status.js';
import { UserRepository } from '../../repositories/user.repository.js';
import { NotFoundException } from '@src/v1/common/exceptions/core.error.js';

export async function signupService(
  data: z.infer<typeof signupRequestSchema>,
  logger: FastifyBaseLogger,
  userRepository: UserRepository,
): Promise<z.infer<typeof signupResponseSchema>> {
  logger.info('data', data);

  const newUser = await userRepository.create({
    name: data.name,
    email: data.email,
    password_hash: data.password,
    two_factor_enabled: false,
  });
  if (!newUser) {
    throw new NotFoundException('User not found');
  }

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
  userRepository: UserRepository,
): Promise<z.infer<typeof loginResponseSchema>> {
  const foundUser = await userRepository.findByEmail(data.email);
  if (!foundUser) {
    return {
      status: STATUS.ERROR,
      message: 'User not found',
    };
  }

  return {
    status: STATUS.SUCCESS,
    message: 'User information retrieved successfully',
    data: {
      accessToken: jwt.sign({ id: foundUser.id, email: foundUser.email }),
    },
  };
}

export async function generateRefreshToken(): Promise<string> {
  return uuidv4();
}
