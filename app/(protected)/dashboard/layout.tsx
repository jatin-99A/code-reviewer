import * as React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {

    return <div className="min-h-svh">{children}<h1>Dashbaord</h1></div>;
}