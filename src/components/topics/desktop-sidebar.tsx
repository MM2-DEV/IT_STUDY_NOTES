"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "cn";

import { CategoryIcon } from "@/components/category-icon";
import { TopicsSidebar } from "@/components/topics/topics-sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SIDEBAR_STATE_KEY, SIDEBAR_STATES } from "@/config/preferences";
import { createStoredValue } from "@/lib/stored-value";
import type { NavCategory, SidebarSection } from "@/lib/topics";

const useSidebarState = createStoredValue(SIDEBAR_STATE_KEY, "open", (value) =>
  (SIDEBAR_STATES as readonly string[]).includes(value)
);

/**
 * The topics sidebar on large screens. It can be collapsed to a narrow rail of category
 * icons to give the notes more room. Which one is shown is decided by CSS from
 * <html data-sidebar> (the `sidebar-closed:` variant), which the inline script in
 * topics-preferences.tsx sets before the first paint, so a refresh never flashes the
 * other state. The full navigation stays mounted while hidden, so open sections are kept.
 */
export function DesktopSidebar({
  categories,
  section,
}: {
  categories: NavCategory[];
  section: SidebarSection;
}) {
  const [state, setState] = useSidebarState();
  const open = state === "open";
  const [, , activeCategory] = usePathname().split("/");

  function toggle() {
    const next = open ? "closed" : "open";
    document.documentElement.setAttribute("data-sidebar", next);
    setState(next);
  }

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-72 shrink-0 flex-col border-r border-sidebar-border bg-linear-to-b from-sidebar to-(--sidebar-to) text-sidebar-foreground lg:flex sidebar-closed:w-14">
      <div className="flex justify-end px-2 pt-3 sidebar-closed:justify-center">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-controls="topics-sidebar-nav"
          aria-expanded={open}
          aria-label={open ? "Hide sidebar" : "Show sidebar"}
          title={open ? "Hide sidebar" : "Show sidebar"}
          onClick={toggle}
        >
          <PanelLeftClose className="sidebar-closed:hidden" aria-hidden="true" />
          <PanelLeftOpen className="hidden sidebar-closed:block" aria-hidden="true" />
        </Button>
      </div>

      <div id="topics-sidebar-nav" className="flex-1 overflow-y-auto px-3 pb-6 sidebar-closed:hidden">
        <TopicsSidebar categories={categories} section={section} />
      </div>

      <nav
        aria-label="Categories"
        className="hidden flex-1 flex-col items-center gap-1 overflow-y-auto py-3 [scrollbar-width:none] sidebar-closed:flex"
      >
        <TooltipProvider>
          {categories.map((category) => {
            const active = category.slug === activeCategory;
            const tags = [...new Set(category.topics.flatMap((topic) => topic.exams))];
            return (
              <Tooltip key={category.slug}>
                <TooltipTrigger
                  data-exams={section.examFilter ? tags.join(" ") : undefined}
                  render={
                    <Link
                      href={`${section.basePath}/${category.slug}`}
                      aria-label={category.title}
                      aria-current={active ? "true" : undefined}
                    />
                  }
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-md outline-none hover:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/50",
                    active ? "bg-sidebar-accent text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <CategoryIcon slug={category.slug} className="size-4.5" />
                </TooltipTrigger>
                <TooltipContent side="right">{category.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
