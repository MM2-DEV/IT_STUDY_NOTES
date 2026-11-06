import type { BlockContent, Heading, Paragraph, Parent, Root, RootContent } from "mdast";

// Puts the definitions in a topic's notes into a "definition box" (<div class="definition-box">,
// styled in globals.css), so that readers can find them at a glance. The notes need no special
// markup: a top-level paragraph or block quote is treated as a definition when
//   1. it comes right after a heading that starts with "Definition"
//      ("### Definition", "## Definition of Computer");
//   2. it starts with a bold "Definition" label ("**Definition:** A process is …");
//   3. it comes right after a "Concept", "Idea" or "Meaning" heading;
//   4. it is the first paragraph after a heading and begins by naming the heading's term and
//      saying what it is ("### Modularity" followed by "Modularity is the principle of …";
//      "## Concept of a Process" followed by "A process is …");
//   5. it begins with a bold term followed by "is a/an/the", "means", "refers to" or "stands for"
//      ("**Searching** is the process …"),
//      or is a block quote written wholly in bold that says what something is
//      ("> **A process is a program in execution.**");
//   6. it begins with a bold "Term:" label followed by the definition
//      ("**Class:** a class is a user-defined blueprint …", "**Sparse matrix:** a matrix in which …").
// Classifications ("X are of three types"), measurements ("X is measured by …") and labels such as
// "Example:" or "Note:" are not treated as definitions. A definition paragraph that ends with ":"
// keeps the list that follows it in the same box.

type Block = RootContent;

function plainText(node: RootContent | Root): string {
  if ("value" in node && typeof node.value === "string") return node.value;
  if ("children" in node) return (node.children as RootContent[]).map(plainText).join("");
  return "";
}

const normalize = (text: string) => text.replace(/\s+/g, " ").trim().toLowerCase();

/** Words that, right after the term, show that the sentence says what the term is. */
const DEFINING_VERB = /^(?:is|are|refers to|means|stands for)\b/;
/** "X are of three types", "X is classified into …" introduce a classification, not a definition. */
const NOT_A_DEFINITION =
  /^(?:is|are)\s+(?:of\s+\w+\s+(?:types|kinds)|classified|divided|grouped|used|also|measured|collected|calculated|computed|stored|written|drawn|shown)\b/;
/** Bold labels that introduce something other than a definition. */
const OTHER_LABEL =
  /^(?:worked examples?|construction|symbols?|circuit|illustration|limitations?|relation|difference|examples?|notes?|remember|important|formula|rules?|syntax|output|input|steps?|algorithm|advantages?|disadvantages?|uses?|applications?|types?|properties|features?|problem|solution|answer|result|proof|case|why|how|when|where|key|tip|warning|caution|exam tip)\b/i;
const CONCEPT_HEADING = /^(?:concept|idea|meaning|basic idea|the idea)$/i;
/** After a bold term with no heading to match: "is a/an/the …", "means …", "refers to …". */
const STRICT_DEFINING_VERB = /^(?:(?:is|are)\s+(?:a|an|the|one)\b|refers to\b|means\b|stands for\b)/;
/** After a "Term:" label: "a matrix in which …", "a register that …", "an op-amp is a …". */
const DEFINING_PHRASE =
  /^(?:(?:a|an)\s+[^.:;()]{1,60}?\s(?:that|which|in which|whose|where)\b|(?:a|an)\s+\S+(?:\s+\S+){0,2}\s+(?:is|are)\s+(?:a|an|the)\b)/;

/** The term a heading names: "2. Definition of the Waterfall Model (Classical)" → "waterfall model". */
function headingTerm(heading: Heading): string {
  return normalize(
    plainText(heading)
      .replace(/\{#[^}]*\}\s*$/, "")
      .replace(/^\s*(?:[0-9]+|[A-Z])\.\s+/, "")
      .replace(/^(?:definitions?(?:\s+of)?|concept\s+of|introduction\s+to|meaning\s+of|what\s+is)\s+/i, "")
      .replace(/\([^)]*\)/g, "")
      .replace(/^(?:the|a|an)\s+/i, "")
  );
}

/** Text after the subject: drops a leading parenthesis such as "(SDLC)" or "(also called …)". */
function afterSubject(text: string): string {
  return text.replace(/^\s*\([^)]*\)/, "").replace(/^\s*,[^,]*,/, "").trimStart();
}

const defines = (rest: string) => DEFINING_VERB.test(rest) && !NOT_A_DEFINITION.test(rest);

/** Rule 4: "[A|An|The] <term> [(abbreviation)] is/are …". */
function definesTerm(paragraph: Block, term: string): boolean {
  if (!term || paragraph.type !== "paragraph") return false;
  const text = normalize(plainText(paragraph)).replace(/^(?:the|a|an)\s+/, "");
  return text.startsWith(term) && defines(afterSubject(text.slice(term.length)));
}

