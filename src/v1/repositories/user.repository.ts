import { BaseRepository } from '@src/v1/repositories/base.repository.js';
import { Prisma, PrismaClient, User } from '@prisma/client';

export class UserRepository implements BaseRepository<User, Prisma.UserCreateInput> {
  constructor(private readonly prisma: PrismaClient) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
