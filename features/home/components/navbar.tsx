import Link from "next/link";
import { UserMenuWithSession } from "@/features/auth/components/user-menu-with-session";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { NavbarAnimation } from "./navbar-animation.client";
import * as React from "react";
import { DashboardLink, DashboardLinkSkeleton } from "./dashboard-link";
import NavbarRightSiteSkeleton, { NavbarRightSite } from "./navbar-right-part";
import env from "@/lib/env";


 function Navbar() {
    return (
        <NavbarAnimation>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <span className="font-display text-lg font-semibold">{env.APPLICATION_NAME}</span>
                </Link>
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <a href="#comparison" className="hover:text-foreground transition-colors">Comparison</a>
                    <a href="#results" className="hover:text-foreground transition-colors">Results</a>
                    <a href="#why" className="hover:text-foreground transition-colors">Why us</a>
                    <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                    <React.Suspense fallback={<DashboardLinkSkeleton />}>
                        <DashboardLink />
                    </React.Suspense>
                </nav>

                <div className="flex items-center gap-2">
                    <ModeToggle />

                    <UserMenuWithSession variant="compact" />

                    {/* auth navigations */}
                    <React.Suspense fallback={<NavbarRightSiteSkeleton />}>
                        <NavbarRightSite />
                    </React.Suspense>
                </div>
            </div>
        </NavbarAnimation>
    );
}

export default Navbar;