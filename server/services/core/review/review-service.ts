import { inngest } from "@/lib/inngest/client";
import { TriggerPayload } from "./utils/type";

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
            const payload = event.data as TriggerPayload;

            const review = await step.run("review-pr", async () => {
                console.log("Reviewing PR:", payload);

                // TODO:
                // - Fetch PR files
                // - Generate AI review
                // - Post review to GitHub

                return {
                    success: true,
                };
            });

            return review;
        }
    );
}