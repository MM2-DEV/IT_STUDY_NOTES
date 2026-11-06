import type { Element, ElementContent, Root, RootContent } from "hast";

import { examLabel } from "@/config/exams";

// Groups a topic's rendered notes into cards, so the start and end of every subtopic is easy to
// see (styled by `.subtopic-card` in globals.css):
//
//   <section class="subtopic-card">            one card per `## Subtopic {#id}` section
//     <header class="subtopic-card-header">
//       <h2 id="…"><span class="subtopic-number">1</span> Title</h2>
//       <ul class="subtopic-exams">…</ul>      the subtopic's exam tags from category.json
//     </header>
//     …the section's content…
//   </section>
//
// The closing `## References {#references}` section becomes a <details> element that is closed
// initially and opens and closes on click, without JavaScript. Content before the first `##`
// (topics without subtopics) becomes one card without a header.

export type SectionInfo = {
  /** Subtopic ID, the same as the `##` heading's ID. */
  id: string;
  /** 1-based position of the subtopic in category.json. */
  number: number;
  exams: string[];
};

export type SectionCardsOptions = { sections: SectionInfo[] };

const element = (
  tagName: string,
  properties: Element["properties"],
  children: ElementContent[]
): Element => ({ type: "element", tagName, properties, children });

const isH2 = (node: RootContent): node is Element =>
  node.type === "element" && node.tagName === "h2";

/** Drops whitespace-only text nodes at the edges, so empty leading content makes no card. */
function hasContent(nodes: RootContent[]) {
  return nodes.some((node) => node.type !== "text" || node.value.trim() !== "");
}

function examList(exams: string[]): Element {
  return element(
    "ul",
    { className: ["subtopic-exams"], ariaLabel: "Examinations" },
    exams.map((exam) =>
      element("li", {}, [
        element("span", { className: ["exam-tag"], title: examLabel(exam) }, [
          { type: "text", value: exam },
        ]),
      ])
    )
  );
}

function subtopicCard(heading: Element, body: RootContent[], info: SectionInfo | undefined): Element {
  if (info) {
    heading.children.unshift(
      element("span", { className: ["subtopic-number"], ariaHidden: "true" }, [
        { type: "text", value: String(info.number) },
      ]),
      { type: "text", value: " " }
    );
  }
  const header = element("header", { className: ["subtopic-card-header"] }, [
    heading,
    ...(info && info.exams.length > 0 ? [examList(info.exams)] : []),
  ]);
  return element(
    "section",
    { className: ["subtopic-card"], ariaLabelledBy: [String(heading.properties.id ?? "")] },
    [header, ...(body as ElementContent[])]
  );
}

function referencesCard(heading: Element, body: RootContent[]): Element {
  return element("details", { className: ["references-card"] }, [
    element("summary", { className: ["references-summary"] }, [heading]),
    element("div", { className: ["references-body"] }, body as ElementContent[]),
  ]);
}

export function rehypeSectionCards({ sections }: SectionCardsOptions) {
  const byId = new Map(sections.map((section) => [section.id, section]));

  return (tree: Root) => {
    const result: RootContent[] = [];
    let heading: Element | null = null;
    let body: RootContent[] = [];

    const flush = () => {
      if (heading) {
        const id = String(heading.properties.id ?? "");
        result.push(id === "references" ? referencesCard(heading, body) : subtopicCard(heading, body, byId.get(id)));
      } else if (hasContent(body)) {
        result.push(element("section", { className: ["subtopic-card"] }, body as ElementContent[]));
      }
      body = [];
    };

    for (const node of tree.children) {
      if (isH2(node)) {
        flush();
        heading = node;
      } else {
        body.push(node);
      }
    }
    flush();
    tree.children = result;
  };
}
