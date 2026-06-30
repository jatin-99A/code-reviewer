import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/features/common/skeleton";

function AppStatusCardSkeleton() {
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* App Icon */}
          <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />

          {/* Title & Subtitle */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>

            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-36 rounded-md" />
          </div>
        </div>

        <Separator className="my-4 opacity-50" />

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AppStatusCardSkeleton;