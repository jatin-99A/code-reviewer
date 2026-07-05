import env from "@/lib/env";
import { Queue, type ConnectionOptions } from "bullmq";
import IORedis from "ioredis";

export class GithubQueue {
    private static connection: IORedis | null = null;
    private static deleteQueue: Queue | null = null;

    public static getConnection(): IORedis {
        if (!this.connection) {
            this.connection = new IORedis(env.REDIS_URL, {
                maxRetriesPerRequest: null,
            });
        }
        return this.connection;
    }

    public static getBullConnection(): ConnectionOptions {
        return this.getConnection() as unknown as ConnectionOptions;
    }

    public static getDeletionQueue() {
        if (!this.deleteQueue) {
            this.deleteQueue = new Queue("github-installation-queue", {
                connection: this.getBullConnection(),
            });
        }
        return this.deleteQueue;
    }
}