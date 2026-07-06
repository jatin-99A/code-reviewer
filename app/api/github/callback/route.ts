import { GithubInstallationService } from "@/server/services/core/github/github-installation-service";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return GithubInstallationService.handleCallback(req);
}