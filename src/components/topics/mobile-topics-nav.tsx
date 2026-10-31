"use client";

import { useState } from "react";
import { PanelLeft } from "lucide-react";

import { TopicsSidebar } from "@/components/topics/topics-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavCategory } from "@/lib/topics";

/** Sidebar in a slide-out panel for screens narrower than the desktop layout. */
export function MobileTopicsNav({ categories }: { categories: NavCategory[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" size="sm" />}>
        <PanelLeft data-icon="inline-start" aria-hidden="true" />
        Browse topics
      </SheetTrigger>
      <SheetContent side="left" className="w-80 gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>Topics</SheetTitle>
          <SheetDescription>Categories, topics and subtopics</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-3">
          <TopicsSidebar categories={categories} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
