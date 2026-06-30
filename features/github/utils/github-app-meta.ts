// features/github-app/githubApp.meta.ts

import {
  FolderGit2,
  Webhook,
  Key,
  Activity,
} from "lucide-react";

export const permissions = [
  { name: "Contents", level: "Read", desc: "Read repository content and code" },
  { name: "Pull Requests", level: "Write", desc: "Read, create, and update pull requests" },
  { name: "Checks", level: "Write", desc: "Create and update check runs and suites" },
  { name: "Metadata", level: "Read", desc: "Access repository metadata" },
  { name: "Webhooks", level: "Admin", desc: "Manage repository webhooks" },
];

export const webhooks = [
  { event: "pull_request", status: "active", deliveries: 1284, lastDelivery: "2 min ago" },
  { event: "push", status: "active", deliveries: 3891, lastDelivery: "14 min ago" },
  { event: "pull_request_review", status: "active", deliveries: 456, lastDelivery: "1 hr ago" },
  { event: "check_suite", status: "inactive", deliveries: 0, lastDelivery: "Never" },
];

export const stats = [
  { label: "Repositories", value: "24", icon: FolderGit2 },
  { label: "Total Events", value: "5,631", icon: Activity },
  { label: "Active Webhooks", value: "3", icon: Webhook },
  { label: "API Rate Limit", value: "4,821/5k", icon: Key },
];