"use client"

import {
    LayoutDashboard,
    BarChart3,
    Users,
    Settings,
    FileText,
} from "lucide-react";

export const items = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { title: "Users", href: "/dashboard/users", icon: Users },
    { title: "Reports", href: "/dashboard/reports", icon: FileText },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
];