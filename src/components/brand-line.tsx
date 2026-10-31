import { cn } from "cn";

/** Thin gradient rule in the brand palette (lilac → teal → olive). */
export function BrandLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full bg-linear-to-r from-(--brand-lilac) via-(--brand-teal) to-(--brand-olive)",
        className
      )}
    />
  );
}
