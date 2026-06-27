"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

type Item = {
    href: string;
    title: string;
    icon: React.ElementType;
};

export function SidebarNav({ items }: { items: Item[] }) {
    const pathname = usePathname();

    return (
        <>
            {items.map((item) => {
                const active = pathname === item.href;

                return (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={active}>
                            <Link href={item.href} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </>
    );
}