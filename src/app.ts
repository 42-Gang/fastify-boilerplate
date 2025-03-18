import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import routeV1 from './v1/index.js'

export default async function app(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
) {
	fastify.register(routeV1, { prefix: '/v1' })
}