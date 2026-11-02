"use client";

import { useMemo, useState } from "react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/previous-questions";

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

function QuestionItem({
  question,
  onTag,
  activeTag,
}: {
  question: Question;
  onTag?: (tag: string) => void;
  activeTag: string | null;
}) {
  const tags = question.tags;
  return (
    <li className={cn("rounded-xl p-4 ring-1 ring-foreground/10", question.or && "ml-6 sm:ml-10")}>
      {question.or && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Or</p>
      )}
      <div className="flex gap-3">
        <span className="shrink-0 font-heading font-semibold tabular-nums text-primary">
          {question.number}.
        </span>
        <div className="min-w-0 flex-1">
          <p className="leading-relaxed whitespace-pre-line">{question.text}</p>

          {question.options.length > 0 && (
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {question.options.map((option, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-medium text-muted-foreground">{OPTION_LABELS[index]}.</span>
                  <span>{option}</span>
                </li>
              ))}
            </ol>
          )}

          {(question.marks !== null || tags.length > 0 || question.alsoIn.length > 0) && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {question.marks !== null && (
                <Badge variant="secondary">
                  {question.marks} {question.marks === 1 ? "mark" : "marks"}
                </Badge>
              )}
              {tags.map((tag) =>
                onTag ? (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTag(tag)}
                    className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    aria-pressed={activeTag === tag}
                    title={`Show only questions from ${tag}`}
                  >
                    <Badge variant={activeTag === tag ? "default" : "outline"}>{tag}</Badge>
                  </button>
                ) : (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                )
              )}
              {question.alsoIn.length > 0 && (
                <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  Also asked in:
                  {question.alsoIn.map((exam) => (
                    <Badge key={exam} variant="outline">
                      {exam}
                    </Badge>
                  ))}
                </span>
              )}
            </div>
          )}

          {question.note && <p className="mt-2 text-xs text-muted-foreground">Note: {question.note}</p>}
        </div>
      </div>
    </li>
  );
}

function QuestionSection({
  id,
  title,
  questions,
  onTag,
  activeTag,
}: {
  id: string;
  title: string;
  questions: Question[];
  onTag?: (tag: string) => void;
  activeTag: string | null;
}) {
  if (questions.length === 0) return null;
  return (
    <section aria-labelledby={id} className="mt-10">
      <h2 id={id} className="scroll-mt-24 font-heading text-2xl font-semibold tracking-tight">
        {title} <span className="text-base font-normal text-muted-foreground">({questions.length})</span>
      </h2>
      <ol className="mt-4 space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={`${question.number}-${index}`}
            question={question}
            onTag={onTag}
            activeTag={activeTag}
          />
        ))}
      </ol>
    </section>
  );
}

/**
 * The MCQ and written questions of one paper, listed separately.
 * In a topic-wise collection every question carries its own exam tags, and the
 * reader can narrow the list to one exam.
 */
export function QuestionList({ mcq, written }: { mcq: Question[]; written: Question[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const allTags = useMemo(
    () => [...new Set([...mcq, ...written].flatMap((q) => q.tags))].sort((a, b) => a.localeCompare(b)),
    [mcq, written]
  );
  const hasTags = allTags.length > 0;
  const keep = (q: Question) => !tag || q.tags.includes(tag);
  const toggle = (value: string) => setTag((current) => (current === value ? null : value));

  return (
    <div>
      {hasTags && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <label htmlFor="exam-tag" className="text-sm font-medium">
            Exam
          </label>
          <select
            id="exam-tag"
            value={tag ?? ""}
            onChange={(event) => setTag(event.target.value || null)}
            className="h-8 max-w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">All exams ({allTags.length})</option>
            {allTags.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          {tag && (
            <button
              type="button"
              onClick={() => setTag(null)}
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      )}
      <QuestionSection
        id="mcq"
        title="MCQ"
        questions={mcq.filter(keep)}
        onTag={hasTags ? toggle : undefined}
        activeTag={tag}
      />
      <QuestionSection
        id="written"
        title="Written"
        questions={written.filter(keep)}
        onTag={hasTags ? toggle : undefined}
        activeTag={tag}
      />
    </div>
  );
}
