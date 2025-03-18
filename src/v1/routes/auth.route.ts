import { FastifyInstance } from 'fastify';

import { loginController, signupController } from '../controllers/auth.controller.js';

export default async function authRoutes(fastify: FastifyInstance) {
  // Signup route
  fastify.post('/', signupController);

  // Login route
  fastify.post('/login', loginController);
}
