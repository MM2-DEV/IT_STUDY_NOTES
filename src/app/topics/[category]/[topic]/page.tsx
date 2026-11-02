import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/topics/breadcrumbs";
import { ExamBadges } from "@/components/topics/exam-badges";
import { TopicNotesView } from "@/components/topics/topic-notes";
import { TopicOutline } from "@/components/topics/topic-outline";
import { getTopicNotes } from "@/lib/notes";
import { getCategories, getTopic, type Topic } from "@/lib/topics";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.flatMap((category) =>
    category.topics.map((topic) => ({ category: category.slug, topic: topic.slug }))
  );
}

/** Section IDs a topic's notes may use: its subtopics, plus the closing References section. */
function allowedSectionIds(topic: Topic) {
  return new Set([...topic.subtopics.map((s) => s.id), "references"]);
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/[category]/[topic]">): Promise<Metadata> {
  const { category, topic } = await params;
  const found = await getTopic(category, topic);
  if (!found) return {};
  const notes = await getTopicNotes(category, topic);
  return {
    title: `${found.topic.title} — ${found.category.title}`,
    description:
      notes?.description ??
      `${found.topic.title} (${found.category.title}): study notes for Bangladesh government IT job examinations.`,
  };
}

export default async function TopicPage({ params }: PageProps<"/topics/[category]/[topic]">) {
  const { category: categorySlug, topic: topicSlug } = await params;
  const found = await getTopic(categorySlug, topicSlug);
  if (!found) notFound();
  const { category, topic, previous, next } = found;
  const notes = await getTopicNotes(category.slug, topic.slug);

  if (notes) {
    // Every section must match a subtopic, so the sidebar's subtopic links always land somewhere.
    const allowed = allowedSectionIds(topic);
    const unknown = notes.headings.filter((heading) => !allowed.has(heading.id));
    if (unknown.length > 0) {
      throw new Error(
        `content/${category.slug}/${topic.slug}/en.md: section IDs not in category.json: ${unknown.map((h) => h.id).join(", ")}`
      );
    }
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <article className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Topics", href: "/topics" },
            { label: category.title, href: `/topics/${category.slug}` },
            { label: topic.title },
          ]}
        />

        <header className="mt-4">
          <p className="text-sm font-medium tabular-nums text-muted-foreground">
            {category.order}.{topic.order}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-balance">
            {topic.title}
          </h1>
          {/* Topic summary: exam tags, description and update date in a soft dashed card. */}
          <div className="mt-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 sm:p-5">
            <ExamBadges exams={topic.exams} className="flex flex-wrap gap-1.5" />
            {notes && (
              <>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{notes.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Last updated <time dateTime={notes.updated}>{notes.updated}</time>
                </p>
              </>
            )}
          </div>
        </header>

        {notes ? <TopicNotesView notes={notes} /> : <TopicOutline subtopics={topic.subtopics} />}

        <nav
          aria-label="Previous and next topics"
          className="mt-12 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/topics/${previous.category.slug}/${previous.topic.slug}`}
              className="group rounded-xl p-3 ring-1 ring-foreground/10 outline-none hover:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="mt-1 block font-medium">{previous.topic.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/topics/${next.category.slug}/${next.topic.slug}`}
              className="group rounded-xl p-3 text-right ring-1 ring-foreground/10 outline-none hover:bg-accent/60 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block font-medium">{next.topic.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
