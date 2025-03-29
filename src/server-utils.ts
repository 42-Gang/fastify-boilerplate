import Fastify from 'fastify';

export function getLoggerOptions() {
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
  return { level: process.env.LOG_LEVEL || 'error' };
}

export function createServer() {
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

export async function startServer(server: Fastify.FastifyInstance) {
  try {
    await server.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
