import { FastifyBaseLogger } from 'fastify';
import { signupService, loginService } from '../../../src/v1/services/auth.service';
import { z } from 'zod';
import { loginRequestSchema, signupRequestSchema } from '../../../src/v1/schemas/auth.schema';
import { STATUS } from '../../../src/v1/constants/status';

describe('Auth Service', () => {
  const mockLogger: FastifyBaseLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
    fatal: jest.fn(),
    child: jest.fn(),
  } as unknown as FastifyBaseLogger;

  describe('signupService', () => {
    it('should return success status and message', async () => {
      const data: z.infer<typeof signupRequestSchema> = {
        email: 'testuser',
        password: 'testpassword',
        name: 'testname',
      };

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

      const response = await loginService(data, mockLogger);

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