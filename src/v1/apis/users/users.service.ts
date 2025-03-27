import { UserRepository } from '../../repositories/user.repository.js';
import { NotFoundException } from '../../common/exceptions/core.error.js';
import { z } from 'zod';
import { FindUserResponseSchema } from './users.schema.js';
import { STATUS } from '../../common/constants/status.js';

export default class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: number): Promise<z.infer<typeof FindUserResponseSchema>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

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
