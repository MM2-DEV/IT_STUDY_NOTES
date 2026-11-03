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

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
