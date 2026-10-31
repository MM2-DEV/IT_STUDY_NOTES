import { GraduationCap } from "lucide-react";

import { BrandLine } from "@/components/brand-line";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-linear-to-r from-(--chrome-from) via-(--chrome-via) to-(--chrome-to) text-(--chrome-fg)">
      <BrandLine />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="flex items-center gap-2 font-heading text-base font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-(--chrome-fg)/15 text-(--chrome-accent)">
              <GraduationCap className="size-4" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-(--chrome-muted)">
            {siteConfig.description}
          </p>
        </div>

        <div className="sm:justify-self-end">
          <p className="text-xs font-semibold tracking-wider uppercase">
            Examinations covered
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-(--chrome-muted)">
            {siteConfig.exams.map((exam) => (
              <li key={exam} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-(--chrome-accent)" />
                {exam}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-(--chrome-fg)/15">
        <p className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-(--chrome-muted) sm:px-6">
          {siteConfig.footerNote}
        </p>
      </div>
    </footer>
  );
}
