import { FastifyReply, FastifyRequest } from "fastify";

export async function findUserController(request: FastifyRequest, reply: FastifyReply) {
	reply.code(200).send("hello")
}