import { auth } from "@/lib/auth";
import { getSafeCallbackPath, SIGN_IN_PATH } from "./index";
import { NextRequest, NextResponse } from "next/server";

// Helpers functions for auth proxy
function redirectToSignIn(request: NextRequest, pathname: string) {
    const signInUrl = new URL(SIGN_IN_PATH, request.url);
    // Include query string so filters/search params survive the round-trip through sign-in
    signInUrl.searchParams.set(
        "callbackUrl",
        `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
}

function getPostAuthRedirectPath(request: NextRequest): string {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    return getSafeCallbackPath(callbackUrl);
}

/*
    Handles sign-in route for both authenticated and unauthenticated users:
     -redirects authenticated users and allows unauthenticated users to proceed.

    Handles other protected routes (Ex: Dashboard):
     - we set the callback param in the request only if the user is unauthenticated. 
*/
export async function handleAuthProxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (pathname === SIGN_IN_PATH) {
        if (session) {
            const redirectPath = getPostAuthRedirectPath(request);
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }

        return NextResponse.next();
    }

    if (!session) {
        return redirectToSignIn(request, pathname);
    }

    return NextResponse.next();
}