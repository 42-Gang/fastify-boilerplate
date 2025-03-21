import { PrismaClient } from '@prisma/client/extension';

export type User = PrismaClient['user']['create']['data'];
