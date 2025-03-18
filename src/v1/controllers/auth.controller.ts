import { FastifyReply, FastifyRequest } from 'fastify';

import { signupService, loginService } from '../services/auth.service.js';
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from '../schemas/auth.schema.js';
import { z } from 'zod';

export async function signupController(
  request: FastifyRequest<{
    Body: z.infer<typeof signupRequestSchema>;
  }>,
  reply: FastifyReply,
) {
  try {
    const result = await signupService(request.body);
    const validatedResponse = signupResponseSchema.parse(result);

    reply.status(201).send(validatedResponse);
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
    const result = await loginService(request.body);
    const validatedResponse = loginResponseSchema.parse(result);

    reply.status(200).send(validatedResponse);
  } catch (error) {
    reply.status(401).send({ error });
  }
}
