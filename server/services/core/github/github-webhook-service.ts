import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { ReviewWorkflow } from "../review/review-service";
import { TriggerPayload } from "../review/utils/type";

export default class GithubWebhookService {
    public static async handleWebhook(req: Request): Promise<Response> {
        try {
            const signature = req.headers.get("x-hub-signature-256") ?? req.headers.get("x-hub-signature");
            const event = req.headers.get("x-github-event");
            const delivery = req.headers.get("x-github-delivery");

            if (!event || !delivery) {
                return this.jsonResponse({ error: "Missing required GitHub webhook headers." }, 400);
            }

            const rawBody = await req.text();

            if (!rawBody) {
                return this.jsonResponse({ error: "Request body is empty." }, 400);
            }

            const secret = process.env.GITHUB_WEBHOOK_SECRET;

            if (!secret) {
                console.error("GitHub webhook secret is not configured.");
                return this.jsonResponse({ error: "Webhook service is not configured." }, 500);
            }

            if (!signature) {
                return this.jsonResponse({ error: "Missing GitHub signature header." }, 401);
            }

            if (!this.isValidSignature(rawBody, signature, secret)) {
                return this.jsonResponse({ error: "Invalid GitHub signature." }, 401);
            }

            let payload: unknown;

            try {
                payload = JSON.parse(rawBody) as unknown;
            } catch {
                return this.jsonResponse({ error: "Request body is not valid JSON." }, 400);
            }

            if (event === "ping") {
                return this.jsonResponse({ ok: true, message: "pong", event, delivery }, 200);
            }

            // Listening uninstallationEvent
            if (this.isUninstallationEvent(event, payload)) {
                revalidatePath("/dashboard");
                revalidatePath("/dashboard/github");

                return this.jsonResponse(
                    {
                        ok: true,
                        message: "GitHub uninstallation detected and dashboard cache refreshed.",
                        event,
                        delivery,
                        refresh: true,
                    },
                    202
                );
            }

            // Listening PR event
            if (event === "pull_request") {
                const allowedActions = ["opened", "synchronize", "reopened"];
                const webhookPayload = payload as TriggerPayload["payload"] & {
                    installation?: {
                        id?: number;
                    };
                };

                if (
                    webhookPayload &&
                    typeof webhookPayload.action === "string" &&
                    allowedActions.includes(webhookPayload.action) &&
                    typeof webhookPayload.installation?.id === "number"
                ) {
                    await ReviewWorkflow.trigger({
                        payload,
                        deliveryId: delivery,
                        installationId: webhookPayload.installation.id,
                        provider: "github",
                    } as TriggerPayload);
                }
            }

            console.info("GitHub webhook received", { event, delivery });

            return this.jsonResponse(
                {
                    ok: true,
                    message: "Webhook received successfully.",
                    event,
                    delivery,
                    payload,
                },
                202
            );
        } catch (error) {
            console.error("Error handling GitHub webhook request:", error);
            return this.jsonResponse({ error: "Error handling webhook request." }, 500);
        }
    }

    private static isValidSignature(rawBody: string, signature: string, secret: string): boolean {
        const expectedSignature = this.getExpectedSignature(rawBody, secret);

        if (!signature.startsWith("sha256=")) {
            return false;
        }

        const providedBuffer = Buffer.from(signature.slice(7), "utf8");
        const expectedBuffer = Buffer.from(expectedSignature, "utf8");

        if (providedBuffer.length !== expectedBuffer.length) {
            return false;
        }

        return timingSafeEqual(providedBuffer, expectedBuffer);
    }

    private static getExpectedSignature(rawBody: string, secret: string): string {
        return createHmac("sha256", secret).update(rawBody).digest("hex");
    }

    private static isUninstallationEvent(event: string, payload: unknown): boolean {
        if (event !== "installation") {
            return false;
        }

        const action = (payload as { action?: unknown } | null)?.action;
        return action === "deleted";
    }

    private static jsonResponse(body: unknown, status: number): Response {
        return new Response(JSON.stringify(body), {
            status,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
        });
    }
}

export { GithubWebhookService };