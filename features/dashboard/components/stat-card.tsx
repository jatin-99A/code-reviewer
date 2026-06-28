import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: ReactNode;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  iconColor = "text-muted-foreground",
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/60 transition-all duration-200 hover:border-border hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
            <p
              className={cn(
                "text-[12px] font-medium",
                changeType === "positive" && "text-emerald-500",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-muted",
              iconColor
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
