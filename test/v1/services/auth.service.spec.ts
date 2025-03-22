import { FastifyBaseLogger } from 'fastify';
import { signupService, loginService } from '../../../src/v1/services/auth.service';
import { z } from 'zod';
import { loginRequestSchema, signupRequestSchema } from '../../../src/v1/schemas/auth.schema';
import { STATUS } from '../../../src/v1/constants/status';
import { describe, expect, it, vi } from 'vitest';
import { JWT } from '@fastify/jwt';

vi.mock('../../../src/v1/utils/prisma.ts', async (importOriginal) => {
  return {
    default: {
      user: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  };
});
import prisma from '../../../src/v1/utils/prisma';

describe('Auth Service', () => {
  const mockLogger: FastifyBaseLogger = {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    trace: vi.fn(),
    fatal: vi.fn(),
    child: vi.fn(),
  } as unknown as FastifyBaseLogger;

  const mockJwt: JWT = {
    sign: vi.fn(),
    verify: vi.fn(),
    decode: vi.fn(),
  } as unknown as JWT;

  describe('signupService', () => {
    it('should return success status and message', async () => {
      const data: z.infer<typeof signupRequestSchema> = {
        email: 'testuser',
        password: 'testpassword',
        name: 'testname',
      };

      (prisma.user.create as any).mockResolvedValue({
        id: 1,
        email: 'testuser',
        password_hash: 'testpassword',
        name: 'testname',
        two_factor_enabled: false,
      });

      const response = await signupService(data, mockLogger);

      expect(response).toEqual({
        status: STATUS.SUCCESS,
        message: 'User information retrieved successfully',
      });
    });
  });

  describe('loginService', () => {
    it('should return success status, message, and access token', async () => {
      const data: z.infer<typeof loginRequestSchema> = {
        email: 'testuser',
        password: 'testpassword',
      };

      (prisma.user.findUnique as any).mockResolvedValue({
        id: 1,
        email: 'testuser',
        password_hash: 'testpassword',
        name: 'testname',
        two_factor_enabled: false,
      });
      mockJwt.sign.mockReturnValue('tmp-access-token');
      const response = await loginService(data, mockLogger, mockJwt);

      expect(response).toEqual({
        status: STATUS.SUCCESS,
        message: 'User information retrieved successfully',
        data: {
          accessToken: 'tmp-access-token',
        },
      });
    });
  });
});
