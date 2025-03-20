import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { getUserParamsSchema } from '../schemas/user.schema.js';
import { ForbiddenException } from '../exceptions/core.error.js';

export async function findUserController(request: FastifyRequest<{
  Params: z.infer<typeof getUserParamsSchema>
}>, reply: FastifyReply) {
  const id = parseInt(request.params.id);


  request.log.info(`user id: ${id}`);
  if (id === 1) {
    throw new ForbiddenException("You can't access this user");
  }
  reply.code(200).send('hello');
}
