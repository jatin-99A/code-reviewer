"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string;
}

export function SidebarNavItem({ label, href, icon, badge }: Props) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-all duration-150",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <span
        className={cn(
          "h-4 w-4 shrink-0 transition-colors [&>svg]:h-4 [&>svg]:w-4",
          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <Badge
          className={cn(
            "ml-auto h-4 min-w-4 px-1.5 text-[10px] font-medium",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              : "bg-primary text-primary-foreground"
          )}
        >
          {badge}
        </Badge>
      )}
    </Link>
  );
}
