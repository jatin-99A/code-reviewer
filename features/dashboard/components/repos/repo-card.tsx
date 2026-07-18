import { CircleDot, GitBranch, Globe, Lock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCount, getLanguageColor, statusConfig } from "../../utils/repos";
import { RepoSyncButton } from "./repo-sync-button";
import { GithubRepo } from "@/server/services/core/github/github-repositories-service";


export function RepoCard({ repo }: { repo: GithubRepo }) {
  const status = statusConfig[repo.status];
  const languageColor = getLanguageColor(repo.language);

  return (
    <Card className="group flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-3">
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold leading-tight">{repo.name}</h3>
            <Badge
              variant="outline"
              className="shrink-0 gap-1 text-[10px] font-medium uppercase"
            >
              {repo.private ? (
                <Lock className="h-3 w-3" />
              ) : (
                <Globe className="h-3 w-3" />
              )}
              {repo.private ? "Private" : "Public"}
            </Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">{repo.fullName}</p>
        </div>
        <RepoSyncButton fullName={repo.fullName} />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {repo.description || "No description provided."}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={languageColor ? { backgroundColor: languageColor } : undefined}
              />
              {repo.language}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {formatCount(repo.stars)}
          </span>
          <span className="inline-flex items-center gap-1">
            <CircleDot className="h-3.5 w-3.5" />
            {formatCount(repo.issues)} issues
          </span>
          <span className="inline-flex items-center gap-1">
            <GitBranch className="h-3.5 w-3.5" />
            {repo.branch}
          </span>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className={cn("h-2 w-2 rounded-full", status.dot)} />
              {status.label}
            </span>
            <span className="text-muted-foreground">{repo.health}% health</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all", status.bar)}
              style={{ width: `${repo.health}%` }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Last review {repo.lastReview}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
