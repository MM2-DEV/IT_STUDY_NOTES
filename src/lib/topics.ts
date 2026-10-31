import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

import { examTags } from "@/config/exams";

// Topic structure comes from content/<category>/category.json, which
// `npm run topics:sync` generates from TOPICS.md.

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

/** Navigation-only shape sent to the sidebar (keeps the client payload small). */
export type NavCategory = {
  slug: string;
  title: string;
  topics: {
    slug: string;
    title: string;
    exams: string[];
    subtopics: { id: string; title: string; exams: string[] }[];
  }[];
};

const contentDir = path.join(process.cwd(), "content");

export async function getCategories(): Promise<Category[]> {
  "use cache";
  // Content changes only when the site is rebuilt and redeployed.
  cacheLife("max");
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

export async function getCategory(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((category) => category.slug === slug);
}

export async function getTopic(categorySlug: string, topicSlug: string) {
  const categories = await getCategories();
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
    topics: category.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
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
