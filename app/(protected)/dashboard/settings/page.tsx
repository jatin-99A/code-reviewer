import { TopBar } from "@/features/dashboard/components/topbar";
import { ProfileCard } from "@/features/dashboard/components/settings/profile-card";
import { NotificationsCard } from "@/features/dashboard/components/settings/notifications-card";
import { PlanBillingCard } from "@/features/dashboard/components/settings/plan-billing-card";
import { DangerZoneCard } from "@/features/dashboard/components/settings/danger-zone-card";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <TopBar
        title="Settings"
        description="Manage your account preferences and configuration"
      />

      <main className="flex-1 p-6 space-y-5 max-w-3xl">
        <ProfileCard />
        <NotificationsCard />
        <PlanBillingCard />
        <DangerZoneCard />
      </main>
    </div>
  );
}
