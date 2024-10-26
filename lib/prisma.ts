/* This code os standard copy paste not much to learn here : Check StepsAndKnowledge.md for more knowledge */ 
/* This is done on NextJS because it is based on an Edge Time Run enviorment */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";

// in case the prismaClient is already created, we will return the same instance
const prismaClientSingelton = () => {
    return new PrismaClient();
}

// we are expecting the return type of prismaClientSingelton to be PrismaClient (this is a TypeScript feature)
type prismaClientSingelton = ReturnType<typeof prismaClientSingelton>;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma || prismaClientSingelton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}