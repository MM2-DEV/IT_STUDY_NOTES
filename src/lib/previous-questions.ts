import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

// Previous questions come from content/previous-questions.json, which
// `npm run questions:sync` generates from PREVIOUS_QUESTIONS.md.

export type Question = {
  number: string;
  text: string;
  options: string[];
  marks: number | null;
  /** An alternative ("Or") to the question before it. */
  or: boolean;
  /** Exam tags of a question from a topic-wise collection. */
  tags: string[];
  /** Other exams in which the same question was asked. */
  alsoIn: string[];
  note: string | null;
};

export type Paper = {
  slug: string;
  title: string;
  order: number;
  organization: string | null;
  post: string | null;
  date: string | null;
  source: string | null;
  /** "paper" = one exam paper; "collection" = topic-wise questions tagged with their exams. */
  kind: string;
  mcq: Question[];
  written: Question[];
};

export type QuestionGroup = {
  slug: string;
  title: string;
  order: number;
  papers: Paper[];
};

/** Navigation-only shape sent to the sidebar. */
export type NavQuestionGroup = {
  slug: string;
  title: string;
  papers: { slug: string; title: string; count: number }[];
};

const dataFile = path.join(process.cwd(), "content", "previous-questions.json");

export async function getQuestionGroups(): Promise<QuestionGroup[]> {
  "use cache";
  // Content changes only when the site is rebuilt and redeployed.
  cacheLife("max");
  const data = JSON.parse(await readFile(dataFile, "utf8")) as { groups: QuestionGroup[] };
  return [...data.groups]
    .sort((a, b) => a.order - b.order)
    .map((group) => ({ ...group, papers: [...group.papers].sort((a, b) => a.order - b.order) }));
}

export const questionCount = (paper: Paper) => paper.mcq.length + paper.written.length;

export function toNavQuestionGroups(groups: QuestionGroup[]): NavQuestionGroup[] {
  return groups.map((group) => ({
    slug: group.slug,
    title: group.title,
    papers: group.papers.map((paper) => ({
      slug: paper.slug,
      title: paper.title,
      count: questionCount(paper),
    })),
  }));
}

export async function getQuestionGroup(slug: string) {
  return (await getQuestionGroups()).find((group) => group.slug === slug);
}

export async function getPaper(groupSlug: string, paperSlug: string) {
  const groups = await getQuestionGroups();
  const all = groups.flatMap((group) => group.papers.map((paper) => ({ group, paper })));
  const index = all.findIndex(
    ({ group, paper }) => group.slug === groupSlug && paper.slug === paperSlug
  );
  if (index === -1) return undefined;
  return {
    ...all[index],
    previous: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}
