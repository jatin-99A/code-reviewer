import * as React from "react";
import { requireAuth } from "../features/auth/actions";

export default async function layout({ children }: { children: React.ReactNode }) {

    await requireAuth();

    return (
        <div>
            {children}
        </div>
    )
}