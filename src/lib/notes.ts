import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { rehypeCodeTabs } from "@/lib/rehype-code-tabs";
import { remarkDefinitionBoxes } from "@/lib/remark-definition-boxes";
import { type NotesHeading, remarkHeadingIds } from "@/lib/remark-heading-ids";
import { rehypeSectionCards, type SectionInfo } from "@/lib/rehype-section-cards";
import { type LibraryId, libraries } from "@/config/libraries";
import { getTopic } from "@/lib/topics";

// Reads and renders a topic's notes: <library content folder>/<category>/<topic>/<language>.md
// (format described in CLAUDE.md, section 7).

export type NotesLanguage = "en" | "bn";

export type TopicNotes = {
  language: NotesLanguage;
  title?: string;
  description: string;
  updated: string;
  headings: NotesHeading[];
  html: string;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Parses the small `key: value` frontmatter block used by notes files. */
function parseFrontmatter(source: string, file: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`${file}: missing frontmatter (--- ... ---) at the top of the file.`);

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator === -1) throw new Error(`${file}: invalid frontmatter line "${line}".`);
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^(["'])(.*)\1$/, "$2");
    fields[key] = value;
  }

  if (!fields.description) throw new Error(`${file}: frontmatter needs a "description".`);
  if (!fields.updated || !DATE.test(fields.updated)) {
    throw new Error(`${file}: frontmatter needs "updated" as YYYY-MM-DD.`);
  }
  return { fields, body: source.slice(match[0].length) };
}

export async function getTopicNotes(
  category: string,
  topic: string,
  language: NotesLanguage = "en",
  library: LibraryId = "topics"
): Promise<TopicNotes | null> {
  "use cache";
  // Content changes only when the site is rebuilt and redeployed.
  cacheLife("max");

  const file = path.join(libraries[library].contentDir, category, topic, `${language}.md`);
  let source: string;
  try {
    source = await readFile(path.join(process.cwd(), file), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }

  const { fields, body } = parseFrontmatter(source, file);
  const headings: NotesHeading[] = [];
  // Number and exam tags of each subtopic card (src/lib/rehype-section-cards.ts).
  const found = await getTopic(category, topic, library);
  const sections: SectionInfo[] = (found?.topic.subtopics ?? []).map((subtopic, index) => ({
    id: subtopic.id,
    number: index + 1,
    exams: subtopic.exams,
  }));

  // Raw HTML in the Markdown is not rendered (remark-rehype drops it by default).
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkHeadingIds, { headings, file })
      .use(remarkDefinitionBoxes)
      .use(remarkRehype)
      .use(rehypeCodeTabs)
      .use(rehypeSectionCards, { sections })
      .use(rehypeStringify)
      .process(body)
  );

  return {
    language,
    title: fields.title,
    description: fields.description,
    updated: fields.updated,
    headings,
    html,
  };
}
