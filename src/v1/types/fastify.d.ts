import { JWT } from '@fastify/jwt';
import 'fastify';
import { User } from '../models/users.model.ts';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    jwt: JWT;
    authorized: boolean;
    user: User;
  }
}
