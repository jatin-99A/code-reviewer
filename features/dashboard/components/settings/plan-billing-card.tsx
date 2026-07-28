"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";
import { plans } from "./constants";

export function PlanBillingCard() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-[14px] font-semibold">Plan & Billing</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-4 flex flex-col justify-between ${
                plan.current
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/60 hover:border-border"
              }`}
            >
              <div>
                {plan.current && (
                  <Badge className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[9px] h-4 px-1.5">
                    Current
                  </Badge>
                )}
                <p className="text-[15px] font-bold text-foreground mt-1">{plan.name}</p>
                <p className="text-[22px] font-bold text-foreground mt-1">
                  {plan.price}
                  <span className="text-[12px] font-normal text-muted-foreground">/mo</span>
                </p>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {!plan.current && (
                <Button size="sm" className="w-full mt-4 h-7 text-[11px]">
                  Upgrade
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
