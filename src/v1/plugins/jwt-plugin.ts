import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

import { UnAuthorizedException } from '../exceptions/core.error.js';
import prisma from '../utils/prisma.js';

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
    if (!request.headers.authorization) {
      request.authorized = false;
      return;
    }

    const token = request.headers.authorization.split(' ')[1];
    try {
      await request.jwtVerify();
    } catch (err) {
      request.log.error(err);
      throw new UnAuthorizedException('Invalid token');
    }

    request.authorized = true;
    const payload = request.jwt.decode(token);
    if (!payload) {
      throw new UnAuthorizedException('Invalid token');
    }

    const userId = (payload as { id: number }).id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnAuthorizedException('Invalid token');
    }

    request.user = user;
  });
};

export default fp(jwtPlugin);
