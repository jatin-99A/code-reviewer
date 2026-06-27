import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/features/dashboard/components/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex bg-background">
            <SidebarProvider>

                <Sidebar />

                {/* Main Area */}
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 overflow-y-auto p-6 bg-muted/40">
                        <div className="mx-auto w-full max-w-7xl">
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}