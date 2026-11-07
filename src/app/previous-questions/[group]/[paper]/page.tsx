import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { QuestionList } from "@/components/previous-questions/question-list";
import { Breadcrumbs } from "@/components/topics/breadcrumbs";
import { getPaper, getQuestionGroups } from "@/lib/previous-questions";

export async function generateStaticParams() {
  return (await getQuestionGroups()).flatMap((group) =>
    group.papers.map((paper) => ({ group: group.slug, paper: paper.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/previous-questions/[group]/[paper]">): Promise<Metadata> {
  const { group, paper } = await params;
  const found = await getPaper(group, paper);
  if (!found) return {};
  return {
    title: `${found.paper.title} — Previous Questions`,
    description: `${found.paper.title}: previous questions (${found.group.title}).`,
  };
}

export default async function PaperPage({ params }: PageProps<"/previous-questions/[group]/[paper]">) {
  const { group: groupSlug, paper: paperSlug } = await params;
  const found = await getPaper(groupSlug, paperSlug);
  if (!found) notFound();
  const { group, paper, previous, next } = found;
  const details = [
    ["Organization", paper.organization],
    ["Post", paper.post],
    ["Date", paper.date],
    ["Source", paper.source],
  ].filter(([, value]) => value) as [string, string][];

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <article className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Previous Questions", href: "/previous-questions" },
            { label: group.title, href: `/previous-questions/${group.slug}` },
            { label: paper.title },
          ]}
        />

        <header className="mt-4">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance">{paper.title}</h1>
          {details.length > 0 && (
            <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
              {details.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="font-medium text-muted-foreground">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-3 text-sm text-muted-foreground">
            {paper.kind === "collection"
              ? "Topic-wise collection: each question shows the exams in which it was asked."
              : "Answers are not included."}
          </p>
        </header>

        <QuestionList mcq={paper.mcq} written={paper.written} />

        <nav
          aria-label="Previous and next papers"
          className="mt-12 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/previous-questions/${previous.group.slug}/${previous.paper.slug}`}
              className="rounded-xl bg-card p-3 ring-1 ring-foreground/10 outline-none hover:bg-(--card-tint) focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="mt-1 block font-medium">{previous.paper.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/previous-questions/${next.group.slug}/${next.paper.slug}`}
              className="rounded-xl bg-card p-3 text-right ring-1 ring-foreground/10 outline-none hover:bg-(--card-tint) focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block font-medium">{next.paper.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
