import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { BorderBeams } from "@/components/border-beam";
import { DotBackground } from "@/components/dot-background";
import { buttonVariants } from "@/components/ui/button";
import { libraries } from "@/config/libraries";
import { siteConfig } from "@/config/site";
import { getQuestionGroups, questionCount } from "@/lib/previous-questions";
import { getLibraryStats } from "@/lib/topics";

const number = new Intl.NumberFormat("en-US");

/** Home page hero: what the site covers, live counts from the content, and the two paths. */
export async function HeroSection() {
  const [topics, softwareEngineering, groups] = await Promise.all([
    getLibraryStats("topics"),
    getLibraryStats("software-engineering"),
    getQuestionGroups(),
  ]);
  const papers = groups.flatMap((group) => group.papers);
  const questions = papers.reduce((sum, paper) => sum + questionCount(paper), 0);

  const stats = [
    {
      value: topics.topicsWithNotes,
      label: "Exam topics with notes",
      detail: `of ${topics.topics} in ${topics.categories} subjects`,
    },
    {
      value: questions,
      label: "Previous questions",
      detail: `from ${papers.length} papers and collections`,
    },
    {
      value: softwareEngineering.topics,
      label: "Software engineering topics",
      detail:
        softwareEngineering.topicsWithNotes < softwareEngineering.topics
          ? `${softwareEngineering.topicsWithNotes} written; notes in progress`
          : `in ${softwareEngineering.categories} categories`,
    },
    {
      value: siteConfig.exams.length,
      label: "Examinations covered",
      detail: "NTRCA, PSC IT, Assistant Programmer and Bank IT",
    },
  ];

  return (
    <section className="relative isolate">
      {/* Glows only: the home page's dotted background is drawn behind the whole page. */}
      <DotBackground dots={false} />
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 text-center sm:px-6 sm:pt-24 sm:pb-14 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          <span className="shiny-text">{siteConfig.tagline}</span>
        </span>

        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          <span className="bg-linear-to-r from-(--title-from) via-(--title-via) to-(--title-to) bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Exam-oriented notes and previous questions for Bangladesh government and bank IT job
          examinations, and a hands-on, interview-focused software
          engineering path from HTML to cloud deployment and AI-assisted development.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={libraries.topics.basePath}
            className={buttonVariants({ size: "lg", className: "h-10 px-5 shadow-md shadow-primary/20" })}
          >
            Govt IT topics
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
          <Link
            href={libraries["software-engineering"].basePath}
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className:
                "h-10 bg-card px-5 text-primary ring-1 ring-primary/40 hover:bg-(--card-tint) hover:ring-primary/60",
            })}
          >
            Software engineering
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </div>

        <ul
          aria-label="Site in numbers"
          className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 text-left lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <li
              key={stat.label}
              className="relative rounded-xl border border-border/70 bg-card px-3 py-3 sm:px-4"
            >
              <p className="font-heading text-2xl font-semibold tabular-nums text-primary">
                {number.format(stat.value)}
              </p>
              <p className="mt-0.5 text-sm font-medium">{stat.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{stat.detail}</p>
              <BorderBeams offset={index * 1.1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
