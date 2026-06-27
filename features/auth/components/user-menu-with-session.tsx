export const dynamic = "force-dynamic";

import * as React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserMenu } from "./user-menu";
import { Skeleton } from "@/components/ui/skeleton";

type Props = Omit<React.ComponentProps<typeof UserMenu>, "user">;

async function UserMenuContent(props: Props) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return null;

    return <UserMenu user={session.user} {...props} />;
}

function UserMenuFallback({varient}: {varient: Props["variant"]}) {
    if (varient === "compact") return <Skeleton className="h-8 w-8 rounded-full" />
    return (
        <Skeleton className="h-9 w-full rounded-md" />
    );
}

export function UserMenuWithSession(props: Props) {
    return (
        <React.Suspense fallback={<UserMenuFallback varient={props.variant} />}>
            <UserMenuContent {...props} />
        </React.Suspense>
    );
}