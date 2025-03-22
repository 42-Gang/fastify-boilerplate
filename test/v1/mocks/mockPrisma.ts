import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';
import { beforeEach, vi } from 'vitest';

// ✅ Mock Prisma Client
vi.mock('../../../src/v1/utils/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

// ✅ prisma mock instance 생성
const prisma = (await import('../../../src/v1/utils/prisma'))
  .default as DeepMockProxy<PrismaClient>;

// ✅ 테스트마다 reset
beforeEach(() => {
  mockReset(prisma);
});

export default prisma;
