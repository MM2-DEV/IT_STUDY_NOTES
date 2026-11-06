import { cn } from "cn";

/**
 * Two soft colour glows, with a dotted pattern behind them unless `dots` is false (the home
 * page draws its dots once, behind the whole page). Fills its positioned parent.
 */
export function DotBackground({ className, dots = true }: { className?: string; dots?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {dots && (
        <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_75%_65%_at_50%_40%,black_35%,transparent_100%)]" />
      )}
      <div className="absolute -top-32 left-[8%] size-104 rounded-full bg-(--glow-1) blur-3xl" />
      <div className="absolute -top-20 right-[6%] size-96 rounded-full bg-(--glow-2) blur-3xl" />
    </div>
  );
}
