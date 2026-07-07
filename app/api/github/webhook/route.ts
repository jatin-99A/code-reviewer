import { GithubWebhookService } from "@/server/services/core/github-webhook-service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return GithubWebhookService.handleWebhook(req);
}
