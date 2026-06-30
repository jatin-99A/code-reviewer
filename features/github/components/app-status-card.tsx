import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    GitCommitHorizontal,
    CheckCircle2,
    FolderGit2,
    Webhook,
    Key,
    RefreshCw,
    ExternalLink,
    Activity,
} from "lucide-react";
import { GithubInstallationService } from "@/features/github/core/github-installation-service";
import env from "@/config/env";
import GithubInstallationButton from "./github-installation-button.client";
import { getGithubInstallationStatus, getGithubInstallationUrl } from "../actions";

async function AppStatusCard() {
    const installation = await getGithubInstallationStatus();
    const installationUrl = await getGithubInstallationUrl();

    return (
        <Card className="border-border/60">
            <CardContent className="p-5">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        <GitCommitHorizontal className="h-7 w-7 text-foreground" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-[16px] font-semibold text-foreground">CodeMortal</h2>
                            <Badge
                                className={
                                    installation.connected
                                        ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 text-[10px] h-5 px-1.5 gap-1"
                                        : "bg-muted text-red-400 hover:bg-muted text-[10px] h-5 px-1.5 gap-1"
                                }
                            >
                                <CheckCircle2 className="h-3 w-3" />
                                {installation.connected ? "Connected" : "Disconnected"}
                            </Badge>
                        </div>

                        <p className="text-[12px] text-muted-foreground mt-0.5">
                            GitHub App ID: <span className="font-mono text-foreground">{env.GITHUB_APP_ID}</span>
                            <span className="mx-2 text-border">·</span>
                            Installed on <span className="font-medium text-foreground">jatin-99A</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">

                        {/* Button for connecting github app */}
                        <GithubInstallationButton connected={installation.connected} url={installationUrl} />

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
    )
}

export default AppStatusCard