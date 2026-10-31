import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ExamBadges } from "@/components/topics/exam-badges";
import { CategoryIcon } from "@/components/category-icon";
import { categoryExams, getCategories } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Topics",
  description: "All study note categories and topics, organized by subject.",
};

export default async function TopicsPage() {
  const categories = await getCategories();
  const topicCount = categories.reduce((sum, category) => sum + category.topics.length, 0);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">Topics</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {categories.length} categories and {topicCount} topics. Choose a category, or use the
        sidebar to jump straight to a topic or subtopic.
      </p>

      <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/topics/${category.slug}`}
              className="group flex h-full flex-col rounded-xl bg-card p-4 ring-1 ring-foreground/10 outline-none transition-shadow hover:shadow-md hover:ring-primary/30 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <CategoryIcon slug={category.slug} className="size-5" />
                </span>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {String(category.order).padStart(2, "0")}
                </span>
              </span>
              <span className="mt-3 font-heading font-semibold leading-snug">{category.title}</span>
              <span className="mt-1 text-sm text-muted-foreground">
                {category.topics.length} {category.topics.length === 1 ? "topic" : "topics"}
              </span>
              <ExamBadges exams={categoryExams(category)} className="mt-3 flex flex-wrap gap-1.5" />
              <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                Open
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
