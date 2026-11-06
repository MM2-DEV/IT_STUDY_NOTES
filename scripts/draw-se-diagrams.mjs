// Draws the diagrams used in the Software Engineering notes as SVG files in
// public/diagrams/software-engineering/. Run: node scripts/draw-se-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "software-engineering");
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

// ======================= 7.1 Introduction to Software Engineering =======================
files["se-layers.svg"] = (() => {
  const layers = [["Tools", COLORS[2]], ["Methods", COLORS[1]], ["Process", COLORS[0]], ["A quality focus", "#9fd3a8"]];
  let s = "";
  layers.forEach(([l, c], i) => (s += box(60 + i * 0, 30 + i * 55, 420, 48, l, { fill: c, size: 16 })));
  s += arrow(530, 240, 530, 40) + text(545, 140, "each layer rests on", { anchor: "start", size: 12, color: NOTE }) + text(545, 158, "the layer below it", { anchor: "start", size: 12, color: NOTE });
  return svgDoc(700, 290, s + caption(700, 270, "Software engineering as a layered technology (Pressman): quality focus is the bedrock"), "Software engineering layers");
})();

files["process-framework.svg"] = (() => {
  const acts = ["Communication", "Planning", "Modeling", "Construction", "Deployment"];
  let s = rect(20, 20, 860, 120, { fill: "#fff", dash: "6 5" }) + text(32, 38, "Framework activities (applied to every project)", { anchor: "start", color: ACCENT, weight: "bold" });
  acts.forEach((a, i) => {
    s += box(40 + i * 168, 60, 140, 56, a, { fill: COLORS[i], size: 14 });
    if (i < acts.length - 1) s += arrow(180 + i * 168, 88, 206 + i * 168, 88);
  });
  s += rect(20, 160, 860, 118, { fill: FILL, dash: "6 5" }) + text(32, 178, "Umbrella activities (applied throughout the process)", { anchor: "start", color: ACCENT, weight: "bold" });
  const um = ["Project tracking\nand control", "Risk\nmanagement", "Quality\nassurance", "Technical\nreviews", "Configuration\nmanagement", "Work product\npreparation", "Reusability\nmanagement", "Measurement"];
  um.forEach((u, i) => (s += box(32 + i * 106, 200, 98, 62, u, { fill: "#fff", size: 11, weight: "normal" })));
  return svgDoc(900, 315, s + caption(900, 298, "Generic software process framework: five framework activities supported by umbrella activities"), "Software process framework");
})();

