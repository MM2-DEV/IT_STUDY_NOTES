import type { TopicNotes } from "@/lib/notes";

/** Renders a topic's notes. The HTML comes from our own Markdown files with raw HTML disabled. */
export function TopicNotesView({ notes }: { notes: TopicNotes }) {
  return (
    <div
      lang={notes.language}
      className="notes prose mt-8 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h2:scroll-mt-32 prose-h2:border-b prose-h2:border-border/70 prose-h2:pb-2 lg:prose-h2:scroll-mt-20 prose-h3:scroll-mt-32 lg:prose-h3:scroll-mt-20 prose-a:underline-offset-2 prose-table:text-sm prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2"
      dangerouslySetInnerHTML={{ __html: notes.html }}
    />
  );
}
