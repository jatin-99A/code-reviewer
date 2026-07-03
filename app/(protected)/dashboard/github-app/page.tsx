export const dynamic = "force-dynamic";

import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Webhook, Shield } from "lucide-react";
import { permissions, webhooks } from "@/features/github/utils/github-app-meta";
import { Metadata } from "next";
import AppStatusCard from "@/features/github/components/app-status-card";
import env from "@/lib/env";
import * as React from "react";
import AppStatusCardSkeleton from "@/features/github/components/app-status.card.skeleton";

export const metadata: Metadata = {
  title: "GitHub App",
  description: `Manage your ${env.APPLICATION_NAME} GitHub App installation`,
};

export default async function GitHubAppPage() {

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="GitHub App"
        description={`Manage your ${env.APPLICATION_NAME} GitHub App installation`}
      />

      <main className="flex-1 p-6 space-y-5">

        {/* App Status Card */}
        <React.Suspense fallback={<AppStatusCardSkeleton />}>
          <AppStatusCard />
        </React.Suspense>

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
