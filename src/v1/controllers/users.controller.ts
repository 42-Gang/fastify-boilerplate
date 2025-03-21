import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { getUserParamsSchema } from '../schemas/user.schema.js';
import { ForbiddenException } from '../exceptions/core.error.js';

export async function findUserController(
  request: FastifyRequest<{
    Params: z.infer<typeof getUserParamsSchema>;
  }>,
  reply: FastifyReply,
) {
  const id = parseInt(request.params.id);

  if (request.user.id !== id) {
    throw new ForbiddenException('You are not authorized to view this user');
  }

  reply.code(200).send('hello');
}
