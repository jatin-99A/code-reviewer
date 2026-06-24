import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import env from "@/config/env";

const connectionString = `${env.DATABASE_URL}`;

// helper for create client
const createClient = () => {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
};

let cached = (globalThis as any).prisma;

if (!cached) {
    cached = (globalThis as any).prisma = { instance: null, promise: null };
}

async function db() {

    if (process.env.NODE_ENV === "production") {
        return createClient();
    }

    if (cached.instance) {
        return cached.instance;
    }

    if (!cached.promise) {
        cached.promise = Promise.resolve().then(() => {
            return createClient();
        });
    }

    try {
        cached.instance = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.instance;
}

export default db;
