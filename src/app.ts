import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import routeV1 from './v1/index.js';
import { STATUS } from './v1/constants/status.js';

export default async function app(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    fastify.log.info(error.statusCode);
    fastify.log.info(error.code);
    fastify.log.info(error.message);

    const statusCode: number = error.statusCode || 500;
    reply.code(statusCode).send({
      "status": STATUS.ERROR,
      "message": error.message,
    });
  });

  fastify.register(routeV1, { prefix: '/v1' });
}
