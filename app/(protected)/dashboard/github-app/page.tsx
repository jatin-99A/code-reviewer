import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  GitCommitHorizontal,
  CheckCircle2,
  FolderGit2,
  Webhook,
  Key,
  RefreshCw,
  ExternalLink,
  Shield,
  Activity,
} from "lucide-react";

const permissions = [
  { name: "Contents", level: "Read", desc: "Read repository content and code" },
  { name: "Pull Requests", level: "Write", desc: "Read, create, and update pull requests" },
  { name: "Checks", level: "Write", desc: "Create and update check runs and suites" },
  { name: "Metadata", level: "Read", desc: "Access repository metadata" },
  { name: "Webhooks", level: "Admin", desc: "Manage repository webhooks" },
];

const webhooks = [
  { event: "pull_request", status: "active", deliveries: 1284, lastDelivery: "2 min ago" },
  { event: "push", status: "active", deliveries: 3891, lastDelivery: "14 min ago" },
  { event: "pull_request_review", status: "active", deliveries: 456, lastDelivery: "1 hr ago" },
  { event: "check_suite", status: "inactive", deliveries: 0, lastDelivery: "Never" },
];

export default function GitHubAppPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="GitHub App"
        description="Manage your CodeMortal GitHub App installation"
      />

      <main className="flex-1 p-6 space-y-5">
        {/* App Status Card */}
        <Card className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <GitCommitHorizontal className="h-7 w-7 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-[16px] font-semibold text-foreground">CodeMortal</h2>
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 text-[10px] h-5 px-1.5 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected
                  </Badge>
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  GitHub App ID: <span className="font-mono text-foreground">CM-48291</span>
                  <span className="mx-2 text-border">·</span>
                  Installed on <span className="font-medium text-foreground">jatin-99A</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 h-8 text-[12px]">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Sync
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 h-8 text-[12px]">
                  <ExternalLink className="h-3.5 w-3.5" />
                  GitHub Settings
                </Button>
              </div>
            </div>

            <Separator className="my-4 opacity-50" />

            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "Repositories", value: "24", icon: FolderGit2 },
                { label: "Total Events", value: "5,631", icon: Activity },
                { label: "Active Webhooks", value: "3", icon: Webhook },
                { label: "API Rate Limit", value: "4,821/5k", icon: Key },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-[18px] font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-5">
          {/* Permissions */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-[14px] font-semibold">Permissions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {permissions.map((p) => (
                  <div key={p.name} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-[13px] font-medium text-foreground">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{p.desc}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        p.level === "Admin"
                          ? "text-amber-500 border-amber-500/30 text-[10px] h-5"
                          : p.level === "Write"
                          ? "text-blue-400 border-blue-400/30 text-[10px] h-5"
                          : "text-muted-foreground text-[10px] h-5"
                      }
                    >
                      {p.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Webhooks */}
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Webhook className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-[14px] font-semibold">Webhook Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {webhooks.map((w) => (
                  <div key={w.event} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-[13px] font-mono font-medium text-foreground">
                        {w.event}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {w.deliveries.toLocaleString()} deliveries · {w.lastDelivery}
                      </p>
                    </div>
                    <Badge
                      className={
                        w.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 text-[10px] h-5"
                          : "bg-muted text-muted-foreground hover:bg-muted text-[10px] h-5"
                      }
                    >
                      {w.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
