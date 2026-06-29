import { TopBar } from "@/features/dashboard/components/topbar";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { ActivityFeed } from "@/features/dashboard/components/activity-feed";
import { ReviewChart } from "@/features/dashboard/components/review-chart";
import { RepoHealth } from "@/features/dashboard/components/repo-health";
import {
  GitPullRequest,
  FolderGit2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Overview"
        description="Your AI-powered code review workspace"
      />

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Repositories"
            value="24"
            change="+3 this month"
            changeType="positive"
            icon={<FolderGit2 className="h-5 w-5" />}
          />
          <StatCard
            title="Open Pull Requests"
            value="12"
            change="+2 since yesterday"
            changeType="neutral"
            icon={<GitPullRequest className="h-5 w-5" />}
          />
          <StatCard
            title="Reviews Completed"
            value="189"
            change="+18 this week"
            changeType="positive"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <StatCard
            title="Issues Detected"
            value="47"
            change="-8 resolved today"
            changeType="positive"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <ReviewChart />
            <ActivityFeed />
          </div>
          <div>
            <RepoHealth />
          </div>
        </div>
      </main>
    </div>
  );
}
