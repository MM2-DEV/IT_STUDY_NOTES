import type { Element, ElementContent, Parents, Root } from "hast";

// Turns consecutive code blocks marked with `tab` into one tabbed code box, so the same program
// can be shown in several languages and the reader switches between them:
//
//   ```c tab
//   …
//   ```
//
//   ```python tab
//   …
//   ```
//
// The tabs are radio buttons with labels (styled in globals.css), so they work in the
// pre-rendered HTML without any JavaScript. The label is the language name, or the text after
// `tab=` (```text tab=Output). The first tab is selected.

const LANGUAGE_NAMES: Record<string, string> = {
  c: "C",
  cpp: "C++",
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
  text: "Output",
};

function tabLabel(pre: Element): string | null {
  const code = pre.children[0];
  if (pre.tagName !== "pre" || code?.type !== "element" || code.tagName !== "code") return null;
  const meta = (code.data as { meta?: string } | undefined)?.meta ?? "";
  const match = meta.match(/(?:^|\s)tab(?:=("[^"]*"|\S+))?(?:\s|$)/);
  if (!match) return null;
  if (match[1]) return match[1].replace(/^"|"$/g, "");

  const className = code.properties.className;
  const language = Array.isArray(className)
    ? String(className.find((name) => String(name).startsWith("language-")) ?? "").replace("language-", "")
    : "";
  return LANGUAGE_NAMES[language] ?? (language || "Code");
}

const isBlank = (node: ElementContent) => node.type === "text" && !node.value.trim();

function tabGroup(blocks: Element[], groupId: string): Element {
  const name = `code-tabs-${groupId}`;
  const children: ElementContent[] = [];

  blocks.forEach((pre, index) => {
    const id = `${name}-${index}`;
    children.push(
      {
        type: "element",
        tagName: "input",
        properties: { type: "radio", name, id, className: ["code-tab-input"], checked: index === 0 },
        children: [],
      },
      {
        type: "element",
        tagName: "label",
        properties: { htmlFor: [id], className: ["code-tab-label"] },
        children: [{ type: "text", value: tabLabel(pre) ?? "Code" }],
      }
    );
  });
  blocks.forEach((pre) =>
    children.push({ type: "element", tagName: "div", properties: { className: ["code-tab-panel"] }, children: [pre] })
  );

  return { type: "element", tagName: "div", properties: { className: ["code-tabs"] }, children };
}

export function rehypeCodeTabs() {
  return (tree: Root) => {
    let groups = 0;

    const walk = (parent: Parents) => {
      const nodes = parent.children as ElementContent[];
      const result: ElementContent[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.type !== "element" || tabLabel(node) === null) {
          if (node.type === "element") walk(node);
          result.push(node);
          continue;
        }

        // Collect this code block and the tab-marked code blocks that directly follow it.
        const blocks = [node];
        let j = i + 1;
        while (j < nodes.length) {
          let k = j;
          while (k < nodes.length && isBlank(nodes[k])) k++;
          const next = nodes[k];
          if (next?.type !== "element" || tabLabel(next) === null) break;
          blocks.push(next);
          j = k + 1;
        }
        result.push(tabGroup(blocks, String(++groups)));
        i = j - 1;
      }

      parent.children = result as typeof parent.children;
    };

    walk(tree);
  };
}
