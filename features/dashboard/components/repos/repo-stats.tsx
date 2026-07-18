import { AlertTriangle, BookMarked, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GithubRepo } from "@/server/services/core/github/github-repositories-service";

interface RepoStatsProps {
    repos: GithubRepo[];
}

export function RepoStats({ repos }: RepoStatsProps) {
    const total = repos.length;
    const healthy = repos.filter((r) => r.status === "healthy").length;
    const risky = repos.filter((r) => r.status === "risky").length;
    const critical = repos.filter((r) => r.status === "critical").length;

    const stats = [
        { label: "Total Repositories", value: total, icon: BookMarked, accent: "text-primary" },
        { label: "Healthy", value: healthy, icon: ShieldCheck, accent: "text-green-400 " },
        { label: "At Risk", value: risky, icon: AlertTriangle, accent: "text-yellow-400" },
        { label: "Critical", value: critical, icon: ShieldAlert, accent: "text-red-500" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardContent className="flex items-center gap-4 p-5">
                        <div
                            className={cn(
                                "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted",
                                stat.accent
                            )}
                        >
                            <stat.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-2xl font-semibold leading-none tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
