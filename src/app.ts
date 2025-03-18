import { FastifyInstance } from 'fastify';

import routeV1 from './v1/index.js';

export default async function app(fastify: FastifyInstance) {
  fastify.register(routeV1, { prefix: '/v1' });
}
