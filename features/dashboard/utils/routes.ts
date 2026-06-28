import {
  LayoutDashboard,
  FolderGit2,
  GitPullRequest,
  GitCommitHorizontal,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface Route {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface RouteGroup {
  title: string;
  routes: Route[];
}

export const dashboardRoutes: RouteGroup[] = [
  {
    title: "Workspace",
    routes: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Repositories",
        href: "/dashboard/repositories",
        icon: FolderGit2,
      },
      {
        label: "Pull Requests",
        href: "/dashboard/pull-requests",
        icon: GitPullRequest,
        badge: "12",
      },
      {
        label: "GitHub App",
        href: "/dashboard/github-app",
        icon: GitCommitHorizontal,
      },
    ],
  },
  {
    title: "Account",
    routes: [
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];
