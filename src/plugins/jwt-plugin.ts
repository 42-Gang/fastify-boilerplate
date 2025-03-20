import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

const jwtPlugin = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: 'supersecret',
    sign: {
      expiresIn: '5m',
    },
  });

  fastify.addHook('preHandler', (request: any, reply: any, next: any) => {
    request.jwt = fastify.jwt;
    next();
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      // request.jwt.
    } catch (err) {
      reply.send(err);
    }
  });
};

export default fp(jwtPlugin);
