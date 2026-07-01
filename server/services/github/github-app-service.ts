import { App } from "octokit";
import env from "@/lib/env";

export class GithubAppService {
    private static githubApp: App | null = null;

    private static getApp(): App {
        if (!this.githubApp) {
            this.githubApp = new App({
                appId: env.GITHUB_APP_ID,
                privateKey: env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, "\n"),
                webhooks: { secret: env.GITHUB_WEBHOOK_SECRET },
            });
        }

        return this.githubApp;
    }

    public static getGithubApp(): App {
        return this.getApp();
    }

    public static getGithubInstallUrl(userId: string): string {
        const url = new URL(
            `${env.NEXT_GITHUB_PUBLIC_LINK}/installations/new`
        );

        url.searchParams.set("state", userId);
        return url.toString();
    }

    public static async getAccountLogin(
        account: { login?: string; slug?: string } | null | undefined
    ): Promise<string | null> {

        if (!account) {
            return null;
        }

        if ("login" in account && account.login) {
            return account.login;
        }

        if (account.slug) {
            return account.slug;
        }

        return null;
    }
}