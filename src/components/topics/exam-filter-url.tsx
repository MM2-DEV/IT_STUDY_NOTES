"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { examTags } from "@/config/exams";
import { ALL_EXAMS, useExamFilter } from "@/lib/exam-filter";

/**
 * Keeps the exam filter in the address bar as `?exam=<tag>`, so a filtered view can be
 * shared or bookmarked. An `exam` in the URL wins over the remembered choice when the
 * page first loads; after that the URL follows the filter, including on every page the
 * reader moves to. It also keeps <html data-exam> current, which the sidebar's
 * filtering CSS reads (see topics-preferences.tsx). Renders nothing.
 */
export function ExamFilterUrlSync() {
  const pathname = usePathname();
  const [exam, setExam] = useExamFilter();
  const urlChecked = useRef(false);
  const mounted = useRef(false);

  // Mirror later changes to <html data-exam> before paint. The first run is skipped: the
  // inline script already set the attribute, and during hydration `exam` still holds the
  // server value ("all"), which would briefly undo it.
  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    document.documentElement.setAttribute("data-exam", exam);
  }, [exam]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (!urlChecked.current) {
      urlChecked.current = true;
      const fromUrl = params.get("exam");
      if (fromUrl && fromUrl in examTags && fromUrl !== exam) {
        setExam(fromUrl);
        return;
      }
    }

    const wanted = exam === ALL_EXAMS ? null : exam;
    if (params.get("exam") === wanted) return;
    if (wanted) params.set("exam", wanted);
    else params.delete("exam");
    const query = params.toString();
    window.history.replaceState(null, "", `${pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  }, [exam, pathname, setExam]);

  return null;
}
