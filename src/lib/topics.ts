import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

import { examTags } from "@/config/exams";
import { type LibraryId, libraries } from "@/config/libraries";

// Topic structure comes from <library content folder>/<category>/category.json, which
// `npm run topics:sync` (TOPICS.md) and `npm run se:sync` (SOFTWARE_ENGINEERING.md) generate.
// Every function takes the library (site section) to read; the default is the Topics section.

export type Subtopic = {
  id: string;
  title: string;
  exams: string[];
  children?: string[];
};

export type Topic = {
  slug: string;
  title: string;
  order: number;
  exams: string[];
  subtopics: Subtopic[];
};

export type Category = {
  slug: string;
  title: string;
  order: number;
  topics: Topic[];
};

/** What the sidebar needs to know about its site section (from src/config/libraries.ts). */
export type SidebarSection = {
  /** URL of the section's index page, for example "/topics". */
  basePath: string;
  title: string;
  /** Show the exam filter and tag items with their exams (data-exams) for it. */
  examFilter: boolean;
};

/** Navigation-only shape sent to the sidebar (keeps the client payload small). */
export type NavCategory = {
  slug: string;
  title: string;
  order: number;
  topics: {
    slug: string;
    title: string;
    order: number;
    exams: string[];
    subtopics: { id: string; title: string; exams: string[] }[];
  }[];
};

export async function getCategories(library: LibraryId = "topics"): Promise<Category[]> {
  "use cache";
  // Content changes only when the site is rebuilt and redeployed.
  cacheLife("max");
  const contentDir = path.join(process.cwd(), libraries[library].contentDir);
  const entries = await readdir(contentDir, { withFileTypes: true });
  const categories = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const file = path.join(contentDir, entry.name, "category.json");
        const data = JSON.parse(await readFile(file, "utf8")) as Omit<Category, "slug">;
        return {
          slug: entry.name,
          title: data.title,
          order: data.order,
          topics: [...data.topics].sort((a, b) => a.order - b.order),
        };
      })
  );
  return categories.sort((a, b) => a.order - b.order);
}

export async function getCategory(
  slug: string,
  library: LibraryId = "topics"
): Promise<Category | undefined> {
  return (await getCategories(library)).find((category) => category.slug === slug);
}

export async function getTopic(categorySlug: string, topicSlug: string, library: LibraryId = "topics") {
  const categories = await getCategories(library);
  const all = categories.flatMap((category) =>
    category.topics.map((topic) => ({ category, topic }))
  );
  const index = all.findIndex(
    ({ category, topic }) => category.slug === categorySlug && topic.slug === topicSlug
  );
  if (index === -1) return undefined;
  return { ...all[index], previous: all[index - 1], next: all[index + 1] };
}

export function toNavCategories(categories: Category[]): NavCategory[] {
  return categories.map((category) => ({
    slug: category.slug,
    title: category.title,
    order: category.order,
    topics: category.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      order: topic.order,
      exams: topic.exams,
      subtopics: topic.subtopics.map(({ id, title, exams }) => ({ id, title, exams })),
    })),
  }));
}

/** All exam tags used anywhere in a category, in a stable order. */
export function categoryExams(category: Category): string[] {
  const tags = new Set(category.topics.flatMap((topic) => topic.exams));
  return Object.keys(examTags).filter((tag) => tags.has(tag));
}

/** Numbers for the home page: all topics, and those whose English notes (en.md) exist. */
export async function getLibraryStats(library: LibraryId = "topics") {
  "use cache";
  cacheLife("max");
  const categories = await getCategories(library);
  const topics = categories.flatMap((category) =>
    category.topics.map((topic) =>
      path.join(process.cwd(), libraries[library].contentDir, category.slug, topic.slug, "en.md")
    )
  );
  const written = await Promise.all(
    topics.map((file) =>
      access(file).then(
        () => true,
        () => false
      )
    )
  );
  return {
    categories: categories.length,
    topics: topics.length,
    topicsWithNotes: written.filter(Boolean).length,
  };
}
