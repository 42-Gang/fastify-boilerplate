import { FastifyReply, FastifyRequest } from 'fastify';

import { getUserParamsSchema } from './user.schema.js';
import { ForbiddenException } from '../../common/exceptions/core.error.js';

export default class UsersController {
  findUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = getUserParamsSchema.parse(request.params);
    const user = request.me;

    if (user.id !== params.id) {
      throw new ForbiddenException('You are not authorized to view this user');
    }

    reply.code(200).send('hello');
  };
}
