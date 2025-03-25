import { FastifyReply, FastifyRequest } from 'fastify';

import { loginRequestSchema, signupRequestSchema } from './auth.schema.js';
import AuthService from './auth.service.js';

export default class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = signupRequestSchema.parse(request.body);
      request.log.info(body, 'Signup request received');
      const result = await this.authService.signup(body);
      reply.status(201).send(result);
    } catch (error) {
      request.log.error(error, 'Error in signup');
      reply.status(400).send({ error });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = loginRequestSchema.parse(request.body);
      const result = await this.authService.login(body);
      const refreshToken = await this.authService.generateRefreshToken();

      reply.header(
        'set-cookie',
        `refreshToken=${refreshToken}; HttpOnly; SameSite=Strict; Secure; Path=/; Max-Age=3600;`,
      );
      reply.status(200).send(result);
    } catch (error) {
      request.log.error(error, 'Error in login');
      reply.status(401).send({ error });
    }
  }
}
