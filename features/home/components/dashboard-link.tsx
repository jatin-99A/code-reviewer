import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Skeleton } from "@/features/common/skeleton";

export async function DashboardLink() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return null;

    return (
        <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
        >
            Dashboard
        </Link>
    );
}

export function DashboardLinkSkeleton() {
    return (
        <Skeleton 
        className="h-5 w-24"
        />
    );
}