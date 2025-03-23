import { FastifyInstance } from 'fastify';

import { loginController, signupController } from '../../apis/auth/auth.controller.js';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../../apis/auth/auth.schema.js';
import { addRoutes, Route } from '../../common/utils/router.js';

export default async function authRoutes(fastify: FastifyInstance) {
  const routes: Array<Route> = [
    {
      method: 'POST',
      url: '/',
      handler: signupController,
      options: {
        schema: {
          tags: ['auth'],
          body: signupRequestSchema,
          response: {
            201: signupResponseSchema,
          },
        },
      },
    },
    {
      method: 'POST',
      url: '/login',
      handler: loginController,
      options: {
        schema: {
          tags: ['auth'],
          body: loginRequestSchema,
          response: {
            201: loginResponseSchema,
          },
        },
      },
    },
  ];
  addRoutes(fastify, routes);
}
