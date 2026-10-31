import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/topics/breadcrumbs";
import { ExamBadges } from "@/components/topics/exam-badges";
import { getCategories, getCategory } from "@/lib/topics";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/[category]">): Promise<Metadata> {
  const category = await getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.title}: ${category.topics.length} topics for Bangladesh government IT job examinations.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/topics/[category]">) {
  const category = await getCategory((await params).category);
  if (!category) notFound();

  return (
    <main className="max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Breadcrumbs items={[{ label: "Topics", href: "/topics" }, { label: category.title }]} />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">{category.title}</h1>
      <p className="mt-2 text-muted-foreground">
        {category.topics.length} {category.topics.length === 1 ? "topic" : "topics"}
      </p>

      <ol className="mt-8 divide-y divide-border/70 rounded-xl bg-card ring-1 ring-foreground/10">
        {category.topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topics/${category.slug}/${topic.slug}`}
              className="flex flex-col gap-2 p-4 outline-none transition-colors hover:bg-accent/60 focus-visible:bg-accent sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="w-12 shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
                {category.order}.{topic.order}
              </span>
              <span className="flex-1">
                <span className="font-medium">{topic.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {topic.subtopics.length === 0
                    ? "No subtopics listed"
                    : `${topic.subtopics.length} ${topic.subtopics.length === 1 ? "subtopic" : "subtopics"}`}
                </span>
              </span>
              <ExamBadges exams={topic.exams} />
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
