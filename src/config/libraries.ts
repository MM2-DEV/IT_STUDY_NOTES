// The site's note libraries. Each one is a section of the site with its own content folder,
// sidebar and pages, built by the same code (src/lib/topics.ts, src/lib/notes.ts,
// src/components/library/).

export type LibraryId = "topics" | "software-engineering";

export type Library = {
  id: LibraryId;
  /** Section name shown in breadcrumbs, the sidebar and page titles. */
  title: string;
  /** URL of the section's index page; categories and topics live below it. */
  basePath: string;
  /** Folder, relative to the project root, holding <category>/category.json and the notes. */
  contentDir: string;
  /** The topic list that `contentDir/<category>/category.json` is generated from. */
  sourceFile: string;
  /** Whether the section uses exam tags (sidebar filter and badges). */
  examTags: boolean;
  /** Whether a topic may have a Bengali version (bn.md). */
  bengali: boolean;
  /** Sections a topic's notes may contain besides its subtopics. */
  extraSections: string[];
  /** Introduction on the section's index page. */
  intro: string;
  /** Text for search engines. */
  description: string;
};

export const libraries: Record<LibraryId, Library> = {
  topics: {
    id: "topics",
    title: "Topics",
    basePath: "/topics",
    contentDir: "content",
    sourceFile: "TOPICS.md",
    examTags: true,
    bengali: true,
    extraSections: ["references"],
    intro: "Choose a category, or use the sidebar to jump straight to a topic or subtopic.",
    description: "All study note categories and topics, organized by subject.",
  },
  "software-engineering": {
    id: "software-engineering",
    title: "Software Engineering",
    basePath: "/software-engineering",
    contentDir: "content-software-engineering",
    sourceFile: "SOFTWARE_ENGINEERING.md",
    examTags: false,
    bengali: false,
    extraSections: ["practice", "references"],
    intro:
      "Hands-on, interview-focused notes on professional software development, from HTML to cloud deployment and agentic development with AI. Every topic has working code, common mistakes, interview questions and a practice task.",
    description:
      "Hands-on software development notes with interview questions: web, frontend, backend, databases, testing, security, DevOps, cloud and AI-assisted development.",
  },
};
