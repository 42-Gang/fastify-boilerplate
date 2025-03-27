import { NotFoundException } from '../../common/exceptions/core.error.js';
import { z } from 'zod';
import { FindUserResponseSchema } from './users.schema.js';
import { STATUS } from '../../common/constants/status.js';
import UserRepositoryInterface from '../../repositories/persistent/interfaces/user.repository.interface.js';
import { UserCacheInterface } from '../../repositories/volatile/interfaces/user.cache.interface.js';
import { FastifyBaseLogger } from 'fastify';

export default class UsersService {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly userCacheRepository: UserCacheInterface,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async findUser(id: number): Promise<z.infer<typeof FindUserResponseSchema>> {
    const cachedUser = await this.userCacheRepository.getUserById(id);
    if (cachedUser) {
      this.logger.info('User found in cache');
      return {
        status: STATUS.SUCCESS,
        data: {
          id: cachedUser.id,
          name: cachedUser.name,
          email: cachedUser.email,
          createdAt: cachedUser.created_at,
          updatedAt: cachedUser.updated_at,
        },
      };
    }
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userCacheRepository.setUserById(id, user);

    return {
      status: STATUS.SUCCESS,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
    };
  }
}
