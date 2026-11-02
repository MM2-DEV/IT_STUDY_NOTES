// Draws the diagrams used in the Data Structures and Algorithms notes as SVG files in
// public/diagrams/data-structures-algorithms/. Run: node scripts/draw-dsa-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "data-structures-algorithms");
const INK = "#17292d";
const ACCENT = "#08595a";
const NOTE = "#4b6166";
const FILL = "#eef7f6";
const FONT = 'font-family="Arial, Helvetica, sans-serif"';

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = (x, y, s, { size = 15, anchor = "middle", color = INK, weight = "normal" } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${esc(s)}</text>`;
const line = (x1, y1, x2, y2, { color = INK, width = 2, dash = "" } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const rect = (x, y, w, h, { fill = FILL, stroke = INK, rx = 4 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const caption = (w, y, s) => text(w / 2, y, s, { size: 14, color: NOTE });

function svgDoc(w, h, inner, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${inner}
</svg>
`;
}

const files = {};

// ---------- Recursion: Tower of Hanoi ----------
files["tower-of-hanoi.svg"] = (() => {
  const pegs = [130, 330, 530], base = 230;
  let s = rect(40, base, 580, 14, { fill: "#d5e0e0" });
  pegs.forEach((x, i) => {
    s += rect(x - 5, 70, 10, base - 70, { fill: "#9aa9ab", stroke: "#7a8a8d", rx: 3 });
    s += text(x, base + 34, ["A (source)", "B (auxiliary)", "C (destination)"][i], { weight: "bold" });
  });
  [[150, "3"], [110, "2"], [70, "1"]].forEach(([w, n], k) => {
    const y = base - 30 * (k + 1);
    s += rect(pegs[0] - w / 2, y, w, 26, { fill: ["#69c6ca", "#83749e", "#dbda65"][k], rx: 8 }) + text(pegs[0], y + 13, `disc ${n}`, { size: 13, weight: "bold" });
  });
  return svgDoc(660, 300, s + caption(660, 288, "Tower of Hanoi with 3 discs: move all discs from A to C using B"), "Tower of Hanoi");
})();

