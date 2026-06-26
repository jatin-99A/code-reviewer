import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as React from "react";

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

interface AuthGateProps {
    children: React.ReactNode;
    isRequired: boolean;
}

export async function AuthGate({ children, isRequired }: AuthGateProps) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (isRequired && !session) {
        return null;
    }

    if (!isRequired && session?.user) {
        return null;
    }

    return <>{children}</>;
}