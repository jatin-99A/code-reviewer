import { getServerSession } from "@/features/auth/actions";
import { SIGN_IN_PATH } from "@/features/auth/utils";
import { DASHBOARD_ROUTES } from "@/features/dashboard/utils/routes";
import env from "@/lib/env";
import { GithubInstallationService } from "@/server/services/core/github-installation-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

        // If not logged in redirect to signin with callback
        if (!session) {
            const callbackUrl = service.buildCallbackUrl(installationId);

            return NextResponse.redirect(
                new URL(
                    `${SIGN_IN_PATH}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
                    req.url
                )
            );
        }

        await service.saveInstallation(Number(installationId));

        return NextResponse.redirect(
            `${env.NEXT_PUBLIC_APP_URL}/${DASHBOARD_ROUTES.github}`
        );

    } catch (error) {
        console.error("GitHub callback error:", error);
        return NextResponse.redirect(new URL(SIGN_IN_PATH, req.url));
    }
}

// TODO: Improve state handling for OAuth flow
// ensure callback flow works even after sign-in 