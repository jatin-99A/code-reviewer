"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw } from "lucide-react"

function GithubInstallationButton({
    url,
    connected,
}: {
    url: string
    connected: boolean
}) {
    return (
        <Button
            size="sm"
            className={`h-9 w-full rounded-full px-4 text-sm font-medium shadow-sm transition-all sm:w-auto ${connected
                ? "border border-rose-500/20 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                }`}
        >
            <a href={url} className="flex items-center gap-2">
                {connected ? (
                    <RefreshCw className="h-4 w-4" />
                ) : (
                    <ExternalLink className="h-4 w-4" />
                )}
                {connected ? "Disconnect GitHub App" : "Connect GitHub App"}
            </a>
        </Button>
    )
}

export default GithubInstallationButton