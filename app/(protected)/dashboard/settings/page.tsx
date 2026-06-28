import { TopBar } from "@/features/dashboard/components/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Trash2,
  ChevronRight,
  Check,
} from "lucide-react";

const sections = [
  {
    title: "Profile",
    icon: User,
    fields: [
      { label: "Display Name", value: "jatin-99A", type: "text" },
      { label: "Email", value: "jatin@example.com", type: "email" },
      { label: "Username", value: "jatin-99A", type: "text" },
    ],
  },
];

const notifSettings = [
  { label: "New pull request opened", sub: "Get notified when a PR is opened on your repos", on: true },
  { label: "AI review completed", sub: "Receive a notification when CodeMortal finishes a review", on: true },
  { label: "Critical issues detected", sub: "Immediate alert for high-severity findings", on: true },
  { label: "Weekly digest", sub: "Weekly summary of your repository activity", on: false },
  { label: "Marketing updates", sub: "New features, tips and announcements", on: false },
];

const plans = [
  { name: "Free", price: "$0", features: ["5 repositories", "50 PR reviews/mo", "Basic AI analysis"], current: true },
  { name: "Pro", price: "$12", features: ["Unlimited repositories", "500 PR reviews/mo", "Advanced AI analysis", "Priority support"], current: false },
  { name: "Team", price: "$29", features: ["Unlimited everything", "Custom AI models", "Team analytics", "SSO"], current: false },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Settings"
        description="Manage your account preferences and configuration"
      />

      <main className="flex-1 p-6 space-y-5 max-w-3xl">
        {/* Profile */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-[14px] font-semibold">Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                J
              </div>
              <div>
                <p className="text-[14px] font-semibold text-foreground">jatin-99A</p>
                <p className="text-[12px] text-muted-foreground">jatin@example.com</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto h-8 text-[12px]">
                Change Avatar
              </Button>
            </div>
            <Separator className="opacity-50" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Display Name", value: "jatin-99A" },
                { label: "Email Address", value: "jatin@example.com" },
                { label: "GitHub Username", value: "jatin-99A" },
                { label: "Timezone", value: "Asia/Kolkata (IST)" },
              ].map((f) => (
                <div key={f.label}>
                  <p className="text-[11px] font-medium text-muted-foreground mb-1">{f.label}</p>
                  <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                    <span className="text-[13px] text-foreground">{f.value}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="h-8 text-[12px]">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-[14px] font-semibold">Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {notifSettings.map((n) => (
                <div key={n.label} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{n.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{n.sub}</p>
                  </div>
                  <div
                    className={`relative flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors ${
                      n.on ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <div
                      className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                        n.on ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-[14px] font-semibold">Plan & Billing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-xl border p-4 ${
                    plan.current
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/60 hover:border-border"
                  }`}
                >
                  {plan.current && (
                    <Badge className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[9px] h-4 px-1.5">
                      Current
                    </Badge>
                  )}
                  <p className="text-[15px] font-bold text-foreground">{plan.name}</p>
                  <p className="text-[22px] font-bold text-foreground mt-1">
                    {plan.price}
                    <span className="text-[12px] font-normal text-muted-foreground">/mo</span>
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {!plan.current && (
                    <Button size="sm" className="w-full mt-3 h-7 text-[11px]">
                      Upgrade
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-destructive" />
              <CardTitle className="text-[14px] font-semibold text-destructive">Danger Zone</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
              <div>
                <p className="text-[13px] font-medium text-foreground">Delete Account</p>
                <p className="text-[11px] text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm" className="gap-1.5 h-8 text-[12px]">
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
