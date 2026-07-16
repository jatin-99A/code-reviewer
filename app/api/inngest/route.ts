import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { ReviewWorkflow } from "@/server/services/core/review/review-service";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [ReviewWorkflow.reviewPullRequest],
});