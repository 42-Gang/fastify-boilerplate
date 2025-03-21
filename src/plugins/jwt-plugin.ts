import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

import { UnAuthorizedException } from '../v1/exceptions/core.error';

const jwtPlugin = async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: 'supersecret',
    sign: {
      expiresIn: '5m',
    },
  });

  fastify.addHook('preHandler', async (request: FastifyRequest) => {
    request.jwt = fastify.jwt;
  });

  fastify.decorate('authenticate', async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      request.log.error(err);
      throw new UnAuthorizedException('Invalid token');
    }
  });
};

export default fp(jwtPlugin);
