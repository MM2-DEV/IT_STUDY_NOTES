import type { Heading, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

export type NotesHeading = { id: string; title: string };

const ID_SUFFIX = /\s*\{#([a-z0-9]+(?:-[a-z0-9]+)*)\}\s*$/;

function headingText(node: Heading): string {
  let text = "";
  visit(node, (child) => {
    if (child.type === "text" || child.type === "inlineCode") text += child.value;
  });
  return text.trim();
}

/**
 * Turns `## Process States {#process-states}` into a heading with id="process-states".
 * Every level-2 heading must have an ID (they are the sidebar's subtopic anchors);
 * deeper headings may have one. The level-2 headings are collected into `headings`.
 */
export function remarkHeadingIds(options: { headings: NotesHeading[]; file: string }) {
  return (tree: Root) => {
    visit(tree, "heading", (node: Heading) => {
      const last = node.children.at(-1);
      const match = last?.type === "text" ? last.value.match(ID_SUFFIX) : null;

      if (match && last) {
        (last as Text).value = (last as Text).value.replace(ID_SUFFIX, "");
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: match[1] } };
      }

      if (node.depth === 1) {
        throw new Error(`${options.file}: do not use level-1 (#) headings; the page title comes from category.json.`);
      }
      if (node.depth === 2) {
        if (!match) {
          throw new Error(`${options.file}: level-2 heading "${headingText(node)}" needs an ID, e.g. {#my-subtopic}.`);
        }
        options.headings.push({ id: match[1], title: headingText(node) });
      }
    });
  };
}
