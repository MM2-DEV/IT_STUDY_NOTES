"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, CodeXml, type LucideIcon } from "lucide-react";
import { cn } from "cn";

import { CategoryIcon } from "@/components/category-icon";
import { ExamFilter } from "@/components/topics/exam-filter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ALL_EXAMS, useExamFilter } from "@/lib/exam-filter";
import type { NavCategory, SidebarSection } from "@/lib/topics";

/** Icon of each section's sidebar card, by the section's base path. */
const SECTION_ICONS: Record<string, LucideIcon> = {
  "/topics": BookOpen,
  "/software-engineering": CodeXml,
};

// A short bar drawn over the list's left border to mark the current topic.
const CURRENT_MARK =
  "relative before:absolute before:inset-y-1 before:-left-[11.5px] before:w-0.5 before:rounded-full before:bg-primary";

/**
 * The ID of the section the reader is looking at: the last of `ids` whose heading
 * has scrolled near the top of the window (or the last one at the bottom of the page).
 */
function useCurrentSection(ids: string[]): string | null {
  const [current, setCurrent] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(() => {
    const sectionIds = key ? key.split(" ") : [];
    let frame = 0;

    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let found: string | null = null;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        // Before any heading reaches the top, the first section counts as current.
        if (found === null || atBottom || element.getBoundingClientRect().top <= 140) found = id;
      }
      setCurrent(found);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [key]);

  return current;
}

/**
 * Category → topic → subtopic navigation.
 * The current category and topic are open by default; anything the reader
 * opens or closes stays that way while they move between topics.
 * The exam filter (sections with exam tags only) hides topics and subtopics that the chosen
 * exam does not cover. Everything is rendered and tagged with data-exams; the hiding is done by
 * CSS (topics-preferences.tsx), so the pre-rendered page is filtered before it is painted.
 * Sections without exam tags render no data-exams, so a remembered filter never hides them.
 */
