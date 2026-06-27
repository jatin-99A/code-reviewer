import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
} from "@/components/ui/sidebar";
import env from "@/config/env";
import { UserMenuWithSession } from "@/features/auth/components/user-menu-with-session";
import { SidebarNav } from "./dashboard-sidebar.client";
import { items } from "../utils/routes";
import Link from "next/link";

export function Sidebar() {
    return (
        <UISidebar className="border-r">
            {/* Header */}
            <SidebarHeader className="px-4 py-4">
                <h1 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <Link href={"/"}><img className="h-7" src={"/logo.png"}></img></Link>
                    {env.APPLICATION_NAME}
                </h1>
            </SidebarHeader>

            {/* Menu (client only logic) */}
            <SidebarContent>
                <SidebarMenu>
                    <SidebarNav items={items} />
                </SidebarMenu>
            </SidebarContent>
            <UserMenuWithSession />

            {/* Footer */}
            <SidebarFooter className="p-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} {env.APPLICATION_NAME}</p>
            </SidebarFooter>
        </UISidebar>
    );
}