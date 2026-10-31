"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "cn";

import { CategoryIcon } from "@/components/category-icon";
import { ExamFilter } from "@/components/topics/exam-filter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ALL_EXAMS, useExamFilter } from "@/lib/exam-filter";
import type { NavCategory } from "@/lib/topics";

// A short bar drawn over the list's left border to mark the current topic or subtopic.
const CURRENT_MARK =
  "relative before:absolute before:inset-y-1 before:-left-[9px] before:w-0.5 before:rounded-full before:bg-primary";

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
 * The exam filter hides topics and subtopics that the chosen exam does not cover.
 * Everything is rendered and tagged with data-exams; the hiding is done by CSS
 * (topics-preferences.tsx), so the pre-rendered page is filtered before it is painted.
 */
export function TopicsSidebar({
  categories,
  onNavigate,
}: {
  categories: NavCategory[];
  onNavigate?: () => void;
}) {
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

  return (
    <nav aria-label="Topics" className="space-y-1 text-sm">
      <div className="mb-4">
        <ExamFilter value={exam} onChange={setExam} />
      </div>

      <Link
        href="/topics"
        onClick={onNavigate}
        className={cn(
          "mb-3 flex items-center rounded-md px-2 py-1.5 font-heading font-semibold outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
          pathname === "/topics" && "bg-accent text-accent-foreground"
        )}
      >
        All topics
      </Link>

      {/* Every exam tag has topics, so a filtered list is never empty. */}
      <p data-exam-note className="px-2 pb-1 text-xs text-muted-foreground">
        Showing only topics and subtopics listed for this examination.
      </p>

      {categories.map((category) => {
        const categoryActive = category.slug === activeCategory;
        const categoryTags = [...new Set(category.topics.flatMap((topic) => topic.exams))];
        return (
          <div key={category.slug} data-exams={categoryTags.join(" ")}>
            <Collapsible
              open={isOpen(category.slug, categoryActive)}
              onOpenChange={(open) => setOpen(category.slug, open)}
            >
              <CollapsibleTrigger
                className={cn(
                  "group/trigger flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-medium outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                  categoryActive && "text-primary"
                )}
              >
                <CategoryIcon
                  slug={category.slug}
                  className={cn("mt-0.5 size-4 shrink-0 self-start", categoryActive ? "text-primary" : "text-muted-foreground")}
                />
                <span className="flex-1">{category.title}</span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {[ALL_EXAMS, ...categoryTags].map((tag) => (
                    <span key={tag} data-for-exam={tag}>
                      {tag === ALL_EXAMS
                        ? category.topics.length
                        : category.topics.filter((topic) => topic.exams.includes(tag)).length}
                    </span>
                  ))}
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open/trigger:rotate-90"
                  aria-hidden="true"
                />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <ul className="my-1 ml-4 space-y-0.5 border-l border-border pl-2">
                  {category.topics.map((topic) => {
                    const topicKey = `${category.slug}/${topic.slug}`;
                    const topicActive = categoryActive && topic.slug === activeTopic;
                    const href = `/topics/${topicKey}`;
                    return (
                      <li key={topic.slug} data-exams={topic.exams.join(" ")}>
                        <Collapsible
                          open={isOpen(topicKey, topicActive)}
                          onOpenChange={(open) => setOpen(topicKey, open)}
                        >
                          <div
                            className={cn(
                              "flex items-start rounded-md hover:bg-accent",
                              topicActive && cn("bg-accent", CURRENT_MARK)
                            )}
                          >
                            <Link
                              href={href}
                              onClick={onNavigate}
                              aria-current={topicActive ? "page" : undefined}
                              className={cn(
                                "flex-1 rounded-md px-2 py-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                topicActive
                                  ? "font-semibold text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {topic.title}
                            </Link>
                            {topic.subtopics.length > 0 && (
                              <CollapsibleTrigger
                                aria-label={`Show subtopics of ${topic.title}`}
                                className="group/trigger mt-1 mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-background hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
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
                              <ul className="my-1 ml-3 space-y-0.5 border-l border-border pl-2">
                                {topic.subtopics.map((subtopic) => {
                                  const sectionActive = topicActive && subtopic.id === currentSection;
                                  return (
                                    <li key={subtopic.id} data-exams={subtopic.exams.join(" ")}>
                                      <Link
                                        href={`${href}#${subtopic.id}`}
                                        onClick={onNavigate}
                                        aria-current={sectionActive ? "location" : undefined}
                                        className={cn(
                                          "block rounded-md px-2 py-1 text-[0.8125rem] leading-snug outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                                          sectionActive
                                            ? cn("font-medium text-primary", CURRENT_MARK)
                                            : "text-muted-foreground hover:text-foreground"
                                        )}
                                      >
                                        {subtopic.title}
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
    </nav>
  );
}
