"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RepoSyncButtonProps {
  fullName: string;
}

export function RepoSyncButton({ fullName }: RepoSyncButtonProps) {
  const [syncing, setSyncing] = useState(false);

  async function handleSync() {
    setSyncing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSyncing(false);
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSync}
      disabled={syncing}
      aria-label={`Sync ${fullName}`}
    >
      <RefreshCw className={cn("h-3.5 w-3.5", syncing && "animate-spin")} />
      {syncing ? "Syncing" : "Sync"}
    </Button>
  );
}
