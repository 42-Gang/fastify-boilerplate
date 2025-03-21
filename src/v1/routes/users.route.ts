import { FastifyInstance } from 'fastify';

import { findUserController } from '../controllers/users.controller.js';
import { getUserParamsSchema } from '../schemas/user.schema.js';

export default async function usersRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Params: { id: string };
  }>(
    '/:id',
    {
      preHandler: fastify.authenticate,
      schema: {
        params: getUserParamsSchema,
      },
    },
    findUserController,
  );
}
