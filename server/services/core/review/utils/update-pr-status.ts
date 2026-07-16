import prisma from "@/lib/db";

type GitHubPullRequestStatus = "PROCESSING" | "REVIEWED" | "FAILED";

export async function updatePullRequestStatus(
    repositoryId: number,
    prNumber: number,
    status: GitHubPullRequestStatus
) {
    return prisma.gitHubPullRequest.update({
        where: {
            repositoryId_prNumber: {
                repositoryId,
                prNumber,
            },
        },
        data: {
            status,
            ...(status === "REVIEWED" && {
                reviewedAt: new Date(),
            }),
        },
    });
}