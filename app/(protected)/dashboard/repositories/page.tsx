import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FolderGit2,
  GitBranch,
  GitPullRequest,
  Star,
  Clock,
  Plus,
} from "lucide-react";

const repos = [
  {
    name: "api-service",
    description: "Core REST API gateway with authentication and rate limiting",
    language: "TypeScript",
    stars: 42,
    prs: 3,
    branch: "main",
    health: 92,
    status: "healthy",
    lastReview: "2 min ago",
    issues: 2,
  },
  {
    name: "backend-core",
    description: "Shared business logic layer and database abstractions",
    language: "Go",
    stars: 28,
    prs: 5,
    branch: "develop",
    health: 74,
    status: "warning",
    lastReview: "1 hr ago",
    issues: 7,
  },
  {
    name: "auth-service",
    description: "OAuth2 and JWT authentication microservice",
    language: "TypeScript",
    stars: 19,
    prs: 1,
    branch: "main",
    health: 55,
    status: "critical",
    lastReview: "5 hr ago",
    issues: 12,
  },
  {
    name: "frontend-web",
    description: "Next.js web application with Tailwind CSS",
    language: "TypeScript",
    stars: 61,
    prs: 7,
    branch: "main",
    health: 88,
    status: "healthy",
    lastReview: "30 min ago",
    issues: 3,
  },
  {
    name: "db-layer",
    description: "Database schema, migrations and query optimization",
    language: "SQL",
    stars: 9,
    prs: 2,
    branch: "main",
    health: 81,
    status: "healthy",
    lastReview: "2 days ago",
    issues: 1,
  },
  {
    name: "devops",
    description: "CI/CD pipelines, Docker configs and Kubernetes manifests",
    language: "YAML",
    stars: 15,
    prs: 4,
    branch: "staging",
    health: 69,
    status: "warning",
    lastReview: "3 hr ago",
    issues: 5,
  },
];

const statusConfig = {
  healthy: { label: "Healthy", cls: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10" },
  warning: { label: "Warning", cls: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10" },
  critical: { label: "Critical", cls: "bg-destructive/10 text-destructive hover:bg-destructive/10" },
};

const langColor: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400",
  Go: "bg-cyan-500/10 text-cyan-400",
  SQL: "bg-orange-500/10 text-orange-400",
  YAML: "bg-muted text-muted-foreground",
};

export default function RepositoriesPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Repositories"
        description="Manage and monitor your connected repositories"
      />

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{repos.length}</span> repositories
          </div>
          <Button size="sm" className="gap-1.5 h-8 text-[13px]">
            <Plus className="h-3.5 w-3.5" />
            Add Repository
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {repos.map((repo) => {
            const status = statusConfig[repo.status as keyof typeof statusConfig];
            const lang = langColor[repo.language] ?? "bg-muted text-muted-foreground";
            return (
              <Card
                key={repo.name}
                className="border-border/60 hover:border-border hover:shadow-sm transition-all duration-150 cursor-pointer group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                          {repo.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <GitBranch className="h-3 w-3 text-muted-foreground/60" />
                          <span className="text-[11px] text-muted-foreground">{repo.branch}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`text-[10px] h-5 px-1.5 ${status.cls}`}>
                      {status.label}
                    </Badge>
                  </div>

                  <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">Health Score</span>
                      <span className="text-[11px] font-medium text-foreground">{repo.health}%</span>
                    </div>
                    <Progress value={repo.health} className="h-1.5" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />{repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitPullRequest className="h-3 w-3" />{repo.prs} PRs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />{repo.lastReview}
                      </span>
                    </div>
                    <Badge className={`text-[10px] h-4 px-1.5 ${lang}`}>
                      {repo.language}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
