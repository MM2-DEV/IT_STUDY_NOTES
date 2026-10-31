import { ALL_EXAMS, examTags } from "@/config/exams";
import { EXAM_FILTER_KEY } from "@/config/preferences";
import { createStoredValue } from "@/lib/stored-value";

// The reader's chosen exam filter, remembered in localStorage and shared by
// every component that uses it (desktop sidebar and mobile panel).
// The sidebar is filtered by CSS (see components/topics/topics-preferences.tsx).

export { ALL_EXAMS };

export const useExamFilter = createStoredValue(EXAM_FILTER_KEY, ALL_EXAMS, (value) => value in examTags);
