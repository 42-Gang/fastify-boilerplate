import { FastifyInstance } from 'fastify';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import prisma from './v1/common/utils/prisma.js';
import { GotHttpClient } from './v1/common/http/got/http.client.js';

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
    httpClient: asClass(GotHttpClient)
      .inject(() => ({ baseURL: 'https://api.example.com' }))
      .singleton(),
  });
  await diContainer.loadModules(['./**/*.repository.js'], {
    esModules: true,
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
      injectionMode: 'CLASSIC',
    },
  });
  await diContainer.loadModules(['./**/*.controller.js', './**/*.service.js'], {
    esModules: true,
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
      register: asClass,
      injectionMode: 'CLASSIC',
    },
  });
}
