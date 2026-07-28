export interface NotifSetting {
  label: string;
  sub: string;
  on: boolean;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  current: boolean;
}

export const notifSettings: NotifSetting[] = [
  { label: "New pull request opened", sub: "Get notified when a PR is opened on your repos", on: true },
  { label: "AI review completed", sub: "Receive a notification when CodeMortal finishes a review", on: true },
  { label: "Critical issues detected", sub: "Immediate alert for high-severity findings", on: true },
  { label: "Weekly digest", sub: "Weekly summary of your repository activity", on: false },
  { label: "Marketing updates", sub: "New features, tips and announcements", on: false },
];

export const plans: Plan[] = [
  { name: "Free", price: "$0", features: ["5 repositories", "50 PR reviews/mo", "Basic AI analysis"], current: true },
  { name: "Pro", price: "$12", features: ["Unlimited repositories", "500 PR reviews/mo", "Advanced AI analysis", "Priority support"], current: false },
  { name: "Team", price: "$29", features: ["Unlimited everything", "Custom AI models", "Team analytics", "SSO"], current: false },
];
