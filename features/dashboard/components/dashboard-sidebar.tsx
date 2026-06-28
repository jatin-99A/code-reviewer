import { dashboardRoutes } from "../utils/routes";
import { SidebarNavItem } from "./sidebar-nav-item.client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2 } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex h-full w-55 shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Code2 className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          CodeMortal
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
      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-foreground truncate">jatin-99A</p>
            <p className="text-[11px] text-muted-foreground truncate">Free plan</p>
          </div>
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5 shrink-0">
            Free
          </Badge>
        </div>
      </div>
    </aside>
  );
}