// ---------- Linked lists ----------
const arrowHead = (x, y, dir = "right") => {
  const d = { right: `M${x},${y} l-9,-5 v10 Z`, left: `M${x},${y} l9,-5 v10 Z`, up: `M${x},${y} l-5,9 h10 Z`, down: `M${x},${y} l-5,-9 h10 Z` }[dir];
  return `<path d="${d}" fill="${INK}"/>`;
};
const arrowTo = (pts, dir = "right") => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="2"/>` + arrowHead(...pts[pts.length - 1], dir);
const nullBox = (x, y) => text(x, y, "NULL", { size: 13, color: NOTE, weight: "bold" });

// Singly linked list node: [data | next]
function sllNode(x, y, data) {
  return rect(x, y, 60, 40) + rect(x + 60, y, 34, 40, { fill: "#fff" }) + text(x + 30, y + 20, data, { weight: "bold" }) + `<circle cx="${x + 77}" cy="${y + 20}" r="4" fill="${INK}"/>`;
}
files["singly-linked-list.svg"] = (() => {
  const y = 60, xs = [100, 240, 380, 520], vals = ["10", "20", "30", "40"];
  let s = text(40, y + 20, "head", { weight: "bold", color: ACCENT }) + arrowTo([[62, y + 20], [100, y + 20]]);
  xs.forEach((x, i) => {
    s += sllNode(x, y, vals[i]);
    if (i < 3) s += arrowTo([[x + 77, y + 20], [xs[i + 1], y + 20]]);
  });
  s += arrowTo([[597, y + 20], [630, y + 20]]) + nullBox(662, y + 20);
  s += text(130, y + 58, "data", { size: 12, color: NOTE }) + text(177, y + 58, "next", { size: 12, color: NOTE });
  return svgDoc(720, 150, s + caption(720, 135, "Singly linked list: each node has data and a pointer to the next node; the last points to NULL"), "Singly linked list");
})();

// Doubly linked list node: [prev | data | next]
function dllNode(x, y, data) {
  return rect(x, y, 30, 40, { fill: "#fff" }) + rect(x + 30, y, 56, 40) + rect(x + 86, y, 30, 40, { fill: "#fff" }) + text(x + 58, y + 20, data, { weight: "bold" });
}
files["doubly-linked-list.svg"] = (() => {
  const y = 60, xs = [110, 280, 450], vals = ["10", "20", "30"];
  let s = text(45, y + 20, "head", { weight: "bold", color: ACCENT }) + arrowTo([[68, y + 20], [110, y + 20]]);
  xs.forEach((x, i) => {
    s += dllNode(x, y, vals[i]);
    if (i < 2) {
      s += arrowTo([[x + 101, y + 12], [xs[i + 1], y + 12]]);
      s += arrowTo([[xs[i + 1] + 15, y + 28], [x + 116, y + 28]], "left");
    }
  });
  s += text(125, y + 58, "prev", { size: 12, color: NOTE }) + text(168, y + 58, "data", { size: 12, color: NOTE }) + text(211, y + 58, "next", { size: 12, color: NOTE });
  s += line(125, y + 40, 125, y + 0, { color: INK, width: 0 }) + text(125, y - 14, "NULL", { size: 11, color: NOTE, weight: "bold" }) + line(125, y - 6, 125, y + 20, { width: 1.5 });
  s += text(551, y - 14, "NULL", { size: 11, color: NOTE, weight: "bold" }) + line(551, y - 6, 551, y + 20, { width: 1.5 });
  return svgDoc(640, 150, s + caption(640, 135, "Doubly linked list: each node points to both the previous and the next node"), "Doubly linked list");
})();

files["circular-linked-list.svg"] = (() => {
  const y = 50, xs = [100, 240, 380, 520], vals = ["10", "20", "30", "40"];
  let s = text(40, y + 20, "head", { weight: "bold", color: ACCENT }) + arrowTo([[62, y + 20], [100, y + 20]]);
  xs.forEach((x, i) => {
    s += sllNode(x, y, vals[i]);
    if (i < 3) s += arrowTo([[x + 77, y + 20], [xs[i + 1], y + 20]]);
  });
  s += arrowTo([[597, y + 20], [640, y + 20], [640, y + 80], [80, y + 80], [80, y + 34], [100, y + 34]]);
  s += text(360, y + 94, "the last node points back to the first node", { size: 12, color: NOTE });
  return svgDoc(700, 175, s + caption(700, 160, "Circular (singly) linked list: there is no NULL at the end"), "Circular linked list");
})();

// ---------- Trees ----------
const circle = (x, y, label, { fill = FILL, r = 18 } = {}) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="2"/>` + text(x, y + 1, label, { size: 14, weight: "bold" });

// Binary tree from a level-order array (null = no node); node i has children 2i+1 and 2i+2.
function binaryTree(x0, y0, width, levelGap, values, { highlight = [] } = {}) {
  const pos = values.map((_, i) => {
    const level = Math.floor(Math.log2(i + 1)), first = 2 ** level - 1;
    return [x0 + ((i - first + 0.5) * width) / 2 ** level, y0 + level * levelGap];
  });
  let edges = "", nodes = "";
  values.forEach((v, i) => {
    if (v === null || v === undefined) return;
    if (i > 0) edges += line(...pos[Math.floor((i - 1) / 2)], ...pos[i]);
    nodes += circle(...pos[i], v, { fill: highlight.includes(v) ? "#dbda65" : FILL });
  });
  return edges + nodes;
}

