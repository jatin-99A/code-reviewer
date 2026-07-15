import prisma from "@/lib/db";
import { getProviderAdapter } from "./resolver";
import { TriggerPayload } from "../utils/type";

export async function handlePr(input: TriggerPayload) {
    const adapter = getProviderAdapter(input.provider);

    const pr = adapter.getPRData(input.payload);

    const installation = await prisma.githubInstallation.findUnique({
        where: {
            installationId: input.installationId,
        },
        select: {
            userId: true,
        },
    });

    if (!installation) {
        throw new Error("GitHub installation not found");
    }

    const pullRequest = await prisma.gitHubPullRequest.upsert({
        where: {
            repositoryId_prNumber: {
                repositoryId: BigInt(pr.repositoryId),
                prNumber: pr.prNumber,
            },
        },
        create: {
            userId: installation.userId,
            githubPrId: BigInt(input.payload.pull_request.id),
            installationId: input.installationId,
            repositoryId: BigInt(pr.repositoryId),
            deliveryId: input.deliveryId,

            prNumber: pr.prNumber,
            title: pr.title,
            branchName: pr.branchName,
            headSha: pr.headSha,
            openedBy: pr.openedBy,

            status: "PROCESSING",
            githubCreatedAt: new Date(pr.createdAt),
        },
        update: {
            title: pr.title,
            branchName: pr.branchName,
            headSha: pr.headSha,
            status: "PROCESSING",
        },
    });

    return {
        deliveryId: input.deliveryId,
        installationId: input.installationId,
        repositoryId: pr.repositoryId,
        repositoryName: pr.repositoryName,
        pullRequestNumber: pr.prNumber,
        pullRequestTitle: pr.title,
        headSha: pr.headSha,
        action: input.payload.action,
    };
}