import { inngest } from "@/lib/inngest/client";
import { TriggerPayload } from "./utils/type";

export class ReviewWorkflow {
    static async trigger(input: TriggerPayload) {
        return await inngest.send({
            name: "pr/review.triggered",
            data: input,
        });
    }
}