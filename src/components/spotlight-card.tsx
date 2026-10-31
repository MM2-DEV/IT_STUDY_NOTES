"use client";

import { useRef } from "react";
import { cn } from "cn";

/** Wraps content with a soft highlight that follows the pointer. */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("group/spot relative h-full rounded-xl", className)}
    >
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 bg-[radial-gradient(320px_circle_at_var(--spot-x)_var(--spot-y),var(--spotlight),transparent_70%)]"
      />
    </div>
  );
}
