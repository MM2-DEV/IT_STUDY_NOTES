#!/usr/bin/env node
// Generates <content folder>/<category>/category.json from a topic list.
//
// The topic lists are planning documents; the website never reads them. This
// script copies their structure (categories, topics, subtopics, exam tags) into
// a content folder, which is what the website reads. It only writes
// category.json files and never touches topic notes (en.md / bn.md).
//
// Usage:
//   npm run topics:sync   TOPICS.md               → content/
//   npm run se:sync       SOFTWARE_ENGINEERING.md → content-software-engineering/
// (node scripts/sync-topics.mjs [source.md] [content folder])

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const [sourceName = "TOPICS.md", contentName = "content"] = process.argv.slice(2);
const topicsFile = path.join(root, sourceName);
const contentDir = path.join(root, contentName);

const CATEGORY = /^## (\d+)\. (.+?) — `([a-z0-9-]+)`$/;
// Exam tags after the topic title are optional (SOFTWARE_ENGINEERING.md has none).
const TOPIC = /^### (\d+)\.(\d+) (.+?)(?: — (`.+`))?$/;
const SLUG = /^\*\*Slug:\*\* `([a-z0-9-]+)`/;
const ITEM = /^( *)- (.+)$/;

function parseTags(text) {
  return [...text.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
}

/** Splits "Title (see note N2) — `A` `B`" into a clean title and its tags. */
function parseItem(text) {
  const [label, tags] = text.split(" — ");
  const title = label.replace(/\s*\(see note N\d+\)/g, "").trim();
  return { title, exams: tags ? parseTags(tags) : [] };
}

function toId(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function uniqueId(base, used) {
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}

function parse(markdown) {
  const categories = [];
  let category = null;
  let topic = null;

  for (const line of markdown.split("\n")) {
    if (line.startsWith("## ")) {
      const match = line.match(CATEGORY);
      category = match
        ? { folder: match[3], title: match[2], order: Number(match[1]), topics: [] }
        : null;
      if (category) categories.push(category);
      topic = null;
      continue;
    }
    if (!category) continue;

    const topicMatch = line.match(TOPIC);
    if (topicMatch) {
      topic = {
        slug: null,
        title: topicMatch[3],
        order: Number(topicMatch[2]),
        exams: parseTags(topicMatch[4] ?? ""),
        subtopics: [],
        usedIds: new Set(),
      };
      category.topics.push(topic);
      continue;
    }
    if (!topic) continue;

    const slugMatch = line.match(SLUG);
    if (slugMatch) {
      topic.slug = slugMatch[1];
      continue;
    }

    const itemMatch = line.match(ITEM);
    if (!itemMatch || itemMatch[2].startsWith("See note")) continue;
    const { title, exams } = parseItem(itemMatch[2]);
    if (itemMatch[1].length === 0) {
      topic.subtopics.push({
        id: uniqueId(toId(title), topic.usedIds),
        title,
        // Untagged subtopics belong to the same exams as their topic.
        exams: exams.length > 0 ? exams : topic.exams,
        children: [],
      });
    } else {
      const parent = topic.subtopics.at(-1);
      if (parent) parent.children.push(title);
    }
  }
  return categories;
}

function validate(categories) {
  const problems = [];
  for (const category of categories) {
    const slugs = new Set();
    for (const topic of category.topics) {
      if (!topic.slug) problems.push(`${category.order}.${topic.order} ${topic.title}: missing slug`);
      else if (slugs.has(topic.slug)) problems.push(`${category.folder}: duplicate slug ${topic.slug}`);
      slugs.add(topic.slug);
    }
  }
  if (problems.length > 0) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
}

const categories = parse(await readFile(topicsFile, "utf8"));
validate(categories);

let topicCount = 0;
let subtopicCount = 0;
for (const category of categories) {
  const data = {
    title: category.title,
    order: category.order,
    topics: category.topics.map(({ slug, title, order, exams, subtopics }) => {
      topicCount += 1;
      subtopicCount += subtopics.length;
      return {
        slug,
        title,
        order,
        exams,
        subtopics: subtopics.map(({ id, title, exams, children }) => ({
          id,
          title,
          exams,
          ...(children.length > 0 ? { children } : {}),
        })),
      };
    }),
  };
  const dir = path.join(contentDir, category.folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "category.json"), `${JSON.stringify(data, null, 2)}\n`);
}

console.log(
  `Synced ${categories.length} categories, ${topicCount} topics and ${subtopicCount} subtopics from ${sourceName} into ${contentName}/.`
);
