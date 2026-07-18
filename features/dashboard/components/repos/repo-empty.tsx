import { FolderGit2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepoEmptyProps {
    hasFilters: boolean;
    onReset?: () => void;
}

export function RepoEmpty({ hasFilters, onReset }: RepoEmptyProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <FolderGit2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">
                {hasFilters
                    ? "No repositories match your filters"
                    : "No repositories connected"}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {hasFilters
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Connect a GitHub installation to start syncing your repositories."}
            </p>
            {hasFilters && onReset && (
                <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Clear filters
                </Button>
            )}
        </div>
    );
}
