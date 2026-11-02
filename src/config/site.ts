import {
  BookOpen,
  ChartNoAxesColumn,
  History,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "IT Study Notes",
  description:
    "Exam-oriented IT and Computer Science study notes for Bangladesh government IT job examinations.",
  tagline: "Notes for Bangladesh government IT jobs",
  exams: ["NTRCA School", "NTRCA School-2", "NTRCA College", "PSC IT", "Assistant Programmer"],
  footerNote: "Sources are listed at the end of every topic.",
};

export type SiteSection = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  available: boolean;
};

export const siteSections: SiteSection[] = [
  {
    title: "Topics",
    description:
      "Syllabus-based study notes organized by category, topic and subtopic, in English and Bengali.",
    href: "/topics",
    icon: BookOpen,
    available: true,
  },
  {
    title: "Previous Questions",
    description:
      "MCQ and written questions from previous BCS, bank, NTRCA and other government IT job examinations, listed by exam.",
    href: "/previous-questions",
    icon: History,
    available: true,
  },
  {
    title: "MCQs",
    description: "Multiple-choice questions for practice, organized by subject.",
    href: "/mcqs",
    icon: ListChecks,
    available: false,
  },
  {
    title: "Question Patterns",
    description:
      "How questions are asked in each subject and which question types to expect.",
    href: "/question-patterns",
    icon: ChartNoAxesColumn,
    available: false,
  },
];
