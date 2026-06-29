import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  GitPullRequest,
  GitMerge,
  GitBranch,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const pullRequests = [
  {
    id: 142,
    title: "Fix auth token expiry handling for OAuth sessions",
    repo: "api-service",
    author: "jatin-99A",
    initials: "J",
    branch: "fix/oauth-token-expiry",
    status: "merged",
    reviews: 2,
    comments: 8,
    additions: 143,
    deletions: 67,
    aiScore: 96,
    time: "2 min ago",
    aiIssues: 0,
  },
  {
    id: 141,
    title: "Add rate limiting middleware with Redis backing",
    repo: "backend-core",
    author: "priya-dev",
    initials: "P",
    branch: "feat/rate-limiting",
    status: "review",
    reviews: 1,
    comments: 4,
    additions: 312,
    deletions: 21,
    aiScore: 78,
    time: "18 min ago",
    aiIssues: 3,
  },
  {
    id: 140,
    title: "Refactor database connection pool configuration",
    repo: "db-layer",
    author: "sam-code",
    initials: "S",
    branch: "refactor/db-pool",
    status: "open",
    reviews: 0,
    comments: 1,
    additions: 89,
    deletions: 205,
    aiScore: 82,
    time: "1 hr ago",
    aiIssues: 2,
  },
  {
    id: 139,
    title: "Update CI/CD pipeline for multi-environment deployments",
    repo: "devops",
    author: "jatin-99A",
    initials: "J",
    branch: "ci/multi-env-deploy",
    status: "approved",
    reviews: 3,
    comments: 12,
    additions: 198,
    deletions: 54,
    aiScore: 91,
    time: "3 hr ago",
    aiIssues: 1,
  },
  {
    id: 138,
    title: "Security patch: sanitize user input in search endpoint",
    repo: "auth-service",
    author: "rohan-sec",
    initials: "R",
    branch: "security/input-sanitize",
    status: "open",
    reviews: 0,
    comments: 0,
    additions: 47,
    deletions: 12,
    aiScore: 45,
    time: "5 hr ago",
    aiIssues: 8,
  },
  {
    id: 137,
    title: "Add responsive layout for mobile dashboard view",
    repo: "frontend-web",
    author: "maya-ui",
    initials: "M",
    branch: "feat/mobile-responsive",
    status: "draft",
    reviews: 0,
    comments: 2,
    additions: 421,
    deletions: 38,
    aiScore: 70,
    time: "8 hr ago",
    aiIssues: 4,
  },
  {
    id: 136,
    title: "Bump dependencies: lodash, axios, express",
    repo: "api-service",
    author: "bot-updater",
    initials: "B",
    branch: "chore/dep-updates",
    status: "closed",
    reviews: 1,
    comments: 0,
    additions: 8,
    deletions: 8,
    aiScore: 99,
    time: "1 day ago",
    aiIssues: 0,
  },
];

const statusConfig = {
  merged: { label: "Merged", icon: GitMerge, cls: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10", iconCls: "text-emerald-500" },
  review: { label: "In Review", icon: Clock, cls: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/10", iconCls: "text-amber-500" },
  open: { label: "Open", icon: GitPullRequest, cls: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/10", iconCls: "text-blue-400" },
  approved: { label: "Approved", icon: CheckCircle2, cls: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10", iconCls: "text-emerald-500" },
  draft: { label: "Draft", icon: GitBranch, cls: "bg-muted text-muted-foreground hover:bg-muted", iconCls: "text-muted-foreground" },
  closed: { label: "Closed", icon: XCircle, cls: "bg-muted text-muted-foreground hover:bg-muted", iconCls: "text-muted-foreground" },
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-emerald-500" : score >= 65 ? "text-amber-500" : "text-destructive";
  return (
    <span className={cn("text-[12px] font-bold tabular-nums", color)}>{score}</span>
  );
}

export default function PullRequestsPage() {
  const open = pullRequests.filter((p) => ["open", "review", "approved", "draft"].includes(p.status)).length;
  const merged = pullRequests.filter((p) => p.status === "merged").length;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Pull Requests"
        description="AI-reviewed pull requests across all repositories"
      />

      <main className="flex-1 p-6">
        {/* Summary row */}
        <div className="flex items-center gap-4 mb-5 text-[13px]">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{open}</span> open
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{merged}</span> merged
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{pullRequests.length}</span> total
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {pullRequests.map((pr) => {
            const s = statusConfig[pr.status as keyof typeof statusConfig];
            const StatusIcon = s.icon;
            return (
              <Card
                key={pr.id}
                className="border-border/60 hover:border-border hover:shadow-sm transition-all duration-150 cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <StatusIcon className={cn("h-4 w-4 mt-0.5 shrink-0", s.iconCls)} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {pr.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[11px] text-muted-foreground font-medium">
                              {pr.repo}
                            </span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <GitBranch className="h-3 w-3" />
                              {pr.branch}
                            </span>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="text-[11px] text-muted-foreground">{pr.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge className={`text-[10px] h-5 px-1.5 ${s.cls}`}>
                            {s.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2.5">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
                              {pr.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[11px] text-muted-foreground">{pr.author}</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground ml-auto">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />{pr.comments}
                          </span>
                          <span className="text-emerald-500">+{pr.additions}</span>
                          <span className="text-destructive">-{pr.deletions}</span>
                          {pr.aiIssues > 0 && (
                            <span className="flex items-center gap-1 text-amber-500">
                              <AlertCircle className="h-3 w-3" />{pr.aiIssues} issues
                            </span>
                          )}
                          <div className="flex items-center gap-1 pl-1 border-l border-border/60">
                            <span className="text-[10px] text-muted-foreground">AI Score</span>
                            <ScoreBadge score={pr.aiScore} />
                          </div>
                        </div>
                      </div>
                    </div>
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
