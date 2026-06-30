"use server"

import { requireAuth } from "@/features/auth/actions";
import { handleServerAction } from "@/lib/server-action";
import { GithubInstallationService } from "../core/github-installation-service";

export async function getGithubInstallationStatus() {
    return handleServerAction(async () => {
        const session = await requireAuth();
        return new GithubInstallationService(
            session.user.id
        ).getInstallationStatus();
    }, "Failed to fetch GitHub installation status.");
}

export async function getGithubInstallationUrl() {
    return handleServerAction(async () => {
        const session = await requireAuth();
        return new GithubInstallationService(
            session.user.id
        ).getInstallUrl();
    }, "Failed to generate GitHub installation URL.");
}