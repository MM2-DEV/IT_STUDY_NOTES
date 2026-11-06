// Draws the diagrams used in the Artificial Intelligence, Big Data and Cloud Computing notes as SVG files in
// public/diagrams/artificial-intelligence/. Run: node scripts/draw-ai-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "artificial-intelligence");
const INK = "#17292d";
const ACCENT = "#08595a";
const NOTE = "#4b6166";
const FILL = "#eef7f6";
const RED = "#c0392b";
const COLORS = ["#69c6ca", "#cbadd1", "#dbda65", "#9fd3a8", "#f2b880", "#a9c4eb", "#e8a0a0"];
const FONT = 'font-family="Arial, Helvetica, sans-serif"';

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = (x, y, s, { size = 15, anchor = "middle", color = INK, weight = "normal" } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${esc(s)}</text>`;
const line = (x1, y1, x2, y2, { color = INK, width = 2, dash = "" } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const rect = (x, y, w, h, { fill = FILL, stroke = INK, rx = 4, dash = "" } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const caption = (w, y, s) => text(w / 2, y, s, { size: 14, color: NOTE });

// A box with one or more centred lines of text.
function box(x, y, w, h, label, { fill = FILL, size = 14, weight = "bold", rx = 6, stroke = INK, dash = "" } = {}) {
  const lines = String(label).split("\n");
  const gap = size + 4;
  const top = y + h / 2 - ((lines.length - 1) * gap) / 2;
  return rect(x, y, w, h, { fill, rx, stroke, dash }) + lines.map((l, i) => text(x + w / 2, top + i * gap, l, { size, weight })).join("");
}

// Straight or curved arrow; the arrow head is drawn at (x2, y2).
function arrow(x1, y1, x2, y2, { label = "", curve = 0, color = INK, dash = "", size = 12, lx = 0, ly = 0 } = {}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * curve, cy = my + (dx / len) * curve;
  const d = curve ? `M${x1},${y1} Q${cx},${cy} ${x2},${y2}` : `M${x1},${y1} L${x2},${y2}`;
  const ang = curve ? Math.atan2(y2 - cy, x2 - cx) : Math.atan2(dy, dx);
  const h = 10, a = 0.45;
  const p1 = [x2 - h * Math.cos(ang - a), y2 - h * Math.sin(ang - a)];
  const p2 = [x2 - h * Math.cos(ang + a), y2 - h * Math.sin(ang + a)];
  let s = `<path d="${d}" fill="none" stroke="${color}" stroke-width="2"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  s += `<path d="M${x2},${y2} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z" fill="${color}"/>`;
  if (label) {
    const tx = curve ? (mx + cx) / 2 : mx, ty = curve ? (my + cy) / 2 : my;
    s += text(tx + lx, ty + ly, label, { size, color: NOTE, weight: "bold" });
  }
  return s;
}
const polyArrow = (pts, opts = {}) => {
  let s = "";
  for (let i = 0; i < pts.length - 2; i++) s += line(...pts[i], ...pts[i + 1], { color: opts.color || INK, dash: opts.dash || "" });
  return s + arrow(...pts[pts.length - 2], ...pts[pts.length - 1], opts);
};
const circle = (x, y, label, { fill = FILL, r = 22, size = 14 } = {}) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="2"/>` + text(x, y + 1, label, { size, weight: "bold" });
const ellipse = (x, y, rx, ry, label, { fill = FILL, size = 14 } = {}) =>
  `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="2"/>` + text(x, y + 1, label, { size, weight: "bold" });

function svgDoc(w, h, inner, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${inner}
</svg>
`;
}

const files = {};

// Timeline/arrow helpers reused from the networks script
const weightedGraph = (nodes, edges, { r = 22, highlight = [], directed = false } = {}) => {
  let t = "";
  edges.forEach(([a, b, c, lx = 0, ly = 0]) => {
    const on = highlight.some(([p, q]) => (p === a && q === b) || (p === b && q === a));
    const [x1, y1] = nodes[a], [x2, y2] = nodes[b];
    if (directed) { const d = Math.hypot(x2 - x1, y2 - y1); t += arrow(x1 + ((x2 - x1) * r) / d, y1 + ((y2 - y1) * r) / d, x2 - ((x2 - x1) * r) / d, y2 - ((y2 - y1) * r) / d, { color: on ? RED : NOTE }); }
    else t += line(x1, y1, x2, y2, { color: on ? RED : NOTE, width: on ? 4 : 2 });
    if (c !== "" && c !== undefined) t += `<circle cx="${(x1 + x2) / 2 + lx}" cy="${(y1 + y2) / 2 + ly}" r="11" fill="#fff"/>` + text((x1 + x2) / 2 + lx, (y1 + y2) / 2 + ly, String(c), { size: 12, weight: "bold", color: ACCENT });
  });
  Object.entries(nodes).forEach(([k, [x, y]]) => { t += circle(x, y, k, { r, size: 13, fill: COLORS[0] }); });
  return t;
};

