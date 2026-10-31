import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { BrandLine } from "@/components/brand-line";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-(--chrome-from) via-(--chrome-via) to-(--chrome-to) text-(--chrome-fg) shadow-sm">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md font-heading text-base font-semibold outline-none focus-visible:ring-3 focus-visible:ring-(--chrome-fg)/50"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-(--chrome-fg)/15 text-(--chrome-accent)">
            <GraduationCap className="size-4" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>
        <ThemeToggle className="text-(--chrome-fg) hover:bg-(--chrome-fg)/15 hover:text-(--chrome-fg) aria-expanded:bg-(--chrome-fg)/15 aria-expanded:text-(--chrome-fg) focus-visible:ring-(--chrome-fg)/50" />
      </div>
      <BrandLine />
    </header>
  );
}