files["tree-terminology.svg"] = (() => {
  const P = { A: [330, 50], B: [170, 130], C: [330, 130], D: [490, 130], E: [100, 210], F: [240, 210], G: [490, 210], H: [190, 290], I: [290, 290] };
  const E = [["A", "B"], ["A", "C"], ["A", "D"], ["B", "E"], ["B", "F"], ["D", "G"], ["F", "H"], ["F", "I"]];
  let s = E.map(([a, b]) => line(...P[a], ...P[b])).join("");
  const leaves = ["E", "H", "I", "C", "G"];
  s += Object.entries(P).map(([k, p]) => circle(...p, k, { fill: k === "A" ? "#69c6ca" : leaves.includes(k) ? "#dbda65" : FILL })).join("");
  ["Level 0", "Level 1", "Level 2", "Level 3"].forEach((l, i) => (s += text(640, 50 + 80 * i, l, { size: 13, color: NOTE, anchor: "end" })));
  s += text(390, 40, "root", { size: 13, color: ACCENT, weight: "bold", anchor: "start" });
  s += rect(30, 330, 14, 14, { fill: "#69c6ca", rx: 7 }) + text(52, 337, "root", { size: 13, anchor: "start" });
  s += rect(110, 330, 14, 14, { fill: "#dbda65", rx: 7 }) + text(132, 337, "leaf (no children): C, E, G, H, I", { size: 13, anchor: "start" });
  s += rect(380, 330, 14, 14, { rx: 7 }) + text(402, 337, "internal node: A, B, D, F", { size: 13, anchor: "start" });
  return svgDoc(660, 390, s + caption(660, 375, "Height of the tree = 3 (edges on the longest root-to-leaf path A-B-F-H); degree of A = 3"), "Tree terminology");
})();

files["binary-tree-types.svg"] = (() => {
  let s = "";
  const panels = [
    ["Full", [1, 2, 3, 4, 5]],
    ["Complete", [1, 2, 3, 4, 5, 6]],
    ["Perfect", [1, 2, 3, 4, 5, 6, 7]],
    ["Right-skewed", [1, null, 2, null, null, null, 3]],
  ];
  panels.forEach(([name, vals], k) => {
    const x = 20 + k * 200;
    s += text(x + 90, 22, name, { weight: "bold", color: ACCENT });
    s += binaryTree(x, 55, 180, 65, vals);
  });
  const notes = ["every node has 0 or 2 children", "all levels full except the last,", "all internal nodes have 2 children", "each node has at most one child"];
  const notes2 = ["", "which is filled from the left", "and all leaves on the same level", "(behaves like a linked list)"];
  notes.forEach((n, k) => (s += text(110 + k * 200, 222, n, { size: 11, color: NOTE }) + text(110 + k * 200, 238, notes2[k], { size: 11, color: NOTE })));
  return svgDoc(820, 255, s, "Types of binary tree");
})();

files["bst-example.svg"] = (() => {
  const s = binaryTree(60, 40, 520, 75, [50, 30, 70, 20, 40, 60, 80]);
  return svgDoc(640, 240, s + caption(640, 225, "Binary search tree: left subtree < node < right subtree; inorder gives 20 30 40 50 60 70 80"), "Binary search tree");
})();

// ---------- Heaps ----------
function arrayRow(x, y, values, cell = 40) {
  let s = "";
  values.forEach((v, i) => {
    s += rect(x + i * cell, y, cell, 32, { rx: 0 }) + text(x + i * cell + cell / 2, y + 16, v, { size: 14, weight: "bold" });
    s += text(x + i * cell + cell / 2, y + 46, i, { size: 11, color: NOTE });
  });
  return s;
}
files["max-min-heap.svg"] = (() => {
  const mx = [44, 42, 35, 33, 31, 19, 27, 10, 26, 14], mn = [10, 14, 19, 26, 31, 42, 27, 44, 35, 33];
  let s = text(210, 22, "Max heap (parent ≥ children)", { weight: "bold", color: ACCENT });
  s += text(650, 22, "Min heap (parent ≤ children)", { weight: "bold", color: ACCENT });
  s += binaryTree(20, 60, 380, 62, mx) + binaryTree(460, 60, 380, 62, mn);
  s += arrayRow(10, 280, mx) + arrayRow(450, 280, mn);
  s += text(210, 350, "array (index under each cell)", { size: 12, color: NOTE }) + text(650, 350, "array (index under each cell)", { size: 12, color: NOTE });
  return svgDoc(860, 395, s + caption(860, 380, "Both heaps built by inserting 35, 33, 42, 10, 14, 19, 27, 44, 26, 31; children of index i are at 2i+1 and 2i+2"), "Max heap and min heap");
})();

