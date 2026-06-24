"use client";

import { auth } from "@/lib/auth";
import { createContext, useContext, ReactNode } from "react";


export type Session = typeof auth.$Infer.Session;
const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
    session,
    children,
}: {
    session: Session | null;
    children: ReactNode;
}) {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);