files["failure-curves.svg"] = (() => {
  const axes = (ox, w, title) =>
    arrow(ox, 250, ox, 40) + arrow(ox, 250, ox + w, 250) + text(ox - 14, 145, "Failure rate", { size: 12, color: NOTE, anchor: "middle" }).replace("<text ", `<text transform="rotate(-90 ${ox - 14} 145)" `) +
    text(ox + w / 2, 270, "Time", { size: 12, color: NOTE }) + text(ox + w / 2, 28, title, { weight: "bold", size: 14 });
  let s = axes(50, 340, "(a) Hardware: bathtub curve");
  s += `<path d="M55,70 Q80,215 120,215 L300,215 Q360,215 385,80" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  s += text(118, 150, "infant", { size: 11, color: NOTE, anchor: "start" }) + text(118, 164, "mortality", { size: 11, color: NOTE, anchor: "start" });
  s += text(210, 200, "useful life", { size: 11, color: NOTE }) + text(345, 120, "wear out", { size: 11, color: NOTE, anchor: "end" });
  s += axes(470, 380, "(b) Software: idealized and actual curves");
  s += `<path d="M475,70 Q500,215 540,215 L840,215" fill="none" stroke="${NOTE}" stroke-width="2" stroke-dasharray="6 5"/>`;
  s += `<path d="M475,70 Q500,200 540,200 L600,200 L610,140 Q625,185 650,185 L700,185 L710,120 Q725,170 750,170 L790,170 L800,105 Q815,155 840,155" fill="none" stroke="${RED}" stroke-width="3"/>`;
  s += text(835, 232, "idealized curve", { size: 11, color: NOTE, anchor: "end" }) + text(705, 100, "change", { size: 11, color: RED }) + text(780, 95, "actual curve", { size: 11, color: RED, anchor: "start" });
  return svgDoc(880, 315, s + caption(880, 298, "Hardware wears out; software does not wear out but deteriorates as changes introduce new defects"), "Failure curves for hardware and software");
})();

// ======================= 7.2 Software Qualities =======================
files["mccall-model.svg"] = (() => {
  let s = box(310, 20, 260, 50, "McCall's quality factors (11)", { fill: COLORS[0], size: 15 });
  const groups = [
    ["Product revision\n(ability to change)", ["Maintainability", "Flexibility", "Testability"], 40, COLORS[1]],
    ["Product operation\n(operational use)", ["Correctness", "Reliability", "Efficiency", "Integrity", "Usability"], 330, COLORS[2]],
    ["Product transition\n(adapt to new environments)", ["Portability", "Reusability", "Interoperability"], 620, "#9fd3a8"],
  ];
  for (const [g, items, x, c] of groups) {
    s += arrow(440, 70, x + 110, 108);
    s += box(x, 110, 220, 50, g, { fill: c, size: 13 });
    items.forEach((it, i) => (s += box(x + 30, 180 + i * 42, 160, 32, it, { fill: "#fff", size: 13, weight: "normal" })));
    s += line(x + 15, 160, x + 15, 196 + (items.length - 1) * 42, { color: NOTE });
    items.forEach((_, i) => (s += line(x + 15, 196 + i * 42, x + 30, 196 + i * 42, { color: NOTE })));
  }
  return svgDoc(880, 425, s + caption(880, 408, "McCall's model (1977): eleven quality factors in three groups"), "McCall's software quality model");
})();

// ======================= 7.3 Software Development Life Cycle =======================
files["sdlc-phases.svg"] = (() => {
  const ph = [["1. Requirement", "SRS"], ["2. Design", "Design document (DDS)"], ["3. Development", "Source code"], ["4. Testing", "Tested product"], ["Deployment", "Live software"], ["5. Maintenance", "Updates, new versions"]];
  const cx = 360, cy = 215, R = 160;
  let s = text(cx, cy - 8, "SDLC", { size: 22, weight: "bold", color: ACCENT }) + text(cx, cy + 18, "(the cycle repeats", { size: 12, color: NOTE }) + text(cx, cy + 34, "for each new version)", { size: 12, color: NOTE });
  const pts = ph.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / ph.length; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  pts.forEach(([x, y], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length];
    const t1 = 0.36, t2 = 0.64;
    s += arrow(x + (x2 - x) * t1, y + (y2 - y) * t1, x + (x2 - x) * t2, y + (y2 - y) * t2, { color: ACCENT, curve: -22 });
  });
  pts.forEach(([x, y], i) => (s += box(x - 85, y - 27, 170, 54, `${ph[i][0]}\n${ph[i][1]}`, { fill: i === 4 ? "#fff" : COLORS[i], size: 12, dash: i === 4 ? "6 4" : "" })));
  return svgDoc(720, 445, s + caption(720, 430, "Phases of the SDLC and the main output of each phase"), "Software development life cycle");
})();

// ======================= 7.4 Software Development Models =======================
files["waterfall-model.svg"] = (() => {
  const ph = ["Requirements analysis\nand specification (SRS)", "System design", "Implementation\nand unit testing", "Integration and\nsystem testing", "Deployment", "Maintenance"];
  let s = "";
  ph.forEach((p, i) => {
    const x = 20 + i * 120, y = 20 + i * 62;
    s += box(x, y, 190, 48, p, { fill: COLORS[i], size: 12 });
    if (i < ph.length - 1) s += polyArrow([[x + 190, y + 24], [x + 215, y + 24], [x + 215, y + 60]]);
  });
  return svgDoc(840, 425, s + caption(840, 410, "Waterfall model: each phase starts only after the previous phase is complete"), "Waterfall model");
})();

files["spiral-model.svg"] = (() => {
  const cx = 360, cy = 250;
  let s = line(cx, 40, cx, 460, { color: NOTE }) + line(60, cy, 660, cy, { color: NOTE });
  const q = [["1. Determine objectives,\nalternatives and constraints", 70, 50, "start"], ["2. Evaluate alternatives;\nidentify and resolve risks", 650, 50, "end"], ["3. Develop and verify\nthe next-level product", 650, 440, "end"], ["4. Plan the next\nphase (review)", 70, 440, "start"]];
  for (const [t, x, y, a] of q) t.split("\n").forEach((l, i) => (s += text(x, y + i * 18, l, { anchor: a, weight: "bold", size: 13, color: ACCENT })));
  // Archimedean spiral that starts at the centre and moves clockwise (objectives -> risk -> develop -> plan)
  let d = "";
  for (let k = 0; k <= 400; k++) {
    const th = Math.PI + (k / 400) * 3.5 * 2 * Math.PI, r = 14 + (k / 400) * 175;
    const x = cx + r * Math.cos(th), y = cy + r * Math.sin(th);
    d += (k ? " L" : "M") + x.toFixed(1) + "," + y.toFixed(1);
  }
  s += `<path d="${d}" fill="none" stroke="${RED}" stroke-width="2.5"/>`;
  s += text(cx + 8, cy - 205, "cumulative cost (radius)", { anchor: "start", size: 12, color: NOTE });
  s += box(cx + 30, cy + 60, 120, 30, "Prototypes", { fill: "#fff", size: 12, weight: "normal" });
  return svgDoc(720, 500, s + caption(720, 488, "Spiral model (Boehm): each loop passes through four quadrants; the radius shows the cost so far"), "Spiral model");
})();

files["v-model.svg"] = (() => {
  const L = [["Business requirement\nanalysis", "Acceptance testing"], ["System design", "System testing"], ["Architectural design\n(high-level design)", "Integration testing"], ["Module design\n(low-level design)", "Unit testing"]];
  let s = text(150, 22, "Verification (left side)", { weight: "bold", color: ACCENT }) + text(690, 22, "Validation (right side)", { weight: "bold", color: ACCENT });
  L.forEach(([a, b], i) => {
    const y = 40 + i * 80, xl = 40 + i * 55, xr = 640 - i * 55;
    s += box(xl, y, 200, 52, a, { fill: COLORS[i], size: 12 });
    s += box(xr, y, 200, 52, b, { fill: COLORS[i], size: 12 });
    s += arrow(xl + 202, y + 26, xr - 2, y + 26, { dash: "6 5", color: NOTE, label: "test plan", ly: -10, size: 11 });
    if (i < 3) s += arrow(xl + 100, y + 52, xl + 145, y + 78) + arrow(xr + 55, y + 78, xr + 100, y + 54);
  });
  s += box(350, 360, 180, 46, "Coding", { fill: "#d5e0e0", size: 13 });
  s += arrow(305, 332, 350, 372) + arrow(530, 372, 575, 332);
  return svgDoc(880, 450, s + caption(880, 435, "V-model: each development (verification) phase has a matching testing (validation) phase"), "V-model");
})();

files["rad-model.svg"] = (() => {
  let s = box(20, 90, 160, 56, "1. Requirements\nplanning", { fill: COLORS[0], size: 13 });
  s += rect(220, 30, 380, 180, { fill: "#fff", dash: "6 5" }) + text(410, 48, "User design ⇄ construction (repeated)", { size: 12, color: ACCENT, weight: "bold" });
  s += box(240, 90, 140, 56, "2. User design\n(prototype)", { fill: COLORS[1], size: 13 });
  s += box(440, 90, 140, 56, "3. Construction", { fill: COLORS[2], size: 13 });
  s += arrow(380, 108, 438, 108, { curve: -14 }) + arrow(440, 130, 382, 130, { curve: -14 });
  s += text(410, 170, "users test the prototype", { size: 11, color: NOTE }) + text(410, 186, "and give feedback", { size: 11, color: NOTE });
  s += box(640, 90, 140, 56, "4. Cutover", { fill: "#9fd3a8", size: 13 });
  s += arrow(180, 118, 238, 118) + arrow(600, 118, 638, 118);
  return svgDoc(800, 255, s + caption(800, 238, "RAD model (James Martin): rapid, time-boxed prototyping with continuous user feedback"), "RAD model");
})();

files["agile-model.svg"] = (() => {
  let s = box(20, 100, 150, 50, "Requirements\n(product backlog)", { fill: COLORS[0], size: 12 });
  const it = ["Plan", "Design", "Code", "Test", "Review"];
  const cx = 400, cy = 125, R = 100;
  s += text(cx, cy - 6, "Iteration", { weight: "bold", color: ACCENT }) + text(cx, cy + 12, "(1–4 weeks)", { size: 12, color: NOTE });
  const pts = it.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / it.length; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  pts.forEach(([x, y], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += arrow(x + (x2 - x) * 0.3, y + (y2 - y) * 0.3, x + (x2 - x) * 0.7, y + (y2 - y) * 0.7, { color: ACCENT, curve: -12 });
  });
  pts.forEach(([x, y], i) => (s += box(x - 34, y - 15, 68, 30, it[i], { fill: COLORS[i + 1], size: 12 })));
  s += arrow(170, 125, 260, 125);
  s += box(620, 100, 160, 50, "Working increment\n(release to users)", { fill: "#9fd3a8", size: 12 });
  s += arrow(540, 125, 618, 125);
  s += polyArrow([[700, 150], [700, 245], [95, 245], [95, 152]], { color: NOTE }) + text(400, 262, "feedback from users → next iteration", { size: 12, color: NOTE });
  return svgDoc(800, 300, s + caption(800, 288, "Agile model: short iterations, each delivering working software"), "Agile model");
})();

// ======================= 7.5 Software Engineering Principles =======================
files["coupling-cohesion.svg"] = (() => {
  const row = (y, title, items, leftLabel, rightLabel) => {
    let r = text(20, y - 22, title, { anchor: "start", weight: "bold", color: ACCENT });
    const w = 860 / items.length;
    items.forEach((it, i) => (r += box(20 + i * w, y, w - 6, 40, it, { fill: COLORS[i % COLORS.length], size: 12 })));
    r += arrow(20, y + 62, 874, y + 62, { color: NOTE });
    r += text(20, y + 80, leftLabel, { anchor: "start", size: 12, color: NOTE }) + text(874, y + 80, rightLabel, { anchor: "end", size: 12, color: NOTE });
    return r;
  };
  let s = row(40, "Cohesion (strength inside a module)", ["Functional", "Sequential", "Communicational", "Procedural", "Temporal", "Logical", "Coincidental"], "best (high cohesion)", "worst (low cohesion)");
  s += row(180, "Coupling (dependence between modules)", ["Data", "Stamp", "Control", "External", "Common", "Content"], "best (low coupling)", "worst (high coupling)");
  return svgDoc(900, 295, s + caption(900, 280, "Good modular design: high cohesion and low coupling"), "Types of cohesion and coupling");
})();

// ======================= 7.6 Requirements Engineering =======================
files["re-process.svg"] = (() => {
  const st = [["1. Feasibility\nstudy", "Feasibility\nreport"], ["2. Elicitation\nand analysis", "Requirements,\nmodels"], ["3. Specification", "SRS"], ["4. Validation", "Validated SRS"]];
  let s = "";
  st.forEach(([a, b], i) => {
    const x = 20 + i * 200;
    s += box(x, 40, 160, 60, a, { fill: COLORS[i], size: 13 });
    s += box(x + 15, 140, 130, 46, b, { fill: "#fff", size: 12, weight: "normal", dash: "5 4" });
    s += arrow(x + 80, 100, x + 80, 138, { color: NOTE });
    if (i < st.length - 1) s += arrow(x + 160, 70, x + 198, 70);
  });
  s += polyArrow([[640, 40], [640, 20], [300, 20], [300, 38]], { color: NOTE, dash: "5 4" }) + text(470, 12, "problems found → revise", { size: 11, color: NOTE });
  s += rect(20, 215, 780, 40, { fill: FILL, dash: "6 5" }) + text(410, 235, "5. Requirements management: change control, version control and traceability (throughout the project)", { size: 12, weight: "bold", color: ACCENT });
  return svgDoc(820, 290, s + caption(820, 275, "Requirements engineering process and the output of each step"), "Requirements engineering process");
})();

// ======================= 7.7 System Modeling and Design =======================
files["atm-context-model.svg"] = (() => {
  let s = box(300, 165, 200, 60, "ATM system", { fill: COLORS[0], size: 16 });
  const around = [["Account database", 40, 30], ["Security system", 300, 20], ["Branch accounting\nsystem", 560, 30], ["Usage database", 40, 300], ["Maintenance\nsystem", 300, 320], ["Customer", 560, 300]];
  for (const [t, x, y] of around) {
    s += box(x, y, 200, 54, t, { fill: "#fff", size: 13 });
    const cx = x + 100, cy = y + 27;
    const tx = cx < 300 ? 300 : cx > 500 ? 500 : 400, ty = cy < 165 ? 165 : 225;
    s += line(cx, cy < 165 ? y + 54 : y, tx, ty, { color: NOTE });
  }
  s += rect(285, 150, 230, 90, { fill: "none", dash: "6 5", stroke: ACCENT }) + text(400, 255, "system boundary", { size: 11, color: ACCENT });
  return svgDoc(800, 410, s + caption(800, 395, "Context model of an ATM system: the system and the external systems and people around it"), "Context model of an ATM system");
})();

files["dfd-order.svg"] = (() => {
  let s = box(20, 110, 120, 50, "Customer", { fill: "#fff", size: 13 });
  const bubble = (x, y, a, b) => `<circle cx="${x}" cy="${y}" r="52" fill="${FILL}" stroke="${INK}" stroke-width="2"/>` + text(x, y - 9, a, { size: 12, weight: "bold" }) + text(x, y + 9, b, { size: 12, weight: "bold" });
  s += bubble(270, 135, "1. Validate", "order") + bubble(480, 135, "2. Prepare", "invoice") + bubble(690, 135, "3. Dispatch", "goods");
  s += line(390, 250, 570, 250) + line(390, 290, 570, 290) + text(480, 270, "Orders file", { size: 13, weight: "bold" });
  s += arrow(140, 135, 216, 135, { label: "order", ly: -12 }) + arrow(322, 135, 426, 135, { label: "valid order", ly: -12 }) + arrow(532, 135, 636, 135, { label: "invoice", ly: -12 });
  s += arrow(300, 180, 400, 248, { label: "write", lx: -18, ly: 8, size: 11 }) + arrow(560, 248, 660, 180, { label: "read", lx: 18, ly: 8, size: 11 });
  s += box(780, 110, 110, 50, "Warehouse", { fill: "#fff", size: 13 }) + arrow(742, 135, 778, 135);
  return svgDoc(910, 335, s + caption(910, 320, "Data-flow diagram: external entities (rectangles), processes (circles), data flows (arrows) and a data store (parallel lines)"), "Data-flow diagram of order processing");
})();

files["microwave-state.svg"] = (() => {
  const st = (x, y, a, b = "") => box(x - 70, y - 26, 140, 52, b ? `${a}\n${b}` : a, { fill: FILL, size: 13, rx: 18 });
  let s = `<circle cx="40" cy="70" r="9" fill="${INK}"/>` + arrow(49, 70, 108, 70);
  s += st(180, 70, "Waiting") + st(430, 70, "Set power") + st(680, 70, "Set time");
  s += st(680, 210, "Enabled", "(door closed)") + st(430, 210, "Disabled", "(door open)") + st(180, 210, "Operation", "(cooking)");
  s += arrow(250, 70, 358, 70, { label: "power button", ly: -12, size: 11 }) + arrow(500, 70, 608, 70, { label: "number entered", ly: -12, size: 11 });
  s += arrow(680, 96, 680, 182, { label: "door closed", lx: 46, size: 11 });
  s += arrow(610, 198, 500, 198, { label: "door opened", ly: -11, size: 11 }) + arrow(500, 224, 610, 224, { label: "door closed", ly: 12, size: 11 });
  s += polyArrow([[680, 236], [680, 290], [180, 290], [180, 238]]) + text(430, 280, "start button", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(180, 184, 180, 98, { label: "timeout", lx: -36, size: 11 });
  return svgDoc(790, 330, s + caption(790, 318, "State machine (event-driven behavioural) model of a simple microwave oven"), "State diagram of a microwave oven");
})();

files["class-diagram.svg"] = (() => {
  const cls = (x, y, w, name, attrs, ops) => {
    const h1 = 28, h2 = attrs.length * 18 + 10, h3 = ops.length * 18 + 10;
    let r = rect(x, y, w, h1 + h2 + h3, { fill: "#fff" }) + `<rect x="${x}" y="${y}" width="${w}" height="${h1}" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>`;
    r += text(x + w / 2, y + 14, name, { weight: "bold", size: 13 });
    r += line(x, y + h1 + h2, x + w, y + h1 + h2);
    attrs.forEach((a, i) => (r += text(x + 8, y + h1 + 14 + i * 18, a, { size: 12, anchor: "start" })));
    ops.forEach((o, i) => (r += text(x + 8, y + h1 + h2 + 14 + i * 18, o, { size: 12, anchor: "start" })));
    return r;
  };
  let s = cls(300, 20, 200, "Account", ["- accountNo: int", "- balance: double"], ["+ deposit(amount)", "+ withdraw(amount)"]);
  s += cls(140, 230, 180, "SavingsAccount", ["- interestRate: double"], ["+ addInterest()"]);
  s += cls(480, 230, 180, "CurrentAccount", ["- overdraftLimit: double"], ["+ checkLimit()"]);
  s += cls(20, 20, 180, "Customer", ["- name: String", "- phone: String"], ["+ openAccount()"]);
  s += cls(620, 20, 160, "Bank", ["- name: String"], ["+ addAccount()"]);
  // generalization (hollow triangle at the parent)
  const tri = (x, y) => `<polygon points="${x},${y} ${x - 9},${y + 14} ${x + 9},${y + 14}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  s += line(230, 230, 230, 190) + line(230, 190, 400, 190) + line(400, 190, 400, 154) + tri(400, 140);
  s += line(570, 230, 570, 190) + line(570, 190, 400, 190);
  // association customer - account with multiplicity
  s += line(200, 70, 300, 70) + text(210, 60, "1", { size: 12, color: NOTE }) + text(288, 60, "1..*", { size: 12, color: NOTE }) + text(250, 86, "owns", { size: 11, color: NOTE });
  // aggregation bank <>-- account
  s += line(500, 70, 604, 70) + `<polygon points="620,70 608,63 596,70 608,77" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(512, 60, "1..*", { size: 12, color: NOTE });
  s += text(560, 86, "has (aggregation)", { size: 11, color: NOTE });
  s += text(410, 205, "generalization (inheritance)", { size: 11, color: NOTE, anchor: "start" });
  return svgDoc(800, 345, s + caption(800, 330, "Object (class) model: classes with attributes and operations, inheritance, association and aggregation"), "Class diagram of a bank system");
})();

files["uml-diagrams.svg"] = (() => {
  let s = box(330, 15, 200, 44, "UML 2.5 diagrams (14)", { fill: COLORS[0], size: 14 });
  s += box(90, 95, 230, 40, "Structural diagrams (7)", { fill: COLORS[1], size: 13 }) + box(540, 95, 230, 40, "Behavioural diagrams (7)", { fill: COLORS[2], size: 13 });
  s += arrow(400, 59, 205, 93) + arrow(460, 59, 655, 93);
  const sl = ["Class", "Object", "Component", "Deployment", "Package", "Composite structure", "Profile"];
  sl.forEach((t, i) => (s += box(120, 155 + i * 36, 170, 28, t, { fill: "#fff", size: 12, weight: "normal" })));
  s += line(105, 135, 105, 169 + 6 * 36, { color: NOTE });
  sl.forEach((_, i) => (s += line(105, 169 + i * 36, 120, 169 + i * 36, { color: NOTE })));
  const bl = ["Use case", "Activity", "State machine"];
  bl.forEach((t, i) => (s += box(570, 155 + i * 36, 170, 28, t, { fill: "#fff", size: 12, weight: "normal" })));
  s += box(570, 155 + 3 * 36, 170, 28, "Interaction diagrams (4)", { fill: "#9fd3a8", size: 12 });
  const il = ["Sequence", "Communication", "Timing", "Interaction overview"];
  il.forEach((t, i) => (s += box(600, 155 + (4 + i) * 36, 170, 28, t, { fill: "#fff", size: 12, weight: "normal" })));
  s += line(555, 135, 555, 169 + 3 * 36, { color: NOTE });
  for (let i = 0; i < 4; i++) s += line(555, 169 + i * 36, 570, 169 + i * 36, { color: NOTE });
  s += line(585, 169 + 3 * 36 + 14, 585, 169 + 7 * 36, { color: NOTE });
  for (let i = 4; i < 8; i++) s += line(585, 169 + i * 36, 600, 169 + i * 36, { color: NOTE });
  return svgDoc(860, 470, s + caption(860, 456, "The fourteen UML 2.5 diagram types"), "Types of UML diagrams");
})();

files["realtime-system.svg"] = (() => {
  let s = box(20, 40, 150, 50, "Sensors", { fill: COLORS[2], size: 14 }) + box(20, 150, 150, 50, "Environment", { fill: "#fff", size: 13 });
  s += box(250, 40, 260, 160, "", { fill: FILL }) + text(380, 58, "Real-time control system", { weight: "bold", color: ACCENT, size: 13 });
  ["Sensor control process", "Data processor", "Actuator control process"].forEach((t, i) => (s += box(270, 75 + i * 40, 220, 30, t, { fill: "#fff", size: 12 })));
  s += box(590, 40, 150, 50, "Actuators", { fill: COLORS[1], size: 14 });
  s += arrow(170, 65, 248, 65, { label: "stimulus", ly: -10, size: 11 }) + arrow(512, 65, 588, 65, { label: "response", ly: -10, size: 11 });
  s += arrow(95, 148, 95, 92, { label: "measures", lx: 32, size: 11 });
  s += polyArrow([[665, 90], [665, 230], [95, 230], [95, 202]]) + text(380, 220, "response changes the environment", { size: 11, color: NOTE, weight: "bold" });
  return svgDoc(760, 270, s + caption(760, 260, "Stimulus–response model of a real-time system with sensors and actuators"), "Real-time system architecture");
})();

// ======================= 7.8 Critical Systems =======================
files["n-version.svg"] = (() => {
  let s = box(20, 125, 100, 50, "Input", { fill: "#fff", size: 13 });
  ["Version 1", "Version 2", "Version 3"].forEach((v, i) => {
    s += box(200, 40 + i * 85, 150, 50, v, { fill: COLORS[i], size: 13 });
    s += polyArrow([[120, 150], [160, 150], [160, 65 + i * 85], [198, 65 + i * 85]]);
    s += polyArrow([[350, 65 + i * 85], [400, 65 + i * 85], [400, 150], [438, 150]]);
  });
  s += box(440, 120, 150, 60, "Output selector\n(majority vote)", { fill: "#9fd3a8", size: 13 });
  s += arrow(590, 150, 660, 150) + box(662, 125, 110, 50, "Agreed\nresult", { fill: "#fff", size: 13 });
  s += text(275, 290, "developed independently by different teams; run in parallel", { size: 12, color: NOTE });
  return svgDoc(790, 330, s + caption(790, 318, "N-version programming: independently developed versions run in parallel and a voter selects the majority result"), "N-version programming");
})();

files["recovery-block.svg"] = (() => {
  let s = box(20, 40, 120, 50, "Save state\n(checkpoint)", { fill: "#fff", size: 12 });
  s += box(200, 40, 140, 50, "Run primary\nalgorithm", { fill: COLORS[0], size: 12 });
  s += box(400, 40, 140, 50, "Acceptance\ntest", { fill: COLORS[2], size: 12 });
  s += box(620, 40, 130, 50, "Continue with\nresult", { fill: "#9fd3a8", size: 12 });
  s += arrow(140, 65, 198, 65) + arrow(340, 65, 398, 65) + arrow(540, 65, 618, 65, { label: "pass", ly: -11, size: 11 });
  s += box(400, 170, 140, 50, "Restore state;\ntry next alternate", { fill: COLORS[1], size: 12 });
  s += arrow(470, 90, 470, 168, { label: "fail", lx: 18, size: 11 });
  s += polyArrow([[400, 195], [270, 195], [270, 92]]) + text(278, 140, "alternate algorithm", { anchor: "start", size: 11, color: NOTE, weight: "bold" });
  s += box(620, 170, 130, 50, "All alternates\nfailed: exception", { fill: "#e8a0a0", size: 12 });
  s += arrow(540, 205, 618, 205);
  return svgDoc(770, 270, s + caption(770, 258, "Recovery block: the alternates are tried one after another until one passes the acceptance test"), "Recovery block");
})();

files["alarp.svg"] = (() => {
  const cx = 330;
  let s = `<polygon points="${cx},30 ${cx - 70},110 ${cx + 70},110" fill="#e8a0a0" stroke="${INK}" stroke-width="2"/>`;
  s += `<polygon points="${cx - 70},110 ${cx + 70},110 ${cx + 160},215 ${cx - 160},215" fill="${COLORS[2]}" stroke="${INK}" stroke-width="2"/>`;
  s += `<polygon points="${cx - 160},215 ${cx + 160},215 ${cx + 250},320 ${cx - 250},320" fill="#9fd3a8" stroke="${INK}" stroke-width="2"/>`;
  s += text(cx, 85, "Unacceptable", { size: 12, weight: "bold" }) + text(cx, 165, "ALARP region", { size: 13, weight: "bold" }) + text(cx, 270, "Acceptable region", { size: 13, weight: "bold" });
  s += text(cx + 120, 70, "risk cannot be tolerated", { anchor: "start", size: 12, color: NOTE });
  s += text(cx + 205, 160, "tolerated only if risk reduction", { anchor: "start", size: 12, color: NOTE }) + text(cx + 205, 176, "is impractical or very costly", { anchor: "start", size: 12, color: NOTE });
  s += text(cx + 290, 270, "negligible risk", { anchor: "start", size: 12, color: NOTE });
  return svgDoc(760, 360, s + caption(760, 345, "The risk triangle: risks are classified as unacceptable, ALARP (as low as reasonably practicable) or acceptable"), "Risk triangle (ALARP)");
})();

files["fault-tree.svg"] = (() => {
  const orGate = (x, y) => `<path d="M${x - 26},${y + 30} Q${x},${y + 16} ${x + 26},${y + 30} Q${x + 22},${y} ${x},${y - 12} Q${x - 22},${y} ${x - 26},${y + 30} Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(x, y + 14, "OR", { size: 10, weight: "bold" });
  let s = box(250, 20, 300, 48, "Incorrect insulin dose given\n(top event / hazard)", { fill: "#e8a0a0", size: 12 });
  s += line(400, 68, 400, 88) + orGate(400, 100);
  const mids = [["Incorrect sugar\nlevel measured", 120], ["Correct dose\ndelivered at wrong time", 400], ["Delivery system\nfailure", 680]];
  mids.forEach(([t, x]) => { s += line(400, 130, x, 160) + box(x - 100, 162, 200, 48, t, { fill: COLORS[2], size: 12 }); });
  s += line(120, 210, 120, 228) + orGate(120, 240);
  [["Sensor\nfailure", 80], ["Sugar computation\nerror", 240]].forEach(([t, x]) => { s += line(120, 270, x, 300) + box(x - 75, 302, 150, 46, t, { fill: "#fff", size: 12 }); });
  s += line(680, 210, 680, 228) + orGate(680, 240);
  [["Pump signals\nincorrect", 600], ["Timer\nfailure", 760]].forEach(([t, x]) => { s += line(680, 270, x, 300) + box(x - 70, 302, 140, 46, t, { fill: "#fff", size: 12 }); });
  return svgDoc(860, 390, s + caption(860, 376, "Part of a fault tree for an insulin pump: the hazard is traced down to the possible causes through OR gates"), "Fault tree");
})();

