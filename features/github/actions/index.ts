"use server"

import { requireAuth } from "@/features/auth/actions";
import { handleServerAction } from "@/lib/server-action";
import { getInstallationReposPage } from "@/server/services/core/github-repositories-service";
import { GithubInstallationService } from "../../../server/services/core/github-installation-service";

export async function getGithubInstallationRepositories(page = 1) {
    return handleServerAction(async () => {
        const session = await requireAuth();
        return getInstallationReposPage(session.user.id, page);
    }, "Failed to fetch GitHub repositories.");
}

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

export async function deleteGithubInstallation() {
    return handleServerAction(async () => {
        const session = await requireAuth();

        return new GithubInstallationService(
            session.user.id
        ).deleteInstallation(session.user.id);
    }, "Failed to delete GitHub installation.");
}