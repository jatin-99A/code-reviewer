"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Trash2 } from "lucide-react";

export function DangerZoneCard() {
  return (
    <Card className="border-destructive/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-destructive" />
          <CardTitle className="text-[14px] font-semibold text-destructive">Danger Zone</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 gap-4">
          <div>
            <p className="text-[13px] font-medium text-foreground">Delete Account</p>
            <p className="text-[11px] text-muted-foreground">Permanently delete your account and all data</p>
          </div>
          <Button variant="destructive" size="sm" className="gap-1.5 h-8 text-[12px] w-full sm:w-auto justify-center">
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
