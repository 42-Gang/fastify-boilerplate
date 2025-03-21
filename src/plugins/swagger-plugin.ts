import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const swaggerPlugin = async (fastify: FastifyInstance) => {
    await fastify.register((swagger), {
        openapi: {
          openapi: '3.0.0',
          info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
          },
          servers: [
            {
              url: 'http://localhost:3000',
              description: 'Development server'
            }
          ],
          tags: [
            { name: 'user', description: 'User related end-points' },
            { name: 'code', description: 'Code related end-points' }
          ],
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          }
        }
      });

    await fastify.register((swaggerUi), {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
      transformSpecificationClone: true
    });
};

export default fp(swaggerPlugin);