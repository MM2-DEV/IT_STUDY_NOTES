import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { Breadcrumbs } from "@/components/topics/breadcrumbs";
import { DesktopSidebar } from "@/components/topics/desktop-sidebar";
import { ExamBadges } from "@/components/topics/exam-badges";
import { ExamFilterUrlSync } from "@/components/topics/exam-filter-url";
import { MobileTopicsNav } from "@/components/topics/mobile-topics-nav";
import { TopicNotesView } from "@/components/topics/topic-notes";
import { TopicOutline } from "@/components/topics/topic-outline";
import { type LibraryId, libraries } from "@/config/libraries";
import { getTopicNotes } from "@/lib/notes";
import {
  categoryExams,
  getCategories,
  getCategory,
  getTopic,
  type SidebarSection,
  type Topic,
  toNavCategories,
} from "@/lib/topics";

// The pages of a note library (a site section such as Topics or Software Engineering; see
// src/config/libraries.ts). The route files in src/app/<section>/ only pass their library ID.

const sidebarSection = (library: LibraryId): SidebarSection => ({
  basePath: libraries[library].basePath,
  title: libraries[library].title,
  examFilter: libraries[library].examTags,
});

const count = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/* ---------- Layout: sidebar and content ---------- */

export async function LibraryLayout({
  library,
  children,
}: {
  library: LibraryId;
  children: React.ReactNode;
}) {
  const categories = toNavCategories(await getCategories(library));
  const section = sidebarSection(library);

  return (
    <div className="flex w-full flex-1">
      {section.examFilter && <ExamFilterUrlSync />}
      <DesktopSidebar categories={categories} section={section} />

      <div className="min-w-0 flex-1">
        <div className="sticky top-(--header-height) z-30 border-b border-border/70 bg-background/90 px-4 py-2 backdrop-blur-md sm:px-6 lg:hidden">
          <MobileTopicsNav categories={categories} section={section} />
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Index page: all categories ---------- */

export function libraryIndexMetadata(library: LibraryId): Metadata {
  const { title, description } = libraries[library];
  return { title, description };
}

export async function LibraryIndexPage({ library }: { library: LibraryId }) {
  const config = libraries[library];
  const categories = await getCategories(library);
  const topicCount = categories.reduce((sum, category) => sum + category.topics.length, 0);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{config.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {count(categories.length, "category", "categories")} and{" "}
        {count(topicCount, "topic")}. {config.intro}
      </p>

      <ul className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`${config.basePath}/${category.slug}`}
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
                {count(category.topics.length, "topic")}
              </span>
              {config.examTags && (
                <ExamBadges exams={categoryExams(category)} className="mt-3 flex flex-wrap gap-1.5" />
              )}
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

/* ---------- Category page: its topics ---------- */

export async function libraryCategoryParams(library: LibraryId) {
  const categories = await getCategories(library);
  return categories.map((category) => ({ category: category.slug }));
}

export async function libraryCategoryMetadata(
  library: LibraryId,
  categorySlug: string
): Promise<Metadata> {
  const category = await getCategory(categorySlug, library);
  if (!category) return {};
  const topics = count(category.topics.length, "topic");
  return {
    // Topics keeps its plain category titles; other sections name themselves too.
    title: library === "topics" ? category.title : `${category.title} — ${libraries[library].title}`,
    description: libraries[library].examTags
      ? `${category.title}: ${topics} for Bangladesh government IT job examinations.`
      : `${category.title}: ${topics} of hands-on notes with interview questions.`,
  };
}

export async function LibraryCategoryPage({
  library,
  categorySlug,
}: {
  library: LibraryId;
  categorySlug: string;
}) {
  const config = libraries[library];
  const category = await getCategory(categorySlug, library);
  if (!category) notFound();

  return (
    <main className="max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <Breadcrumbs items={[{ label: config.title, href: config.basePath }, { label: category.title }]} />
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">{category.title}</h1>
      <p className="mt-2 text-muted-foreground">{count(category.topics.length, "topic")}</p>

      <ol className="mt-8 divide-y divide-border/70 rounded-xl bg-card ring-1 ring-foreground/10">
        {category.topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`${config.basePath}/${category.slug}/${topic.slug}`}
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
                    : count(topic.subtopics.length, "subtopic")}
                </span>
              </span>
              {config.examTags && <ExamBadges exams={topic.exams} />}
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}

/* ---------- Topic page: notes, or the outline until notes are written ---------- */

export async function libraryTopicParams(library: LibraryId) {
  const categories = await getCategories(library);
  return categories.flatMap((category) =>
    category.topics.map((topic) => ({ category: category.slug, topic: topic.slug }))
  );
}

/** Section IDs a topic's notes may use: its subtopics, plus the library's closing sections. */
function allowedSectionIds(library: LibraryId, topic: Topic) {
  return new Set([...topic.subtopics.map((s) => s.id), ...libraries[library].extraSections]);
}

export async function libraryTopicMetadata(
  library: LibraryId,
  categorySlug: string,
  topicSlug: string
): Promise<Metadata> {
  const found = await getTopic(categorySlug, topicSlug, library);
  if (!found) return {};
  const notes = await getTopicNotes(categorySlug, topicSlug, "en", library);
  const fallback = libraries[library].examTags
    ? "study notes for Bangladesh government IT job examinations."
    : "hands-on notes with interview questions.";
  return {
    title: `${found.topic.title} — ${found.category.title}`,
    description: notes?.description ?? `${found.topic.title} (${found.category.title}): ${fallback}`,
  };
}

export async function LibraryTopicPage({
  library,
  categorySlug,
  topicSlug,
}: {
  library: LibraryId;
  categorySlug: string;
  topicSlug: string;
}) {
  const config = libraries[library];
  const found = await getTopic(categorySlug, topicSlug, library);
  if (!found) notFound();
  const { category, topic, previous, next } = found;
  const notes = await getTopicNotes(category.slug, topic.slug, "en", library);

  if (notes) {
    // Every section must match a subtopic, so the sidebar's subtopic links always land somewhere.
    const allowed = allowedSectionIds(library, topic);
    const unknown = notes.headings.filter((heading) => !allowed.has(heading.id));
    if (unknown.length > 0) {
      throw new Error(
        `${config.contentDir}/${category.slug}/${topic.slug}/en.md: section IDs not in category.json: ${unknown.map((h) => h.id).join(", ")}`
      );
    }
  }

  const topicHref = (entry: NonNullable<typeof previous>) =>
    `${config.basePath}/${entry.category.slug}/${entry.topic.slug}`;
  const showTopicExams = config.examTags && (!notes || topic.subtopics.length === 0);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <article className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: config.title, href: config.basePath },
            { label: category.title, href: `${config.basePath}/${category.slug}` },
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
          {/* Topic summary: description and update date in a soft dashed card. When the notes are
              divided into subtopics, each subtopic card shows its own exam tags instead
              (src/lib/rehype-section-cards.ts); otherwise the topic's tags are shown here. */}
          {(showTopicExams || notes) && (
            <div className="mt-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 sm:p-5">
              {showTopicExams && (
                <ExamBadges exams={topic.exams} className="mb-3 flex flex-wrap gap-1.5" />
              )}
              {notes && (
                <>
                  <p className="text-lg leading-relaxed text-muted-foreground">{notes.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Last updated <time dateTime={notes.updated}>{notes.updated}</time>
                  </p>
                </>
              )}
            </div>
          )}
        </header>

        {notes ? <TopicNotesView notes={notes} /> : <TopicOutline subtopics={topic.subtopics} />}

        <nav
          aria-label="Previous and next topics"
          className="mt-12 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={topicHref(previous)}
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
              href={topicHref(next)}
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
