"use client";

import { useId } from "react";
import { Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { examTags } from "@/config/exams";
import { ALL_EXAMS } from "@/lib/exam-filter";

const items = [
  { value: ALL_EXAMS, label: "All examinations" },
  ...Object.entries(examTags).map(([value, label]) => ({ value, label })),
];

export function ExamFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const labelId = useId();

  return (
    <div className="space-y-1.5">
      <p
        id={labelId}
        className="flex items-center gap-1.5 px-1 text-xs font-medium text-muted-foreground"
      >
        <Filter className="size-3.5" aria-hidden="true" />
        Show topics for
      </p>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => onChange(next ?? ALL_EXAMS)}
      >
        <SelectTrigger aria-labelledby={labelId} className="w-full bg-background">
          {/* One label per option; CSS shows the current one before the page is interactive
              (see topics-preferences.tsx), so a remembered filter never flashes "All examinations". */}
          <span data-slot="select-value" className="flex flex-1 text-left">
            {items.map((item) => (
              <span key={item.value} data-for-exam={item.value}>
                {item.label}
              </span>
            ))}
          </span>
        </SelectTrigger>
        {/* Open below the trigger rather than over it, so the list is never clipped at the top. */}
        <SelectContent alignItemWithTrigger={false}>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
