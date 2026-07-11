import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import env from "@/lib/env";

const connectionString = `${env.DATABASE_URL}`;

const createClient = () => {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ??
    createClient();

if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;