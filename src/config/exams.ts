/** Exam tags used in TOPICS.md and content/<category>/category.json. */
export const examTags = {
  School: "NTRCA School",
  "School-2": "NTRCA School-2",
  College: "NTRCA College (Lecturer)",
  "PSC-IT": "PSC IT",
  AP: "Assistant Programmer",
  Others: "Other subjects",
} as const;

export type ExamTag = keyof typeof examTags;

export function examLabel(tag: string): string {
  return examTags[tag as ExamTag] ?? tag;
}

/** Exam filter value meaning "no filter". */
export const ALL_EXAMS = "all";
