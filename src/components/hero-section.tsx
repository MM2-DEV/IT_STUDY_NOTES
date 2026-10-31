import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { DotBackground } from "@/components/dot-background";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig, siteSections } from "@/config/site";

export function HeroSection() {
  const primarySection = siteSections.find((section) => section.available);

  return (
    <section className="relative isolate border-b border-border/60">
      <DotBackground />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          <span className="shiny-text">{siteConfig.tagline}</span>
        </span>

        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          <span className="bg-linear-to-r from-(--title-from) via-(--title-via) to-(--title-to) bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {siteConfig.description}
        </p>

        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Examinations covered">
          {siteConfig.exams.map((exam) => (
            <li key={exam}>
              <Badge variant="outline" className="h-6 bg-background/70 px-2.5 backdrop-blur-sm">
                {exam}
              </Badge>
            </li>
          ))}
        </ul>

        {primarySection && (
          <Link
            href={primarySection.href}
            className={buttonVariants({ size: "lg", className: "mt-8 h-10 px-5 shadow-md shadow-primary/20" })}
          >
            Browse {primarySection.title.toLowerCase()}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
