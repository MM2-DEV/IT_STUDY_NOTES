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

// ======================= 10.3 Introduction to PROLOG =======================
files["prolog-search-tree.svg"] = (() => {
  let s = box(230, 15, 260, 40, "?- grandparent(rahim, Z).", { size: 12, fill: COLORS[2] });
  s += box(200, 95, 320, 40, "parent(rahim, Y), parent(Y, Z)", { size: 12, fill: "#fff" });
  s += arrow(360, 55, 360, 93, { label: "rule: grandparent(X,Z) :- parent(X,Y), parent(Y,Z)", lx: 175, size: 10 });
  s += box(80, 185, 200, 40, "parent(karim, Z)", { size: 12, fill: "#fff" }) + box(440, 185, 200, 40, "parent(nila, Z)", { size: 12, fill: "#fff" });
  s += arrow(300, 135, 185, 183, { label: "Y = karim", lx: -40, size: 11 }) + arrow(420, 135, 535, 183, { label: "Y = nila", lx: 40, size: 11 });
  s += box(20, 275, 120, 40, "Z = sami ✓", { size: 12, fill: COLORS[3] }) + box(160, 275, 120, 40, "Z = rina ✓", { size: 12, fill: COLORS[3] });
  s += arrow(150, 225, 80, 273) + arrow(215, 225, 220, 273);
  s += box(470, 275, 140, 40, "no fact: fail ✗", { size: 12, fill: "#f6d5d5" }) + arrow(540, 225, 540, 273, { color: RED });
  s += text(360, 345, "Prolog searches depth-first, left to right; after each answer or failure it backtracks to the last choice point.", { size: 11, color: NOTE });
  return svgDoc(720, 385, s + caption(720, 372, "Search tree of a Prolog query with backtracking"), "Prolog search tree");
})();

// ======================= 10.4 Intelligent Agents =======================
files["agent-environment.svg"] = (() => {
  let s = rect(20, 30, 330, 200, { fill: "#f7fbfa", rx: 10 }) + text(185, 22, "Agent", { size: 14, weight: "bold" });
  s += box(40, 60, 110, 44, "Sensors", { size: 12, fill: COLORS[0] }) + box(40, 160, 110, 44, "Actuators", { size: 12, fill: COLORS[2] });
  s += box(190, 100, 140, 64, "Agent program\n(maps percepts\nto actions)", { size: 11, fill: COLORS[1] });
  s += arrow(150, 82, 205, 110) + arrow(205, 155, 150, 180);
  s += rect(470, 30, 200, 200, { fill: COLORS[3], rx: 10 }) + text(570, 130, "Environment", { size: 14, weight: "bold" });
  s += arrow(468, 82, 152, 82, { label: "percepts", ly: -12 }) + arrow(152, 182, 468, 182, { label: "actions", ly: 14 });
  s += text(345, 255, "Agent = architecture + agent program", { size: 12, color: NOTE });
  return svgDoc(690, 290, s + caption(690, 280, "An agent perceives its environment through sensors and acts on it through actuators"), "Agent and environment");
})();

files["agent-types.svg"] = (() => {
  let s = "";
  const panel = (ox, oy, title, steps, fill) => {
    let t = text(ox + 160, oy + 14, title, { size: 13, weight: "bold", color: ACCENT });
    steps.forEach((l, i) => { const y = oy + 28 + i * 40; t += box(ox + 30, y, 260, 30, l, { size: 11, fill: i === steps.length - 1 ? fill : "#fff", weight: i === steps.length - 1 ? "bold" : "normal" }); if (i) t += arrow(ox + 160, y - 10, ox + 160, y - 1); });
    return t;
  };
  s += panel(0, 10, "1. Simple reflex agent", ["Current percept", "Condition–action rule (if … then)", "Action"], COLORS[0]);
  s += panel(360, 10, "2. Model-based reflex agent", ["Percept + internal state (model)", "Condition–action rule", "Action"], COLORS[0]);
  s += panel(0, 185, "3. Goal-based agent", ["State + model", "What will happen if I do action A?", "Does it reach the goal? → Action"], COLORS[2]);
  s += panel(360, 185, "4. Utility-based agent", ["State + model", "What will happen if I do action A?", "How happy (utility)? → Best action"], COLORS[1]);
  return svgDoc(720, 360, s + caption(720, 350, "How the four basic types of agents choose an action"), "Types of agents");
})();

files["learning-agent.svg"] = (() => {
  let s = rect(20, 30, 470, 250, { fill: "#f7fbfa", rx: 10 }) + text(255, 22, "Learning agent", { size: 14, weight: "bold" });
  s += box(50, 55, 150, 44, "Critic", { size: 12, fill: COLORS[1] }) + box(50, 140, 150, 44, "Learning element", { size: 12, fill: COLORS[2] }) + box(50, 220, 150, 44, "Problem generator", { size: 12, fill: COLORS[3] });
  s += box(300, 140, 160, 44, "Performance element", { size: 12, fill: COLORS[0] });
  s += arrow(125, 99, 125, 138, { label: "feedback", lx: 30, size: 10 }) + arrow(200, 155, 298, 155, { label: "changes", ly: -10, size: 10 }) + arrow(298, 170, 200, 170, { label: "knowledge", ly: 12, size: 10 });
  s += arrow(125, 184, 125, 218, { label: "learning goals", lx: 45, size: 10 }) + polyArrow([[200, 242], [380, 242], [380, 186]], { label: "", size: 10 });
  s += text(410, 225, "exploratory actions", { size: 10, color: NOTE });
  s += box(560, 120, 130, 80, "Environment", { size: 13, fill: COLORS[4] });
  s += arrow(558, 140, 462, 150, { label: "percepts", ly: -10, size: 10 }) + arrow(462, 175, 558, 180, { label: "actions", ly: 12, size: 10 });
  s += box(560, 40, 130, 40, "Performance\nstandard", { size: 11, fill: "#fff" }) + arrow(558, 60, 202, 75, { size: 10 });
  return svgDoc(710, 315, s + caption(710, 303, "Components of a learning agent"), "Learning agent");
})();

