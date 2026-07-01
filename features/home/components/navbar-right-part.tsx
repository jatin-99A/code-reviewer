import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Skeleton } from "@/components/ui/skeleton";

export async function NavbarRightSite() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) return null;

    return (
        <>
            <Link href="/sign-in">
                <Button
                    variant="ghost"
                    className="hover:bg-primary hover:text-white"
                    size="sm"
                >
                    Sign in
                </Button>
            </Link>

            <Link href="/sign-up">
                <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:opacity-90 p-4"
                >
                    Get started
                </Button>
            </Link>
        </>
    );
}

export default function NavbarRightSiteSkeleton() {
    return (
        <Skeleton className="h-5 w-24" />
    );
}