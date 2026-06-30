import { getServerSession } from "@/features/auth/actions"
import { DASHBOARD_ROUTES } from "@/features/dashboard/utils/routes"
import { GithubInstallationService } from "@/features/github/core/github-installation-service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const installationId = searchParams.get("installation_id");
        //Todo safe this state in safe cookies or redis if user is not logged in then get the userId for security 
        const userId = searchParams.get("state");

        if (!installationId) {
            return NextResponse.json(
                { error: "Missing installation_id" },
                { status: 400 }
            )
        }

        const session = await getServerSession();

        if (session && userId && session.user?.id !== userId) {
            return NextResponse.json(
                { error: "Invalid state" },
                { status: 403 }
            )
        }

        const service = new GithubInstallationService(userId || "");

        if (!session) {
            const callbackUrl = service.buildCallbackUrl(installationId);

            return NextResponse.redirect(
                new URL(
                    `/sign-in/callbackurl?callbackUrl=${encodeURIComponent(callbackUrl)}`,
                    req.url
                )
            )
        }

        service.saveInstallation(Number(installationId))

        return NextResponse.redirect(
            new URL(DASHBOARD_ROUTES.github, req.url)
        )
    } catch (error) {
        console.error("GitHub callback error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}