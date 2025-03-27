import { Prisma, User } from '@prisma/client';
import { BaseRepository } from './base.repository.interface.js';

export interface UserRepository
  extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  findByEmail(email: string): Promise<User | null>;
}
