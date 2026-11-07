"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, FileText, History, PanelLeft } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavQuestionGroup } from "@/lib/previous-questions";

// A short bar drawn over the list's left border to mark the current paper.
const CURRENT_MARK =
  "relative before:absolute before:inset-y-1 before:-left-[11.5px] before:w-0.5 before:rounded-full before:bg-primary";

/** Exam group → paper navigation. The current group is open by default. */
export function QuestionsSidebar({
  groups,
  onNavigate,
}: {
  groups: NavQuestionGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [, , activeGroup, activePaper] = pathname.split("/");
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <nav aria-label="Previous questions" className="text-sm">
      {/* Section card, as in the topics sidebar. */}
      <Link
        href="/previous-questions"
        onClick={onNavigate}
        aria-current={pathname === "/previous-questions" ? "page" : undefined}
        className={cn(
          "mb-3 flex items-center gap-3 rounded-xl bg-background p-2.5 shadow-xs ring-1 outline-none transition-shadow hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50",
          pathname === "/previous-questions" ? "ring-primary/40" : "ring-sidebar-border"
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <History className="size-4.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-heading font-semibold leading-tight">All exams</span>
          <span className="mt-0.5 block text-xs text-muted-foreground tabular-nums">
            {groups.length} groups · {groups.reduce((sum, group) => sum + group.papers.length, 0)} papers
          </span>
        </span>
      </Link>

      <p className="mb-1.5 px-1.5 pt-1 text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">
        Exam groups
      </p>

      <div className="space-y-0.5">
        {groups.map((group) => {
          const groupActive = group.slug === activeGroup;
          return (
            <Collapsible
              key={group.slug}
              open={toggled[group.slug] ?? groupActive}
              onOpenChange={(open) => setToggled((current) => ({ ...current, [group.slug]: open }))}
            >
              <CollapsibleTrigger
                className={cn(
                  "group/trigger flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left font-medium outline-none hover:bg-background/70 focus-visible:ring-3 focus-visible:ring-ring/50",
                  groupActive && "text-primary"
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center self-start rounded-lg ring-1",
                    groupActive
                      ? "bg-primary text-primary-foreground ring-primary"
                      : "bg-background text-muted-foreground ring-sidebar-border group-hover/trigger:text-primary"
                  )}
                >
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <span className="flex-1 leading-snug">{group.title}</span>
                <span className="shrink-0 rounded-full bg-background px-1.5 py-px text-[0.6875rem] tabular-nums text-muted-foreground ring-1 ring-sidebar-border">
                  {group.papers.length}
                </span>
                <ChevronRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open/trigger:rotate-90"
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="my-1 ml-[1.3rem] space-y-0.5 border-l border-sidebar-border py-0.5 pl-2.5">
                  <li>
                    <Link
                      href={`/previous-questions/${group.slug}`}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-lg px-2 py-1 text-[0.8125rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        groupActive && !activePaper
                          ? cn("bg-background font-semibold text-primary shadow-xs ring-1 ring-primary/20", CURRENT_MARK)
                          : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                      )}
                    >
                      Overview
                    </Link>
                  </li>
                  {group.papers.map((paper) => {
                    const active = groupActive && paper.slug === activePaper;
                    return (
                      <li key={paper.slug}>
                        <Link
                          href={`/previous-questions/${group.slug}/${paper.slug}`}
                          onClick={onNavigate}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-start gap-2 rounded-lg px-2 py-1 text-[0.8125rem] leading-snug outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                            active
                              ? cn("bg-background font-semibold text-primary shadow-xs ring-1 ring-primary/20", CURRENT_MARK)
                              : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
                          )}
                        >
                          <span className="flex-1">{paper.title}</span>
                          <span
                            className={cn(
                              "mt-px shrink-0 rounded-md px-1 py-px text-[0.6875rem] tabular-nums ring-1",
                              active
                                ? "bg-primary/10 text-primary ring-primary/20"
                                : "bg-background text-muted-foreground ring-sidebar-border"
                            )}
                          >
                            {paper.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </nav>
  );
}

/** The sidebar on large screens. */
export function DesktopQuestionsSidebar({ groups }: { groups: NavQuestionGroup[] }) {
  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-72 shrink-0 flex-col border-r border-sidebar-border bg-linear-to-b from-sidebar to-(--sidebar-to) text-sidebar-foreground lg:flex">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <QuestionsSidebar groups={groups} />
      </div>
    </aside>
  );
}

/** The sidebar in a slide-out panel for screens narrower than the desktop layout. */
export function MobileQuestionsNav({ groups }: { groups: NavQuestionGroup[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <PanelLeft data-icon="inline-start" aria-hidden="true" />
        Browse exams
      </SheetTrigger>
      <SheetContent side="left" className="w-80 gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>Previous Questions</SheetTitle>
          <SheetDescription>Exam groups and papers</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-3">
          <QuestionsSidebar groups={groups} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
