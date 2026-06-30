import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserMenu } from "./user-menu";
import { Skeleton } from "@/features/common/skeleton";
import type { Session } from "@/components/providers/session-provider";

type Props = Omit<React.ComponentProps<typeof UserMenu>, "user"> & {
    session?: Session | null;
};

async function UserMenuContent({ session, ...props }: Props) {
    let currentSession = session;

    if (!currentSession) {
        currentSession = await auth.api.getSession({
            headers: await headers(),
        });
    }

    if (!currentSession?.user) return null;

    return <UserMenu user={currentSession.user} {...props} />;
}

function UserMenuFallback({ variant }: { variant: Props["variant"] }) {
    if (variant === "compact") {
        return <Skeleton className="h-8 w-8 rounded-full" />;
    }

    return <Skeleton className="h-9 w-full rounded-md" />;
}

export function UserMenuWithSession(props: Props) {
    return (
        <React.Suspense fallback={<UserMenuFallback variant={props.variant} />}>
            <UserMenuContent {...props} />
        </React.Suspense>
    );
}