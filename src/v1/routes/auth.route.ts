import { FastifyInstance } from 'fastify';

import { loginController, signupController } from '../controllers/auth.controller.js';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';

export default async function authRoutes(fastify: FastifyInstance) {
  // Signup route
  fastify.post(
    '/',
    {
      schema: {
        tags: ['auth'],
        body: signupRequestSchema,
        response: {
          201: signupResponseSchema,
        },
      },
    },
    signupController,
  );

  // Login route
  fastify.post(
    '/login',
    {
      schema: {
        tags: ['auth'],
        body: loginRequestSchema,
        response: {
          201: loginResponseSchema,
        },
      },
    },
    loginController,
  );
}
