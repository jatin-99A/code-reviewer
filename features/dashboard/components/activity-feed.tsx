import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitMerge, GitPullRequest, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    type: "merged",
    title: "Fix auth token expiry handling",
    repo: "api-service",
    user: "jatin-99A",
    time: "2 min ago",
    icon: GitMerge,
    iconClass: "text-emerald-500 bg-emerald-500/10",
  },
  {
    type: "review",
    title: "Add rate limiting middleware",
    repo: "backend-core",
    user: "priya-dev",
    time: "18 min ago",
    icon: Clock,
    iconClass: "text-amber-500 bg-amber-500/10",
  },
  {
    type: "open",
    title: "Refactor database connection pool",
    repo: "db-layer",
    user: "sam-code",
    time: "1 hr ago",
    icon: GitPullRequest,
    iconClass: "text-blue-500 bg-blue-500/10",
  },
  {
    type: "approved",
    title: "Update CI/CD pipeline config",
    repo: "devops",
    user: "jatin-99A",
    time: "3 hr ago",
    icon: CheckCircle2,
    iconClass: "text-emerald-500 bg-emerald-500/10",
  },
  {
    type: "alert",
    title: "Security vulnerability detected",
    repo: "auth-service",
    user: "CodeMortal AI",
    time: "5 hr ago",
    icon: AlertCircle,
    iconClass: "text-destructive bg-destructive/10",
  },
];

const typeLabel: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  merged: { label: "Merged", variant: "secondary" },
  review: { label: "In Review", variant: "outline" },
  open: { label: "Open", variant: "secondary" },
  approved: { label: "Approved", variant: "secondary" },
  alert: { label: "Alert", variant: "destructive" },
};

export function ActivityFeed() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-[14px] font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {activities.map((item, i) => {
            const Icon = item.icon;
            const tag = typeLabel[item.type];
            return (
              <div
                key={i}
                className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                    item.iconClass
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground leading-snug truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-muted-foreground">{item.repo}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground">{item.user}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-[11px] text-muted-foreground/60">{item.time}</span>
                  </div>
                </div>
                <Badge variant={tag.variant} className="text-[10px] h-5 px-1.5 shrink-0 mt-0.5">
                  {tag.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
