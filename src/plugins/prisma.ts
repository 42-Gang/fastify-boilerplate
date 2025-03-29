import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

const env = process.env;
const dbUrl = `${env.DB_SYSTEM}://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  errorFormat: 'pretty',
});

export default prisma;
