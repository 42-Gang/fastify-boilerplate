import { FastifyInstance } from 'fastify';

import { loginController, signupController } from '../controllers/auth.controller.js';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';
import { addRoutes, Route } from '../utils/router.js';

export default async function authRoutes(fastify: FastifyInstance) {
  const routes: Array<Route> = [
    {
      method: 'POST',
      url: '/',
      handler: signupController,
      options: {
        schema: {
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
