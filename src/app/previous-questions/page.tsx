import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getQuestionGroups, questionCount } from "@/lib/previous-questions";

export const metadata: Metadata = {
  title: "Previous Questions",
  description:
    "Questions from previous BCS, bank, NTRCA and other government IT job examinations, listed by exam.",
};

export default async function PreviousQuestionsPage() {
  const groups = await getQuestionGroups();
  const paperCount = groups.reduce((sum, group) => sum + group.papers.length, 0);
  const total = groups.reduce(
    (sum, group) => sum + group.papers.reduce((s, paper) => s + questionCount(paper), 0),
    0
  );

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Previous Questions</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {total} questions from {paperCount} exam papers and collections, grouped by exam. MCQ and
        written questions are listed separately; answers are not included.
      </p>

      <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
        {groups.map((group) => {
          const count = group.papers.reduce((sum, paper) => sum + questionCount(paper), 0);
          return (
            <li key={group.slug}>
              <Link
                href={`/previous-questions/${group.slug}`}
                className="group flex h-full flex-col rounded-xl bg-card p-4 ring-1 ring-foreground/10 outline-none transition-shadow hover:shadow-md hover:ring-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {String(group.order).padStart(2, "0")}
                </span>
                <span className="mt-2 font-heading font-semibold leading-snug">{group.title}</span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {group.papers.length} {group.papers.length === 1 ? "paper" : "papers"} · {count}{" "}
                  questions
                </span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                  Open
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
