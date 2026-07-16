import { inngest } from "@/lib/inngest/client";
import { TriggerPayload } from "./utils/type";
import { handlePr } from "./adaptor";
import { getPullRequestFiles } from "./steps/get-pull-request-files";
import { chunkPrFiles } from "./steps/chunking";
import { updatePullRequestStatus } from "./utils/update-pr-status";
import { generateReview } from "./steps/generate-review";
import { postPrComment } from "./steps/post-pr-comment";

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


            const getFiles = await step.run("get-all-pull-request-files", async () => {
                return await getPullRequestFiles({
                    installationId: pullRequest.installationId,
                    repositoryName: pullRequest.repositoryName,
                    pullRequestNumber: pullRequest.pullRequestNumber,
                });
            });

            const chunking = await step.run("chunk-pr-files", async () => {
                return chunkPrFiles(pullRequest.pullRequestNumber, getFiles);
            })

            if (chunking.length === 0) {
                const pr = await step.run("mark-reviewed-with-no-code-to-review", async () => {
                    return await updatePullRequestStatus(
                        pullRequest.repositoryId,
                        pullRequest.pullRequestNumber,
                        "REVIEWED"
                    )
                })

                return {
                    message: "No code to review, marked as reviewed.",
                    pr,
                }
            }

            await step.sleep("wait-for-vectors-to-be-indexed", "10s");

            const diff = await step.run("generate-unified-diff", async () => {
                return chunking.map(
                    (chunk) =>
                        `File: ${chunk.filePath}\nChunkID: ${chunk.id}\n\nText: ${chunk.text}`
                )
                    .join("\n\n---\n\n");
            })

            const review = await step.run("generate-review", async () => {
                return await generateReview(
                    pullRequest.repositoryName,
                    pullRequest.pullRequestTitle,
                    diff,
                )
            })

            await step.run("post-pr-comment", async () => {
                return await postPrComment(
                    pullRequest.installationId,
                    pullRequest.repositoryName,
                    pullRequest.pullRequestNumber,
                    review
                );
            })

            await step.run("mark-reviewed", async () => {
                return await updatePullRequestStatus(
                    pullRequest.repositoryId,
                    pullRequest.pullRequestNumber,
                    "REVIEWED"
                )
            })


        }
    );
}