// ---------- AVL rotations ----------
files["avl-rotations.svg"] = (() => {
  const arrow = (x, y) => arrowTo([[x, y], [x + 50, y]]);
  const panels = [
    ["LL case: right rotation", [30, 20, null, 10], [20, 10, 30]],
    ["RR case: left rotation", [10, null, 20, null, null, null, 30], [20, 10, 30]],
    ["LR case: left, then right", [30, 10, null, null, 20], [20, 10, 30]],
    ["RL case: right, then left", [10, null, 30, null, null, 20], [20, 10, 30]],
  ];
  let s = "";
  panels.forEach(([title, before, after], k) => {
    const x = (k % 2) * 420, y = Math.floor(k / 2) * 230;
    s += text(x + 200, y + 22, title, { weight: "bold", color: ACCENT });
    s += binaryTree(x + 10, y + 60, 170, 55, before) + arrow(x + 190, y + 120) + binaryTree(x + 250, y + 60, 150, 55, after);
    s += text(x + 95, y + 205, "balance factor ±2", { size: 12, color: NOTE }) + text(x + 325, y + 205, "balanced", { size: 12, color: NOTE });
  });
  return svgDoc(840, 470, s + caption(840, 458, "The four AVL imbalance cases and the rotations that fix them (inserting 10, 20, 30 in different orders)"), "AVL rotations");
})();

// ---------- B-tree and B+ tree ----------
function keyNode(cx, y, keys, { fill = FILL, cell = 32 } = {}) {
  const w = keys.length * cell, x = cx - w / 2;
  let s = "";
  keys.forEach((k, i) => (s += rect(x + i * cell, y, cell, 30, { fill, rx: 0 }) + text(x + i * cell + cell / 2, y + 15, k, { size: 13, weight: "bold" })));
  return { svg: s, x, w };
}
files["b-tree-example.svg"] = (() => {
  const root = keyNode(380, 30, [6, 10, 18]);
  const leaves = [[1, 2, 4, 5], [7, 8, 9], [11, 13], [19, 24]];
  const cx = [110, 300, 470, 640];
  let s = "";
  leaves.forEach((ks, i) => {
    const n = keyNode(cx[i], 140, ks);
    s += line(root.x + i * 32, 60, cx[i], 140) + n.svg;
  });
  s += root.svg;
  s += text(380, 200, "every leaf at the same level; keys inside each node in ascending order", { size: 12, color: NOTE });
  return svgDoc(760, 245, s + caption(760, 228, "B-tree of order 5 after inserting 1, 7, 6, 2, 11, 4, 8, 13, 10, 5, 19, 9, 18, 24"), "B-tree example");
})();
files["bplus-tree-example.svg"] = (() => {
  const root = keyNode(350, 30, [10, 20]);
  const leaves = [[3, 5, 8], [10, 15], [20, 25, 30]];
  const cx = [130, 350, 570];
  let s = "";
  leaves.forEach((ks, i) => {
    const n = keyNode(cx[i], 140, ks, { fill: "#fdfbe6" });
    s += line(root.x + i * 32, 60, cx[i], 140) + n.svg;
    if (i < 2) s += arrowTo([[n.x + n.w, 155], [keyNode(cx[i + 1], 140, leaves[i + 1]).x, 155]]);
  });
  s += root.svg + text(470, 45, "index (internal) node: keys only", { size: 12, color: NOTE, anchor: "start" });
  s += text(350, 200, "leaf nodes hold all the keys (with data pointers) and are linked in order", { size: 12, color: NOTE });
  return svgDoc(700, 245, s + caption(700, 228, "B+ tree: searching for 15 follows 10 ≤ 15 < 20 to the middle leaf"), "B+ tree example");
})();

