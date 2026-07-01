import env from "@/lib/env";
import { Queue } from "bullmq";
import IORedis from "ioredis";

export class GithubQueue {
    private static connection: IORedis;
    private static deleteQueue: Queue;

    public static getConnection() {
        if (!this.connection) {
            this.connection = new IORedis(env.REDIS_URL, {
                maxRetriesPerRequest: null,
            });
        }
        return this.connection;
    }

    public static getDeletionQueue() {
        if (!this.deleteQueue) {
            this.deleteQueue = new Queue("github-installation-queue", {
                connection: this.getConnection(),
            });
        }
        return this.deleteQueue;
    }
}