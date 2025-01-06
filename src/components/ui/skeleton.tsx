import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-neutral-200 after:absolute after:-left-full after:h-full after:w-full after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:duration-1000 dark:bg-white/5 dark:after:via-neutral-400/10",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
