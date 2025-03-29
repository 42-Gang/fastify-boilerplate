import jwtPlugin from './jwt-plugin.js';
import { fastifyRedis } from '@fastify/redis';
import swaggerPlugin from './swagger-plugin.js';
import { FastifyInstance } from 'fastify';

export async function registerJwtPlugin(server: FastifyInstance) {
  await server.register(jwtPlugin);
}

export async function registerRedisPlugin(server: FastifyInstance) {
  await server.register(fastifyRedis, {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    logLevel: 'trace',
  });
}

export async function registerSwaggerPlugin(server: FastifyInstance) {
  await server.register(swaggerPlugin);
}
