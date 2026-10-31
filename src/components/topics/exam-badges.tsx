import { Badge } from "@/components/ui/badge";
import { examLabel } from "@/config/exams";

export function ExamBadges({ exams, className }: { exams: string[]; className?: string }) {
  return (
    <ul className={className ?? "flex flex-wrap gap-1.5"} aria-label="Examinations">
      {exams.map((exam) => (
        <li key={exam}>
          <Badge variant="outline" title={examLabel(exam)}>
            {exam}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
