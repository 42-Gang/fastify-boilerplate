import { FastifyInstance } from 'fastify';

import { findUserController } from '../controllers/users.controller.js';
import { getUserParamsSchema } from '../schemas/user.schema.js';
import { addRoutes, Route } from '../utils/router.js';

export default async function usersRoutes(fastify: FastifyInstance) {
  const routes: Array<Route> = [
    {
      method: 'GET',
      url: '/:id',
      handler: findUserController,
      options: {
        schema: {
          params: getUserParamsSchema,
        },
        auth: true,
      },
    },
  ];
  addRoutes(fastify, routes);
}
