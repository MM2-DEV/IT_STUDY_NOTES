import { DesktopSidebar } from "@/components/topics/desktop-sidebar";
import { ExamFilterUrlSync } from "@/components/topics/exam-filter-url";
import { MobileTopicsNav } from "@/components/topics/mobile-topics-nav";
import { getCategories, toNavCategories } from "@/lib/topics";

export default async function TopicsLayout({ children }: LayoutProps<"/topics">) {
  const categories = toNavCategories(await getCategories());

  return (
    <div className="flex w-full flex-1">
      <ExamFilterUrlSync />
      <DesktopSidebar categories={categories} />

      <div className="min-w-0 flex-1">
        <div className="sticky top-(--header-height) z-30 border-b border-border/70 bg-background/90 px-4 py-2 backdrop-blur-md sm:px-6 lg:hidden">
          <MobileTopicsNav categories={categories} />
        </div>
        {children}
      </div>
    </div>
  );
}
