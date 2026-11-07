import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/topics/breadcrumbs";
import { getQuestionGroup, getQuestionGroups } from "@/lib/previous-questions";

export async function generateStaticParams() {
  return (await getQuestionGroups()).map((group) => ({ group: group.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/previous-questions/[group]">): Promise<Metadata> {
  const group = await getQuestionGroup((await params).group);
  if (!group) return {};
  return {
    title: `${group.title} — Previous Questions`,
    description: `Previous ${group.title} questions for Bangladesh government IT job examinations.`,
  };
}

export default async function QuestionGroupPage({ params }: PageProps<"/previous-questions/[group]">) {
  const group = await getQuestionGroup((await params).group);
  if (!group) notFound();

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[{ label: "Previous Questions", href: "/previous-questions" }, { label: group.title }]}
        />
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">{group.title}</h1>

        <ul className="mt-8 space-y-3">
          {group.papers.map((paper) => (
            <li key={paper.slug}>
              <Link
                href={`/previous-questions/${group.slug}/${paper.slug}`}
                className="flex flex-col gap-1 rounded-xl bg-card p-4 ring-1 ring-foreground/10 outline-none hover:bg-(--card-tint) focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-medium">{paper.title}</span>
                  {(paper.post || paper.date) && (
                    <span className="block text-sm text-muted-foreground">
                      {[paper.post, paper.date].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {paper.mcq.length > 0 && `${paper.mcq.length} MCQ`}
                  {paper.mcq.length > 0 && paper.written.length > 0 && " · "}
                  {paper.written.length > 0 && `${paper.written.length} written`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
