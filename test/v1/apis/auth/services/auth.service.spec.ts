import { z } from 'zod';
import { loginRequestSchema, signupRequestSchema } from '@src/v1/apis/auth/auth.schema.js';
import { STATUS } from '@src/v1/common/constants/status.js';
import { describe, expect, it, vi } from 'vitest';
import { mockJwt } from '../../../mocks/mockJwt.js';
import { mockLogger } from '../../../mocks/mockLogger.js';
import { loginService, signupService } from '@src/v1/apis/auth/auth.service.js';
import { UserRepository } from '@src/v1/repositories/user.repository.js';

const mockedUserRepository: UserRepository = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
};

describe('Auth Service', () => {
  describe('signupService', () => {
    it('should return success status and message', async () => {
      const data: z.infer<typeof signupRequestSchema> = {
        email: 'testuser',
        password: 'testpassword',
        name: 'testname',
      };

      (mockedUserRepository.create as ReturnType<typeof vi.fn>).mockResolvedValue({
        id: 1,
        email: 'testuser',
        password_hash: 'testpassword',
        name: 'testname',
        two_factor_enabled: false,
        avatar_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const response = await signupService(data, mockLogger, mockedUserRepository);

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

      (mockedUserRepository.findByEmail as ReturnType<typeof vi.fn>).mockResolvedValue({
        id: 1,
        email: 'testuser',
        password_hash: 'testpassword',
        name: 'testname',
        two_factor_enabled: false,
        avatar_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const response = await loginService(data, mockLogger, mockJwt, mockedUserRepository);

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
