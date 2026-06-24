import * as React from "react";
import { requireAuth } from "../../../features/auth/actions";

export default async function layout({ children }: { children: React.ReactNode }) {

    // await requireAuth();

    return <div className="min-h-svh">{children}<h1>Dashbaord</h1></div>;
}