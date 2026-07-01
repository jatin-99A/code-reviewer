import type { GithubInstallationStatus } from "@/features/dashboard/utils/types";
import prisma from "@/lib/db";
import { GithubAppService } from "@/server/services/github/github-app-service";
import { DASHBOARD_ROUTES } from "@/features/dashboard/utils/routes";
import { GithubQueue } from "@/lib/queue";

export class GithubInstallationService {
    private userId: string;
    private app = GithubAppService.getGithubApp();

    constructor(userId: string) {
        this.userId = userId;
    }

    private buildDisconnectedStatus(): GithubInstallationStatus {
        return {
            connected: false,
            accountLogin: null,
            installedAt: null,
        };
    }

    public async getInstallationStatus(): Promise<GithubInstallationStatus> {
        const installation = await prisma.githubInstallation.findUnique({
            where: { userId: this.userId },
        });

        if (!installation) {
            return this.buildDisconnectedStatus();
        }

        return {
            connected: true,
            accountLogin: installation.accountLogin,
            installedAt: installation.createdAt.toISOString(),
        };
    }

    public getInstallUrl(): string {
        return GithubAppService.getGithubInstallUrl(this.userId);
    }

    public async saveInstallation(installationId: number) {

        const { data } = await this.app.octokit.request(
            "GET /app/installations/{installation_id}",
            { installation_id: installationId }
        );

        console.log(data.permissions);

        const accountLogin = await GithubAppService.getAccountLogin(data.account);

        await prisma.githubInstallation.upsert({
            where: { userId: this.userId },
            create: {
                userId: this.userId,
                installationId,
                accountLogin,
                accountType: data.target_type ?? null,
            },
            update: {
                installationId,
                accountLogin,
                accountType: data.target_type ?? null,
            },
        });
    }

    public buildCallbackUrl(installationId: string | null): string {
        if (installationId) {
            return `/api/github/callback?installation_id=${installationId}`;

        }
        return DASHBOARD_ROUTES.github;
    }

    public getInstallatonIdByUserId(userId: string) {

    }

    public async deleteInstallation(userId: string) {
        await prisma.githubInstallation.update({
            where: { userId },
            data: { status: "PENDING_DELETE" },
        });

        await GithubQueue.getDeletionQueue().add("delete-installation", { userId });
    }
}