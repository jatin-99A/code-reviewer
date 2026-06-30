import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-shimmer",
        "before:bg-linear-to-r before:from-transparent before:via-white/80 before:to-transparent",
        "dark:before:via-white/30",
        className
      )}
      {...props}
    />
  );
}
