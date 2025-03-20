import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { getUserParamsSchema } from '../schemas/user.schema.js';

export async function findUserController(request: FastifyRequest<{
  Params: z.infer<typeof getUserParamsSchema>
}>, reply: FastifyReply) {
  const { id } = request.params;

  request.log.info(`user id: ${id}`);
  reply.code(200).send('hello');
}
