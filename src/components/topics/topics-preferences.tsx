import { ALL_EXAMS, examTags } from "@/config/exams";
import { EXAM_FILTER_KEY, SIDEBAR_STATE_KEY, SIDEBAR_STATES } from "@/config/preferences";

// Applies the reader's remembered preferences before the first paint, so the
// pre-rendered topics pages never flash the default state. The inline script sets:
// - <html data-exam="<tag>">: the exam filter (no attribute means all examinations).
// - <html data-sidebar="closed">: the desktop sidebar is collapsed (see the
//   `sidebar-closed:` variant in globals.css).
//
// The exam filter itself is done by the CSS below:
// - Items carry data-exams="<tag> <tag>"; those without the current tag are hidden.
// - Text that differs per filter (counts, the select label) is rendered once per value
//   with data-for-exam="<value>"; only the current one is shown.

const tags = Object.keys(examTags);

const css = [
  "[data-for-exam],[data-exam-note]{display:none}",
  `html:not([data-exam]) [data-for-exam="${ALL_EXAMS}"],html[data-exam="${ALL_EXAMS}"] [data-for-exam="${ALL_EXAMS}"]{display:inline}`,
  ...tags.flatMap((tag) => [
    `html[data-exam="${tag}"] [data-exams]:not([data-exams~="${tag}"]){display:none}`,
    `html[data-exam="${tag}"] [data-for-exam="${tag}"]{display:inline}`,
    `html[data-exam="${tag}"] [data-exam-note]{display:block}`,
  ]),
].join("\n");

// A valid ?exam in the URL wins over the remembered choice, matching ExamFilterUrlSync.
const script = `(function(){var d=document.documentElement;function stored(k){try{return localStorage.getItem(k)}catch(e){return null}}try{var tags=${JSON.stringify(tags)};var v=new URLSearchParams(location.search).get("exam");if(tags.indexOf(v)<0)v=stored(${JSON.stringify(EXAM_FILTER_KEY)});if(tags.indexOf(v)>-1)d.setAttribute("data-exam",v);var s=stored(${JSON.stringify(SIDEBAR_STATE_KEY)});if(${JSON.stringify(SIDEBAR_STATES)}.indexOf(s)>-1)d.setAttribute("data-sidebar",s)}catch(e){}})();`;

export function TopicsPreferences() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
