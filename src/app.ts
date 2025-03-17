import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function app(
	fastify: FastifyInstance,
	opts: FastifyPluginOptions
) {
	fastify.get("/", () => {
		return {
			hello: "word"
		}
	})
}