import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FolderGit2 } from "lucide-react";

const repos = [
  { name: "api-service", health: 92, prs: 3, status: "healthy" },
  { name: "backend-core", health: 74, prs: 5, status: "warning" },
  { name: "auth-service", health: 55, prs: 1, status: "critical" },
  { name: "frontend-web", health: 88, prs: 7, status: "healthy" },
];

const statusConfig = {
  healthy: { label: "Healthy", class: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10" },
  warning: { label: "Warning", class: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10" },
  critical: { label: "Critical", class: "bg-destructive/10 text-destructive hover:bg-destructive/10" },
};

export function RepoHealth() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-[14px] font-semibold text-foreground">
          Repository Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {repos.map((repo) => {
          const cfg = statusConfig[repo.status as keyof typeof statusConfig];
          return (
            <div key={repo.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-[13px] font-medium text-foreground">{repo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{repo.prs} PRs</span>
                  <Badge className={`text-[10px] h-4 px-1.5 ${cfg.class}`}>{cfg.label}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={repo.health} className="h-1.5 flex-1" />
                <span className="text-[11px] font-medium text-muted-foreground w-7 text-right">
                  {repo.health}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
