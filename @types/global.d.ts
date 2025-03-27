import { ProcessEnv } from 'process';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      FASTIFY_CLOSE_GRACE_DELAY: number;

      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_REFRESH_EXPIRES_IN: string;
    }
  }
}
