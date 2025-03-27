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

      DATABASE_URL: string;
      DB_SYSTEM: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
    }
  }
}
