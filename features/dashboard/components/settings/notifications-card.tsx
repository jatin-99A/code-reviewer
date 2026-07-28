"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { notifSettings as initialSettings } from "./constants";

export function NotificationsCard() {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (index: number) => {
    setSettings((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, on: !item.on } : item))
    );
  };

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-[14px] font-semibold">Notifications</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {settings.map((n, idx) => (
            <div key={n.label} className="flex items-start sm:items-center justify-between px-5 py-3.5 gap-4">
              <div className="space-y-0.5">
                <p className="text-[13px] font-medium text-foreground">{n.label}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{n.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting(idx)}
                aria-label={`Toggle ${n.label}`}
                className={`relative flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors shrink-0 ${
                  n.on ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                    n.on ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
