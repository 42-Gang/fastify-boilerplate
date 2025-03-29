import closeWithGrace from 'close-with-grace';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import app from './app.js';
import swaggerPlugin from './v1/common/utils/swagger-plugin.js';
import jwtPlugin from './v1/common/plugins/jwt-plugin.js';
import { setDiContainer } from './container.js';
import { fastifyRedis } from '@fastify/redis';
import { FastifyInstance } from 'fastify';

export async function configureServer(server: FastifyInstance) {
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
  server.withTypeProvider<ZodTypeProvider>();
}

export async function registerPlugins(server: FastifyInstance) {
  await server.register(jwtPlugin);
  await server.register(fastifyRedis, {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    logLevel: 'trace',
  });
  await setDiContainer(server);
  await server.register(swaggerPlugin);
  await server.register(app, { prefix: '/api' });
}

export async function setupGracefulShutdown(server: FastifyInstance) {
  closeWithGrace(
    {
      delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500,
    },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err);
      }
      await server.close();
    },
  );
}