// ---------- Huffman tree ----------
files["huffman-tree.svg"] = (() => {
  const P = { r: [250, 40, "100"], f: [130, 120, "f:45"], n55: [370, 120, "55"], n25: [280, 200, "25"], n30: [460, 200, "30"],
    c: [230, 280, "c:12"], d: [330, 280, "d:13"], n14: [410, 280, "14"], e: [520, 280, "e:16"], a: [360, 360, "a:5"], b: [460, 360, "b:9"] };
  const E = [["r", "f", "0"], ["r", "n55", "1"], ["n55", "n25", "0"], ["n55", "n30", "1"], ["n25", "c", "0"], ["n25", "d", "1"],
    ["n30", "n14", "0"], ["n30", "e", "1"], ["n14", "a", "0"], ["n14", "b", "1"]];
  let s = "";
  E.forEach(([p, q, bit]) => {
    const [x1, y1] = P[p], [x2, y2] = P[q];
    s += line(x1, y1, x2, y2) + text((x1 + x2) / 2 + (x2 < x1 ? -10 : 10), (y1 + y2) / 2 - 6, bit, { size: 14, weight: "bold", color: ACCENT });
  });
  Object.values(P).forEach(([x, y, l]) => {
    const leaf = l.includes(":");
    s += leaf ? rect(x - 28, y - 15, 56, 30, { fill: "#fdfbe6" }) + text(x, y, l, { size: 13, weight: "bold" }) : circle(x, y, l, { r: 20 });
  });
  s += text(620, 120, "Codes", { weight: "bold", anchor: "start", color: ACCENT });
  ["f = 0", "c = 100", "d = 101", "a = 1100", "b = 1101", "e = 111"].forEach((c, i) => (s += text(620, 150 + i * 24, c, { size: 14, anchor: "start" })));
  return svgDoc(760, 420, s + caption(760, 405, "Huffman tree: left edge = 0, right edge = 1; frequent characters get shorter codes"), "Huffman tree");
})();

// ---------- Graphs ----------
const GP = { 0: [90, 60], 1: [40, 160], 2: [190, 140], 3: [60, 270], 4: [200, 250], 5: [130, 340] };
const GE = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [3, 5], [4, 5]];
files["graph-representation.svg"] = (() => {
  let s = text(120, 22, "Undirected graph", { weight: "bold", color: ACCENT });
  s += GE.map(([a, b]) => line(...GP[a], ...GP[b])).join("") + Object.entries(GP).map(([k, p]) => circle(...p, k)).join("");
  // adjacency matrix
  const mx = 300, my = 70, c = 32;
  s += text(mx + 3.5 * c, 22, "Adjacency matrix", { weight: "bold", color: ACCENT });
  for (let i = 0; i < 6; i++) {
    s += text(mx + (i + 1.5) * c, my - 14, i, { size: 13, color: NOTE, weight: "bold" }) + text(mx + 0.5 * c, my + (i + 0.5) * c, i, { size: 13, color: NOTE, weight: "bold" });
    for (let j = 0; j < 6; j++) {
      const on = GE.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
      s += rect(mx + (j + 1) * c, my + i * c, c, c, { fill: on ? "#d6efee" : "#fff", rx: 0 }) + text(mx + (j + 1.5) * c, my + (i + 0.5) * c, on ? 1 : 0, { size: 13, weight: on ? "bold" : "normal" });
    }
  }
  // adjacency list
  const lx = 600, ly = 70;
  s += text(lx + 110, 22, "Adjacency list", { weight: "bold", color: ACCENT });
  const adj = { 0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1, 5], 4: [1, 2, 5], 5: [3, 4] };
  Object.entries(adj).forEach(([v, ns], i) => {
    const y = ly + i * 40;
    s += rect(lx, y, 34, 28) + text(lx + 17, y + 14, v, { size: 13, weight: "bold" });
    ns.forEach((n, k) => {
      const x = lx + 70 + k * 64;
      s += arrowTo([[x - (k ? 22 : 36), y + 14], [x, y + 14]]) + rect(x, y, 34, 28, { fill: "#fff" }) + text(x + 17, y + 14, n, { size: 13 });
    });
  });
  return svgDoc(860, 385, s + caption(860, 372, "The same graph stored as an adjacency matrix (V × V) and as an adjacency list (one list of neighbours per vertex)"), "Graph representations");
})();

