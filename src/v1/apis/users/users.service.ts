import { NotFoundException } from '../../common/exceptions/core.error.js';
import { z } from 'zod';
import { FindUserResponseSchema } from './users.schema.js';
import { STATUS } from '../../common/constants/status.js';
import UserRepositoryInterface from '../../repositories/persistent/interfaces/user.repository.interface.js';

export default class UsersService {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async findUser(id: number): Promise<z.infer<typeof FindUserResponseSchema>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // this.logger.info(this.userCacheRepository, 'UserCacheRepository');
    // await this.userCacheRepository.setUserById(id, user);
    // this.logger.info(await this.userCacheRepository.getUserById(id), 'User found in cache');

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
