// Reader preferences remembered in localStorage. They are applied before the first paint
// by the inline script in components/topics/topics-preferences.tsx.

/** The exam filter: an exam tag from config/exams.ts, or ALL_EXAMS. */
export const EXAM_FILTER_KEY = "exam-filter";

/** Whether the desktop topics sidebar is shown: "open" or "closed". */
export const SIDEBAR_STATE_KEY = "topics-sidebar";
export const SIDEBAR_STATES = ["open", "closed"] as const;
