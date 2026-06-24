import Link from "next/link";
import { UserMenuWithSession } from "@/features/auth/components/user-menu-with-session.client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { NavbarAnimation } from "./navbar-animation.client";
import { AuthGate } from "@/features/common/auth-gate.client";


export function Navbar() {
    return (
        <NavbarAnimation>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg">
                        <img src="/logo.png" alt="logo" />
                    </div>
                    <span className="font-display text-lg font-semibold">CodeMortal</span>
                </Link>
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    <a href="#comparison" className="hover:text-foreground transition-colors">Comparison</a>
                    <a href="#results" className="hover:text-foreground transition-colors">Results</a>
                    <a href="#why" className="hover:text-foreground transition-colors">Why us</a>
                    <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
                </nav>
                <div className="flex items-center gap-2">
                    <ModeToggle />

                    <UserMenuWithSession variant="compact" />

                    <AuthGate isRequired={false}>
                        <Link href="/sign-in">
                            <Button variant="ghost" size="sm">Sign in</Button>
                        </Link>

                        <Link href="/sign-in">
                            <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90 p-4">
                                Get started
                            </Button>
                        </Link>
                    </AuthGate>
                </div>
            </div>
        </NavbarAnimation>
    );
}
