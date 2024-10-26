/* This code is standard copy-paste; refer to StepsAndKnowledge.md for more details. */
/* This is done in Next.js, which operates in an Edge Runtime environment. */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";

// Singleton function to return the same instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
}

// Type definition for PrismaClient instance
type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Global variable to store the PrismaClient instance
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma || prismaClientSingleton();

export default prisma;

// Ensures a single instance of PrismaClient in non-production environments
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
