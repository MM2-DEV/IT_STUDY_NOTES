import { NotebookPen } from "lucide-react";

import { ExamBadges } from "@/components/topics/exam-badges";
import type { Subtopic } from "@/lib/topics";

/** Shown on a topic page until its notes (en.md) are written. */
export function TopicOutline({ subtopics }: { subtopics: Subtopic[] }) {
  return (
    <>
      <div className="mt-6 flex gap-3 rounded-xl border border-dashed border-primary/30 bg-(--card-tint) p-4 text-sm">
        <NotebookPen className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Notes for this topic have not been written yet.
          {subtopics.length > 0 && " The outline below shows what it will cover."}
        </p>
      </div>

      {subtopics.length > 0 && (
        <div className="mt-8 space-y-6">
          {subtopics.map((subtopic, index) => (
            <section
              key={subtopic.id}
              id={subtopic.id}
              aria-labelledby={`${subtopic.id}-heading`}
              className="scroll-mt-32 lg:scroll-mt-20"
            >
              <h2
                id={`${subtopic.id}-heading`}
                className="flex items-baseline gap-3 font-heading text-lg font-semibold"
              >
                <span className="text-sm font-medium tabular-nums text-muted-foreground">
                  {index + 1}.
                </span>
                {subtopic.title}
              </h2>
              {subtopic.children && (
                <ul className="mt-2 ml-8 list-disc space-y-1 text-muted-foreground marker:text-primary/60">
                  {subtopic.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              )}
              {subtopic.exams.length > 0 && (
                <ExamBadges exams={subtopic.exams} className="mt-2 ml-8 flex flex-wrap gap-1.5" />
              )}
            </section>
          ))}
        </div>
      )}
    </>
  );
}