export function TopicsSidebar({
  categories,
  section,
  onNavigate,
}: {
  categories: NavCategory[];
  section: SidebarSection;
  onNavigate?: () => void;
}) {
  const { basePath, examFilter } = section;
  const examsAttribute = (exams: string[]) => (examFilter ? exams.join(" ") : undefined);
  const pathname = usePathname();
  const [, , activeCategory, activeTopic] = pathname.split("/");
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const [exam, setExam] = useExamFilter();

  const isOpen = (key: string, activeByDefault: boolean) => toggled[key] ?? activeByDefault;
  const setOpen = (key: string, open: boolean) =>
    setToggled((current) => ({ ...current, [key]: open }));

  const openTopic = categories
    .find((category) => category.slug === activeCategory)
    ?.topics.find((topic) => topic.slug === activeTopic);
  const currentSection = useCurrentSection(openTopic?.subtopics.map((subtopic) => subtopic.id) ?? []);

  const topicCount = categories.reduce((sum, category) => sum + category.topics.length, 0);
  const SectionIcon = SECTION_ICONS[basePath] ?? BookOpen;
  const onIndex = pathname === basePath;

  return (
    <nav aria-label={section.title} className="text-sm">
      {/* Section card: name and size of the section; links to its index page. */}
      <Link
        href={basePath}
        onClick={onNavigate}
        aria-current={onIndex ? "page" : undefined}
        className={cn(
          "mb-3 flex items-center gap-3 rounded-xl bg-background p-2.5 shadow-xs ring-1 outline-none transition-shadow hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50",
          onIndex ? "ring-primary/40" : "ring-sidebar-border"
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <SectionIcon className="size-4.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-heading font-semibold leading-tight">
            {examFilter ? "All topics" : section.title}
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground tabular-nums">
            {categories.length} categories · {topicCount} topics
          </span>
        </span>
      </Link>

      {examFilter && (
        <div className="mb-3">
          <ExamFilter value={exam} onChange={setExam} />
        </div>
      )}

      {/* Every exam tag has topics, so a filtered list is never empty. */}
      {examFilter && (
        <p data-exam-note className="px-1 pb-2 text-xs text-muted-foreground">
          Showing only topics and subtopics listed for this examination.
        </p>
      )}

      <p className="mb-1.5 px-1.5 pt-1 text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">
        Categories
      </p>

      <div className="space-y-0.5">
        {categories.map((category) => {
          const categoryActive = category.slug === activeCategory;
          const categoryTags = [...new Set(category.topics.flatMap((topic) => topic.exams))];
          return (
            <div key={category.slug} data-exams={examsAttribute(categoryTags)}>
              <Collapsible
                open={isOpen(category.slug, categoryActive)}
                onOpenChange={(open) => setOpen(category.slug, open)}
              >
                <CollapsibleTrigger
                  className={cn(
                    "group/trigger flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left font-medium outline-none hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/50",
                    categoryActive && "text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center self-start rounded-lg ring-1",
                      categoryActive
                        ? "bg-primary text-primary-foreground ring-primary"
                        : "bg-background text-muted-foreground ring-sidebar-border group-hover/trigger:text-primary"
                    )}
                  >
                    <CategoryIcon slug={category.slug} className="size-4" />
                  </span>
                  <span className="flex-1 leading-snug">{category.title}</span>
                  <span className="shrink-0 rounded-full bg-background px-1.5 py-px text-[0.6875rem] tabular-nums text-muted-foreground ring-1 ring-sidebar-border">
                    {examFilter
                      ? [ALL_EXAMS, ...categoryTags].map((tag) => (
                          <span key={tag} data-for-exam={tag}>
                            {tag === ALL_EXAMS
                              ? category.topics.length
                              : category.topics.filter((topic) => topic.exams.includes(tag)).length}
                          </span>
                        ))
                      : category.topics.length}
                  </span>
                  <ChevronRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open/trigger:rotate-90"
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  {/* Topics hang from a line under the category's icon tile. */}
                  <ul className="my-1 ml-[1.3rem] space-y-0.5 border-l border-sidebar-border py-0.5 pl-2.5">
                    {category.topics.map((topic) => {
                      const topicKey = `${category.slug}/${topic.slug}`;
                      const topicActive = categoryActive && topic.slug === activeTopic;
                      const href = `${basePath}/${topicKey}`;
                      return (
                        <li key={topic.slug} data-exams={examsAttribute(topic.exams)}>
                          <Collapsible
                            open={isOpen(topicKey, topicActive)}
                            onOpenChange={(open) => setOpen(topicKey, open)}
                          >
                            <div
                              className={cn(
                                "flex items-start rounded-lg",
                                topicActive
                                  ? cn("bg-background shadow-xs ring-1 ring-primary/20", CURRENT_MARK)
                                  : "hover:bg-background/70"
                              )}
                            >
                              <Link
                                href={href}
                                onClick={onNavigate}
                                aria-current={topicActive ? "page" : undefined}
                                className={cn(
                                  "flex-1 rounded-lg px-2 py-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                  topicActive
                                    ? "font-semibold text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                )}
                              >
                                <span className="flex gap-2">
                                  <span
                                    className={cn(
                                      "mt-px h-fit shrink-0 rounded-md px-1 py-px text-[0.6875rem] font-medium tabular-nums ring-1",
                                      topicActive
                                        ? "bg-primary/10 text-primary ring-primary/20"
                                        : "bg-background text-muted-foreground ring-sidebar-border"
                                    )}
                                  >
                                    {category.order}.{topic.order}
                                  </span>
                                  <span className="leading-snug">{topic.title}</span>
                                </span>
                              </Link>
                              {topic.subtopics.length > 0 && (
                                <CollapsibleTrigger
                                  aria-label={`Show subtopics of ${topic.title}`}
                                  className="group/trigger mt-1 mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                                >
                                  <ChevronRight
                                    className="size-3.5 transition-transform group-data-panel-open/trigger:rotate-90"
                                    aria-hidden="true"
                                  />
                                </CollapsibleTrigger>
                              )}
                            </div>

                            {topic.subtopics.length > 0 && (
                              <CollapsibleContent>
                                {/* Subtopics as a timeline: one dot per section; the section in view is filled. */}
                                <ul className="relative my-1.5 ml-3 space-y-0.5 pl-4 before:absolute before:inset-y-2 before:left-[3px] before:w-px before:bg-sidebar-border">
                                  {topic.subtopics.map((subtopic, index) => {
                                    const sectionActive = topicActive && subtopic.id === currentSection;
                                    return (
                                      <li
                                        key={subtopic.id}
                                        data-exams={examsAttribute(subtopic.exams)}
                                        className="relative"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className={cn(
                                            "absolute top-[0.6rem] -left-4 size-[7px] rounded-full",
                                            sectionActive ? "bg-primary" : "bg-sidebar-border"
                                          )}
                                        />
                                        <Link
                                          href={`${href}#${subtopic.id}`}
                                          onClick={onNavigate}
                                          aria-current={sectionActive ? "location" : undefined}
                                          className={cn(
                                            "block rounded-md px-2 py-1 text-[0.8125rem] leading-snug outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                            sectionActive
                                              ? "bg-background font-medium text-primary shadow-xs"
                                              : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                                          )}
                                        >
                                          <span className="flex gap-1.5">
                                            <span className="shrink-0 tabular-nums">{index + 1}.</span>
                                            <span>{subtopic.title}</span>
                                          </span>
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </CollapsibleContent>
                            )}
                          </Collapsible>
                        </li>
                      );
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
