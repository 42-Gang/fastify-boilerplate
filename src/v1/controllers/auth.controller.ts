import { FastifyReply, FastifyRequest } from 'fastify';
import { signupService, loginService } from '../services/auth.service.js';

export async function signupController(request: FastifyRequest, reply: FastifyReply) {
	try {
		const result = await signupService(request.body);
		reply.status(201).send(result);
	} catch (error) {
		// reply.status(400).send({ error: error.message });
	}
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
	try {
		const result = await loginService(request.body);
		reply.status(200).send(result);
	} catch (error) {
		// reply.status(401).send({ error: error.message });
	}
}
