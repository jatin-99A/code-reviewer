import type { GithubInstallationStatus } from "@/features/dashboard/utils/types";
import prisma from "@/lib/db";
import { GithubAppService } from "@/features/github/services/github-app-service";
import { DASHBOARD_ROUTES } from "@/features/dashboard/utils/routes";

export class GithubInstallationService {
    private userId: string;

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
        const app = GithubAppService.getGithubApp();

        const { data } = await app.octokit.request(
            "GET /app/installations/{installation_id}",
            { installation_id: installationId }
        );

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
}