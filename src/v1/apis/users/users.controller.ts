import { FastifyReply, FastifyRequest } from 'fastify';

import { getUserParamsSchema } from './user.schema.js';
import UsersService from './users.service.js';

export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  findUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = getUserParamsSchema.parse(request.params);
    const result = await this.usersService.findUser(params.id);
    reply.code(200).send(result);
  };
}
