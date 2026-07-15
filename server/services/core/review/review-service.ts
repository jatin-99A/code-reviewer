import { inngest } from "@/lib/inngest/client";
import { TriggerPayload } from "./utils/type";
import { handlePr } from "./adaptor";

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

            const chunks = await step.run("split-pr-into-chunks", async () => {
                return await getPullRequestFiles(
                    pullRequest.installationId,
                    pullRequest.repoFullName,
                    pullRequest.prNumber,
                );
            });
        }
    );
}