files["directed-graph.svg"] = (() => {
  const P = { A: [80, 60], B: [260, 60], C: [260, 200], D: [80, 200] };
  const E = [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["A", "C"]];
  let s = "";
  E.forEach(([a, b]) => {
    const [x1, y1] = P[a], [x2, y2] = P[b], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
    const ex = x2 - ux * 20, ey = y2 - uy * 20;
    s += line(x1 + ux * 20, y1 + uy * 20, ex, ey) + `<path d="M${ex},${ey} l${-10 * ux + 5 * uy},${-10 * uy - 5 * ux} l${-10 * uy},${10 * ux} Z" fill="${INK}"/>`;
  });
  s += Object.entries(P).map(([k, p]) => circle(...p, k)).join("");
  s += text(330, 60, "A: in-degree 1, out-degree 2", { size: 13, anchor: "start" }) + text(330, 90, "B: in-degree 1, out-degree 1", { size: 13, anchor: "start" });
  s += text(330, 120, "C: in-degree 2, out-degree 1", { size: 13, anchor: "start" }) + text(330, 150, "D: in-degree 1, out-degree 1", { size: 13, anchor: "start" });
  return svgDoc(560, 260, s + caption(560, 245, "Directed graph: sum of in-degrees = sum of out-degrees = number of edges (5)"), "Directed graph");
})();

// ---------- Weighted graph helper (MST, shortest paths) ----------
function weightedGraph(P, E, { bold = [], directed = false, labels = {} } = {}) {
  let s = "";
  E.forEach(([a, b, w]) => {
    let [x1, y1] = P[a], [x2, y2] = P[b];
    const on = bold.some(([p, q]) => (p === a && q === b) || (!directed && p === b && q === a));
    const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
    if (directed && E.some(([p, q]) => p === b && q === a)) {
      // two opposite edges: shift each to its own side so they and their labels do not overlap
      x1 -= uy * 8; x2 -= uy * 8; y1 += ux * 8; y2 += ux * 8;
    }
    const color = on ? "#08595a" : "#9aa9ab", width = on ? 4 : 2;
    if (directed) {
      const ex = x2 - ux * 21, ey = y2 - uy * 21;
      s += line(x1 + ux * 20, y1 + uy * 20, ex - ux * 6, ey - uy * 6, { color, width }) + `<path d="M${ex},${ey} l${-12 * ux + 6 * uy},${-12 * uy - 6 * ux} l${-12 * uy},${12 * ux} Z" fill="${color}"/>`;
    } else s += line(x1, y1, x2, y2, { color, width });
    const mx = (x1 + x2) / 2 - uy * 13, my = (y1 + y2) / 2 + ux * 13;
    const lw = 10 + String(w).length * 8;
    if (w !== "") s += `<rect x="${mx - lw / 2}" y="${my - 10}" width="${lw}" height="20" rx="4" fill="#ffffff"/>` + text(mx, my, w, { size: 13, weight: "bold", color: on ? ACCENT : INK });
  });
  Object.entries(P).forEach(([k, p]) => (s += circle(...p, k) + (labels[k] ? text(p[0], p[1] - 30, labels[k], { size: 12, color: ACCENT, weight: "bold" }) : "")));
  return s;
}
files["mst-example.svg"] = (() => {
  const P = { A: [70, 80], B: [230, 50], C: [180, 190], D: [370, 120], E: [330, 280], F: [480, 230] };
  const E = [["A", "B", 6], ["A", "C", 3], ["B", "C", 4], ["B", "D", 2], ["C", "D", 7], ["C", "E", 8], ["D", "E", 9], ["D", "F", 5], ["E", "F", 1]];
  const mst = [["E", "F"], ["B", "D"], ["A", "C"], ["B", "C"], ["D", "F"]];
  return svgDoc(560, 350, weightedGraph(P, E, { bold: mst }) + caption(560, 335, "Thick edges: the minimum spanning tree (total weight 15)"), "Minimum spanning tree");
})();

