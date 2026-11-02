import {
  DesktopQuestionsSidebar,
  MobileQuestionsNav,
} from "@/components/previous-questions/questions-sidebar";
import { getQuestionGroups, toNavQuestionGroups } from "@/lib/previous-questions";

export default async function PreviousQuestionsLayout({
  children,
}: LayoutProps<"/previous-questions">) {
  const groups = toNavQuestionGroups(await getQuestionGroups());

  return (
    <div className="flex w-full flex-1">
      <DesktopQuestionsSidebar groups={groups} />

      <div className="min-w-0 flex-1">
        <div className="sticky top-(--header-height) z-30 border-b border-border/70 bg-background/90 px-4 py-2 backdrop-blur-md sm:px-6 lg:hidden">
          <MobileQuestionsNav groups={groups} />
        </div>
        {children}
      </div>
    </div>
  );
}