// ======================= 10.5 First-Order Logic =======================
files["fol-resolution-tree.svg"] = (() => {
  const rows = [
    ["¬likes(John, Peanuts)", "¬food(x) ∨ likes(John, x)", "{x/Peanuts}"],
    ["¬food(Peanuts)", "¬eats(y, z) ∨ killed(y) ∨ food(z)", "{z/Peanuts}"],
    ["¬eats(y, Peanuts) ∨ killed(y)", "eats(Anil, Peanuts)", "{y/Anil}"],
    ["killed(Anil)", "¬alive(k) ∨ ¬killed(k)", "{k/Anil}"],
    ["¬alive(Anil)", "alive(Anil)", "{ }"],
  ];
  let s = "";
  const H = 36, G = 72, top = 20;
  rows.forEach(([l, r, sub], i) => {
    const y = top + i * G;
    s += box(20, y, 270, H, l, { size: 12, fill: i === 0 ? "#f6d5d5" : COLORS[0], weight: "normal" });
    s += box(400, y, 300, H, r, { size: 12, fill: "#fff", weight: "normal" });
    s += arrow(155, y + H, 155, y + G - 2) + arrow(470, y + H, 230, y + G - 2, { label: sub, lx: 5, ly: 22, size: 12 });
  });
  const yE = top + rows.length * G;
  s += box(85, yE, 140, H, "□  (empty clause)", { size: 12, fill: COLORS[3] });
  s += text(560, yE + 22, "Contradiction found, so likes(John, Peanuts) is proved", { size: 11, color: NOTE });
  const h = yE + H + 50;
  return svgDoc(720, h, s + caption(720, h - 12, "Resolution refutation tree: negated goal (red) resolved with knowledge-base clauses"), "Resolution proof tree");
})();

// ======================= 10.6 Search Strategies and Game Playing =======================
files["search-strategies.svg"] = (() => {
  let s = box(250, 15, 220, 40, "Search strategies", { size: 13, fill: COLORS[2] });
  s += box(40, 100, 280, 40, "Uninformed (blind) search", { size: 12, fill: COLORS[0] }) + box(400, 100, 280, 40, "Informed (heuristic) search", { size: 12, fill: COLORS[1] });
  s += arrow(330, 55, 180, 98) + arrow(390, 55, 540, 98);
  ["Breadth-first search", "Depth-first search", "Depth-limited search", "Iterative deepening DFS", "Uniform-cost search", "Bidirectional search"].forEach((l, i) => { s += box(70, 160 + i * 38, 220, 30, `${i + 1}. ${l}`, { size: 11, fill: "#fff", weight: "normal" }); });
  ["Greedy best-first search", "A* search", "Hill climbing (local search)", "Simulated annealing (local search)", "Local beam search (local search)"].forEach((l, i) => { s += box(410, 160 + i * 38, 260, 30, `${i + 1}. ${l}`, { size: 11, fill: "#fff", weight: "normal" }); });
  s += text(180, 405, "use only the problem definition", { size: 11, color: NOTE }) + text(540, 375, "use a heuristic h(n) or objective function", { size: 11, color: NOTE });
  return svgDoc(720, 445, s + caption(720, 432, "Classification of search strategies"), "Search strategies");
})();

files["search-example-graph.svg"] = (() => {
  const N = { S: [70, 160], A: [220, 80], B: [220, 250], D: [400, 50], C: [400, 190], G: [560, 120] };
  const h = { S: 7, A: 6, B: 4, C: 2, D: 5, G: 0 };
  let s = weightedGraph(N, [["S", "A", 1], ["S", "B", 4], ["A", "B", 2, -12, 0], ["A", "C", 5], ["B", "C", 2], ["C", "G", 3], ["A", "D", 3], ["D", "G", 6]], { highlight: [["S", "A"], ["A", "B"], ["B", "C"], ["C", "G"]] });
  const off = { S: [0, 38], A: [0, -32], B: [0, 38], D: [0, -32], C: [0, 38], G: [0, 38] };
  Object.entries(h).forEach(([k, v]) => { s += text(N[k][0] + off[k][0], N[k][1] + off[k][1], `h=${v}`, { size: 12, color: RED, weight: "bold" }); });
  s += text(560, 200, "S = start, G = goal", { size: 11, color: NOTE }) + text(560, 218, "edge label = step cost", { size: 11, color: NOTE }) + text(560, 236, "h = estimated cost to G", { size: 11, color: NOTE });
  s += text(560, 262, "red path: optimal (cost 8)", { size: 11, color: RED });
  return svgDoc(680, 320, s + caption(680, 308, "Example search graph with step costs and heuristic values"), "Example search graph");
})();

