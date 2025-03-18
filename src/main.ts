import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

import app from './app.js';

function getLoggerOptions() {
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    };
  }
  return { level: process.env.LOG_LEVEL ?? 'silent' };
}

function createServer() {
  return Fastify({
    logger: getLoggerOptions(),
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        removeAdditional: 'all',
      },
    },
  });
}

async function startServer(server: Fastify.FastifyInstance) {
  try {
    await server.listen({ port: process.env.PORT ?? 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

async function init() {
  const server = createServer();
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
  server.withTypeProvider<ZodTypeProvider>();

  server.register(app, { prefix: '/api' });

  closeWithGrace(
    {
      delay: process.env.FASTIFY_CLOSE_GRACE_DELAY ?? 500,
    },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err);
      }
      await server.close();
    },
  );

  await server.ready();
  await startServer(server);
}

init();
