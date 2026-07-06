import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getGithubInstallationRepositories } from "@/features/github/actions";
import type { GithubRepo } from "@/server/services/core/github/github-repositories-service";
import {
  FolderGit2,
  GitBranch,
  Star,
  Clock,
  Plus,
} from "lucide-react";

const statusConfig = {
  healthy: {
    label: "Healthy",
    cls: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10",
  },
  risky: {
    label: "Risky",
    cls: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10",
  },
  critical: {
    label: "Critical",
    cls: "bg-destructive/10 text-destructive hover:bg-destructive/10",
  },
};

const langColor: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400",
  JavaScript: "bg-yellow-500/10 text-yellow-400",
  Go: "bg-cyan-500/10 text-cyan-400",
  Python: "bg-emerald-500/10 text-emerald-400",
  SQL: "bg-orange-500/10 text-orange-400",
  YAML: "bg-muted text-muted-foreground",
};

function normalizeRepos(response: unknown): GithubRepo[] {
  if (Array.isArray(response)) {
    return response as GithubRepo[];
  }

  if (response && typeof response === "object") {
    const data = response as {
      repos?: GithubRepo[];
      data?: { repos?: GithubRepo[] };
    };

    if (Array.isArray(data.repos)) {
      return data.repos;
    }

    if (data.data && Array.isArray(data.data.repos)) {
      return data.data.repos;
    }
  }

  return [];
}

export default async function RepositoriesPage() {
  let repos: GithubRepo[] = [];

  try {
    const response = await getGithubInstallationRepositories();
    repos = normalizeRepos(response);
  } catch (error) {
    console.error("Failed to load repositories", error);
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Repositories"
        description="Manage and monitor your connected repositories"
      />

      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{repos.length}</span>
            <span>repositories</span>
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-[13px] self-start sm:self-auto">
            <Plus className="h-3.5 w-3.5" />
            Add Repository
          </Button>
        </div>

        {repos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/70 bg-background/60 p-8 text-center text-sm text-muted-foreground">
            No repositories available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo) => {
              const status = statusConfig[repo.status] ?? statusConfig.healthy;
              const language = repo.language ?? "Unknown";
              const lang = langColor[language] ?? "bg-muted text-muted-foreground";

              return (
                <Card
                  key={repo.id}
                  className="group h-full border-border/60 transition-all duration-150 hover:border-border hover:shadow-sm"
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-foreground transition-colors group-hover:text-primary">
                            {repo.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5">
                            <GitBranch className="h-3 w-3 text-muted-foreground/60" />
                            <span className="text-[11px] text-muted-foreground">
                              {repo.defaultBranch}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`h-5 px-1.5 text-[10px] ${status.cls}`}>
                        {status.label}
                      </Badge>
                    </div>

                    <p className="mb-4 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                      {repo.description ?? "No description available."}
                    </p>

                    <div className="mb-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          Health Score
                        </span>
                        <span className="text-[11px] font-medium text-foreground">
                          {repo.health}%
                        </span>
                      </div>
                      <Progress value={repo.health} className="h-1.5" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {repo.lastReview}
                        </span>
                      </div>
                      <Badge className={`h-4 px-1.5 text-[10px] ${lang ? lang : "bg-blue-500/10 text-primary"}`}>
                        {language}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