// ======================= 10.1 Overview of AI =======================
files["ai-ml-dl.svg"] = (() => {
  let s = `<ellipse cx="300" cy="170" rx="280" ry="150" fill="${COLORS[0]}" fill-opacity="0.35" stroke="${INK}" stroke-width="2"/>`;
  s += `<ellipse cx="350" cy="195" rx="200" ry="110" fill="${COLORS[2]}" fill-opacity="0.55" stroke="${INK}" stroke-width="2"/>`;
  s += `<ellipse cx="395" cy="220" rx="120" ry="65" fill="${COLORS[1]}" fill-opacity="0.8" stroke="${INK}" stroke-width="2"/>`;
  s += text(120, 75, "Artificial intelligence", { size: 15, weight: "bold", anchor: "start" }) + text(120, 95, "machines that act intelligently", { size: 11, color: NOTE, anchor: "start" });
  s += text(220, 125, "Machine learning", { size: 14, weight: "bold", anchor: "start" }) + text(220, 143, "learns patterns from data", { size: 11, color: NOTE, anchor: "start" });
  s += text(395, 215, "Deep learning", { size: 13, weight: "bold" }) + text(395, 233, "many-layer neural networks", { size: 11, color: NOTE });
  s += text(610, 120, "Examples outside ML:", { size: 11, weight: "bold", anchor: "start" }) + text(610, 138, "rule-based expert systems,", { size: 11, anchor: "start", color: NOTE }) + text(610, 154, "search and planning", { size: 11, anchor: "start", color: NOTE });
  return svgDoc(820, 345, s + caption(820, 335, "Deep learning is part of machine learning, which is part of artificial intelligence"), "AI, ML and DL");
})();

files["turing-test.svg"] = (() => {
  let s = rect(20, 30, 230, 200, { fill: "#f7fbfa", rx: 8 }) + text(135, 22, "Hidden from the interrogator", { size: 12, weight: "bold" });
  s += box(60, 55, 150, 50, "A: Computer", { size: 12, fill: COLORS[0] }) + box(60, 155, 150, 50, "B: Human", { size: 12, fill: COLORS[2] });
  s += line(300, 30, 300, 230, { color: RED, width: 3, dash: "8 5" }) + text(300, 245, "wall", { size: 11, color: RED });
  s += box(400, 105, 160, 50, "C: Human\ninterrogator", { size: 12, fill: COLORS[1] });
  s += arrow(400, 120, 212, 80, { color: ACCENT, label: "typed questions", ly: -12, size: 10 }) + arrow(400, 140, 212, 180, { color: ACCENT });
  s += text(330, 275, "If the interrogator cannot reliably tell which of A and B is the machine, the machine passes.", { size: 11, color: NOTE });
  return svgDoc(660, 315, s + caption(660, 303, "The Turing test (imitation game)"), "Turing test");
})();

files["ai-approaches.svg"] = (() => {
  let s = text(300, 22, "Human-like", { size: 13, weight: "bold" }) + text(520, 22, "Rational (ideal)", { size: 13, weight: "bold" });
  s += text(110, 85, "Thinking", { size: 13, weight: "bold", anchor: "end" }) + text(110, 180, "Acting", { size: 13, weight: "bold", anchor: "end" });
  const cells = [[190, 40, "Thinking humanly", "cognitive modelling"], [410, 40, "Thinking rationally", "laws of thought (logic)"], [190, 135, "Acting humanly", "Turing test approach"], [410, 135, "Acting rationally", "rational agent approach"]];
  cells.forEach(([x, y, t1, t2], i) => { s += rect(x, y, 210, 85, { fill: COLORS[i], rx: 6 }) + text(x + 105, y + 33, t1, { size: 13, weight: "bold" }) + text(x + 105, y + 55, t2, { size: 11, color: NOTE }); });
  return svgDoc(640, 255, s + caption(640, 245, "The four approaches to defining AI (Russell and Norvig)"), "Approaches to AI");
})();

// ======================= 10.2 Knowledge Representation =======================
files["knowledge-cycle.svg"] = (() => {
  const cx = 330, cy = 165, R = 115;
  const parts = ["Perception", "Learning", "Knowledge\nrepresentation", "Reasoning", "Planning", "Execution"];
  let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${NOTE}" stroke-width="2" stroke-dasharray="6 5"/>`;
  parts.forEach((l, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / parts.length; const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); s += box(x - 60, y - 22, 120, 44, l, { size: 11, fill: i === 2 || i === 3 ? COLORS[2] : COLORS[0] }); });
  s += text(cx, cy - 6, "AI system", { size: 13, weight: "bold" }) + text(cx, cy + 12, "(agent)", { size: 11, color: NOTE });
  s += box(520, 140, 110, 50, "Environment\n(real world)", { size: 11, fill: "#fff" });
  return svgDoc(660, 330, s + caption(660, 318, "The AI knowledge cycle: knowledge representation and reasoning are at its centre"), "Knowledge cycle");
})();

