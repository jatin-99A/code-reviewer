import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserMenu } from "./user-menu";

type Props = Omit<React.ComponentProps<typeof UserMenu>, "user">;

async function UserMenuContent(props: Props) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return null;

    return <UserMenu user={session.user} {...props} />;
}

function UserMenuFallback() {
    return (
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
    );
}

export function UserMenuWithSession(props: Props) {
    return (
        <React.Suspense fallback={<UserMenuFallback />}>
            <UserMenuContent {...props} />
        </React.Suspense>
    );
}