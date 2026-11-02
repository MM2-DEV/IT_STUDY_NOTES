#!/usr/bin/env node
// Generates content/previous-questions.json from PREVIOUS_QUESTIONS.md.
//
// PREVIOUS_QUESTIONS.md is the single source of the Previous Questions section;
// the website never reads it directly. This script parses its groups, papers and
// questions and writes the JSON file the website reads.
//
// Usage: npm run questions:sync

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceFile = path.join(root, "PREVIOUS_QUESTIONS.md");
const outputFile = path.join(root, "content", "previous-questions.json");

const GROUP = /^## (\d+)\. (.+?) — `([a-z0-9-]+)`$/;
const PAPER = /^### (\d+)\.(\d+) (.+?) — `([a-z0-9-]+)`$/;
const FIELD = /^- \*\*(Organization|Post|Date|Source|Kind):\*\* (.*)$/;
const KIND = /^#### (MCQ|Written)$/;
const QUESTION = /^- \*\*([^*]+)\*\* (.+)$/;
const OPTION = /^ {2}- ([A-H])\. (.*)$/;
const DETAIL = /^ {2}- (Marks|Tags|Also asked in|Note): (.+)$/;
const OR_MARK = /^ {2}- Or$/;

function fail(lineNumber, message) {
  throw new Error(`PREVIOUS_QUESTIONS.md:${lineNumber}: ${message}`);
}

const splitList = (text) =>
  text
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

function parse(markdown) {
  const groups = [];
  let group = null;
  let paper = null;
  let kind = null;
  let question = null;

  markdown.split("\n").forEach((rawLine, index) => {
    const line = rawLine.replace(/\s+$/, "");
    const n = index + 1;
    let match;

    if ((match = line.match(GROUP))) {
      group = { slug: match[3], title: match[2], order: Number(match[1]), papers: [] };
      groups.push(group);
      paper = kind = question = null;
    } else if ((match = line.match(PAPER))) {
      if (!group) fail(n, "paper heading before any group heading");
      paper = {
        slug: match[4],
        title: match[3],
        order: Number(match[2]),
        organization: null,
        post: null,
        date: null,
        source: null,
        kind: "paper",
        mcq: [],
        written: [],
      };
      group.papers.push(paper);
      kind = question = null;
    } else if ((match = line.match(FIELD))) {
      if (!paper) fail(n, "paper field outside a paper");
      const value = match[2].trim();
      paper[match[1].toLowerCase()] = value === "—" ? null : value;
    } else if ((match = line.match(KIND))) {
      if (!paper) fail(n, "question list outside a paper");
      kind = match[1] === "MCQ" ? "mcq" : "written";
      question = null;
    } else if ((match = line.match(QUESTION))) {
      if (!kind) fail(n, "question outside an MCQ or Written list");
      question = {
        number: match[1].trim(),
        text: match[2].trim(),
        options: [],
        marks: null,
        or: false,
        tags: [],
        alsoIn: [],
        note: null,
      };
      paper[kind].push(question);
    } else if ((match = line.match(OPTION))) {
      if (!question) fail(n, "option without a question");
      question.options.push(match[2].trim());
    } else if (OR_MARK.test(line)) {
      if (!question) fail(n, "'Or' without a question");
      question.or = true;
    } else if ((match = line.match(DETAIL))) {
      if (!question) fail(n, `${match[1]} without a question`);
      const value = match[2].trim();
      if (match[1] === "Marks") question.marks = Number(value);
      else if (match[1] === "Tags") question.tags = splitList(value);
      else if (match[1] === "Also asked in") question.alsoIn = splitList(value);
      else question.note = value;
    } else if (/^ {2}- /.test(line)) {
      fail(n, `unrecognised question detail: ${line.trim()}`);
    }
  });

  for (const g of groups) {
    const slugs = new Set();
    for (const p of g.papers) {
      if (slugs.has(p.slug)) throw new Error(`Duplicate paper slug in ${g.slug}: ${p.slug}`);
      slugs.add(p.slug);
    }
  }
  return groups;
}

const groups = parse(await readFile(sourceFile, "utf8"));
await writeFile(outputFile, JSON.stringify({ groups }, null, 1) + "\n");
const papers = groups.reduce((sum, g) => sum + g.papers.length, 0);
const questions = groups.reduce(
  (sum, g) => sum + g.papers.reduce((s, p) => s + p.mcq.length + p.written.length, 0),
  0
);
console.log(`Wrote ${path.relative(root, outputFile)}: ${groups.length} groups, ${papers} papers, ${questions} questions.`);