// ======================= 7.9 Verification, Validation and Testing =======================
files["integration-testing.svg"] = (() => {
  const tree = (ox, title, real, dummy, dummyLabel) => {
    let r = text(ox + 170, 22, title, { weight: "bold", color: ACCENT });
    const pos = { A: [ox + 170, 60], B: [ox + 80, 140], C: [ox + 260, 140], D: [ox + 30, 220], E: [ox + 130, 220], F: [ox + 260, 220] };
    const edges = [["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"], ["C", "F"]];
    for (const [a, b] of edges) r += line(pos[a][0], pos[a][1] + 18, pos[b][0], pos[b][1] - 18, { color: NOTE });
    for (const [k, [x, y]] of Object.entries(pos)) {
      const isDummy = dummy.includes(k);
      r += box(x - 38, y - 18, 76, 36, isDummy ? `${dummyLabel}\n(${k})` : k, { fill: isDummy ? "#fff" : real.includes(k) ? COLORS[0] : FILL, size: isDummy ? 11 : 13, dash: isDummy ? "5 4" : "" });
    }
    return r;
  };
  let s = tree(20, "Top-down integration", ["A", "B", "C"], ["D", "E", "F"], "Stub");
  s += tree(420, "Bottom-up integration", ["D", "E", "F", "B", "C"], ["A"], "Driver");
  s += text(190, 270, "start at the top; stubs replace lower modules", { size: 12, color: NOTE }) + text(590, 270, "start at the bottom; drivers call lower modules", { size: 12, color: NOTE });
  return svgDoc(780, 310, s + caption(780, 298, "Integration testing: stubs stand in for lower modules (top-down); drivers stand in for higher modules (bottom-up)"), "Top-down and bottom-up integration testing");
})();

