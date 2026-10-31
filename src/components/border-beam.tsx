import { cn } from "cn";

/**
 * A short gradient that travels around the border of its parent.
 * The parent must be positioned (`relative`) and rounded.
 * Colours default to the theme's beam variables (see globals.css).
 */
export function BorderBeam({
  size = 160,
  duration = 8,
  delay = 0,
  width = 2,
  colorFrom = "var(--beam-1-from)",
  colorTo = "var(--beam-1-to)",
  className,
}: {
  size?: number;
  duration?: number;
  delay?: number;
  width?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("border-beam", className)}
      style={
        {
          "--beam-size": `${size}px`,
          "--beam-duration": `${duration}s`,
          "--beam-delay": `${-delay}s`,
          "--beam-width": `${width}px`,
          "--beam-from": colorFrom,
          "--beam-to": colorTo,
        } as React.CSSProperties
      }
    />
  );
}
