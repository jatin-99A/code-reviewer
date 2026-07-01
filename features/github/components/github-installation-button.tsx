"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { deleteGithubInstallation } from "@/features/github/actions";


function GithubInstallationButton({
    url,
    connected,
}: {
    url: string;
    connected: boolean;
}) {

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteGithubInstallation,
        onMutate: () => {
            toast.loading("Disconnecting GitHub...", {
                id: "delete-github",
            });
        },
        onSuccess: () => {
            toast.success("GitHub disconnected successfully!", {
                id: "delete-github",
            });
            router.refresh();
        },
        onError: () => {
            toast.error("Failed to disconnect GitHub", {
                id: "delete-github",
            });
        },
    });
    const handleClick = async () => {
        if (connected) return mutate();

        toast.loading("Redirecting to GitHub...");

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    };

    return (
        <Button
            onClick={handleClick}
            disabled={isPending}
            size="sm"
            className={`h-9 w-full rounded-full px-4 text-sm font-medium shadow-sm transition-all sm:w-auto ${connected
                ? "border border-rose-500/20 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
                : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                }`}
        >
            <div className="flex items-center gap-2">
                {connected ? (
                    <RefreshCw className="h-4 w-4" />
                ) : (
                    <ExternalLink className="h-4 w-4" />
                )}

                {connected ? "Disconnect GitHub App" : "Connect GitHub App"}
            </div>
        </Button>
    );
}

export default GithubInstallationButton;