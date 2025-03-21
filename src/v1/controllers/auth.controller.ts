import { FastifyReply, FastifyRequest } from 'fastify';

import { signupService, loginService, generateRefreshToken } from '../services/auth.service.js';
import { loginRequestSchema, signupRequestSchema } from '../schemas/auth.schema.js';

export async function signupController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = signupRequestSchema.parse(request.body);
    const result = await signupService(body, request.log);
    reply.status(201).send(result);
  } catch (error) {
    reply.status(400).send({ error });
  }
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = loginRequestSchema.parse(request.body);
    const result = await loginService(body, request.log, request.server.jwt);
    const refreshToken = await generateRefreshToken();

    reply.header(
      'set-cookie',
      `refreshToken=${refreshToken}; HttpOnly; SameSite=Strict; Secure; Path=/; Max-Age=3600;`,
    );
    reply.status(200).send(result);
  } catch (error) {
    reply.status(401).send({ error });
  }
}
