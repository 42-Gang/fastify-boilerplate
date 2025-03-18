import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import authRoutes from './routes/auth.route.js'
import usersRoutes from './routes/users.route.js';

export default async function app(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
) {
	fastify.register(authRoutes, { prefix: '/api/auth' });
	fastify.register(usersRoutes, { prefix: '/api/users' })
}