import { FastifyInstance } from 'fastify';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import prisma from './prisma.js';
import { gotClient } from './http/got/http.client.js';

export async function setDiContainer(server: FastifyInstance) {
  server.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
    strictBooleanEnforced: true,
  });

  diContainer.register({
    prisma: asValue(prisma),
    jwt: asValue(server.jwt),
    logger: asValue(server.log),
    redisClient: asValue(server.redis),
    httpClient: asValue(gotClient),
  });
  await diContainer.loadModules(
    [
      './**/src/**/*.repository.js', './**/src/**/*.controller.js', './**/src/**/*.service.js',
    ],
    {
      esModules: true,
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
        injectionMode: 'CLASSIC',
      },
    },
  );
}
