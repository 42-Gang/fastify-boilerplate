import { PrismaClient } from '@prisma/client';

const dbUrl = `${process.env.DB_SYSTEM}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

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
