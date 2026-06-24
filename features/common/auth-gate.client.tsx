"use client"
import { useSession } from "@/components/providers/session-provider";
import { authClient } from "@/lib/auth-client";
import * as React from "react";


export type Session = typeof authClient.$Infer.Session;
interface AuthGate {
    children: React.ReactNode,
    isRequired: boolean,
}

export function AuthGate({ children, isRequired }: AuthGate) {
    const session = useSession();


    if (isRequired && !session) {
        return null;
    }

    if (!isRequired && (session?.user)) {
        return null;
    }

    return (children)

}