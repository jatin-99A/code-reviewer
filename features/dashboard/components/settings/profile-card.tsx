"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, ChevronRight } from "lucide-react";

export function ProfileCard() {
  const profileFields = [
    { label: "Display Name", value: "jatin-99A" },
    { label: "Email Address", value: "jatin@example.com" },
    { label: "GitHub Username", value: "jatin-99A" },
    { label: "Timezone", value: "Asia/Kolkata (IST)" },
  ];

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-[14px] font-semibold">Profile</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
              J
            </div>
            <div>
              <p className="text-[14px] font-semibold text-foreground">jatin-99A</p>
              <p className="text-[12px] text-muted-foreground">jatin@example.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="sm:ml-auto h-8 text-[12px] w-fit">
            Change Avatar
          </Button>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileFields.map((f) => (
            <div key={f.label}>
              <p className="text-[11px] font-medium text-muted-foreground mb-1">{f.label}</p>
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                <span className="text-[13px] text-foreground truncate mr-2">{f.value}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button size="sm" className="h-8 text-[12px] w-full sm:w-auto">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
