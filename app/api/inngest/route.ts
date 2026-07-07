import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { processTask } from "./function";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [processTask],
});