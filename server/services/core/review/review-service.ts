import { inngest } from "@/lib/inngest/client";
import { TriggerPayload } from "./utils/type";
import { handlePr } from "./adaptor";
import { getPullRequestFiles } from "./steps/get-pull-request-files";
import { chunkPrFiles } from "./steps/chunking";
import { updatePullRequestStatus } from "./utils/update-pr-status";
import { generateReview, generateChunkReview } from "./steps/generate-review";
import { postPrComment } from "./steps/post-pr-comment";
import { getGithubInstallationStatus } from "@/features/github/actions";
import { queryPineconeContext } from "@/lib/pinecone";

export class ReviewWorkflow {
    static async trigger(input: TriggerPayload) {
        return await inngest.send({
            name: "pr/review.triggered",
            data: input,
        });
    }

    static reviewPullRequest = inngest.createFunction(
        {
            id: "review-pull-request",
            triggers: { event: "pr/review.triggered" },
        },
        async ({ event, step }) => {
            const pullRequest = await step.run("save-pr-with-mark-processing", async () => {
                return await handlePr(event.data as TriggerPayload);
            });

            const connection = await step.run("check-github-connection", async () => {
                return await getGithubInstallationStatus();
            });

            if (!connection.connected) {
                const pr = await step.run("mark-failed-due-to-unconnected", async () => {
                    return await updatePullRequestStatus(
                        pullRequest.repositoryId,
                        pullRequest.pullRequestNumber,
                        "FAILED"
                    );
                });
                return {
                    message: "GitHub installation is not connected.",
                    pr,
                };
            }

            const getFiles = await step.run("get-all-pull-request-files", async () => {
                return await getPullRequestFiles({
                    installationId: pullRequest.installationId,
                    repositoryName: pullRequest.repositoryName,
                    pullRequestNumber: pullRequest.pullRequestNumber,
                });
            });

            const chunking = await step.run("chunk-pr-files", async () => {
                return chunkPrFiles(pullRequest.pullRequestNumber, getFiles);
            });

            if (chunking.length === 0) {
                const pr = await step.run("mark-reviewed-with-no-code-to-review", async () => {
                    return await updatePullRequestStatus(
                        pullRequest.repositoryId,
                        pullRequest.pullRequestNumber,
                        "REVIEWED"
                    );
                });

                return {
                    message: "No code to review, marked as reviewed.",
                    pr,
                };
            }

            await step.sleep("wait-for-vectors-to-be-indexed", "10s");

            const chunkReviews: string[] = [];
            for (let i = 0; i < chunking.length; i++) {
                const chunk = chunking[i];
                const contextSnippets = await step.run(`retrieve-context-for-chunk-${i}`, async () => {
                    return await queryPineconeContext(pullRequest.repositoryName, chunk.text);
                });

                const chunkReview = await step.run(`generate-review-for-chunk-${i}`, async () => {
                    return await generateChunkReview(
                        pullRequest.repositoryName,
                        pullRequest.pullRequestTitle,
                        `File: ${chunk.filePath}\nChunkID: ${chunk.id}\n\nText: ${chunk.text}`,
                        contextSnippets
                    );
                });
                chunkReviews.push(chunkReview);
            }

            const review = await step.run("consolidate-review", async () => {
                return await generateReview(
                    pullRequest.repositoryName,
                    pullRequest.pullRequestTitle,
                    chunkReviews.join("\n\n---\n\n")
                );
            });

            await step.run("post-pr-comment", async () => {
                return await postPrComment(
                    pullRequest.installationId,
                    pullRequest.repositoryName,
                    pullRequest.pullRequestNumber,
                    review
                );
            });

            await step.run("mark-reviewed", async () => {
                return await updatePullRequestStatus(
                    pullRequest.repositoryId,
                    pullRequest.pullRequestNumber,
                    "REVIEWED"
                );
            });
        }
    );
}
