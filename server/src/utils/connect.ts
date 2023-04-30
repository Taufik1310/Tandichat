import { PrismaClient } from "@prisma/client";

//TODO: use object pool

export const prisma = new PrismaClient();

prisma.$connect;
