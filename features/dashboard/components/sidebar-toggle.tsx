"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SIDEBAR_ID = "sidebar"
const OPEN_CLASS = "translate-x-0"
const CLOSED_CLASS = "-translate-x-full"

function updateSidebar(open: boolean) {
    const sidebar = document.getElementById(SIDEBAR_ID)
    if (!sidebar) return

    sidebar.classList.remove(OPEN_CLASS, CLOSED_CLASS)
    sidebar.classList.add(open ? OPEN_CLASS : CLOSED_CLASS)
}

function SidebarToggle({ className, ...props }: React.ComponentProps<"button">) {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const sidebar = document.getElementById(SIDEBAR_ID)
        if (!sidebar) return

        setOpen(sidebar.classList.contains(OPEN_CLASS))

        const handleSidebarEvent = (event: Event) => {
            const detail = (event as CustomEvent<boolean>).detail
            setOpen(detail)
        }

        window.addEventListener("sidebar-toggle", handleSidebarEvent)
        return () => window.removeEventListener("sidebar-toggle", handleSidebarEvent)
    }, [])

    const handleToggle = () => {
        const newOpen = !open
        updateSidebar(newOpen)
        window.dispatchEvent(new CustomEvent("sidebar-toggle", { detail: newOpen }))
        setOpen(newOpen)
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={cn(
                "rounded-md border border-border bg-muted p-2 text-foreground transition hover:bg-muted/80",
                className
            )}
            id="sidebar-toggle"
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            {...props}
        >
            <ChevronRight
                className={open ? "h-4 w-4 rotate-180 transition-transform duration-200" : "h-4 w-4 transition-transform duration-200"}
            />
        </button>
    )
}

export { SidebarToggle }
export default SidebarToggle
