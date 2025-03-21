import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { signupService, loginService } from '../services/auth.service.js';
import { loginRequestSchema, signupRequestSchema } from '../schemas/auth.schema.js';

export async function signupController(
  request: FastifyRequest<{
    Body: z.infer<typeof signupRequestSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const result = await signupService(request.body, request.log);
    reply.status(201).send(result);
  } catch (error) {
    reply.status(400).send({ error });
  }
}

export async function loginController(
  request: FastifyRequest<{
    Body: z.infer<typeof loginRequestSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const result = await loginService(request.body, request.log, request.server.jwt);
    reply.status(200).send(result);
  } catch (error) {
    reply.status(401).send({ error });
  }
}