function firstParagraph(node: Block): Paragraph | null {
  if (node.type === "paragraph") return node;
  if (node.type === "blockquote" && node.children[0]?.type === "paragraph") return node.children[0];
  return null;
}

/** Rule 2. */
function startsWithDefinitionLabel(node: Block): boolean {
  const lead = firstParagraph(node)?.children[0];
  return lead?.type === "strong" && /^definitions?\b/i.test(plainText(lead).trim());
}

/** Rules 5 and 6. */
function startsWithBoldTerm(node: Block): boolean {
  let paragraph = firstParagraph(node);
  // "A **stack** is a …" / "An **algorithm** is a …": an article before the bold term. The bold
  // text is then a term, never a label such as "**Algorithm:**", so OTHER_LABEL does not apply.
  const first = paragraph?.children[0];
  let articleBefore = false;
  if (
    paragraph &&
    node.type === "paragraph" &&
    first?.type === "text" &&
    /^(?:a|an|the)\s+$/i.test(first.value) &&
    paragraph.children[1]?.type === "strong"
  ) {
    paragraph = { ...paragraph, children: paragraph.children.slice(1) };
    articleBefore = true;
  }
  const lead = paragraph?.children[0];
  if (!paragraph || lead?.type !== "strong") return false;
  const label = plainText(lead).trim();

  // A block quote written wholly in bold: "> **A process is a program in execution.**"
  if (node.type === "blockquote" && paragraph.children.length === 1) {
    const text = normalize(label).replace(/^(?:the|a|an)\s+/, "");
    const verb = text.match(/\s(?:is|are|refers to|means|stands for)\s/);
    return !!verb && verb.index! <= 80 && !NOT_A_DEFINITION.test(text.slice(verb.index! + 1));
  }
  if (node.type !== "paragraph") return false;

  const rest = normalize(plainText({ ...paragraph, children: paragraph.children.slice(1) } as Paragraph));
  // "**Term:** a/an … " or "**Term:** <term> is …" (the colon may sit inside or after the bold text).
  if (/:$/.test(label) || rest.startsWith(":")) {
    const term = normalize(label.replace(/:$/, "")).replace(/\([^)]*\)/g, "").trim();
    if (!term || OTHER_LABEL.test(term) || /\b(?:vs|versus)\b/.test(term) || term.split(" ").length > 6) return false;
    const body = rest.replace(/^:\s*/, "");
    const subject = body.replace(/^(?:the|a|an)\s+/, "");
    if (subject.startsWith(term) && defines(afterSubject(subject.slice(term.length)))) return true;
    return DEFINING_PHRASE.test(body);
  }
  // "**Searching** is the process …"
  if (!articleBefore && OTHER_LABEL.test(label)) return false;
  return STRICT_DEFINING_VERB.test(afterSubject(rest)) && !NOT_A_DEFINITION.test(afterSubject(rest));
}

function isHeading(node: Block | undefined, test: (text: string) => boolean): boolean {
  return node?.type === "heading" && test(plainText(node).replace(/\{#[^}]*\}\s*$/, "").trim());
}

function endsWithColon(node: Block): boolean {
  return node.type === "paragraph" && plainText(node).trimEnd().endsWith(":");
}

function box(children: Block[]): Block {
  return {
    type: "blockquote",
    children: children.flatMap((child) => (child.type === "blockquote" ? child.children : [child]) as BlockContent[]),
    data: { hName: "div", hProperties: { className: ["definition-box"] } },
  };
}

function isDefinition(node: Block, previous: Block | undefined): boolean {
  if (node.type !== "paragraph" && node.type !== "blockquote") return false;
  if (isHeading(previous, (text) => /^definitions?\b/i.test(text))) return true;
  if (startsWithDefinitionLabel(node)) return true;
  if (node.type === "paragraph" && isHeading(previous, (text) => CONCEPT_HEADING.test(text))) return true;
  if (previous?.type === "heading" && definesTerm(node, headingTerm(previous))) return true;
  return startsWithBoldTerm(node);
}

function wrapDefinitions(parent: Parent) {
  const nodes = parent.children as Block[];
  const result: Block[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!isDefinition(node, nodes[i - 1])) {
      result.push(node);
      continue;
    }

    const parts = [node];
    const next = nodes[i + 1];
    if (endsWithColon(node) && next?.type === "list") {
      parts.push(next);
      i++;
    }
    result.push(box(parts));
  }

  parent.children = result as Parent["children"];
}

export function remarkDefinitionBoxes() {
  return (tree: Root) => wrapDefinitions(tree);
}
