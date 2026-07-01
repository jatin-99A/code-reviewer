import { UserMenuWithSession } from "@/features/auth/components/user-menu-with-session";
import { dashboardRoutes } from "../utils/routes";
import { SidebarNavItem } from "./sidebar-nav-item.client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import env from "@/lib/env";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-sidebar">

      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-border">
        <span className="flex h-11 w-11 items-center justify-center">
          <Link href={"/"}><img src="/logo.png" alt="logo" /></Link>
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          {env.APPLICATION_NAME}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {dashboardRoutes.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-4" : ""}>
            <p className="mb-1 px-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
              {group.title}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.routes.map((route) => {
                const Icon = route.icon;
                return (
                  <SidebarNavItem
                    key={route.href}
                    label={route.label}
                    href={route.href}
                    icon={<Icon />}
                    badge={route.badge}
                  />
                );
              })}
            </div>
            {gi < dashboardRoutes.length - 1 && (
              <Separator className="mt-4 opacity-50" />
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3 flex items-center justify-center">
        <UserMenuWithSession />
      </div>
    </aside>
  );
}