files["semantic-network.svg"] = (() => {
  const N = { Animal: [380, 40], Mammal: [380, 140], Bird: [600, 140], Cat: [380, 240], Tom: [200, 330], Fur: [600, 240], Milk: [180, 200], Priya: [420, 340], Wings: [660, 50] };
  let s = "";
  const E = [["Mammal", "Animal", "is-a"], ["Bird", "Animal", "is-a"], ["Cat", "Mammal", "is-a"], ["Tom", "Cat", "instance-of"], ["Cat", "Fur", "has"], ["Cat", "Milk", "likes"], ["Tom", "Priya", "owned-by"], ["Bird", "Wings", "has"]];
  E.forEach(([a, b, l]) => { const [x1, y1] = N[a], [x2, y2] = N[b]; const d = Math.hypot(x2 - x1, y2 - y1); s += arrow(x1 + ((x2 - x1) * 30) / d, y1 + ((y2 - y1) * 22) / d, x2 - ((x2 - x1) * 34) / d, y2 - ((y2 - y1) * 24) / d, { color: ACCENT }) + text((x1 + x2) / 2 + 8, (y1 + y2) / 2 - 8, l, { size: 11, weight: "bold", color: RED, anchor: "start" }); });
  Object.entries(N).forEach(([k, [x, y]]) => { s += ellipse(x, y, 52, 20, k, { size: 12, fill: k === "Tom" || k === "Priya" ? COLORS[2] : COLORS[0] }); });
  s += text(380, 392, "Nodes are objects or concepts; labelled arcs are relations. Tom inherits 'has fur' and 'is-a animal'.", { size: 11, color: NOTE });
  return svgDoc(760, 430, s + caption(760, 418, "A semantic network"), "Semantic network");
})();

files["frame-example.svg"] = (() => {
  const frame = (x, y, title, rows) => {
    let t = box(x, y, 250, 34, title, { size: 13, fill: COLORS[2] }); rows.forEach(([k, v], i) => { t += box(x, y + 34 + i * 28, 110, 28, k, { size: 11, fill: "#fff", weight: "bold" }) + box(x + 110, y + 34 + i * 28, 140, 28, v, { size: 11, fill: "#fff", weight: "normal" }); });
    return t;
  };
  let s = frame(20, 20, "Frame: Book (class)", [["Slot", "Value"], ["is-a", "Publication"], ["Title", "?"], ["Author", "?"], ["Pages", "default: 200"], ["Language", "default: English"]]);
  s += frame(400, 20, "Frame: Book-1 (instance)", [["Slot", "Value"], ["instance-of", "Book"], ["Title", "Data Structures"], ["Author", "Seymour Lipschutz"], ["Pages", "432"], ["Language", "(inherited) English"]]);
  s += arrow(398, 105, 272, 105, { color: RED, label: "instance-of", ly: -12 });
  s += text(335, 245, "Slots hold values, defaults or procedures; an instance inherits the slot values it does not give itself.", { size: 11, color: NOTE });
  return svgDoc(670, 285, s + caption(670, 273, "Frames: a class frame and an instance frame with slots and values"), "Frames");
})();

files["chaining.svg"] = (() => {
  let s = text(170, 20, "Forward chaining (data-driven)", { size: 13, weight: "bold", color: ACCENT }) + text(510, 20, "Backward chaining (goal-driven)", { size: 13, weight: "bold", color: ACCENT });
  const col = (x, items, dir) => { let t = ""; items.forEach((l, i) => { const y = 40 + i * 62; t += box(x - 90, y, 180, 40, l, { size: 11, fill: i === 0 ? COLORS[0] : i === items.length - 1 ? COLORS[2] : "#fff" }); if (i) t += dir > 0 ? arrow(x, y - 22, x, y - 2) : arrow(x, y - 2, x, y - 22); }); return t; };
  s += col(170, ["Facts: A, B, E", "R1: A ∧ B → C  ⇒  C", "R2: C → D  ⇒  D", "R3: D ∧ E → F  ⇒  F (goal)"], 1);
  s += col(510, ["Goal: F", "R3: need D and E (E known)", "R2: need C", "R1: need A and B (known) ✓"], 1);
  s += text(170, 300, "start from known facts, fire rules, add new facts", { size: 11, color: NOTE }) + text(510, 300, "start from the goal, find rules that prove it", { size: 11, color: NOTE });
  return svgDoc(680, 340, s + caption(680, 328, "Forward and backward chaining on the same rules"), "Forward and backward chaining");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
