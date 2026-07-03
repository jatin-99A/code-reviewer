import { Sidebar } from "@/features/dashboard/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-background">
      <div
        id="sidebar"
        className="fixed inset-y-0 left-0 z-20 w-64 transition-transform duration-300 ease-in-out -translate-x-full"
      >
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}