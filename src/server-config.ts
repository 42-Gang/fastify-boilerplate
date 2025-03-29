import closeWithGrace from 'close-with-grace';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import app from './app.js';
import { registerJwtPlugin, registerRedisPlugin, registerSwaggerPlugin } from './plugins/index.js';
import { setDiContainer } from './plugins/container.js';
import { FastifyInstance } from 'fastify';

export async function configureServer(server: FastifyInstance) {
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
  server.withTypeProvider<ZodTypeProvider>();
}

export async function registerPlugins(server: FastifyInstance) {
  await registerJwtPlugin(server);
  await registerRedisPlugin(server);
  await setDiContainer(server);
  await registerSwaggerPlugin(server);
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
