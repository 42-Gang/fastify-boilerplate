import { FastifyInstance } from 'fastify';
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix';
import { asClass, asValue, Lifetime } from 'awilix';
import prisma from './v1/common/utils/prisma.js';
// import { UserCacheInterface } from './v1/repositories/volatile/interfaces/user.cache.interface.js';

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

  server.log.info('DI container loaded');
  // const userCacheRepository: UserCacheInterface = diContainer.resolve('userCacheRepository1');
  server.log.info(diContainer.resolve('userCacheRepository'), 'userCacheRepository');
  // await userCacheRepository.setUserById(
  //   1,
  //   {
  //     id: 1,
  //     email: 'asdf',
  //     name: 'asdf',
  //     password_hash: 'asdf',
  //     two_factor_enabled: false,
  //     avatar_url: 'asdf',
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   },
  //   10,
  // );
  // server.log.info(diContainer.resolve('userRepository'), 'userRepository');
}
