import { getServerSession } from "@/features/auth/actions";
import { SIGN_IN_PATH } from "@/features/auth/utils";
import type { GithubInstallationStatus } from "@/features/dashboard/utils/types";
import { DASHBOARD_ROUTES } from "@/features/dashboard/utils/routes";
import prisma from "@/lib/db";
import { GithubQueue } from "@/lib/queue";
import { GithubAppService } from "@/server/services/integrations/github-app-service";
import { NextRequest, NextResponse } from "next/server";

export class GithubInstallationService {
    private readonly userId: string;
    private readonly app = GithubAppService.getGithubApp();

    constructor(userId: string) {
        this.userId = userId;
    }

    public static async handleCallback(req: NextRequest): Promise<Response> {
        try {
            const { searchParams } = new URL(req.url);
            const installationId = searchParams.get("installation_id");
            const userId = searchParams.get("state");

            if (!userId || !installationId) {
                return NextResponse.redirect(new URL(SIGN_IN_PATH, req.url));
            }

            const session = await getServerSession();

            if (session && session.user?.id !== userId) {
                return NextResponse.redirect(new URL(SIGN_IN_PATH, req.url));
            }

            const service = new GithubInstallationService(userId);

            if (!session) {
                const callbackUrl = service.buildCallbackUrl(installationId);

                return NextResponse.redirect(
                    new URL(
                        `${SIGN_IN_PATH}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
                        req.url
                    )
                );
            }

            await service.completeInstallationCallback(installationId);

            return NextResponse.redirect(new URL(`/${DASHBOARD_ROUTES.github}`, req.url));
        } catch (error) {
            console.error("GitHub callback error:", error);
            return NextResponse.redirect(new URL(SIGN_IN_PATH, req.url));
        }
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

    public async deleteInstallation(userId: string): Promise<void> {
        const existingInstallation = await prisma.githubInstallation.findUnique({
            where: { userId },
        });

        if (!existingInstallation || existingInstallation.status === "PENDING_DELETE") {
            return;
        }

        await prisma.githubInstallation.update({
            where: { userId },
            data: { status: "PENDING_DELETE" },
        });

        await GithubQueue.getDeletionQueue().add("delete-installation", { userId });
    }

    private async saveInstallation(installationId: number): Promise<void> {
        try {
            const installationDetails = await this.fetchInstallationDetails(installationId);
            const accountLogin = await this.resolveAccountLogin(installationDetails.account);

            const installation = await prisma.githubInstallation.upsert({
                where: { userId: this.userId },
                create: {
                    userId: this.userId,
                    installationId,
                    accountLogin,
                    permissions: installationDetails.permissions ?? {},
                    accountType: installationDetails.target_type ?? "User",
                    status: "ACTIVE",
                },
                update: {
                    installationId,
                    accountLogin,
                    permissions: installationDetails.permissions ?? {},
                    accountType: installationDetails.target_type ?? "User",
                    status: "ACTIVE",
                },
            });
        } catch (error) {
            console.error("Error saving GitHub installation:", error);
            throw new Error("Unable to save the GitHub installation.");
        }
    }


    private async completeInstallationCallback(installationId: string): Promise<void> {
        try {
            const parsedInstallationId = Number(installationId);

            if (!Number.isInteger(parsedInstallationId) || parsedInstallationId <= 0) {
                throw new Error("Invalid installation identifier.");
            }

            await this.saveInstallation(parsedInstallationId);
        } catch (error) {
            console.error("GitHub installation callback failed:", error);
            throw new Error("Unable to complete the GitHub installation flow.");
        }
    }

    private buildCallbackUrl(installationId: string | null): string {
        const params = new URLSearchParams();

        if (installationId) {
            params.set("installation_id", installationId);
        }

        if (this.userId) {
            params.set("state", this.userId);
        }

        const query = params.toString();

        return query ? `/api/github/callback?${query}` : "/api/github/callback";
    }

    private buildDisconnectedStatus(): GithubInstallationStatus {
        return {
            connected: false,
            accountLogin: null,
            installedAt: null,
        };
    }

    private async fetchInstallationDetails(installationId: number) {
        const { data } = await this.app.octokit.request(
            "GET /app/installations/{installation_id}",
            { installation_id: installationId }
        );

        return data;
    }

    private async resolveAccountLogin(account: unknown): Promise<string> {
        const accountLogin = await GithubAppService.getAccountLogin(account as never);

        if (!accountLogin) {
            throw new Error("Unable to resolve GitHub account login.");
        }

        return accountLogin;
    }
}