files["dijkstra-example.svg"] = (() => {
  const P = { A: [70, 160], B: [230, 60], C: [230, 260], D: [400, 160], E: [560, 160] };
  const E = [["A", "B", 4], ["A", "C", 1], ["C", "B", 2], ["B", "D", 1], ["C", "D", 5], ["D", "E", 3]];
  const tree = [["A", "C"], ["C", "B"], ["B", "D"], ["D", "E"]];
  const labels = { A: "0", B: "3", C: "1", D: "4", E: "7" };
  return svgDoc(640, 340, weightedGraph(P, E, { bold: tree, directed: true, labels }) + caption(640, 325, "Shortest distances from A shown above each vertex; thick edges form the shortest-path tree"), "Dijkstra example");
})();
files["floyd-example.svg"] = (() => {
  const P = { 1: [80, 70], 2: [320, 70], 3: [320, 260], 4: [80, 260] };
  const E = [["1", "2", 3], ["2", "1", 8], ["2", "3", 2], ["3", "1", 5], ["3", "4", 1], ["4", "1", 2], ["1", "4", 7]];
  return svgDoc(400, 330, weightedGraph(P, E, { directed: true }) + caption(400, 315, "Directed weighted graph for the Floyd–Warshall example"), "Floyd-Warshall example");
})();

files["topological-dag.svg"] = (() => {
  const P = { 0: [60, 140], 1: [200, 60], 2: [200, 220], 3: [340, 60], 4: [340, 220], 5: [480, 140] };
  const E = [["0", "1", ""], ["0", "2", ""], ["1", "3", ""], ["1", "4", ""], ["2", "4", ""], ["3", "5", ""], ["4", "5", ""]];
  const s = weightedGraph(P, E, { directed: true, bold: E.map(([a, b]) => [a, b]) });
  return svgDoc(540, 290, s + caption(540, 275, "A DAG; valid topological orders include 0 1 2 3 4 5 and 0 2 1 4 3 5"), "Directed acyclic graph");
})();

files["flow-network.svg"] = (() => {
  const P = { S: [60, 170], A: [210, 70], C: [210, 270], B: [400, 70], D: [400, 270], T: [550, 170] };
  const E = [["S", "A", "10/10"], ["S", "C", "9/10"], ["A", "B", "4/4"], ["A", "C", "0/2"], ["A", "D", "6/8"], ["C", "D", "9/9"], ["D", "B", "5/6"], ["B", "T", "9/10"], ["D", "T", "10/10"]];
  let s = weightedGraph(P, E, { directed: true, bold: [["S", "A"], ["C", "D"]] });
  s += `<line x1="135" y1="20" x2="300" y2="330" stroke="#c0392b" stroke-width="2" stroke-dasharray="7 5"/>` + text(290, 330, "minimum cut = 10 + 9 = 19", { size: 12, color: "#c0392b", anchor: "end", weight: "bold" });
  return svgDoc(620, 360, s + caption(620, 350, "Labels show flow/capacity for a maximum flow of 19 from S to T"), "Flow network");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
