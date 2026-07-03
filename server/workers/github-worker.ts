import { Worker } from "bullmq";
import prisma from "@/lib/db";
import { GithubAppService } from "../services/github/github-app-service";
import { GithubQueue } from "@/lib/queue";
const octokit = GithubAppService.getGithubApp().octokit;


const WorkerOptions = {
    connection: GithubQueue.getConnection(),
    attempts: 5,
    backoff: {
        type: "exponential",
        delay: 2000,
    },
}

export const githubWorker = new Worker(
    "github-installation-queue",
    async (job) => {
        const { userId } = job.data;

        const installation = await prisma.githubInstallation.findUnique({
            where: { userId },
        });

        if (!installation) return;

        try {
            await octokit.request(
                "DELETE /app/installations/{installation_id}",
                {
                    installation_id: installation.installationId,
                    headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                }
            );

            await prisma.githubInstallation.delete({
                where: { userId },
            });

        } catch (err) {
            await prisma.githubInstallation.update({
                where: { userId },
                data: { status: "DELETE_FAILED" },
            });

            throw err;
        }
    },

    WorkerOptions
);