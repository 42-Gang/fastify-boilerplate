import { FastifyInstance } from 'fastify';

import { findUserController } from '../../apis/users/users.controller.js';
import { getUserParamsSchema } from '../users/user.schema.js';
import { addRoutes, Route } from '../../common/utils/router.js';

export default async function usersRoutes(fastify: FastifyInstance) {
  const routes: Array<Route> = [
    {
      method: 'GET',
      url: '/:id',
      handler: findUserController,
      options: {
        schema: {
          tags: ['users'],
          params: getUserParamsSchema,
        },
        auth: true,
      },
    },
  ];
  addRoutes(fastify, routes);
}
