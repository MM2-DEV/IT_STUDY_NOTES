"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, PanelLeft } from "lucide-react";
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
  "relative before:absolute before:inset-y-1 before:-left-[9px] before:w-0.5 before:rounded-full before:bg-primary";

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
    <nav aria-label="Previous questions" className="space-y-1 text-sm">
      <Link
        href="/previous-questions"
        onClick={onNavigate}
        className={cn(
          "mb-3 flex items-center rounded-md px-2 py-1.5 font-heading font-semibold outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
          pathname === "/previous-questions" && "bg-accent text-accent-foreground"
        )}
      >
        All exams
      </Link>

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
                "group/trigger flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-medium outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                groupActive && "text-primary"
              )}
            >
              <span className="flex-1">{group.title}</span>
              <span className="text-xs tabular-nums text-muted-foreground">{group.papers.length}</span>
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground transition-transform group-data-panel-open/trigger:rotate-90"
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="my-1 ml-4 space-y-0.5 border-l border-border pl-2">
                <li>
                  <Link
                    href={`/previous-questions/${group.slug}`}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-2 py-1 text-[0.8125rem] outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                      groupActive && !activePaper
                        ? cn("bg-accent font-semibold text-primary", CURRENT_MARK)
                        : "text-muted-foreground hover:text-foreground"
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
                          "flex items-start gap-2 rounded-md px-2 py-1 text-[0.8125rem] leading-snug outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                          active
                            ? cn("bg-accent font-semibold text-primary", CURRENT_MARK)
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="flex-1">{paper.title}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">{paper.count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
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