// ======================= 7.10 Software Maintenance =======================
files["reengineering.svg"] = (() => {
  let s = box(20, 150, 150, 56, "Existing (legacy)\nsoftware", { fill: "#fff", size: 13 });
  s += box(280, 40, 180, 56, "Specification and\ndesign (abstract)", { fill: COLORS[1], size: 13 });
  s += box(280, 150, 180, 56, "Restructured\nprogram and data", { fill: COLORS[2], size: 13 });
  s += box(550, 150, 160, 56, "Re-engineered\nsoftware", { fill: "#9fd3a8", size: 13 });
  s += polyArrow([[95, 150], [95, 68], [278, 68]]) + text(186, 56, "reverse engineering", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(170, 178, 278, 178) + text(224, 166, "restructuring", { size: 11, color: NOTE, weight: "bold" });
  s += polyArrow([[460, 68], [630, 68], [630, 148]]) + text(545, 56, "forward engineering", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(460, 178, 548, 178);
  return svgDoc(730, 250, s + caption(730, 238, "Re-engineering: reverse engineering, restructuring and forward engineering"), "Software re-engineering");
})();

// ======================= 7.11 Software Project Management =======================
files["cpm-network.svg"] = (() => {
  const node = (x, y, name, d, crit) => box(x - 55, y - 28, 110, 56, `${name}\n${d} days`, { fill: crit ? COLORS[0] : "#fff", size: 13 });
  let s = box(20, 102, 80, 40, "Start", { fill: FILL, size: 12, rx: 20 });
  s += node(190, 122, "A", 3, true) + node(370, 50, "B", 2, false) + node(370, 194, "C", 4, true) + node(550, 122, "D", 2, true);
  s += box(660, 102, 80, 40, "End", { fill: FILL, size: 12, rx: 20 });
  s += arrow(100, 122, 133, 122, { color: RED });
  s += arrow(245, 108, 313, 62) + arrow(245, 136, 313, 182, { color: RED });
  s += arrow(425, 62, 493, 108) + arrow(425, 182, 493, 136, { color: RED });
  s += arrow(605, 122, 658, 122, { color: RED });
  s += text(380, 252, "Paths: A–B–D = 3 + 2 + 2 = 7 days;  A–C–D = 3 + 4 + 2 = 9 days (critical path, in red)", { size: 12, color: NOTE });
  return svgDoc(760, 290, s + caption(760, 278, "Activity network: the longest path (A–C–D, 9 days) is the critical path"), "Activity network and critical path");
})();

files["gantt-chart.svg"] = (() => {
  const unit = 60, x0 = 150;
  let s = "";
  for (let d = 0; d <= 9; d++) s += line(x0 + d * unit, 30, x0 + d * unit, 210, { color: "#d5e0e0", width: 1 }) + text(x0 + d * unit, 22, String(d), { size: 11, color: NOTE });
  const tasks = [["A: Requirements", 0, 3, true], ["B: UI design", 3, 2, false], ["C: Database design", 3, 4, true], ["D: Testing", 7, 2, true]];
  tasks.forEach(([t, st, du, crit], i) => {
    const y = 45 + i * 42;
    s += text(x0 - 10, y + 14, t, { anchor: "end", size: 12 });
    s += rect(x0 + st * unit, y, du * unit, 28, { fill: crit ? COLORS[0] : COLORS[1] });
  });
  s += text(x0 + 4.5 * unit, 232, "days", { size: 12, color: NOTE });
  s += rect(x0 + 5 * unit, 49 + 42, 2 * unit, 20, { fill: "none", dash: "4 4", stroke: NOTE }) + text(x0 + 7.15 * unit, 101 + 4, "slack 2 days", { anchor: "start", size: 11, color: NOTE });
  return svgDoc(760, 265, s + caption(760, 252, "Gantt chart of the same project: B can be delayed by 2 days (slack) without delaying the project"), "Gantt chart");
})();

// ======================= 7.12 Software Cost Estimation and Metrics =======================
files["flow-graph.svg"] = (() => {
  const P = { 1: [200, 40], 2: [200, 120], 3: [200, 200], 4: [110, 280], 5: [200, 360], 6: [70, 120] };
  const r = 20;
  const edge = (a, b, opts = {}) => {
    const [x1, y1] = P[a], [x2, y2] = P[b];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    return arrow(x1 + (dx / L) * r, y1 + (dy / L) * r, x2 - (dx / L) * r, y2 - (dy / L) * r, opts);
  };
  let s = edge(1, 2) + edge(2, 3) + edge(2, 6) + edge(3, 4) + edge(3, 5) + edge(4, 5) + edge(5, 2, { curve: 300 });
  for (const [k, [x, y]] of Object.entries(P)) s += circle(x, y, k, { r, fill: k === "2" || k === "3" ? COLORS[2] : FILL });
  s += text(168, 282, "R1", { size: 12, weight: "bold", color: ACCENT }) + text(290, 250, "R2", { size: 12, weight: "bold", color: ACCENT }) + text(420, 360, "R3 (outside)", { size: 12, weight: "bold", color: ACCENT });
  const legend = ["1: i = 0, c = 0", "2: while (i < n)", "3: if (a[i] > 0)", "4: c++", "5: i++", "6: return c"];
  legend.forEach((t, k) => (s += text(520, 50 + k * 22, t, { size: 12, anchor: "start", color: NOTE })));
  s += text(520, 200, "E = 7 edges, N = 6 nodes", { size: 13, anchor: "start" }) + text(520, 225, "V(G) = E − N + 2 = 7 − 6 + 2 = 3", { size: 13, anchor: "start", weight: "bold" });
  s += text(520, 255, "Decisions (nodes 2, 3) + 1 = 3", { size: 13, anchor: "start" }) + text(520, 280, "Regions R1, R2, R3 = 3", { size: 13, anchor: "start" });
  return svgDoc(820, 420, s + caption(820, 405, "Control flow graph of count_positive(): cyclomatic complexity 3 by all three methods"), "Control flow graph and cyclomatic complexity");
})();

// ======================= 7.13 Reliability and Quality Assurance =======================
files["cmm-levels.svg"] = (() => {
  const lv = [["1. Initial", "ad hoc, chaotic"], ["2. Repeatable", "basic project management"], ["3. Defined", "standard process"], ["4. Managed", "measured and controlled"], ["5. Optimizing", "continuous improvement"]];
  let s = "";
  lv.forEach(([a, b], i) => {
    const x = 20 + i * 160, y = 250 - i * 50;
    s += box(x, y, 190, 50, `${a}\n${b}`, { fill: COLORS[i], size: 12 });
  });
  s += arrow(20, 320, 850, 320, { color: NOTE }) + text(435, 308, "increasing process maturity, predictability and quality", { size: 12, color: NOTE });
  return svgDoc(870, 355, s + caption(870, 343, "The five maturity levels of the SEI Capability Maturity Model (CMM)"), "CMM maturity levels");
})();

// ======================= 7.14 System Analysis and Design =======================
files["context-diagram.svg"] = (() => {
  let s = `<circle cx="400" cy="160" r="80" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>` + text(400, 152, "0", { weight: "bold" }) + text(400, 172, "Library system", { weight: "bold", size: 14 });
  s += box(20, 60, 140, 50, "Member", { fill: "#fff", size: 13 }) + box(20, 210, 140, 50, "Librarian", { fill: "#fff", size: 13 });
  s += box(640, 60, 140, 50, "Publisher", { fill: "#fff", size: 13 }) + box(640, 210, 140, 50, "Management", { fill: "#fff", size: 13 });
  s += arrow(160, 78, 325, 128, { label: "borrow request", ly: -18, size: 11 }) + arrow(330, 150, 160, 96, { label: "book, due date", ly: 18, size: 11 });
  s += arrow(160, 235, 330, 190, { label: "new book details", ly: 18, size: 11 });
  s += arrow(475, 128, 640, 85, { label: "purchase order", ly: -18, size: 11 });
  s += arrow(470, 190, 640, 235, { label: "monthly report", ly: 18, size: 11 });
  return svgDoc(800, 300, s + caption(800, 290, "Context diagram (level 0 DFD): the whole system as one process with its external entities"), "Context diagram");
})();

files["decision-tree.svg"] = (() => {
  let s = box(20, 140, 130, 44, "Advance\npayment?", { fill: COLORS[2], size: 12, rx: 22 });
  s += box(250, 40, 150, 40, "5% discount", { fill: "#9fd3a8", size: 12 });
  s += box(220, 230, 150, 44, "Purchase ≥\nRs 10,000?", { fill: COLORS[2], size: 12, rx: 22 });
  s += box(460, 160, 140, 44, "Regular\ncustomer?", { fill: COLORS[2], size: 12, rx: 22 });
  s += box(460, 290, 150, 40, "No discount", { fill: "#e8a0a0", size: 12 });
  s += box(690, 110, 150, 40, "5% discount", { fill: "#9fd3a8", size: 12 }) + box(690, 210, 150, 40, "No discount", { fill: "#e8a0a0", size: 12 });
  s += arrow(150, 152, 248, 62, { label: "Yes", ly: -10, size: 11 }) + arrow(150, 172, 218, 245, { label: "No", ly: 10, size: 11 });
  s += arrow(370, 245, 458, 190, { label: "Yes", ly: -10, size: 11 }) + arrow(370, 260, 458, 305, { label: "No", ly: 10, size: 11 });
  s += arrow(600, 175, 688, 132, { label: "Yes", ly: -10, size: 11 }) + arrow(600, 190, 688, 228, { label: "No", ly: 10, size: 11 });
  return svgDoc(860, 370, s + caption(860, 358, "Decision tree for the discount policy: conditions (rounded) lead to actions"), "Decision tree");
})();

// ======================= 7.15 HTML, CSS and JavaScript =======================
files["box-model.svg"] = (() => {
  let s = rect(40, 30, 560, 290, { fill: "#fff", dash: "6 5" }) + text(60, 50, "Margin (transparent, outside the border)", { anchor: "start", size: 12, color: NOTE, weight: "bold" });
  s += rect(90, 70, 460, 210, { fill: COLORS[2] }) + text(110, 90, "Border", { anchor: "start", size: 12, weight: "bold" });
  s += rect(120, 100, 400, 150, { fill: COLORS[1] }) + text(140, 120, "Padding (space inside the border)", { anchor: "start", size: 12, weight: "bold" });
  s += rect(180, 140, 280, 70, { fill: COLORS[0] }) + text(320, 175, "Content (width × height)", { weight: "bold", size: 13 });
  s += text(640, 120, "Total width =", { anchor: "start", size: 12 }) + text(640, 140, "border + padding + width", { anchor: "start", size: 12 }) + text(640, 160, "+ padding + border", { anchor: "start", size: 12 });
  s += text(640, 195, "Example: 10 + 15 + 400", { anchor: "start", size: 12, color: NOTE }) + text(640, 215, "+ 15 + 10 = 450 px", { anchor: "start", size: 12, color: NOTE });
  return svgDoc(850, 355, s + caption(850, 342, "CSS box model: content, padding, border and margin"), "CSS box model");
})();

// ======================= 7.16 Server-Side Programming =======================
files["web-request-flow.svg"] = (() => {
  let s = box(20, 90, 130, 60, "Browser\n(client)", { fill: "#fff", size: 13 });
  s += box(280, 90, 150, 60, "Web (HTTP)\nserver", { fill: COLORS[0], size: 13 });
  s += box(560, 90, 150, 60, "Application\nserver", { fill: COLORS[1], size: 13 });
  s += box(840, 90, 120, 60, "Database", { fill: COLORS[2], size: 13 });
  s += arrow(150, 108, 278, 108, { label: "HTTP request", ly: -12, size: 11 }) + arrow(278, 132, 150, 132, { label: "HTTP response", ly: 14, size: 11 });
  s += arrow(430, 108, 558, 108, { label: "dynamic request", ly: -12, size: 11 }) + arrow(558, 132, 430, 132, { label: "generated page", ly: 14, size: 11 });
  s += arrow(710, 108, 838, 108, { label: "query", ly: -12, size: 11 }) + arrow(838, 132, 710, 132, { label: "data", ly: 14, size: 11 });
  s += text(355, 185, "serves static files", { size: 11, color: NOTE }) + text(355, 200, "(HTML, CSS, images)", { size: 11, color: NOTE });
  s += text(635, 185, "runs business logic,", { size: 11, color: NOTE }) + text(635, 200, "transactions, security", { size: 11, color: NOTE });
  return svgDoc(980, 240, s + caption(980, 228, "A static request is answered by the web server; a dynamic request goes on to the application server and database"), "Web server and application server");
})();

files["mvc-flow.svg"] = (() => {
  let s = box(20, 110, 110, 50, "User\n(browser)", { fill: "#fff", size: 13 });
  s += box(230, 110, 150, 50, "Controller", { fill: COLORS[0], size: 14 });
  s += box(520, 20, 170, 56, "Model\n(data, business logic)", { fill: COLORS[2], size: 12 });
  s += box(520, 200, 170, 56, "View\n(presentation)", { fill: COLORS[1], size: 12 });
  s += arrow(130, 135, 228, 135) + text(179, 122, "1. request", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(370, 110, 518, 50) + text(420, 62, "2. update / query", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(518, 66, 382, 122) + text(478, 108, "3. data", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(370, 160, 518, 220) + text(420, 210, "4. select view,", { size: 11, color: NOTE, weight: "bold" }) + text(420, 224, "pass data", { size: 11, color: NOTE, weight: "bold" });
  s += polyArrow([[605, 256], [605, 285], [75, 285], [75, 162]]) + text(340, 275, "5. response (HTML page)", { size: 11, color: NOTE, weight: "bold" });
  s += box(760, 20, 120, 56, "Database", { fill: "#fff", size: 13 }) + arrow(690, 40, 758, 40) + arrow(758, 56, 690, 56);
  return svgDoc(900, 330, s + caption(900, 318, "MVC web framework: the controller handles the request, uses the model and chooses the view"), "MVC request flow");
})();

// ======================= 7.17 Web Services =======================
files["web-service-architecture.svg"] = (() => {
  let s = box(310, 20, 200, 60, "Service registry\n(UDDI)", { fill: COLORS[2], size: 13 });
  s += box(40, 220, 200, 60, "Service requestor\n(client)", { fill: COLORS[1], size: 13 });
  s += box(580, 220, 200, 60, "Service provider\n(hosts the service)", { fill: COLORS[0], size: 13 });
  s += arrow(580, 225, 470, 82) + text(590, 140, "1. Publish", { size: 12, weight: "bold" }) + text(590, 156, "(WSDL description)", { size: 11, color: NOTE });
  s += arrow(240, 225, 350, 82) + text(230, 140, "2. Find", { size: 12, weight: "bold" }) + text(230, 156, "(search for WSDL)", { size: 11, color: NOTE });
  s += arrow(240, 240, 578, 240) + text(410, 230, "3. Bind and invoke (SOAP request)", { size: 12, weight: "bold" });
  s += arrow(578, 264, 240, 264) + text(410, 284, "SOAP response", { size: 11, color: NOTE });
  return svgDoc(820, 330, s + caption(820, 318, "Web service architecture: three roles and the publish, find and bind operations"), "Web service architecture");
})();

files["soap-message.svg"] = (() => {
  let s = rect(40, 20, 400, 250, { fill: "#fff" }) + text(60, 44, "SOAP Envelope (required, root element)", { anchor: "start", size: 13, weight: "bold" });
  s += rect(70, 60, 340, 60, { fill: COLORS[2] }) + text(90, 85, "Header (optional)", { anchor: "start", size: 13, weight: "bold" }) + text(90, 105, "authentication, transaction ID …", { anchor: "start", size: 11, color: NOTE });
  s += rect(70, 135, 340, 120, { fill: COLORS[0] }) + text(90, 158, "Body (required)", { anchor: "start", size: 13, weight: "bold" }) + text(90, 176, "the actual request or response data", { anchor: "start", size: 11, color: NOTE });
  s += rect(100, 190, 280, 50, { fill: COLORS[6] }) + text(120, 212, "Fault (optional, inside Body)", { anchor: "start", size: 12, weight: "bold" }) + text(120, 230, "error information", { anchor: "start", size: 11, color: NOTE });
  return svgDoc(480, 310, s + caption(480, 298, "Structure of a SOAP message"), "SOAP message structure");
})();

// ======================= 7.18 Database Access =======================
files["orm-mapping.svg"] = (() => {
  // class box
  let s = rect(20, 30, 220, 150, { fill: COLORS[0] }) + text(130, 54, "class Student", { weight: "bold", size: 14 }) + line(20, 66, 240, 66);
  s += text(36, 92, "int Id", { anchor: "start", size: 13 }) + text(36, 116, "string Name", { anchor: "start", size: 13 }) + text(36, 140, "double Cgpa", { anchor: "start", size: 13 });
  s += text(130, 200, "object: new Student(1, \"Rahim\", 3.75)", { size: 11, color: NOTE });
  // ORM box
  s += box(300, 70, 160, 70, "ORM\n(e.g. Entity Framework)", { fill: COLORS[2], size: 12 });
  s += arrow(240, 92, 298, 92, { label: "save", ly: -10, size: 11 }) + arrow(298, 120, 240, 120, { label: "load", ly: 14, size: 11 });
  s += arrow(460, 92, 588, 92, { label: "INSERT / UPDATE", ly: -10, size: 11 }) + arrow(588, 120, 460, 120, { label: "SELECT", ly: 14, size: 11 });
  // table
  const tx = 590, ty = 40, cw = [50, 90, 70];
  const rows = [["Id", "Name", "Cgpa"], ["1", "Rahim", "3.75"], ["2", "Karim", "3.40"]];
  rows.forEach((r, i) => {
    let x = tx;
    r.forEach((c, j) => {
      s += rect(x, ty + 22 + i * 30, cw[j], 30, { fill: i === 0 ? COLORS[1] : "#fff", rx: 0 }) + text(x + cw[j] / 2, ty + 42 + i * 30, c, { size: 12, weight: i === 0 ? "bold" : "normal" });
      x += cw[j];
    });
  });
  s += text(tx + 105, ty + 12, "table Students", { weight: "bold", size: 14 });
  s += text(400, 232, "class → table, property → column, object → row", { size: 12, weight: "bold" });
  return svgDoc(820, 275, s + caption(820, 263, "Object-relational mapping: the ORM converts objects to table rows and back"), "Object-relational mapping");
})();

files["ado-net-reader-writer.svg"] = (() => {
  let s = box(20, 120, 140, 60, "Application\n(C#)", { fill: "#fff", size: 13 });
  s += box(230, 120, 130, 60, "Connection", { fill: COLORS[2], size: 13 });
  s += box(430, 120, 130, 60, "Command", { fill: COLORS[0], size: 13 });
  s += box(660, 120, 120, 60, "Database", { fill: "#fff", size: 13 });
  s += arrow(160, 150, 228, 150) + arrow(360, 150, 428, 150) + arrow(560, 150, 658, 150);
  s += box(400, 20, 190, 56, "DataReader\n(read: forward-only)", { fill: COLORS[1], size: 12 });
  s += box(400, 230, 190, 56, "ExecuteNonQuery\n(write: INSERT/UPDATE/DELETE)", { fill: "#9fd3a8", size: 11 });
  s += arrow(470, 120, 470, 78, { label: "ExecuteReader()", lx: -58, size: 11 }) + polyArrow([[400, 48], [90, 48], [90, 118]]) + text(240, 40, "rows, one at a time with Read()", { size: 11, color: NOTE });
  s += arrow(495, 180, 495, 228) + polyArrow([[400, 258], [90, 258], [90, 182]]) + text(240, 276, "number of rows affected", { size: 11, color: NOTE });
  return svgDoc(800, 320, s + caption(800, 308, "ADO.NET: a Command reads data through a DataReader and writes data with ExecuteNonQuery"), "ADO.NET reader and writer");
})();

// ======================= 7.19 Introduction to E-Commerce =======================
files["ecommerce-transaction.svg"] = (() => {
  let s = box(20, 40, 150, 60, "Customer\n(browser / app)", { fill: "#fff", size: 13 });
  s += box(300, 40, 170, 60, "Online store\n(website, catalog, cart)", { fill: COLORS[0], size: 12 });
  s += box(600, 40, 170, 60, "Payment gateway", { fill: COLORS[2], size: 13 });
  s += box(600, 200, 170, 60, "Banks\n(customer's and merchant's)", { fill: COLORS[1], size: 12 });
  s += box(300, 200, 170, 60, "Order processing\nand warehouse", { fill: "#9fd3a8", size: 12 });
  s += box(20, 200, 150, 60, "Delivery\n(courier)", { fill: COLORS[4], size: 13 });
  s += arrow(170, 60, 298, 60) + text(234, 50, "1. browse, order", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(470, 60, 598, 60) + text(534, 50, "2. pay", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(670, 100, 670, 198) + text(664, 150, "3. authorize", { size: 11, color: NOTE, weight: "bold", anchor: "end" });
  s += arrow(720, 198, 720, 100) + text(726, 175, "4. approved", { size: 11, color: NOTE, weight: "bold", anchor: "start" });
  s += arrow(598, 85, 472, 85) + text(534, 100, "5. confirmed", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(385, 100, 385, 198) + text(391, 150, "6. fulfil order", { size: 11, color: NOTE, weight: "bold", anchor: "start" });
  s += arrow(300, 230, 172, 230) + text(236, 220, "7. ship", { size: 11, color: NOTE, weight: "bold" });
  s += arrow(95, 200, 95, 102) + text(101, 150, "8. deliver", { size: 11, color: NOTE, weight: "bold", anchor: "start" });
  return svgDoc(860, 300, s + caption(860, 290, "Steps of an online (B2C) e-commerce transaction"), "E-commerce transaction");
})();

// ======================= 7.20 E-Commerce Business Models =======================
files["ecommerce-models.svg"] = (() => {
  const parties = ["Business", "Consumer", "Government"];
  const cells = [
    [["B2B", "Alibaba.com"], ["B2C", "Amazon, Daraz"], ["B2G", "e-procurement, tenders"]],
    [["C2B", "freelancers, reviews"], ["C2C", "eBay, Bikroy"], ["C2G", "online tax, bill payment"]],
    [["G2B", "licences, tenders"], ["G2C", "birth registration, passport"], ["G2G", "shared databases"]],
  ];
  const x0 = 180, y0 = 70, cw = 200, ch = 70;
  let s = text(x0 + 1.5 * cw, 28, "Buyer / receiver", { weight: "bold", size: 14 });
  s += `<text x="40" y="${y0 + 1.5 * ch}" ${FONT} font-size="14" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 40 ${y0 + 1.5 * ch})">Seller / provider</text>`;
  parties.forEach((p, i) => {
    s += text(x0 + i * cw + cw / 2, y0 - 12, p, { weight: "bold", size: 13 });
    s += text(x0 - 12, y0 + i * ch + ch / 2 + 5, p, { weight: "bold", size: 13, anchor: "end" });
  });
  cells.forEach((row, i) => row.forEach(([m, ex], j) => {
    const main = (i < 2 && j < 2) || (j === 2 && i === 0) || (i === 2 && j === 1);
    s += rect(x0 + j * cw, y0 + i * ch, cw, ch, { fill: main ? COLORS[[0, 2, 1][i]] : "#fff", rx: 0 });
    s += text(x0 + j * cw + cw / 2, y0 + i * ch + 30, m, { weight: "bold", size: 16 }) + text(x0 + j * cw + cw / 2, y0 + i * ch + 52, ex, { size: 11, color: NOTE });
  }));
  return svgDoc(800, 320, s + caption(800, 305, "E-commerce models named by seller (row) and buyer (column); shaded cells are the main models"), "E-commerce business models");
})();

// ======================= 7.21 Electronic Payment Systems =======================
files["card-payment-flow.svg"] = (() => {
  const nodes = [["Cardholder\n(customer)", "#fff"], ["Merchant\n(online store)", COLORS[0]], ["Payment\ngateway", COLORS[2]], ["Acquiring bank\n(merchant's bank)", COLORS[3]], ["Card network\n(Visa, Mastercard)", COLORS[1]], ["Issuing bank\n(customer's bank)", COLORS[5]]];
  const w = 140, gap = 36, y = 90;
  let s = "";
  nodes.forEach(([l, f], i) => { s += box(20 + i * (w + gap), y, w, 64, l, { fill: f, size: 12 }); });
  for (let i = 0; i < nodes.length - 1; i++) {
    const x1 = 20 + i * (w + gap) + w, x2 = x1 + gap;
    s += arrow(x1, y + 20, x2 - 2, y + 20) + arrow(x2 - 2, y + 44, x1 + 2, y + 44);
  }
  s += arrow(30, 60, 1030, 60, { color: ACCENT }) + text(530, 48, "1–5. card details and authorization request travel to the issuing bank", { size: 12, color: ACCENT, weight: "bold" });
  s += arrow(1030, 184, 30, 184, { color: ACCENT }) + text(530, 204, "6–10. approved or declined response travels back to the customer", { size: 12, color: ACCENT, weight: "bold" });
  s += text(530, 234, "Later, in settlement, the issuing bank pays the acquiring bank through the card network, and the acquiring bank credits the merchant (less fees).", { size: 11, color: NOTE });
  return svgDoc(1060, 275, s + caption(1060, 264, "Card payment through a payment gateway: authorization and settlement"), "Card payment flow");
})();

// ======================= 7.22 E-Commerce Security =======================
files["tls-handshake.svg"] = (() => {
  let s = box(60, 20, 180, 44, "Client (browser)", { fill: COLORS[1], size: 13 }) + box(560, 20, 180, 44, "Server (web site)", { fill: COLORS[0], size: 13 });
  s += line(150, 64, 150, 400, { dash: "5 5", color: NOTE }) + line(650, 64, 650, 400, { dash: "5 5", color: NOTE });
  const msgs = [
    [1, "1. ClientHello: TLS versions, cipher suites, random number"],
    [-1, "2. ServerHello: chosen version and cipher suite, random number"],
    [-1, "3. Certificate: server's digital certificate (with public key)"],
    [0, "4. Client verifies the certificate with the CA's public key"],
    [1, "5. Key exchange: pre-master secret (encrypted with server's public key) or Diffie-Hellman"],
    [0, "6. Both sides compute the same symmetric session key"],
    [1, "7. Finished (encrypted)"],
    [-1, "8. Finished (encrypted)"],
    [2, "9. Application data encrypted with the session key"],
  ];
  msgs.forEach(([d, l], i) => {
    const y = 95 + i * 36;
    if (d === 1) s += arrow(152, y, 648, y) + text(400, y - 6, l, { size: 11 });
    else if (d === -1) s += arrow(648, y, 152, y) + text(400, y - 6, l, { size: 11 });
    else if (d === 0) s += text(400, y, l, { size: 11, color: NOTE, weight: "bold" });
    else s += arrow(152, y, 648, y, { color: ACCENT }) + arrow(648, y + 8, 152, y + 8, { color: ACCENT }) + text(400, y - 6, l, { size: 11, color: ACCENT, weight: "bold" });
  });
  return svgDoc(800, 440, s + caption(800, 428, "Simplified SSL/TLS handshake: authenticate the server, agree on a session key, then encrypt"), "TLS handshake");
})();

files["public-key-encryption.svg"] = (() => {
  let s = box(20, 70, 120, 56, "Plaintext\n\"Pay Tk 500\"", { fill: "#fff", size: 12 });
  s += box(210, 70, 130, 56, "Encrypt", { fill: COLORS[2], size: 14 });
  s += box(410, 70, 130, 56, "Ciphertext\n\"x9#Lq@…\"", { fill: COLORS[6], size: 12 });
  s += box(610, 70, 130, 56, "Decrypt", { fill: COLORS[2], size: 14 });
  s += box(810, 70, 120, 56, "Plaintext\n\"Pay Tk 500\"", { fill: "#fff", size: 12 });
  s += arrow(140, 98, 208, 98) + arrow(340, 98, 408, 98) + arrow(540, 98, 608, 98) + arrow(740, 98, 808, 98);
  s += box(195, 175, 160, 44, "Receiver's PUBLIC key", { fill: COLORS[0], size: 12 }) + arrow(275, 175, 275, 128);
  s += box(595, 175, 160, 44, "Receiver's PRIVATE key", { fill: COLORS[1], size: 12 }) + arrow(675, 175, 675, 128);
  s += text(80, 50, "Sender", { weight: "bold" }) + text(870, 50, "Receiver", { weight: "bold" }) + text(475, 50, "travels over the Internet", { size: 12, color: NOTE });
  s += text(475, 245, "Symmetric encryption uses the SAME secret key in both places.", { size: 12, color: NOTE });
  return svgDoc(950, 285, s + caption(950, 274, "Asymmetric (public-key) encryption: encrypt with the receiver's public key, decrypt with its private key"), "Public-key encryption");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
