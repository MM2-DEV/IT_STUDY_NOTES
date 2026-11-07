import {
  BookOpen,
  BrainCircuit,
  Cloud,
  CodeXml,
  FlaskConical,
  GraduationCap,
  History,
  Landmark,
  ListChecks,
  type LucideIcon,
  MonitorSmartphone,
  Server,
} from "lucide-react";

export const siteConfig = {
  name: "IT Study Notes",
  description:
    "Computer Science and Engineering notes for Bangladesh government and bank IT job examinations, and hands-on, interview-focused software engineering from HTML to cloud deployment.",
  tagline: "Govt IT examinations · Software engineering",
  exams: ["NTRCA School", "NTRCA School-2", "NTRCA College", "PSC IT", "Assistant Programmer", "Bank IT"],
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
    title: "Software Engineering",
    description:
      "Hands-on, interview-focused software development: web, frontend, backend, databases, testing, security, DevOps, cloud and AI-assisted development.",
    href: "/software-engineering",
    icon: CodeXml,
    available: true,
  },
];

/* ---------- Home page "Explore" tree (src/components/explore/) ---------- */

export type ExploreLeaf = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  available: boolean;
  /** Software Engineering category folders this card covers; their titles are shown on the card. */
  categories?: string[];
};

export type ExploreBranch = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  leaves: ExploreLeaf[];
};

const section = (href: string) => {
  const found = siteSections.find((item) => item.href === href);
  if (!found) throw new Error(`No site section ${href}`);
  return found;
};

const seCards = (categories: string[]) => ({
  categories,
  href: `/software-engineering/${categories[0]}`,
  available: true,
});

export const exploreTree: {
  root: { title: string; description: string; icon: LucideIcon };
  branches: ExploreBranch[];
} = {
  root: {
    title: "CSE Core",
    description: "Computer Science and Engineering, for examinations and for work.",
    icon: GraduationCap,
  },
  branches: [
    {
      id: "govt-it",
      title: "Govt IT",
      description: "Bangladesh government and bank IT job examinations.",
      icon: Landmark,
      href: "/topics",
      leaves: [
        {
          ...section("/topics"),
          description: "Syllabus-based notes by category, topic and subtopic.",
        },
        {
          ...section("/previous-questions"),
          description: "MCQ and written questions from previous examinations.",
        },
        { ...section("/mcqs"), description: "Multiple-choice practice by subject." },
      ],
    },
    {
      id: "software-engineering",
      title: "Software Engineering",
      description: "Hands-on, interview-focused software development.",
      icon: CodeXml,
      href: "/software-engineering",
      leaves: [
        {
          title: "Frontend",
          description: "HTML, CSS, JavaScript, TypeScript and React.",
          icon: MonitorSmartphone,
          ...seCards(["web-fundamentals", "html", "css", "javascript", "typescript", "react"]),
        },
        {
          title: "Backend",
          description: "Python, Node.js and Go; Django, FastAPI and NestJS; APIs and databases.",
          icon: Server,
          ...seCards([
            "backend-fundamentals",
            "python",
            "django",
            "fastapi",
            "nodejs",
            "golang",
            "api-design",
            "databases",
          ]),
        },
        {
          title: "SQA",
          description: "Software quality assurance: testing, debugging, performance and observability.",
          icon: FlaskConical,
          ...seCards(["testing", "performance"]),
        },
        {
          title: "DevOps & Cloud",
          description: "Linux, servers, Docker, Kubernetes, CI/CD and cloud deployment.",
          icon: Cloud,
          ...seCards(["linux-and-servers", "devops-and-cloud"]),
        },
        {
          title: "AI Engineering",
          description: "LLMs, AI coding agents, LLM-powered features, RAG and AI agents.",
          icon: BrainCircuit,
          ...seCards(["ai-assisted-development"]),
        },
      ],
    },
  ],
};
