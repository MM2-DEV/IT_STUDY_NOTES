import { Compass } from "lucide-react";

import { ExploreFlow, type CategoryInfo } from "@/components/explore/explore-flow";
import { ExploreTreeList } from "@/components/explore/explore-tree-list";
import { HeroSection } from "@/components/hero-section";
import { getCategories } from "@/lib/topics";

export default async function Home() {
  // Titles and topic counts of the Software Engineering categories shown on the Explore cards.
  const categories: CategoryInfo = Object.fromEntries(
    (await getCategories("software-engineering")).map((category) => [
      category.slug,
      { title: category.title, topics: category.topics.length },
    ])
  );

  return (
    <main className="relative isolate flex-1 overflow-x-clip">
      {/* The dotted background comes from the root layout (src/app/layout.tsx). */}
      <HeroSection />

      <section
        aria-labelledby="sections-heading"
        className="relative isolate mx-auto w-full max-w-7xl px-4 pt-6 pb-16 sm:px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000"
      >
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-(--card-tint) px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            <Compass className="size-3.5" aria-hidden="true" />
            Explore
          </span>
          <h2
            id="sections-heading"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Choose your path
          </h2>
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground">
            Two paths from the same <span className="font-medium text-foreground">CSE core</span>:
            prepare for <span className="font-medium text-foreground">government IT examinations</span>,
            or build job-ready{" "}
            <span className="font-medium text-foreground">software engineering</span> skills.
          </p>
          {/* A short divider in the brand colours, like the header's brand line. */}
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-linear-to-r from-(--brand-lilac) via-(--brand-teal) to-(--brand-olive)"
          />
        </header>

        {/* The tree sits on the page's dots, with two soft glows behind it (like the hero). */}
        <div className="relative isolate mt-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-1/4 -left-24 size-96 rounded-full bg-(--glow-1) blur-3xl" />
            <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-(--glow-2) blur-3xl" />
          </div>
          <div className="hidden xl:block">
            <ExploreFlow categories={categories} />
          </div>
          <div className="mx-auto max-w-2xl xl:hidden">
            <ExploreTreeList categories={categories} />
          </div>
        </div>
      </section>
    </main>
  );
}
