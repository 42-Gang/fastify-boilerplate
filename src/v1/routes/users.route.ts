import { FastifyInstance } from "fastify";
import { findUserController } from "../controllers/users.controller.js";


export default async function usersRoutes(fastify: FastifyInstance) {
	fastify.get('/', findUserController)
}