files["hill-climbing-landscape.svg"] = (() => {
  const K = [[40, 270], [150, 190], [230, 188], [310, 110], [380, 210], [440, 170], [500, 170], [550, 230], [640, 50], [720, 230]];
  const pts = [];
  for (let i = 0; i < K.length - 1; i++) { const [x1, y1] = K[i], [x2, y2] = K[i + 1]; for (let t = 0; t < 1; t += 0.05) { const u = (1 - Math.cos(Math.PI * t)) / 2; pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * u]); } }
  pts.push(K[K.length - 1]);
  let s = line(30, 290, 740, 290) + line(30, 290, 30, 20) + text(385, 312, "State space", { size: 12, color: NOTE }) + `<text x="14" y="160" transform="rotate(-90 14 160)" font-family="Inter, Arial, sans-serif" font-size="12" fill="${NOTE}" text-anchor="middle">Objective function</text>`;
  s += `<polyline points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  const lab = (x, y, tx, ty, l) => arrow(tx, ty + 6, x, y - 6, { color: NOTE }) + text(tx, ty, l, { size: 11, weight: "bold" });
  s += lab(640, 50, 640, 18, "Global maximum") + lab(310, 110, 290, 60, "Local maximum") + lab(470, 168, 470, 120, "Flat local maximum (plateau)") + lab(190, 186, 150, 140, "Shoulder");
  s += `<circle cx="95" cy="230" r="7" fill="${RED}"/>` + text(110, 254, "Current state", { size: 11, color: RED, anchor: "start" });
  return svgDoc(760, 345, s + caption(760, 334, "State-space landscape for hill climbing"), "Hill climbing landscape");
})();

files["minimax-alpha-beta.svg"] = (() => {
  const leaves = { B: [4, 9, 6], C: [3, 8, 7], D: [5, 2, 10] };
  const pruned = { C: [1, 2], D: [2] };
  const X = { B: 140, C: 370, D: 600 };
  let s = box(330, 20, 80, 40, "A  4", { size: 13, fill: COLORS[2] }) + text(430, 45, "MAX", { size: 11, color: NOTE, anchor: "start" });
  Object.entries(X).forEach(([n, x]) => {
    s += arrow(370, 60, x, 118) + box(x - 40, 120, 80, 40, `${n}  ${n === "B" ? 4 : n === "C" ? "≤3" : "≤2"}`, { size: 13, fill: COLORS[0] });
    leaves[n].forEach((v, i) => {
      const lx = x - 70 + i * 70, p = (pruned[n] || []).includes(i);
      s += line(x, 160, lx, 228, { color: p ? NOTE : INK, dash: p ? "5 4" : "" });
      s += box(lx - 22, 230, 44, 36, String(v), { size: 13, fill: p ? "#fff" : FILL, stroke: p ? NOTE : INK, dash: p ? "5 4" : "" });
      if (p) s += text(lx, 284, "pruned", { size: 10, color: RED });
    });
  });
  s += text(690, 145, "MIN", { size: 11, color: NOTE, anchor: "start" });
  s += text(140, 310, "α = −∞, β = 4 → B = 4; A gets α = 4", { size: 11, color: NOTE });
  s += text(370, 310, "3 ≤ α = 4: prune 8, 7", { size: 11, color: NOTE }) + text(600, 310, "2 ≤ α = 4: prune 10", { size: 11, color: NOTE });
  return svgDoc(740, 360, s + caption(740, 348, "Minimax value of A is 4; alpha–beta pruning skips three leaves (dashed)"), "Minimax and alpha-beta");
})();

files["match-resolve-act.svg"] = (() => {
  let s = box(30, 40, 180, 60, "Working memory\n(facts)", { size: 12, fill: COLORS[0] }) + box(30, 160, 180, 60, "Rule base\n(IF … THEN rules)", { size: 12, fill: COLORS[1] });
  s += box(290, 100, 150, 60, "1. Match", { size: 13, fill: COLORS[2] }) + box(510, 100, 180, 60, "2. Conflict\nresolution", { size: 13, fill: COLORS[2] }) + box(510, 230, 180, 60, "3. Act\n(fire one rule)", { size: 13, fill: COLORS[3] });
  s += arrow(212, 70, 288, 115) + arrow(212, 190, 288, 145) + arrow(442, 130, 508, 130, { label: "conflict set", ly: -12, size: 10 });
  s += arrow(600, 162, 600, 228, { label: "selected rule", lx: 50, size: 10 }) + polyArrow([[508, 275], [12, 275], [12, 70], [28, 70]], { label: "" }) + text(260, 292, "actions add or delete facts", { size: 11, color: NOTE });
  return svgDoc(720, 345, s + caption(720, 333, "The match–resolve–act cycle of a rule-based (production) system"), "Match-resolve-act cycle");
})();

// ======================= 10.7 Natural Language Processing =======================
files["nlp-phases.svg"] = (() => {
  const P = [["1. Lexical and\nmorphological analysis", "words, morphemes"], ["2. Syntactic analysis\n(parsing)", "grammar, structure"], ["3. Semantic\nanalysis", "literal meaning"], ["4. Discourse\nintegration", "meaning from nearby\nsentences"], ["5. Pragmatic\nanalysis", "intended meaning\n(real-world knowledge)"]];
  let s = box(20, 20, 120, 50, "Input text\nor speech", { size: 11, fill: "#fff" });
  P.forEach(([t, n], i) => {
    const y = 95 + i * 62;
    s += box(200, y, 230, 48, t, { size: 11, fill: COLORS[i % 2 ? 1 : 0] }) + text(450, y + 20, n.split("\n")[0], { size: 10, color: NOTE, anchor: "start" });
    if (n.includes("\n")) s += text(450, y + 34, n.split("\n")[1], { size: 10, color: NOTE, anchor: "start" });
    if (i) s += arrow(315, y - 14, 315, y - 1);
  });
  s += polyArrow([[80, 70], [80, 119], [198, 119]]);
  s += box(200, 420, 230, 40, "Meaning / response", { size: 12, fill: COLORS[3] }) + arrow(315, 405, 315, 418);
  return svgDoc(640, 500, s + caption(640, 488, "The five phases of natural language processing"), "Phases of NLP");
})();

files["nlp-parse-tree.svg"] = (() => {
  const N = (x, y, l, leaf) => leaf ? text(x, y + 5, l, { size: 14, weight: "bold", color: ACCENT }) : box(x - 26, y - 15, 52, 30, l, { size: 13, fill: COLORS[0] });
  const T = [["S", 330, 30], ["NP", 170, 100], ["VP", 490, 100], ["Det", 110, 170], ["N", 230, 170], ["V", 400, 170], ["NP", 580, 170], ["Det", 520, 240], ["N", 640, 240]];
  const E = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [6, 7], [6, 8]];
  let s = "";
  E.forEach(([a, b]) => { s += line(T[a][1], T[a][2] + 15, T[b][1], T[b][2] - 15); });
  T.forEach(([l, x, y]) => { s += N(x, y, l); });
  const W = [["The", 110, 3], ["boy", 230, 4], ["reads", 400, 5], ["a", 520, 7], ["book", 640, 8]];
  W.forEach(([w, x, i]) => { const y = T[i][2] + 15; const ly = i >= 7 ? 300 : 300; s += line(x, y, x, ly - 16, { color: NOTE, dash: "4 3" }) + N(x, ly, w, true); });
  s += text(330, 345, "Grammar:  S → NP VP  ·  NP → Det N  ·  VP → V NP  ·  Det → the | a  ·  N → boy | book  ·  V → reads", { size: 11, color: NOTE });
  return svgDoc(720, 395, s + caption(720, 382, "Parse tree of \"The boy reads a book\" with a context-free grammar"), "Parse tree");
})();

// ======================= 10.8 Probabilistic Reasoning =======================
files["bayesian-network.svg"] = (() => {
  const node = (x, y, l) => `<ellipse cx="${x}" cy="${y}" rx="72" ry="24" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>` + text(x, y + 5, l, { size: 13, weight: "bold" });
  const tbl = (x, y, rows, cw = 50) => {
    let t = "";
    rows.forEach((r, i) => r.forEach((c, k) => { t += rect(x + k * cw, y + i * 22, cw, 22, { fill: i ? "#fff" : FILL, rx: 0 }); t += text(x + k * cw + cw / 2, y + i * 22 + 15, c, { size: 11, weight: i ? "normal" : "bold" }); }));
    return t;
  };
  let s = node(170, 60, "Burglary (B)") + node(530, 60, "Earthquake (E)") + node(350, 190, "Alarm (A)") + node(170, 330, "David calls (D)") + node(530, 330, "Sophia calls (S)");
  s += arrow(200, 82, 320, 168) + arrow(500, 82, 380, 168) + arrow(320, 212, 200, 308) + arrow(380, 212, 500, 308);
  s += tbl(20, 15, [["P(B)"], ["0.002"]], 64) + tbl(625, 15, [["P(E)"], ["0.001"]], 64);
  s += tbl(470, 135, [["B", "E", "P(A)"], ["T", "T", "0.94"], ["T", "F", "0.95"], ["F", "T", "0.31"], ["F", "F", "0.001"]], 56);
  s += tbl(20, 375, [["A", "P(D)"], ["T", "0.91"], ["F", "0.05"]], 56) + tbl(580, 375, [["A", "P(S)"], ["T", "0.75"], ["F", "0.02"]], 56);
  return svgDoc(720, 480, s + caption(720, 470, "Bayesian network for the burglar-alarm example, with its conditional probability tables"), "Bayesian network");
})();

// ======================= 10.9 Expert Systems and Computer Vision =======================
files["expert-system-architecture.svg"] = (() => {
  let s = box(20, 140, 110, 50, "User\n(non-expert)", { size: 12, fill: "#fff" });
  s += box(180, 140, 130, 50, "User interface", { size: 12, fill: COLORS[2] });
  s += box(370, 120, 150, 90, "Inference engine\n(forward / backward\nchaining)", { size: 12, fill: COLORS[0] });
  s += box(580, 120, 130, 90, "Knowledge base\n(facts + rules)", { size: 12, fill: COLORS[1] });
  s += box(370, 20, 150, 50, "Explanation\nmodule", { size: 12, fill: COLORS[3] }) + box(370, 260, 150, 50, "Working memory\n(case facts)", { size: 12, fill: FILL });
  s += box(580, 280, 130, 50, "Knowledge\nacquisition", { size: 12, fill: COLORS[4] }) + box(580, 380, 130, 50, "Domain expert +\nknowledge engineer", { size: 11, fill: "#fff" });
  s += arrow(132, 158, 178, 158) + arrow(178, 175, 132, 175) + arrow(312, 158, 368, 158) + arrow(368, 175, 312, 175);
  s += arrow(522, 158, 578, 158) + arrow(578, 175, 522, 175) + arrow(445, 118, 445, 72) + arrow(445, 212, 445, 258) + arrow(445, 258, 445, 212);
  s += polyArrow([[368, 45], [245, 45], [245, 138]]) + arrow(645, 278, 645, 212) + arrow(645, 378, 645, 332);
  return svgDoc(730, 470, s + caption(730, 458, "Architecture of an expert system"), "Expert system architecture");
})();

files["cv-pipeline.svg"] = (() => {
  const steps = [["Image\nacquisition", "camera, sensor"], ["Pre-\nprocessing", "noise removal,\ncontrast"], ["Feature\nextraction", "edges, shapes,\ntextures"], ["Recognition /\nclassification", "ML or CNN\nmodel"], ["Decision\nor action", "label, alarm,\nsteering"]];
  let s = "";
  steps.forEach(([t, n], i) => {
    const x = 15 + i * 142;
    s += box(x, 40, 118, 56, t, { size: 12, fill: COLORS[i % 2 ? 1 : 0] });
    n.split("\n").forEach((l, k) => { s += text(x + 59, 120 + k * 15, l, { size: 10, color: NOTE }); });
    if (i) s += arrow(x - 22, 68, x - 2, 68);
  });
  return svgDoc(730, 185, s + caption(730, 172, "Steps of a computer vision system"), "Computer vision pipeline");
})();

// ======================= 10.10 Knowledge Acquisition and Learning =======================
files["learning-representations.svg"] = (() => {
  let s = box(250, 15, 220, 40, "Learning in AI", { size: 13, fill: COLORS[2] });
  s += box(30, 95, 300, 50, "Symbolic learning\n(knowledge as symbols, rules, logic)", { size: 12, fill: COLORS[0] });
  s += box(390, 95, 300, 50, "Non-symbolic (sub-symbolic) learning\n(knowledge as numbers, weights)", { size: 12, fill: COLORS[1] });
  s += arrow(330, 55, 180, 93) + arrow(390, 55, 540, 93);
  ["Rote learning", "Learning by taking advice", "Learning by induction (examples)", "Explanation-based learning", "Learning by analogy"].forEach((l, i) => { s += box(60, 165 + i * 38, 240, 30, `${i + 1}. ${l}`, { size: 11, fill: "#fff", weight: "normal" }); });
  ["Neural network learning", "Genetic (evolutionary) learning", "Statistical learning"].forEach((l, i) => { s += box(420, 165 + i * 38, 240, 30, `${i + 1}. ${l}`, { size: 11, fill: "#fff", weight: "normal" }); });
  s += text(540, 300, "Supervised, unsupervised and", { size: 11, color: NOTE }) + text(540, 316, "reinforcement learning can be", { size: 11, color: NOTE }) + text(540, 332, "used with either representation", { size: 11, color: NOTE });
  return svgDoc(720, 390, s + caption(720, 378, "Learning methods grouped by the representation of the learned knowledge"), "Learning methods");
})();

files["perceptron.svg"] = (() => {
  let s = circle(70, 70, "x₁", { fill: COLORS[0] }) + circle(70, 170, "x₂", { fill: COLORS[0] }) + circle(70, 270, "1", { fill: "#fff" });
  s += `<circle cx="330" cy="170" r="42" fill="${COLORS[2]}" stroke="${INK}" stroke-width="2"/>` + text(330, 166, "Σ", { size: 22, weight: "bold" }) + text(330, 190, "net", { size: 11, color: NOTE });
  s += arrow(92, 76, 290, 155, { label: "w₁", ly: -14, size: 13 }) + arrow(94, 170, 286, 170, { label: "w₂", ly: -12, size: 13 }) + arrow(92, 262, 290, 186, { label: "b (bias)", ly: 16, size: 12 });
  s += box(420, 145, 120, 50, "Step\nfunction", { size: 12, fill: COLORS[1] }) + arrow(372, 170, 418, 170) + arrow(540, 170, 600, 170) + text(640, 175, "y", { size: 16, weight: "bold" });
  s += text(330, 320, "net = w₁x₁ + w₂x₂ + b;   y = 1 if net > 0, otherwise 0", { size: 12, color: NOTE });
  return svgDoc(700, 370, s + caption(700, 358, "A perceptron with two inputs"), "Perceptron");
})();

// ======================= 10.11 Introduction to Big Data =======================
files["big-data-vs.svg"] = (() => {
  const V = [["Volume", "huge amount\n(TB, PB, EB)"], ["Velocity", "speed of\ngeneration"], ["Variety", "structured, semi-,\nunstructured"], ["Veracity", "quality and\ntrustworthiness"], ["Value", "useful insights"], ["Variability", "changing meaning\nand flow rate"]];
  let s = `<circle cx="360" cy="200" r="62" fill="${COLORS[2]}" stroke="${INK}" stroke-width="2"/>` + text(360, 195, "Big data", { size: 15, weight: "bold" }) + text(360, 214, "6 V's", { size: 12, color: NOTE });
  V.forEach(([v, d], i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6, x = 360 + 230 * Math.cos(a), y = 200 + 150 * Math.sin(a);
    s += line(360 + 64 * Math.cos(a), 200 + 64 * Math.sin(a), x - 70 * Math.cos(a), y - 34 * Math.sin(a), { color: NOTE });
    s += box(x - 75, y - 32, 150, 64, `${v}\n${d}`, { size: 11, fill: i < 3 ? COLORS[0] : i < 5 ? COLORS[1] : COLORS[3] });
  });
  return svgDoc(720, 420, s + caption(720, 408, "The V's of big data: the original 3 V's (teal), Veracity and Value (5 V's), and Variability (6 V's)"), "V's of big data");
})();

files["data-types.svg"] = (() => {
  let s = box(20, 20, 210, 34, "Structured", { size: 13, fill: COLORS[0] }) + box(255, 20, 210, 34, "Semi-structured", { size: 13, fill: COLORS[2] }) + box(490, 20, 210, 34, "Unstructured", { size: 13, fill: COLORS[1] });
  const rows = [["ID", "Name", "Dept"], ["101", "Rina", "CSE"], ["102", "Karim", "EEE"]];
  rows.forEach((r, i) => r.forEach((c, k) => { s += rect(30 + k * 63, 70 + i * 26, 63, 26, { fill: i ? "#fff" : FILL, rx: 0 }) + text(61 + k * 63, 88 + i * 26, c, { size: 11, weight: i ? "normal" : "bold" }); }));
  s += text(125, 175, "fixed schema, rows and columns", { size: 10, color: NOTE });
  ['{ "id": 101,', '  "name": "Rina",', '  "skills": ["C", "SQL"] }'].forEach((l, i) => { s += text(270, 90 + i * 20, l, { size: 11, anchor: "start" }); });
  s += rect(260, 70, 200, 80, { fill: "none", dash: "4 3" }) + text(360, 175, "tags or keys, flexible schema", { size: 10, color: NOTE });
  s += rect(500, 70, 90, 80, { fill: "#fff" }) + `<polyline points="505,140 530,105 550,125 570,95 585,140" fill="none" stroke="${ACCENT}" stroke-width="2"/>` + text(545, 165, "image", { size: 10, color: NOTE });
  s += rect(605, 70, 90, 80, { fill: "#fff" }) + [0, 1, 2, 3].map((i) => line(615, 85 + i * 16, 685 - (i % 2) * 20, 85 + i * 16, { color: NOTE, width: 3 })).join("") + text(650, 165, "free text", { size: 10, color: NOTE });
  s += text(600, 190, "no predefined model", { size: 10, color: NOTE });
  s += arrow(40, 215, 690, 215, { color: NOTE }) + text(365, 235, "less organised, more flexible, harder to query", { size: 11, color: NOTE });
  return svgDoc(720, 275, s + caption(720, 265, "Structured, semi-structured and unstructured data"), "Types of data");
})();

// ======================= 10.12 Big Data Technologies =======================
files["hdfs-architecture.svg"] = (() => {
  let s = box(270, 20, 180, 60, "NameNode (master)\nmetadata: file → blocks\n→ DataNodes", { size: 11, fill: COLORS[2] });
  s += box(520, 20, 180, 60, "Secondary NameNode\n(checkpoints of\nmetadata)", { size: 11, fill: "#fff" }) + arrow(452, 50, 518, 50, { dash: "5 4" });
  s += box(20, 30, 160, 50, "Client", { size: 12, fill: COLORS[3] }) + arrow(182, 50, 268, 50, { label: "metadata ops", ly: -10, size: 10 });
  const blocks = [["B1", "B2", "B4"], ["B1", "B3", "B4"], ["B2", "B3", "B4"], ["B1", "B2", "B3"]];
  blocks.forEach((bs, i) => {
    const x = 30 + i * 172;
    s += rect(x, 170, 150, 110, { fill: "#f7fbfa", rx: 8 }) + text(x + 75, 190, `DataNode ${i + 1}`, { size: 12, weight: "bold" });
    bs.forEach((b, k) => { s += box(x + 10 + k * 45, 210, 40, 50, b, { size: 12, fill: COLORS[["B1", "B2", "B3", "B4"].indexOf(b) % 2 ? 1 : 0] }); });
    s += arrow(x + 75, 168, 360, 82, { color: NOTE, dash: "4 3" });
  });
  s += polyArrow([[100, 82], [100, 140], [105, 168]], { color: ACCENT }) + text(92, 120, "read / write data", { size: 10, color: ACCENT, anchor: "end" });
  s += text(560, 112, "heartbeats and block reports", { size: 10, color: NOTE, anchor: "start" });
  s += text(360, 305, "A 500 MB file = 4 blocks (128 + 128 + 128 + 116 MB); each block is stored on 3 DataNodes (replication factor 3)", { size: 11, color: NOTE });
  return svgDoc(720, 345, s + caption(720, 333, "HDFS master–slave architecture"), "HDFS architecture");
})();

files["mapreduce-wordcount.svg"] = (() => {
  const col = (x, title) => text(x, 22, title, { size: 12, weight: "bold", color: ACCENT });
  let s = col(70, "Input splits") + col(225, "Map") + col(400, "Shuffle and sort") + col(560, "Reduce") + col(670, "Output");
  const inp = ["Deer Bear River", "Car Car River", "Deer Car Bear"];
  const mp = [["Deer,1", "Bear,1", "River,1"], ["Car,1", "Car,1", "River,1"], ["Deer,1", "Car,1", "Bear,1"]];
  inp.forEach((l, i) => { const y = 45 + i * 110; s += box(10, y, 120, 40, l, { size: 11, fill: "#fff", weight: "normal" }) + arrow(132, y + 20, 168, y + 20); s += box(170, y - 10, 110, 64, mp[i].join("\n"), { size: 11, fill: COLORS[0], weight: "normal" }); });
  const sh = [["Bear", "[1, 1]", 2], ["Car", "[1, 1, 1]", 3], ["Deer", "[1, 1]", 2], ["River", "[1, 1]", 2]];
  sh.forEach(([k, v, n], i) => { const y = 40 + i * 82; s += box(340, y, 120, 40, `${k}, ${v}`, { size: 11, fill: COLORS[2], weight: "normal" }) + arrow(462, y + 20, 508, y + 20) + box(510, y, 100, 40, `${k}, ${n}`, { size: 11, fill: COLORS[1], weight: "normal" }) + arrow(612, y + 20, 640, y + 20) + text(675, y + 25, `${k} ${n}`, { size: 12, weight: "bold" }); });
  [0, 1, 2].forEach((i) => { s += line(282, 45 + i * 110 + 22, 338, 170, { color: NOTE, dash: "3 3" }); });
  return svgDoc(720, 395, s + caption(720, 383, "MapReduce word count: map emits (word, 1), shuffle groups by key, reduce sums"), "MapReduce word count");
})();

files["spark-stack.svg"] = (() => {
  let s = "";
  ["Spark SQL\n(DataFrames)", "Spark\nStreaming", "MLlib\n(machine learning)", "GraphX\n(graphs)"].forEach((l, i) => { s += box(30 + i * 170, 20, 150, 60, l, { size: 12, fill: COLORS[i % 2 ? 1 : 0] }); });
  s += box(30, 95, 660, 50, "Spark Core: in-memory computing, RDDs, task scheduling, fault recovery", { size: 12, fill: COLORS[2] });
  s += box(30, 160, 210, 45, "Standalone scheduler", { size: 11, fill: "#fff" }) + box(255, 160, 210, 45, "Hadoop YARN", { size: 11, fill: "#fff" }) + box(480, 160, 210, 45, "Kubernetes / Mesos", { size: 11, fill: "#fff" });
  s += box(30, 220, 660, 45, "Storage: HDFS, HBase, Cassandra, Amazon S3, local files", { size: 11, fill: FILL });
  return svgDoc(720, 305, s + caption(720, 292, "Components of Apache Spark"), "Spark components");
})();

files["nosql-types.svg"] = (() => {
  let s = "";
  const panel = (x, y, title, ex) => box(x, y, 340, 34, title, { size: 12, fill: COLORS[0] }) + rect(x, y + 40, 340, 120, { fill: "#fff", rx: 6 }) + text(x + 170, y + 178, ex, { size: 10, color: NOTE });
  s += panel(20, 15, "1. Key–value store", "Redis, Memcached, Amazon DynamoDB");
  [["user:101", "\"Rina\""], ["cart:101", "[\"pen\", \"book\"]"], ["session:9f", "{…}"]].forEach(([k, v], i) => { s += rect(45, 70 + i * 32, 110, 26, { fill: FILL, rx: 0 }) + text(100, 88 + i * 32, k, { size: 11 }) + arrow(157, 83 + i * 32, 190, 83 + i * 32) + text(195, 88 + i * 32, v, { size: 11, anchor: "start" }); });
  s += panel(380, 15, "2. Document store", "MongoDB, CouchDB, Firestore");
  ['{ "_id": 101,', '  "name": "Rina",', '  "address": { "city": "Dhaka" },', '  "orders": [5, 9] }'].forEach((l, i) => { s += text(400, 78 + i * 24, l, { size: 11, anchor: "start" }); });
  s += panel(20, 215, "3. Column-family (wide-column) store", "Apache Cassandra, HBase, Google Bigtable");
  [["row key", "name", "city"], ["101", "Rina", "Dhaka"], ["102", "Karim", "—"]].forEach((r, i) => r.forEach((c, k) => { s += rect(55 + k * 90, 270 + i * 30, 90, 30, { fill: i ? "#fff" : FILL, rx: 0 }) + text(100 + k * 90, 290 + i * 30, c, { size: 11, weight: i ? "normal" : "bold" }); }));
  s += panel(380, 215, "4. Graph database", "Neo4j, Amazon Neptune");
  s += circle(440, 300, "Rina", { r: 26, size: 11 }) + circle(560, 270, "Karim", { r: 26, size: 11 }) + circle(640, 330, "Dhaka", { r: 26, size: 11, fill: COLORS[2] });
  s += arrow(466, 293, 534, 277, { label: "FRIEND", ly: -10, size: 9 }) + arrow(466, 308, 614, 328, { label: "LIVES_IN", ly: 14, size: 9 });
  return svgDoc(740, 430, s + caption(740, 418, "The four types of NoSQL databases"), "NoSQL types");
})();

// ======================= 10.13 Data Warehousing and Analytics =======================
files["dw-architecture.svg"] = (() => {
  let s = text(80, 22, "Data sources", { size: 12, weight: "bold", color: ACCENT });
  ["Operational\ndatabases (OLTP)", "Flat files,\nspreadsheets", "External data,\nweb, logs"].forEach((l, i) => { s += box(15, 35 + i * 75, 130, 55, l, { size: 11, fill: "#fff" }) + arrow(147, 62 + i * 75, 188, 140); });
  s += box(190, 110, 90, 60, "ETL\n(extract,\ntransform, load)", { size: 10, fill: COLORS[4] });
  s += rect(300, 30, 190, 260, { fill: "#f7fbfa", rx: 10 }) + text(395, 50, "Bottom tier", { size: 12, weight: "bold", color: ACCENT });
  s += box(315, 65, 160, 70, "Data warehouse\n(RDBMS server)", { size: 12, fill: COLORS[0] }) + box(315, 150, 160, 40, "Metadata repository", { size: 11, fill: FILL }) + box(315, 205, 75, 70, "Data\nmart:\nsales", { size: 10, fill: COLORS[1] }) + box(400, 205, 75, 70, "Data\nmart:\nfinance", { size: 10, fill: COLORS[1] });
  s += arrow(282, 140, 313, 105);
  s += rect(510, 70, 100, 120, { fill: "#f7fbfa", rx: 10 }) + text(560, 88, "Middle tier", { size: 12, weight: "bold", color: ACCENT }) + box(520, 100, 80, 75, "OLAP\nserver\n(ROLAP /\nMOLAP)", { size: 10, fill: COLORS[2] });
  s += arrow(477, 110, 518, 125);
  s += rect(630, 30, 95, 260, { fill: "#f7fbfa", rx: 10 }) + text(677, 50, "Top tier", { size: 12, weight: "bold", color: ACCENT });
  ["Query and\nreporting", "Analysis\n(OLAP)", "Data\nmining", "Dashboards"].forEach((l, i) => { s += box(638, 62 + i * 56, 80, 46, l, { size: 10, fill: "#fff" }); });
  s += arrow(602, 137, 636, 137);
  return svgDoc(740, 330, s + caption(740, 318, "Three-tier data warehouse architecture"), "Data warehouse architecture");
})();

files["analytics-types.svg"] = (() => {
  const T = [["Descriptive", "What happened?", "reports, dashboards"], ["Diagnostic", "Why did it happen?", "drill-down, data mining"], ["Predictive", "What will happen?", "ML, forecasting"], ["Prescriptive", "What should we do?", "optimisation, AI"]];
  let s = "";
  T.forEach(([n, q, e], i) => { const x = 30 + i * 170, y = 200 - i * 60; s += box(x, y, 150, 66, `${i + 1}. ${n}\n${q}`, { size: 12, fill: COLORS[i % 2 ? 1 : 0] }) + text(x + 75, y + 82, e, { size: 10, color: NOTE }); });
  return svgDoc(720, 320, s + caption(720, 308, "The four types of data analytics, from looking back (descriptive) to recommending actions (prescriptive)"), "Types of data analytics");
})();

// ======================= 10.14 Introduction to Cloud Computing =======================
files["nist-cloud-model.svg"] = (() => {
  const col = (x, w, title, items, fill) => {
    let t = box(x, 20, w, 40, title, { size: 12, fill });
    items.forEach((l, i) => { t += box(x + 10, 75 + i * 46, w - 20, 38, l, { size: 11, fill: "#fff", weight: "normal" }); });
    return t;
  };
  let s = col(15, 250, "5 essential characteristics", ["On-demand self-service", "Broad network access", "Resource pooling", "Rapid elasticity", "Measured service"], COLORS[0]);
  s += col(285, 210, "3 service models", ["SaaS (software)", "PaaS (platform)", "IaaS (infrastructure)"], COLORS[1]);
  s += col(515, 210, "4 deployment models", ["Public cloud", "Private cloud", "Community cloud", "Hybrid cloud"], COLORS[2]);
  return svgDoc(740, 340, s + caption(740, 325, "The NIST cloud model: 5 essential characteristics, 3 service models and 4 deployment models"), "NIST cloud model");
})();

files["cloud-overview.svg"] = (() => {
  let s = `<path d="M250 150 C 210 150 200 100 245 92 C 250 50 320 40 345 75 C 370 35 450 40 455 85 C 510 80 520 150 470 150 Z" fill="${COLORS[0]}" fill-opacity="0.5" stroke="${INK}" stroke-width="2"/>`;
  s += text(360, 95, "Cloud provider's data centres", { size: 12, weight: "bold" }) + text(360, 115, "shared pool: servers, storage,", { size: 11 }) + text(360, 131, "networks, platforms, applications", { size: 11 });
  [["Laptop", 60], ["Mobile phone", 210], ["Office PC", 360], ["Tablet", 510], ["IoT device", 640]].forEach(([d, x]) => { s += box(x - 55, 250, 110, 36, d, { size: 11, fill: "#fff" }) + arrow(x, 248, 360 + (x - 360) * 0.25, 175, { color: NOTE }); });
  s += box(270, 175, 180, 34, "Internet", { size: 12, fill: COLORS[2] });
  s += text(360, 310, "Users rent resources on demand over the network and pay for what they use", { size: 11, color: NOTE });
  return svgDoc(720, 345, s + caption(720, 335, "Cloud computing: on-demand access to a shared pool of remote resources"), "Cloud computing overview");
})();

// ======================= 10.15 Cloud Service Models =======================
files["cloud-service-models.svg"] = (() => {
  const layers = ["Applications", "Data", "Runtime", "Middleware", "Operating system", "Virtualization", "Servers", "Storage", "Networking"];
  const models = [["On-premises", 9], ["IaaS", 5], ["PaaS", 2], ["SaaS", 0]];
  let s = "";
  models.forEach(([m, you], c) => {
    const x = 20 + c * 180;
    s += text(x + 75, 22, m, { size: 13, weight: "bold", color: ACCENT });
    layers.forEach((l, i) => { const mine = i < you; s += box(x, 35 + i * 34, 150, 28, l, { size: 11, fill: mine ? COLORS[2] : COLORS[0], weight: "normal" }); });
  });
  s += rect(150, 355, 18, 14, { fill: COLORS[2], rx: 2 }) + text(176, 367, "managed by the customer", { size: 11, anchor: "start" });
  s += rect(380, 355, 18, 14, { fill: COLORS[0], rx: 2 }) + text(406, 367, "managed by the cloud provider", { size: 11, anchor: "start" });
  return svgDoc(740, 405, s + caption(740, 395, "Who manages each layer in on-premises IT and the three cloud service models"), "Cloud service models");
})();

// ======================= 10.16 Cloud Deployment Models =======================
files["cloud-deployment-models.svg"] = (() => {
  const cloud = (cx, cy, w, label, fill) => `<ellipse cx="${cx}" cy="${cy}" rx="${w}" ry="34" fill="${fill}" stroke="${INK}" stroke-width="2"/>` + text(cx, cy + 5, label, { size: 12, weight: "bold" });
  const org = (x, y, l) => box(x, y, 78, 30, l, { size: 10, fill: "#fff", weight: "normal" });
  let s = text(180, 20, "1. Public cloud", { size: 13, weight: "bold", color: ACCENT }) + cloud(180, 70, 110, "Provider's cloud", COLORS[0]);
  ["Org A", "Person", "Org B", "Org C"].forEach((l, i) => { s += org(25 + i * 82, 130, l) + line(64 + i * 82, 128, 180, 104, { color: NOTE }); });
  s += text(180, 182, "open to the general public; pay per use", { size: 10, color: NOTE });
  s += text(540, 20, "2. Private cloud", { size: 13, weight: "bold", color: ACCENT }) + rect(415, 32, 270, 150, { fill: "#f7fbfa", rx: 10, dash: "6 4" }) + text(640, 50, "one organization", { size: 10, color: NOTE });
  s += cloud(540, 90, 95, "Private cloud", COLORS[1]); ["Dept 1", "Dept 2", "Dept 3"].forEach((l, i) => { s += org(430 + i * 82, 135, l) + line(469 + i * 82, 133, 540, 124, { color: NOTE }); });
  s += text(180, 220, "3. Community cloud", { size: 13, weight: "bold", color: ACCENT }) + cloud(180, 270, 110, "Community cloud", COLORS[2]);
  ["Bank A", "Bank B", "Bank C"].forEach((l, i) => { s += org(60 + i * 82, 330, l) + line(99 + i * 82, 328, 180, 304, { color: NOTE }); });
  s += text(180, 382, "shared by organizations with common concerns", { size: 10, color: NOTE });
  s += text(540, 220, "4. Hybrid cloud", { size: 13, weight: "bold", color: ACCENT }) + cloud(450, 285, 75, "Private", COLORS[1]) + cloud(630, 285, 75, "Public", COLORS[0]);
  s += arrow(527, 278, 553, 278) + arrow(553, 292, 527, 292) + text(540, 340, "bound together: data and app portability", { size: 10, color: NOTE }) + text(540, 356, "(e.g. cloud bursting at peak load)", { size: 10, color: NOTE });
  return svgDoc(720, 420, s + caption(720, 410, "The four cloud deployment models"), "Cloud deployment models");
})();

// ======================= 10.17 Virtualization =======================
const stackDiagram = (cols) => {
  let s = "";
  cols.forEach(({ x, title, rows }) => {
    s += text(x + 140, 22, title, { size: 13, weight: "bold", color: ACCENT });
    let y = 40;
    rows.forEach((r) => {
      if (Array.isArray(r[0])) { const w = (280 - (r.length - 1) * 8) / r.length; r.forEach(([l, f], k) => { s += box(x + k * (w + 8), y, w, 34, l, { size: 10, fill: f }); }); }
      else s += box(x, y, 280, 34, r[0], { size: 11, fill: r[1] });
      y += 40;
    });
  });
  return s;
};
files["hypervisor-types.svg"] = (() => {
  const vm = (n) => [[`App ${n}`, "#fff"]];
  let s = stackDiagram([
    { x: 20, title: "Type 1 (bare-metal)", rows: [[["App", "#fff"], ["App", "#fff"], ["App", "#fff"]], [["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]]], ["Hypervisor (VMware ESXi, Hyper-V, Xen)", COLORS[2]], ["Physical hardware", COLORS[0]]] },
    { x: 400, title: "Type 2 (hosted)", rows: [[["App", "#fff"], ["App", "#fff"], ["App", "#fff"]], [["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]]], ["Hypervisor (VirtualBox, VMware Workstation)", COLORS[2]], ["Host operating system", COLORS[3]], ["Physical hardware", COLORS[0]]] },
  ]);
  return svgDoc(720, 280, s + caption(720, 268, "Type 1 hypervisors run directly on the hardware; type 2 hypervisors run on a host operating system"), "Hypervisor types");
})();
files["vm-vs-container.svg"] = (() => {
  let s = stackDiagram([
    { x: 20, title: "Virtual machines", rows: [[["App A", "#fff"], ["App B", "#fff"], ["App C", "#fff"]], [["Bins/libs", FILL], ["Bins/libs", FILL], ["Bins/libs", FILL]], [["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]], ["Guest OS", COLORS[1]]], ["Hypervisor", COLORS[2]], ["Host OS (type 2) or none (type 1)", COLORS[3]], ["Hardware", COLORS[0]]] },
    { x: 400, title: "Containers", rows: [[["App A", "#fff"], ["App B", "#fff"], ["App C", "#fff"]], [["Bins/libs", FILL], ["Bins/libs", FILL], ["Bins/libs", FILL]], ["Container engine (Docker)", COLORS[2]], ["Host operating system (shared kernel)", COLORS[3]], ["Hardware", COLORS[0]]] },
  ]);
  return svgDoc(720, 320, s + caption(720, 308, "Each VM carries a full guest OS; containers share the host OS kernel"), "VMs vs containers");
})();

// ======================= 10.18 Cloud Security and Related Computing Models =======================
files["cloud-fog-edge.svg"] = (() => {
  let s = box(170, 20, 380, 60, "Cloud layer — central data centres\nlarge storage, heavy analytics, long-term data", { size: 12, fill: COLORS[0] });
  s += text(640, 45, "far: higher latency", { size: 10, color: NOTE }) + text(640, 60, "farthest from devices", { size: 10, color: NOTE });
  ["Fog node\n(gateway, router)", "Fog node\n(base station)", "Fog node\n(local micro-DC)"].forEach((l, i) => { const x = 110 + i * 180; s += box(x, 140, 140, 50, l, { size: 11, fill: COLORS[2] }) + arrow(x + 70, 138, 360, 82, { color: NOTE }); });
  s += text(655, 112, "fog layer: filter, aggregate,", { size: 10, color: NOTE }) + text(655, 127, "local analytics", { size: 10, color: NOTE });
  const ed = ["Sensor", "Camera", "Phone", "Smart meter", "Vehicle", "Wearable"];
  ed.forEach((l, i) => { const x = 60 + i * 102; s += box(x, 250, 90, 34, l, { size: 10, fill: COLORS[1] }) + arrow(x + 45, 248, 180 + Math.floor(i / 2) * 180, 192, { color: NOTE }); });
  s += text(360, 310, "Edge layer: devices that produce data and process some of it on the spot (lowest latency)", { size: 10, color: NOTE });
  return svgDoc(720, 345, s + caption(720, 335, "Edge, fog and cloud layers"), "Cloud, fog and edge");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
