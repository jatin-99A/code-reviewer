import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", reviews: 8, issues: 3 },
  { day: "Tue", reviews: 12, issues: 5 },
  { day: "Wed", reviews: 6, issues: 2 },
  { day: "Thu", reviews: 15, issues: 7 },
  { day: "Fri", reviews: 10, issues: 4 },
  { day: "Sat", reviews: 4, issues: 1 },
  { day: "Sun", reviews: 7, issues: 2 },
];

const maxValue = Math.max(...data.map((d) => d.reviews));

export function ReviewChart() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[14px] font-semibold text-foreground">
            Reviews This Week
          </CardTitle>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive/70" />
              Issues
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-end gap-2 h-28">
          {data.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col gap-0.5 justify-end" style={{ height: "88px" }}>
                <div
                  className="w-full rounded-t-sm bg-primary/80 transition-all duration-500"
                  style={{ height: `${(d.reviews / maxValue) * 88}px` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px] text-muted-foreground border-t border-border/50 pt-3">
          <span>Total: <span className="font-semibold text-foreground">62 reviews</span></span>
          <span>Issues: <span className="font-semibold text-destructive">24 found</span></span>
        </div>
      </CardContent>
    </Card>
  );
}
