// Draws the logic-gate diagrams used in the Digital Logic notes as SVG files in
// public/diagrams/digital-logic/. Run: node scripts/draw-logic-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "digital-logic");
const INK = "#17292d";
const ACCENT = "#08595a";
const FONT = "font-family=\"Arial, Helvetica, sans-serif\"";

const line = (x1, y1, x2, y2) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
const poly = (pts) =>
  `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3" fill="${INK}"/>`;
const text = (x, y, s, { size = 16, anchor = "middle", color = INK, weight = "normal", italic = false } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}"${italic ? ' font-style="italic"' : ""} fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`;
const bubble = (x, y) => `<circle cx="${x + 5}" cy="${y}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;

// Gate bodies. Each returns { svg, inputs: [[x,y]...], out: [x,y] } for a gate whose
// top-left corner is (x, y). Two-input gates are 60 × 50.
function gate(type, x, y, n = 2) {
  const h = n === 4 ? 70 : n === 3 ? 60 : 50;
  const ys =
    n === 1 ? [y + 20] : n === 2 ? [y + 15, y + 35] : n === 3 ? [y + 12, y + 30, y + 48] : [y + 12, y + 28, y + 42, y + 58];
  const shape = { stroke: INK, sw: 2 };
  let body = "";
  let backX = x; // where input wires meet the body
  let outX;
  const cy = y + h / 2;
  if (type === "AND" || type === "NAND") {
    body = `<path d="M${x},${y} H${x + 30} A${h / 2},${h / 2} 0 0 1 ${x + 30},${y + h} H${x} Z" fill="#fff" stroke="${shape.stroke}" stroke-width="${shape.sw}" stroke-linejoin="round"/>`;
    outX = x + 30 + h / 2;
  } else if (type === "OR" || type === "NOR" || type === "XOR" || type === "XNOR") {
    body = `<path d="M${x},${y} Q${x + 18},${cy} ${x},${y + h} Q${x + 42},${y + h} ${x + 62},${cy} Q${x + 42},${y} ${x},${y} Z" fill="#fff" stroke="${shape.stroke}" stroke-width="${shape.sw}" stroke-linejoin="round"/>`;
    outX = x + 62;
    backX = x + 9;
    if (type === "XOR" || type === "XNOR") {
      body += `<path d="M${x - 9},${y} Q${x + 9},${cy} ${x - 9},${y + h}" fill="none" stroke="${INK}" stroke-width="2"/>`;
      backX = x;
    }
  } else if (type === "NOT" || type === "BUF") {
    body = `<path d="M${x},${y} L${x + 42},${y + 20} L${x},${y + 40} Z" fill="#fff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    outX = x + 42;
    return {
      svg: body + (type === "NOT" ? bubble(outX, y + 20) : ""),
      inputs: [[x, y + 20]],
      out: [type === "NOT" ? outX + 10 : outX, y + 20],
    };
  }
  const inverted = type === "NAND" || type === "NOR" || type === "XNOR";
  // For OR-shaped gates the back is curved: input wires must reach the curve.
  const inputs = ys.map((iy) => {
    if (type === "AND" || type === "NAND") return [x, iy];
    const t = (iy - y) / h; // quadratic back curve x(t) = x + 2·t·(1−t)·18 (+ offset for XOR)
    const off = type === "XOR" || type === "XNOR" ? -9 : 0;
    return [x + off + 2 * t * (1 - t) * 18, iy];
  });
  void backX;
  return {
    svg: body + (inverted ? bubble(outX, cy) : ""),
    inputs,
    out: [inverted ? outX + 10 : outX, cy],
  };
}

function svgDoc(w, h, inner, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
<title>${title}</title>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${inner}
</svg>
`;
}

const files = {};

// ---------- 1. Gate symbols ----------
function symbol(type, n, label, expr) {
  const W = 300;
  const H = n === 3 ? 120 : 110;
  const gx = 110;
  const gy = n === 3 ? 22 : n === 1 ? 35 : 27;
  const g = gate(type, gx, gy, n);
  const names = ["A", "B", "C"];
  let s = g.svg;
  g.inputs.forEach(([ix, iy], i) => {
    s += line(40, iy, ix, iy) + text(28, iy, names[i], { italic: true });
  });
  s += line(g.out[0], g.out[1], 210, g.out[1]);
  s += text(218, g.out[1], expr, { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(W / 2, H - 12, label, { size: 14, color: "#4b6166" });
  return svgDoc(W + 40, H, s, label);
}
files["and-gate.svg"] = symbol("AND", 2, "AND gate", "X = A·B");
files["or-gate.svg"] = symbol("OR", 2, "OR gate", "X = A+B");
files["not-gate.svg"] = symbol("NOT", 1, "NOT gate (inverter)", "X = A′");
files["nand-gate.svg"] = symbol("NAND", 2, "NAND gate", "X = (A·B)′");
files["nor-gate.svg"] = symbol("NOR", 2, "NOR gate", "X = (A+B)′");
files["xor-gate.svg"] = symbol("XOR", 2, "XOR gate", "X = A⊕B");
files["xnor-gate.svg"] = symbol("XNOR", 2, "XNOR gate", "X = (A⊕B)′");
files["buffer-gate.svg"] = symbol("BUF", 1, "Buffer gate", "X = A");
files["and-gate-3-input.svg"] = symbol("AND", 3, "3-input AND gate", "X = A·B·C");
files["or-gate-3-input.svg"] = symbol("OR", 3, "3-input OR gate", "X = A+B+C");

// OR + NOT = NOR, AND + NOT = NAND
function compound(first, label, mid, expr) {
  const g1 = gate(first, 80, 20, 2);
  const n = gate("NOT", 200, 25, 1);
  let s = g1.svg + n.svg;
  g1.inputs.forEach(([ix, iy], i) => (s += line(30, iy, ix, iy) + text(18, iy, i ? "B" : "A", { italic: true })));
  s += line(g1.out[0], g1.out[1], 200, 45) + text(172, 30, mid, { size: 13, color: "#4b6166" });
  s += line(n.out[0], n.out[1], 300, n.out[1]) + text(306, n.out[1], expr, { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(200, 98, label, { size: 14, color: "#4b6166" });
  return svgDoc(420, 110, s, label);
}
files["nor-from-or-not.svg"] = compound("OR", "OR gate + NOT gate = NOR gate", "A+B", "(A+B)′");
files["nand-from-and-not.svg"] = compound("AND", "AND gate + NOT gate = NAND gate", "A·B", "(A·B)′");

// ---------- 2. Switch circuits ----------
// Battery on the left (vertical), loop wire around, bulb on the right.
const battery = (x, y) =>
  line(x - 14, y - 6, x + 14, y - 6) + line(x - 8, y + 6, x + 8, y + 6) + text(x + 26, y - 6, "+", { size: 14 }) + text(x + 26, y + 6, "−", { size: 14 });
const bulb = (x, y, label = "X") =>
  `<circle cx="${x}" cy="${y}" r="16" fill="#fff8d6" stroke="${INK}" stroke-width="2"/>` +
  line(x - 11, y - 11, x + 11, y + 11) + line(x - 11, y + 11, x + 11, y - 11) + text(x + 30, y, label, { italic: true, weight: "bold" });
// Horizontal switch between (x, y) and (x+50, y); drawn open.
const hswitch = (x, y, name) =>
  dot(x, y) + dot(x + 50, y) + line(x, y, x + 44, y - 18) + text(x + 25, y - 26, name, { italic: true, weight: "bold" });
// Vertical switch between (x, y) and (x, y+50).
const vswitch = (x, y, name) =>
  dot(x, y) + dot(x, y + 50) + line(x, y, x + 18, y + 44) + text(x - 16, y + 25, name, { italic: true, weight: "bold" });
const resistor = (x, y) =>
  poly([[x, y], [x + 5, y - 7], [x + 15, y + 7], [x + 25, y - 7], [x + 35, y + 7], [x + 40, y]]) + text(x + 20, y - 18, "R", { size: 14 });

function circuitFrame(inner, label, w = 420, h = 200) {
  return svgDoc(w, h, inner + text(w / 2, h - 12, label, { size: 14, color: "#4b6166" }), label);
}

// AND: switches in series
files["and-switch-circuit.svg"] = circuitFrame(
  battery(40, 95) +
    poly([[40, 89], [40, 40], [100, 40]]) + hswitch(100, 40, "A") + line(150, 40, 190, 40) + hswitch(190, 40, "B") +
    poly([[240, 40], [330, 40], [330, 79]]) + bulb(330, 95) + poly([[330, 111], [330, 150], [40, 150], [40, 101]]),
  "AND gate: switches A and B in series",
);
// OR: switches in parallel
files["or-switch-circuit.svg"] = circuitFrame(
  battery(40, 105) +
    poly([[40, 99], [40, 40], [120, 40]]) + line(120, 40, 120, 30) +
    poly([[120, 30], [150, 30]]) + hswitch(150, 30, "A") + poly([[200, 30], [230, 30], [230, 90], [200, 90]]) +
    poly([[120, 30], [120, 90], [150, 90]]) + hswitch(150, 90, "B") +
    poly([[230, 60], [330, 60], [330, 89]]) + bulb(330, 105) + poly([[330, 121], [330, 160], [40, 160], [40, 111]]),
  "OR gate: switches A and B in parallel",
  420,
  210,
);
// NOT: switch in parallel with the bulb, resistor in series
files["not-switch-circuit.svg"] = circuitFrame(
  battery(40, 95) +
    poly([[40, 89], [40, 40], [90, 40]]) + resistor(90, 40) + poly([[130, 40], [330, 40], [330, 79]]) +
    bulb(330, 95) + poly([[330, 111], [330, 150], [40, 150], [40, 101]]) +
    poly([[230, 40], [230, 70]]) + vswitch(230, 70, "A") + poly([[230, 120], [230, 150]]),
  "NOT gate: switch A in parallel with the bulb",
);
// NAND: two switches in series, together in parallel with the bulb
files["nand-switch-circuit.svg"] = circuitFrame(
  battery(40, 115) +
    poly([[40, 109], [40, 40], [90, 40]]) + resistor(90, 40) + poly([[130, 40], [330, 40], [330, 99]]) +
    bulb(330, 115) + poly([[330, 131], [330, 190], [40, 190], [40, 121]]) +
    poly([[230, 40], [230, 60]]) + vswitch(230, 60, "A") + vswitch(230, 120, "B") + poly([[230, 110], [230, 120]]) + poly([[230, 170], [230, 190]]),
  "NAND gate: A and B in series, in parallel with the bulb",
  420,
  240,
);
// NOR: two switches in parallel, together in parallel with the bulb
files["nor-switch-circuit.svg"] = circuitFrame(
  battery(40, 105) +
    poly([[40, 99], [40, 40], [90, 40]]) + resistor(90, 40) + poly([[130, 40], [380, 40], [380, 89]]) +
    bulb(380, 105) + poly([[380, 121], [380, 170], [40, 170], [40, 111]]) +
    poly([[200, 40], [200, 80]]) + vswitch(200, 80, "A") + poly([[200, 130], [200, 170]]) +
    poly([[280, 40], [280, 80]]) + vswitch(280, 80, "B") + poly([[280, 130], [280, 170]]),
  "NOR gate: A and B in parallel, in parallel with the bulb",
  460,
  220,
);

// ---------- 3. Universal gate constructions ----------
function wire(points) {
  return poly(points);
}
// NOT from one gate (inputs joined)
function notFrom(type, label, expr) {
  const g = gate(type, 120, 25, 2);
  let s = g.svg;
  s += line(40, 50, 90, 50) + text(28, 50, "A", { italic: true }) + dot(90, 50);
  s += wire([[90, 50], [90, g.inputs[0][1]], [g.inputs[0][0], g.inputs[0][1]]]);
  s += wire([[90, 50], [90, g.inputs[1][1]], [g.inputs[1][0], g.inputs[1][1]]]);
  s += line(g.out[0], g.out[1], 250, g.out[1]) + text(258, g.out[1], expr, { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(200, 100, label, { size: 14, color: "#4b6166" });
  return svgDoc(400, 112, s, label);
}
files["not-from-nand.svg"] = notFrom("NAND", "NOT gate using one NAND gate", "X = (A·A)′ = A′");
files["not-from-nor.svg"] = notFrom("NOR", "NOT gate using one NOR gate", "X = (A+A)′ = A′");

// Gate followed by the same gate used as NOT (AND from NAND, OR from NOR)
function chain(type, label, mid, expr) {
  const g1 = gate(type, 70, 25, 2);
  const g2 = gate(type, 210, 25, 2);
  let s = g1.svg + g2.svg;
  g1.inputs.forEach(([ix, iy], i) => (s += line(25, iy, ix, iy) + text(13, iy, i ? "B" : "A", { italic: true })));
  s += line(g1.out[0], 50, 185, 50) + dot(185, 50) + text(160, 34, mid, { size: 13, color: "#4b6166" });
  s += wire([[185, 50], [185, g2.inputs[0][1]], [g2.inputs[0][0], g2.inputs[0][1]]]);
  s += wire([[185, 50], [185, g2.inputs[1][1]], [g2.inputs[1][0], g2.inputs[1][1]]]);
  s += line(g2.out[0], 50, 340, 50) + text(348, 50, expr, { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(240, 100, label, { size: 14, color: "#4b6166" });
  return svgDoc(500, 112, s, label);
}
files["and-from-nand.svg"] = chain("NAND", "AND gate using two NAND gates", "(A·B)′", "X = ((A·B)′)′ = A·B");
files["or-from-nor.svg"] = chain("NOR", "OR gate using two NOR gates", "(A+B)′", "X = ((A+B)′)′ = A+B");

// Each input inverted by one gate, then a third gate (OR from NAND, AND from NOR)
function threeGate(type, label, expr, ia, ib) {
  const ga = gate(type, 90, 15, 2);
  const gb = gate(type, 90, 95, 2);
  const g3 = gate(type, 240, 55, 2);
  let s = ga.svg + gb.svg + g3.svg;
  for (const [g, name, y] of [[ga, "A", 40], [gb, "B", 120]]) {
    s += line(30, y, 65, y) + text(18, y, name, { italic: true }) + dot(65, y);
    s += wire([[65, y], [65, g.inputs[0][1]], [g.inputs[0][0], g.inputs[0][1]]]);
    s += wire([[65, y], [65, g.inputs[1][1]], [g.inputs[1][0], g.inputs[1][1]]]);
  }
  s += wire([[ga.out[0], ga.out[1]], [210, ga.out[1]], [210, g3.inputs[0][1]], [g3.inputs[0][0], g3.inputs[0][1]]]);
  s += wire([[gb.out[0], gb.out[1]], [210, gb.out[1]], [210, g3.inputs[1][1]], [g3.inputs[1][0], g3.inputs[1][1]]]);
  s += text(190, 26, ia, { size: 13, color: "#4b6166" }) + text(190, 106, ib, { size: 13, color: "#4b6166" });
  s += line(g3.out[0], g3.out[1], 360, g3.out[1]) + text(368, g3.out[1], expr, { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(260, 175, label, { size: 14, color: "#4b6166" });
  return svgDoc(540, 190, s, label);
}
files["or-from-nand.svg"] = threeGate("NAND", "OR gate using three NAND gates", "X = (A′·B′)′ = A+B", "A′", "B′");
files["and-from-nor.svg"] = threeGate("NOR", "AND gate using three NOR gates", "X = (A′+B′)′ = A·B", "A′", "B′");

// ---------- 4. Special gates ----------
files["xnor-from-xor-not.svg"] = (() => {
  const g1 = gate("XOR", 80, 20, 2);
  const n = gate("NOT", 200, 25, 1);
  let s = g1.svg + n.svg;
  g1.inputs.forEach(([ix, iy], i) => (s += line(30, iy, ix, iy) + text(18, iy, i ? "B" : "A", { italic: true })));
  s += line(g1.out[0], g1.out[1], 200, 45) + text(172, 30, "A⊕B", { size: 13, color: "#4b6166" });
  s += line(n.out[0], n.out[1], 300, n.out[1]) + text(306, n.out[1], "(A⊕B)′", { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(200, 98, "XOR gate + NOT gate = XNOR gate", { size: 14, color: "#4b6166" });
  return svgDoc(420, 110, s, "XOR gate + NOT gate = XNOR gate");
})();

// XOR from basic gates: X = A′B + AB′
files["xor-from-basic-gates.svg"] = (() => {
  const na = gate("NOT", 110, 20, 1); // gives A′
  const nb = gate("NOT", 110, 160, 1); // gives B′
  const g1 = gate("AND", 250, 30, 2); // A′·B
  const g2 = gate("AND", 250, 110, 2); // A·B′
  const g3 = gate("OR", 390, 70, 2);
  let s = na.svg + nb.svg + g1.svg + g2.svg + g3.svg;
  const xA = 60, xB = 85; // vertical input buses
  s += text(xA, 12, "A", { italic: true }) + text(xB, 12, "B", { italic: true });
  s += line(xA, 22, xA, 210) + line(xB, 22, xB, 210);
  // A → NOT → A′ → AND1 top ; B → AND1 bottom
  s += dot(xA, 40) + line(xA, 40, na.inputs[0][0], 40);
  s += poly([[na.out[0], 40], [230, 40], [230, g1.inputs[0][1]], [g1.inputs[0][0], g1.inputs[0][1]]]) + text(205, 30, "A′", { size: 13, color: "#4b6166" });
  s += dot(xB, g1.inputs[1][1]) + line(xB, g1.inputs[1][1], g1.inputs[1][0], g1.inputs[1][1]);
  // A → AND2 top ; B → NOT → B′ → AND2 bottom
  s += dot(xA, g2.inputs[0][1]) + line(xA, g2.inputs[0][1], g2.inputs[0][0], g2.inputs[0][1]);
  s += dot(xB, 180) + line(xB, 180, nb.inputs[0][0], 180);
  s += poly([[nb.out[0], 180], [230, 180], [230, g2.inputs[1][1]], [g2.inputs[1][0], g2.inputs[1][1]]]) + text(205, 192, "B′", { size: 13, color: "#4b6166" });
  // ANDs → OR
  s += poly([[g1.out[0], g1.out[1]], [370, g1.out[1]], [370, g3.inputs[0][1]], [g3.inputs[0][0], g3.inputs[0][1]]]) + text(345, 42, "A′B", { size: 13, color: "#4b6166" });
  s += poly([[g2.out[0], g2.out[1]], [370, g2.out[1]], [370, g3.inputs[1][1]], [g3.inputs[1][0], g3.inputs[1][1]]]) + text(345, 152, "AB′", { size: 13, color: "#4b6166" });
  s += line(g3.out[0], g3.out[1], 490, g3.out[1]) + text(498, g3.out[1], "X = A′B + AB′ = A⊕B", { anchor: "start", color: ACCENT, weight: "bold" });
  s += text(340, 232, "XOR gate made from basic gates (NOT, AND, OR)", { size: 14, color: "#4b6166" });
  return svgDoc(700, 248, s, "XOR gate made from basic gates");
})();

files["xor-gate-3-input.svg"] = symbol("XOR", 3, "3-input XOR gate", "X = A⊕B⊕C");

// ---------- 5. De Morgan's theorem: gate equivalences ----------
function deMorgan(left, right, leftExpr, rightExpr, label) {
  const g1 = gate(left, 60, 30, 2);
  let s = g1.svg;
  g1.inputs.forEach(([ix, iy], i) => (s += line(25, iy, ix, iy) + text(13, iy, i ? "B" : "A", { italic: true })));
  s += line(g1.out[0], g1.out[1], 165, g1.out[1]) + text(170, g1.out[1] - 16, leftExpr, { size: 14, color: ACCENT, weight: "bold" });
  s += text(250, 55, "=", { size: 26, weight: "bold" });
  const na = gate("NOT", 330, 0, 1);
  const nb = gate("NOT", 330, 70, 1);
  const g2 = gate(right, 450, 30, 2);
  s += na.svg + nb.svg + g2.svg;
  s += line(295, 20, 330, 20) + text(283, 20, "A", { italic: true });
  s += line(295, 90, 330, 90) + text(283, 90, "B", { italic: true });
  s += poly([[na.out[0], 20], [425, 20], [425, g2.inputs[0][1]], [g2.inputs[0][0], g2.inputs[0][1]]]) + text(405, 8, "A′", { size: 13, color: "#4b6166" });
  s += poly([[nb.out[0], 90], [425, 90], [425, g2.inputs[1][1]], [g2.inputs[1][0], g2.inputs[1][1]]]) + text(405, 104, "B′", { size: 13, color: "#4b6166" });
  s += line(g2.out[0], g2.out[1], 560, g2.out[1]) + text(566, g2.out[1], rightExpr, { anchor: "start", size: 14, color: ACCENT, weight: "bold" });
  s += text(330, 135, label, { size: 14, color: "#4b6166" });
  return svgDoc(660, 150, s, label);
}
files["demorgan-nor-equals-and-of-complements.svg"] = deMorgan("NOR", "AND", "(A+B)′", "A′·B′", "De Morgan's first theorem: (A + B)′ = A′ · B′ (NOR = AND with inverted inputs)");
files["demorgan-nand-equals-or-of-complements.svg"] = deMorgan("NAND", "OR", "(A·B)′", "A′+B′", "De Morgan's second theorem: (A · B)′ = A′ + B′ (NAND = OR with inverted inputs)");

// ---------- 6. Karnaugh maps ----------
// n = 2, 3 or 4 variables; vars = variable letters (e.g. "ABCD"); cells: { m: "1" | "0" | "X" };
// groups: [{ pattern: "-1-0", color }] in the order of vars; showIndex: print minterm numbers.
const GRAY = { 1: ["0", "1"], 2: ["00", "01", "11", "10"] };
const GROUP_COLORS = ["#0397a0", "#c2410c", "#7c3aed", "#15803d", "#b91c1c", "#a16207"];
function kmap({ n, vars, cells = {}, groups = [], title, showIndex = true, fill = "0" }) {
  const rowBits = n === 4 ? 2 : 1;
  const colBits = n - rowBits;
  const rows = GRAY[rowBits];
  const cols = GRAY[colBits];
  const cw = 64, ch = 50, x0 = 110, y0 = 70;
  const W = x0 + cols.length * cw + 40;
  const H = y0 + rows.length * ch + 50;
  const rowVar = vars.slice(0, rowBits), colVar = vars.slice(rowBits);
  let s = "";
  // corner label
  s += line(x0 - 50, y0 - 46, x0, y0) ;
  s += text(x0 - 40, y0 - 10, rowVar, { size: 15, weight: "bold", italic: true });
  s += text(x0 - 12, y0 - 40, colVar, { size: 15, weight: "bold", italic: true });
  cols.forEach((c, j) => (s += text(x0 + j * cw + cw / 2, y0 - 14, c, { size: 15 })));
  rows.forEach((r, i) => (s += text(x0 - 22, y0 + i * ch + ch / 2, r, { size: 15 })));
  // cells
  rows.forEach((r, i) =>
    cols.forEach((c, j) => {
      const m = parseInt(r + c, 2);
      const x = x0 + j * cw, y = y0 + i * ch;
      s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>`;
      if (showIndex) s += text(x + cw - 9, y + 11, String(m), { size: 10, color: "#7a8a8d" });
      const v = cells[m] ?? fill;
      if (v !== "") s += text(x + cw / 2, y + ch / 2 + 2, v, { size: 20, weight: v === "1" ? "bold" : "normal", color: v === "1" ? INK : v === "X" ? "#a16207" : "#7a8a8d" });
    }),
  );
  // groups: split row and column index sets into contiguous runs (wrap-around gives two runs)
  const runs = (idx, len) => {
    const set = [...new Set(idx)].sort((a, b) => a - b);
    if (set.length === len) return [[0, len - 1, false, false]];
    const out = [];
    let start = set[0], prev = set[0];
    for (const k of set.slice(1)) { if (k === prev + 1) { prev = k; continue; } out.push([start, prev]); start = prev = k; }
    out.push([start, prev]);
    if (out.length === 2 && out[0][0] === 0 && out[1][1] === len - 1) return [[out[0][0], out[0][1], true, false], [out[1][0], out[1][1], false, true]];
    return out.map((r) => [r[0], r[1], false, false]);
  };
  groups.forEach((g, gi) => {
    const color = g.color ?? GROUP_COLORS[gi % GROUP_COLORS.length];
    const match = (bits) => [...g.pattern].every((p, k) => p === "-" || p === bits[k]);
    const ri = [], ci = [];
    rows.forEach((r, i) => cols.forEach((c, j) => { if (match(r + c)) { ri.push(i); ci.push(j); } }));
    const pad = 5 + gi * 3;
    for (const [r0, r1, rOpenTop, rOpenBottom] of runs(ri, rows.length))
      for (const [c0, c1, cOpenLeft, cOpenRight] of runs(ci, cols.length)) {
        const x = x0 + c0 * cw + pad - (cOpenLeft ? pad + 6 : 0);
        const y = y0 + r0 * ch + pad - (rOpenTop ? pad + 6 : 0);
        const w = (c1 - c0 + 1) * cw - 2 * pad + (cOpenLeft ? pad + 6 : 0) + (cOpenRight ? pad + 6 : 0);
        const h = (r1 - r0 + 1) * ch - 2 * pad + (rOpenTop ? pad + 6 : 0) + (rOpenBottom ? pad + 6 : 0);
        s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="2.5"/>`;
      }
  });
  // group legend
  groups.forEach((g, gi) => {
    const color = g.color ?? GROUP_COLORS[gi % GROUP_COLORS.length];
    s += `<rect x="${W + 6}" y="${y0 + gi * 26 - 8}" width="16" height="16" rx="4" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="2"/>`;
    s += text(W + 30, y0 + gi * 26, g.label ?? g.pattern, { anchor: "start", size: 15, weight: "bold", color });
  });
  const totalW = Math.max(groups.length ? W + 200 : W, 480);
  if (title) s += text(totalW / 2, H - 16, title, { size: 14, color: "#4b6166" });
  return svgDoc(totalW, H, s, title ?? "Karnaugh map");
}
const ones = (list, fill = {}) => Object.fromEntries([...list.map((m) => [m, "1"]), ...Object.entries(fill)]);

files["kmap-2-variable-layout.svg"] = kmap({ n: 2, vars: "AB", fill: "", title: "2-variable K-map: 4 cells (minterm numbers in the corners)" });
files["kmap-3-variable-layout.svg"] = kmap({ n: 3, vars: "ABC", fill: "", title: "3-variable K-map: 8 cells; columns in Gray code 00, 01, 11, 10" });
files["kmap-4-variable-layout.svg"] = kmap({ n: 4, vars: "ABCD", fill: "", title: "4-variable K-map: 16 cells; rows and columns in Gray code" });

files["kmap-example-2var.svg"] = kmap({ n: 2, vars: "AB", cells: ones([0, 1, 3]), groups: [{ pattern: "0-", label: "A′" }, { pattern: "-1", label: "B" }], title: "F(A, B) = Σm(0, 1, 3) = A′ + B" });
files["kmap-example-3var.svg"] = kmap({ n: 3, vars: "ABC", cells: ones([1, 3, 6, 7]), groups: [{ pattern: "0-1", label: "A′C" }, { pattern: "11-", label: "AB" }], title: "F(A, B, C) = Σm(1, 3, 6, 7) = A′C + AB" });
files["kmap-example-wxyz.svg"] = kmap({ n: 4, vars: "WXYZ", cells: ones([0, 4, 5, 6, 12, 14, 15]), groups: [{ pattern: "-1-0", label: "XZ′" }, { pattern: "0-00", label: "W′Y′Z′" }, { pattern: "010-", label: "W′XY′" }, { pattern: "111-", label: "WXY" }], title: "F(W, X, Y, Z) = Σm(0, 4, 5, 6, 12, 14, 15)" });
files["kmap-example-4var-a.svg"] = kmap({ n: 4, vars: "ABCD", cells: ones([3, 5, 7, 9, 11, 13, 14, 15]), groups: [{ pattern: "--11", label: "CD" }, { pattern: "-1-1", label: "BD" }, { pattern: "1--1", label: "AD" }, { pattern: "111-", label: "ABC" }], title: "F(A, B, C, D) = Σm(3, 5, 7, 9, 11, 13, 14, 15)" });
files["kmap-example-4var-b.svg"] = kmap({ n: 4, vars: "ABCD", cells: ones([0, 3, 5, 7, 8, 10, 11, 12, 13, 14, 15]), groups: [{ pattern: "--11", label: "CD" }, { pattern: "-000", label: "B′C′D′" }, { pattern: "-1-1", label: "BD" }, { pattern: "1--0", label: "AD′" }], title: "F(A, B, C, D) = Σm(0, 3, 5, 7, 8, 10, 11, 12, 13, 14, 15)" });
files["kmap-example-pos.svg"] = kmap({ n: 3, vars: "ABC", cells: { 0: "0", 3: "0", 6: "0", 7: "0", 1: "1", 2: "1", 4: "1", 5: "1" }, groups: [{ pattern: "11-", label: "(A′ + B′)" }, { pattern: "-11", label: "(B′ + C′)" }, { pattern: "000", label: "(A + B + C)" }], title: "F(A, B, C) = ΠM(0, 3, 6, 7): grouping the 0s" });
files["kmap-example-dont-care.svg"] = kmap({ n: 4, vars: "ABCD", cells: ones([1, 3, 7, 11, 15], { 0: "X", 2: "X", 5: "X" }), groups: [{ pattern: "--11", label: "CD" }, { pattern: "0--1", label: "A′D" }], title: "F = Σm(1, 3, 7, 11, 15) + d(0, 2, 5) = CD + A′D" });
files["kmap-example-qm.svg"] = kmap({ n: 4, vars: "ABCD", cells: ones([0, 1, 2, 4, 6, 8, 9, 11, 13, 15]), groups: [{ pattern: "-00-", label: "B′C′" }, { pattern: "0--0", label: "A′D′" }, { pattern: "1--1", label: "AD" }], title: "F = Σm(0, 1, 2, 4, 6, 8, 9, 11, 13, 15) = B′C′ + A′D′ + AD" });

// ---------- 7. Combinational circuits ----------
const NOTE = "#4b6166";
const note = (x, y, s, opts = {}) => text(x, y, s, { size: 13, color: NOTE, ...opts });
const result = (x, y, s) => text(x, y, s, { anchor: "start", color: ACCENT, weight: "bold" });
const caption = (w, y, s) => text(w / 2, y, s, { size: 14, color: NOTE });
const arrowLeft = (x, y) => `<path d="M${x},${y} l9,-5 v10 Z" fill="${INK}"/>`;
const arrowRight = (x, y) => `<path d="M${x},${y} l-9,-5 v10 Z" fill="${INK}"/>`;
const arrowDown = (x, y) => `<path d="M${x},${y} l-5,-9 h10 Z" fill="${INK}"/>`;
// Rectangular block; name may be several lines. pins: { left: [[y, name]], right: [[y, name]], bottom: [[x, name]] }
function box(x, y, w, h, name, pins = {}) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  const names = [].concat(name);
  names.forEach((n, i) => (s += text(x + w / 2, y + h / 2 + (i - (names.length - 1) / 2) * 20, n, { size: 15, weight: "bold" })));
  (pins.left ?? []).forEach(([py, n]) => (s += text(x + 6, py, n, { size: 12, anchor: "start", color: NOTE })));
  (pins.right ?? []).forEach(([py, n]) => (s += text(x + w - 6, py, n, { size: 12, anchor: "end", color: NOTE })));
  (pins.bottom ?? []).forEach(([px, n]) => (s += text(px, y + h - 10, n, { size: 12, color: NOTE })));
  return s;
}

files["combinational-circuit-block.svg"] = (() => {
  let s = box(170, 30, 180, 130, ["Combinational", "logic circuit"]);
  const ys = [55, 85, 135];
  ["I1", "I2", "In"].forEach((n, i) => (s += line(60, ys[i], 170, ys[i]) + text(46, ys[i], n, { italic: true })));
  ["O1", "O2", "Om"].forEach((n, i) => (s += line(350, ys[i], 460, ys[i]) + text(476, ys[i], n, { italic: true })));
  s += text(115, 112, "⋮", { size: 18 }) + text(405, 112, "⋮", { size: 18 });
  s += note(115, 18, "n inputs") + note(405, 18, "m outputs");
  return svgDoc(520, 200, s + caption(520, 185, "Block diagram of a combinational circuit"), "Block diagram of a combinational circuit");
})();

files["majority-circuit.svg"] = (() => {
  const g1 = gate("AND", 170, 20), g2 = gate("AND", 170, 90), g3 = gate("AND", 170, 160);
  const o = gate("OR", 320, 85, 3);
  let s = g1.svg + g2.svg + g3.svg + o.svg;
  s += text(50, 12, "A", { italic: true }) + text(75, 12, "B", { italic: true }) + text(100, 12, "C", { italic: true });
  s += line(50, 22, 50, 175) + line(75, 22, 75, 105) + line(100, 22, 100, 195);
  s += dot(50, 35) + line(50, 35, ...g1.inputs[0]) + line(50, 175, ...g3.inputs[0]);
  s += dot(75, 55) + line(75, 55, ...g1.inputs[1]) + line(75, 105, ...g2.inputs[0]);
  s += dot(100, 125) + line(100, 125, ...g2.inputs[1]) + line(100, 195, ...g3.inputs[1]);
  s += poly([g1.out, [290, 45], [290, o.inputs[0][1]], o.inputs[0]]) + note(255, 33, "AB");
  s += line(...g2.out, ...o.inputs[1]) + note(255, 103, "BC");
  s += poly([g3.out, [290, 185], [290, o.inputs[2][1]], o.inputs[2]]) + note(255, 173, "CA");
  s += line(...o.out, 420, o.out[1]) + result(428, o.out[1], "F = AB + BC + CA");
  return svgDoc(640, 248, s + caption(640, 232, "Majority circuit: output 1 when two or more inputs are 1"), "Majority circuit");
})();

files["half-adder.svg"] = (() => {
  const gx = gate("XOR", 170, 20), ga = gate("AND", 170, 100);
  let s = gx.svg + ga.svg;
  s += text(60, 12, "A", { italic: true }) + text(95, 12, "B", { italic: true });
  s += line(60, 22, 60, ga.inputs[0][1]) + line(95, 22, 95, ga.inputs[1][1]);
  s += dot(60, gx.inputs[0][1]) + line(60, gx.inputs[0][1], ...gx.inputs[0]) + line(60, ga.inputs[0][1], ...ga.inputs[0]);
  s += dot(95, gx.inputs[1][1]) + line(95, gx.inputs[1][1], ...gx.inputs[1]) + line(95, ga.inputs[1][1], ...ga.inputs[1]);
  s += line(...gx.out, 290, gx.out[1]) + result(298, gx.out[1], "S = A⊕B (Sum)");
  s += line(...ga.out, 290, ga.out[1]) + result(298, ga.out[1], "C = A·B (Carry)");
  return svgDoc(480, 188, s + caption(480, 172, "Half adder: one XOR gate and one AND gate"), "Half adder");
})();

files["full-adder-circuit.svg"] = (() => {
  const x1 = gate("XOR", 160, 20), x2 = gate("XOR", 300, 40);
  const a2 = gate("AND", 300, 110), a1 = gate("AND", 300, 180), o = gate("OR", 430, 145);
  let s = x1.svg + x2.svg + a2.svg + a1.svg + o.svg;
  const xA = 50, xB = 80, xC = 110;
  s += text(xA, 12, "A", { italic: true }) + text(xB, 12, "B", { italic: true }) + text(xC, 12, "Cin", { italic: true });
  s += line(xA, 22, xA, a1.inputs[0][1]) + line(xB, 22, xB, a1.inputs[1][1]) + line(xC, 22, xC, a2.inputs[1][1]);
  s += dot(xA, x1.inputs[0][1]) + line(xA, x1.inputs[0][1], ...x1.inputs[0]) + line(xA, a1.inputs[0][1], ...a1.inputs[0]);
  s += dot(xB, x1.inputs[1][1]) + line(xB, x1.inputs[1][1], ...x1.inputs[1]) + line(xB, a1.inputs[1][1], ...a1.inputs[1]);
  s += dot(xC, x2.inputs[1][1]) + line(xC, x2.inputs[1][1], ...x2.inputs[1]) + line(xC, a2.inputs[1][1], ...a2.inputs[1]);
  s += poly([x1.out, [250, 45], [250, x2.inputs[0][1]], x2.inputs[0]]) + note(255, 31, "A⊕B");
  s += dot(235, 45) + poly([[235, 45], [235, a2.inputs[0][1]], a2.inputs[0]]);
  s += poly([a2.out, [400, a2.out[1]], [400, o.inputs[0][1]], o.inputs[0]]) + note(362, 121, "(A⊕B)Cin", { anchor: "start" });
  s += poly([a1.out, [410, a1.out[1]], [410, o.inputs[1][1]], o.inputs[1]]) + note(380, 219, "AB");
  s += line(...x2.out, 540, x2.out[1]) + result(548, x2.out[1], "S = A⊕B⊕Cin");
  s += line(...o.out, 540, o.out[1]) + result(548, o.out[1], "Cout = AB + (A⊕B)Cin");
  return svgDoc(780, 270, s + caption(780, 254, "Full adder: two XOR gates, two AND gates and one OR gate"), "Full adder");
})();

files["full-adder-from-half-adders.svg"] = (() => {
  let s = box(100, 30, 90, 70, "HA1", { left: [[50, "A"], [80, "B"]], right: [[50, "S"], [80, "C"]] });
  s += box(250, 85, 90, 70, "HA2", { left: [[100, "A"], [130, "B"]], right: [[100, "S"], [130, "C"]] });
  const o = gate("OR", 400, 140);
  s += o.svg;
  s += line(40, 50, 100, 50) + text(28, 50, "A", { italic: true });
  s += line(40, 80, 100, 80) + text(28, 80, "B", { italic: true });
  s += line(40, 130, 250, 130) + text(22, 130, "Cin", { italic: true });
  s += poly([[190, 50], [220, 50], [220, 100], [250, 100]]) + note(240, 38, "S1 = A⊕B");
  s += poly([[190, 80], [205, 80], [205, 190], [380, 190], [380, o.inputs[1][1]], o.inputs[1]]) + note(300, 202, "C1 = AB");
  s += poly([[340, 130], [370, 130], [370, o.inputs[0][1]], o.inputs[0]]) + note(357, 116, "C2");
  s += line(340, 100, 500, 100) + result(508, 100, "S = A⊕B⊕Cin");
  s += line(...o.out, 500, o.out[1]) + result(508, o.out[1], "Cout = C1 + C2");
  return svgDoc(680, 245, s + caption(680, 230, "Full adder made from two half adders (HA) and one OR gate"), "Full adder from two half adders");
})();

files["parallel-adder-4bit.svg"] = (() => {
  let s = "";
  const xs = [520, 380, 240, 100]; // FA0 (least significant bit) is on the right
  xs.forEach((x, i) => {
    s += box(x, 80, 90, 70, `FA${i}`);
    s += line(x + 25, 40, x + 25, 80) + arrowDown(x + 25, 80) + text(x + 25, 30, `A${i}`, { italic: true });
    s += line(x + 65, 40, x + 65, 80) + arrowDown(x + 65, 80) + text(x + 65, 30, `B${i}`, { italic: true });
    s += line(x + 45, 150, x + 45, 185) + arrowDown(x + 45, 185) + text(x + 45, 198, `S${i}`, { italic: true, color: ACCENT, weight: "bold" });
  });
  s += line(655, 115, 610, 115) + arrowLeft(610, 115) + text(675, 115, "C0", { italic: true });
  for (let i = 0; i < 3; i++) s += line(xs[i], 115, xs[i + 1] + 90, 115) + arrowLeft(xs[i + 1] + 90, 115) + note((xs[i] + xs[i + 1] + 90) / 2, 103, `C${i + 1}`);
  s += line(100, 115, 55, 115) + arrowLeft(55, 115) + text(35, 115, "C4", { italic: true, color: ACCENT, weight: "bold" });
  return svgDoc(720, 245, s + caption(720, 228, "4-bit parallel adder: each carry ripples from FA0 towards FA3"), "4-bit parallel adder");
})();

// AND-gate arrays driven by two select lines and their complements:
// a 4×1 MUX (per-gate data inputs + OR gate), a 1×4 DEMUX (shared data line) and a 2-to-4 decoder (shared enable).
function andArray({ sel, shared, outputs, mux, label }) {
  const [hi, lo] = sel;
  const gs = [0, 1, 2, 3].map((k) => gate("AND", 330, 20 + k * 80, 3));
  let s = gs.map((g) => g.svg).join("");
  const bus = { [`${hi}′`]: 210, [hi]: 230, [`${lo}′`]: 250, [lo]: 270 };
  const uses = { 210: [], 230: [], 250: [], 270: [] };
  gs.forEach((g, k) => {
    uses[(k & 2 ? bus[hi] : bus[`${hi}′`])].push(g.inputs[1]);
    uses[(k & 1 ? bus[lo] : bus[`${lo}′`])].push(g.inputs[2]);
  });
  // Select inputs enter at the bottom; each feeds its true bus and, through a NOT gate, its complement bus.
  [[hi, 350, 385, 365], [lo, 430, 465, 445]].forEach(([name, y, ny, gy]) => {
    const n = gate("NOT", 100, gy, 1);
    s += line(40, y, bus[name], y) + text(26, y, name, { italic: true }) + dot(80, y);
    s += poly([[80, y], [80, ny], n.inputs[0]]) + n.svg + line(...n.out, bus[`${name}′`], ny);
    s += note(185, ny - 10, `${name}′`) + note(185, y - 10, name);
  });
  for (const [x, pts] of Object.entries(uses)) {
    const top = Math.min(...pts.map((p) => p[1]));
    const bottom = { 210: 385, 230: 350, 250: 465, 270: 430 }[x];
    s += line(+x, top, +x, bottom);
    for (const p of pts) s += (p[1] === top ? "" : dot(+x, p[1])) + line(+x, p[1], ...p);
  }
  if (shared) {
    s += line(40, gs[0].inputs[0][1], ...gs[0].inputs[0]) + text(26, gs[0].inputs[0][1], shared, { italic: true });
    s += dot(150, gs[0].inputs[0][1]) + line(150, gs[0].inputs[0][1], 150, gs[3].inputs[0][1]);
    gs.forEach((g, k) => k && (s += (k < 3 ? dot(150, g.inputs[0][1]) : "") + line(150, g.inputs[0][1], ...g.inputs[0])));
  } else {
    gs.forEach((g, k) => (s += line(40, g.inputs[0][1], ...g.inputs[0]) + text(26, g.inputs[0][1], `I${k}`, { italic: true })));
  }
  let w = 640;
  if (mux) {
    const o = gate("OR", 440, 130, 4);
    s += o.svg;
    [[425, 0], [415, 1], [415, 2], [425, 3]].forEach(([vx, k]) => (s += poly([gs[k].out, [vx, gs[k].out[1]], [vx, o.inputs[k][1]], o.inputs[k]])));
    s += line(...o.out, 540, o.out[1]) + result(548, o.out[1], "Y");
    w = 600;
  } else {
    gs.forEach((g, k) => (s += line(...g.out, 440, g.out[1]) + result(448, g.out[1], outputs[k])));
  }
  return svgDoc(w, 505, s + caption(w, 490, label), label);
}
files["mux-4to1.svg"] = andArray({ sel: ["S1", "S0"], mux: true, label: "4×1 multiplexer: Y = S1′S0′I0 + S1′S0I1 + S1S0′I2 + S1S0I3" });
files["demux-1to4.svg"] = andArray({ sel: ["S1", "S0"], shared: "D", outputs: ["Y0 = S1′S0′D", "Y1 = S1′S0D", "Y2 = S1S0′D", "Y3 = S1S0D"], label: "1×4 demultiplexer: the data input D goes to the selected output" });
files["decoder-2to4.svg"] = andArray({ sel: ["A", "B"], shared: "E", outputs: ["Y0 = EA′B′", "Y1 = EA′B", "Y2 = EAB′", "Y3 = EAB"], label: "2-to-4 line decoder with enable input E" });

files["mux-2to1.svg"] = (() => {
  const a1 = gate("AND", 200, 25), a2 = gate("AND", 200, 115), n = gate("NOT", 100, 75, 1), o = gate("OR", 320, 65);
  let s = a1.svg + a2.svg + n.svg + o.svg;
  s += line(40, a1.inputs[0][1], ...a1.inputs[0]) + text(26, a1.inputs[0][1], "I0", { italic: true });
  s += line(40, a2.inputs[1][1], ...a2.inputs[1]) + text(26, a2.inputs[1][1], "I1", { italic: true });
  s += line(40, 95, ...n.inputs[0]) + text(26, 95, "S", { italic: true }) + dot(70, 95);
  s += poly([n.out, [175, 95], [175, a1.inputs[1][1]], a1.inputs[1]]) + note(165, 108, "S′");
  s += poly([[70, 95], [70, a2.inputs[0][1]], a2.inputs[0]]);
  s += poly([a1.out, [290, a1.out[1]], [290, o.inputs[0][1]], o.inputs[0]]);
  s += poly([a2.out, [290, a2.out[1]], [290, o.inputs[1][1]], o.inputs[1]]);
  s += line(...o.out, 420, o.out[1]) + result(428, o.out[1], "Y = S′I0 + SI1");
  return svgDoc(580, 200, s + caption(580, 185, "2×1 multiplexer: S = 0 selects I0, S = 1 selects I1"), "2×1 multiplexer");
})();

files["mux-8to1-from-4to1.svg"] = (() => {
  let s = "";
  [[20, 0], [200, 4]].forEach(([by, base]) => {
    s += box(150, by, 110, 130, ["4×1", "MUX"], { right: [[by + 65, "Y"]] });
    [0, 1, 2, 3].forEach((i) => {
      const py = by + 20 + i * 30;
      s += line(100, py, 150, py) + text(84, py, `I${base + i}`, { italic: true });
    });
    s += line(185, by + 130, 185, by + 148) + note(185, by + 158, "S1") + line(225, by + 130, 225, by + 148) + note(225, by + 158, "S0");
  });
  s += box(380, 105, 90, 110, ["2×1", "MUX"], { left: [[130, "0"], [190, "1"]] });
  s += poly([[260, 85], [320, 85], [320, 130], [380, 130]]) + poly([[260, 265], [340, 265], [340, 190], [380, 190]]);
  s += line(425, 215, 425, 235) + note(425, 247, "S2");
  s += line(470, 160, 520, 160) + result(528, 160, "Y");
  return svgDoc(600, 395, s + caption(600, 380, "8×1 MUX from two 4×1 MUXes and one 2×1 MUX (S2 chooses the upper or lower half)"), "8×1 MUX from smaller multiplexers");
})();

files["mux-function-example.svg"] = (() => {
  let s = box(200, 20, 110, 150, ["4×1", "MUX"], { left: [50, 80, 110, 140].map((py, i) => [py, `I${i}`]), bottom: [[235, "S1"], [275, "S0"]] });
  const n = gate("NOT", 110, 120, 1);
  s += n.svg;
  s += line(40, 50, 200, 50) + text(26, 50, "C", { italic: true }) + dot(80, 50) + dot(120, 50);
  s += poly([[120, 50], [120, 110], [200, 110]]) + dot(120, 80) + line(120, 80, 200, 80);
  s += poly([[80, 50], [80, 140], n.inputs[0]]) + line(...n.out, 200, 140) + note(180, 128, "C′");
  s += line(235, 170, 235, 192) + text(235, 204, "A", { italic: true }) + line(275, 170, 275, 192) + text(275, 204, "B", { italic: true });
  s += line(310, 95, 360, 95) + result(368, 95, "F");
  return svgDoc(460, 245, s + caption(460, 230, "F(A, B, C) = Σm(1, 3, 5, 6) using a 4×1 MUX"), "Boolean function using a 4×1 MUX");
})();

files["encoder-4to2.svg"] = (() => {
  const o1 = gate("OR", 250, 30), o0 = gate("OR", 250, 110);
  let s = o1.svg + o0.svg;
  [["I0", 60], ["I1", 90], ["I2", 120], ["I3", 150]].forEach(([n, x]) => (s += text(x, 12, n, { italic: true })));
  s += line(60, 22, 60, 40) + note(60, 52, "(unused)", { size: 11 });
  s += line(90, 22, 90, o0.inputs[0][1]) + line(90, o0.inputs[0][1], ...o0.inputs[0]);
  s += line(120, 22, 120, o1.inputs[0][1]) + line(120, o1.inputs[0][1], ...o1.inputs[0]);
  s += line(150, 22, 150, o0.inputs[1][1]) + dot(150, o1.inputs[1][1]) + line(150, o1.inputs[1][1], ...o1.inputs[1]) + line(150, o0.inputs[1][1], ...o0.inputs[1]);
  s += line(...o1.out, 350, o1.out[1]) + result(358, o1.out[1], "Y1 = I2 + I3");
  s += line(...o0.out, 350, o0.out[1]) + result(358, o0.out[1], "Y0 = I1 + I3");
  return svgDoc(520, 200, s + caption(520, 185, "4-to-2 encoder: two OR gates"), "4-to-2 encoder");
})();

// Seven-segment digit: a top, b upper right, c lower right, d bottom, e lower left, f upper left, g middle.
const SEGMENTS = {
  a: [8, 0, 44, 8], b: [52, 8, 8, 43], c: [52, 59, 8, 43], d: [8, 102, 44, 8],
  e: [0, 59, 8, 43], f: [0, 8, 8, 43], g: [8, 51, 44, 8],
};
const DIGIT_SEGMENTS = ["abcdef", "bc", "abdeg", "abcdg", "bcfg", "acdfg", "acdefg", "abc", "abcdefg", "abcdfg"];
function sevenSeg(x, y, k, lit = "abcdefg") {
  return Object.entries(SEGMENTS)
    .map(([n, [sx, sy, w, h]]) => {
      const on = lit.includes(n);
      return `<rect x="${x + sx * k}" y="${y + sy * k}" width="${w * k}" height="${h * k}" rx="${3 * k}" fill="${on ? ACCENT : "#e3eaea"}" stroke="${on ? ACCENT : "#c5d1d1"}" stroke-width="1"/>`;
    })
    .join("");
}
files["seven-segment-layout.svg"] = (() => {
  const k = 1.6, x = 120, y = 40;
  let s = sevenSeg(x, y, k);
  s += `<circle cx="${x + 72 * k}" cy="${y + 106 * k}" r="${5 * k}" fill="${ACCENT}"/>` + note(x + 72 * k, y + 106 * k + 20, "dp");
  const lbl = (n, lx, ly) => text(x + lx * k, y + ly * k, n, { weight: "bold", italic: true });
  s += lbl("a", 30, -10) + lbl("b", 72, 30) + lbl("c", 72, 80) + lbl("d", 30, 122) + lbl("e", -12, 80) + lbl("f", -12, 30) + lbl("g", 30, 42);
  return svgDoc(360, 270, s + caption(360, 255, "Seven segments a to g (and the decimal point dp)"), "Seven-segment display layout");
})();
files["seven-segment-digits.svg"] = (() => {
  let s = "";
  DIGIT_SEGMENTS.forEach((lit, d) => (s += sevenSeg(30 + d * 58, 20, 0.6, lit) + text(30 + d * 58 + 18, 100, String(d), { size: 15, weight: "bold" })));
  return svgDoc(620, 140, s + caption(620, 125, "Digits 0 to 9 on a seven-segment display (lit segments are dark)"), "Seven-segment digits");
})();
files["bcd-to-seven-segment.svg"] = (() => {
  let s = box(120, 20, 170, 200, ["BCD to", "7-segment", "decoder"]);
  ["A", "B", "C", "D"].forEach((n, i) => {
    const py = 50 + i * 45;
    s += line(60, py, 120, py) + text(46, py, n, { italic: true });
  });
  s += note(60, 212, "A = MSB", { size: 12 });
  [..."abcdefg"].forEach((n, i) => {
    const py = 40 + i * 26;
    s += line(290, py, 350, py) + text(362, py, n, { italic: true, size: 15 });
  });
  s += sevenSeg(400, 55, 1.1, "abdeg") + note(433, 200, "shows 2 for 0010", { size: 12 });
  return svgDoc(500, 255, s + caption(500, 240, "A BCD to seven-segment decoder drives the segments a to g"), "BCD to seven-segment decoder");
})();

files["comparator-1bit.svg"] = (() => {
  const na = gate("NOT", 100, 10, 1), nb = gate("NOT", 100, 60, 1);
  const gl = gate("AND", 290, 110), gg = gate("AND", 290, 190), ge = gate("XNOR", 290, 270);
  let s = na.svg + nb.svg + gl.svg + gg.svg + ge.svg;
  s += text(50, 12, "A", { italic: true }) + text(75, 12, "B", { italic: true });
  s += line(50, 22, 50, ge.inputs[0][1]) + line(75, 22, 75, ge.inputs[1][1]);
  s += dot(50, 30) + line(50, 30, ...na.inputs[0]) + line(...na.out, 200, 30) + line(200, 30, 200, gl.inputs[0][1]) + note(180, 18, "A′");
  s += dot(75, 80) + line(75, 80, ...nb.inputs[0]) + line(...nb.out, 225, 80) + line(225, 80, 225, gg.inputs[1][1]) + note(180, 68, "B′");
  s += line(200, gl.inputs[0][1], ...gl.inputs[0]) + dot(75, gl.inputs[1][1]) + line(75, gl.inputs[1][1], ...gl.inputs[1]);
  s += dot(50, gg.inputs[0][1]) + line(50, gg.inputs[0][1], ...gg.inputs[0]) + line(225, gg.inputs[1][1], ...gg.inputs[1]);
  s += line(50, ge.inputs[0][1], ...ge.inputs[0]) + line(75, ge.inputs[1][1], ...ge.inputs[1]);
  s += line(...gl.out, 400, gl.out[1]) + result(408, gl.out[1], "L = A′B (A < B)");
  s += line(...gg.out, 400, gg.out[1]) + result(408, gg.out[1], "G = AB′ (A > B)");
  s += line(...ge.out, 400, ge.out[1]) + result(408, ge.out[1], "E = (A⊕B)′ (A = B)");
  return svgDoc(600, 350, s + caption(600, 335, "1-bit magnitude comparator"), "1-bit magnitude comparator");
})();

files["kmap-full-adder-carry.svg"] = kmap({ n: 3, vars: "ABC", cells: ones([3, 5, 6, 7]), groups: [{ pattern: "11-", label: "AB" }, { pattern: "-11", label: "BC" }, { pattern: "1-1", label: "AC" }], title: "Carry of a full adder (C = Cin): Cout = AB + BC + AC" });
files["kmap-seven-segment-a.svg"] = kmap({
  n: 4, vars: "ABCD",
  cells: ones([0, 2, 3, 5, 6, 7, 8, 9], { 10: "X", 11: "X", 12: "X", 13: "X", 14: "X", 15: "X" }),
  groups: [{ pattern: "1---", label: "A" }, { pattern: "--1-", label: "C" }, { pattern: "-1-1", label: "BD" }, { pattern: "-0-0", label: "B′D′" }],
  title: "Segment a = Σm(0, 2, 3, 5, 6, 7, 8, 9) + d(10–15) = A + C + BD + B′D′",
});

// ---------- 8. Flip-flops ----------
// Cross-coupled latch: two gates whose outputs feed back to each other's second input.
function latch(type, topIn, bottomIn, label) {
  const g1 = gate(type, 200, 30), g2 = gate(type, 200, 130);
  let s = g1.svg + g2.svg;
  s += line(60, g1.inputs[0][1], ...g1.inputs[0]) + text(44, g1.inputs[0][1], topIn, { italic: true });
  s += line(60, g2.inputs[1][1], ...g2.inputs[1]) + text(44, g2.inputs[1][1], bottomIn, { italic: true });
  s += line(...g1.out, 400, g1.out[1]) + result(408, g1.out[1], "Q") + dot(320, g1.out[1]);
  s += line(...g2.out, 400, g2.out[1]) + result(408, g2.out[1], "Q′") + dot(320, g2.out[1]);
  s += poly([[320, g1.out[1]], [320, 85], [175, 115], [175, g2.inputs[0][1]], g2.inputs[0]]);
  s += poly([[320, g2.out[1]], [320, 125], [175, 95], [175, g1.inputs[1][1]], g1.inputs[1]]);
  return svgDoc(480, 230, s + caption(480, 215, label), label);
}
files["sr-latch-nor.svg"] = latch("NOR", "R", "S", "SR latch with two cross-coupled NOR gates (active-high inputs)");
files["sr-latch-nand.svg"] = latch("NAND", "S′", "R′", "SR latch with two cross-coupled NAND gates (active-low inputs)");

// Clocked SR flip-flop with NAND gates; withD adds a NOT gate so that R = D′.
function clockedSR({ withD = false, label }) {
  const a = gate("NAND", 170, 30), b = gate("NAND", 170, 130);
  const c = gate("NAND", 330, 30), d = gate("NAND", 330, 130);
  let s = a.svg + b.svg + c.svg + d.svg;
  s += line(60, 95, 120, 95) + text(40, 95, "CLK", { italic: true }) + dot(120, 95);
  s += poly([[120, 95], [120, a.inputs[1][1]], a.inputs[1]]) + poly([[120, 95], [120, b.inputs[0][1]], b.inputs[0]]);
  if (withD) {
    const n = gate("NOT", 85, 145, 1);
    s += n.svg + line(30, a.inputs[0][1], ...a.inputs[0]) + text(18, a.inputs[0][1], "D", { italic: true });
    s += dot(75, a.inputs[0][1]) + poly([[75, a.inputs[0][1]], [75, 165], n.inputs[0]]);
    s += poly([n.out, [150, 165], [150, b.inputs[1][1]], b.inputs[1]]) + note(145, 180, "D′");
  } else {
    s += line(60, a.inputs[0][1], ...a.inputs[0]) + text(44, a.inputs[0][1], "S", { italic: true });
    s += line(60, b.inputs[1][1], ...b.inputs[1]) + text(44, b.inputs[1][1], "R", { italic: true });
  }
  s += poly([a.out, [300, a.out[1]], [300, c.inputs[0][1]], c.inputs[0]]);
  s += poly([b.out, [300, b.out[1]], [300, d.inputs[1][1]], d.inputs[1]]);
  s += line(...c.out, 520, c.out[1]) + result(528, c.out[1], "Q") + dot(470, c.out[1]);
  s += line(...d.out, 520, d.out[1]) + result(528, d.out[1], "Q′") + dot(470, d.out[1]);
  s += poly([[470, c.out[1]], [470, 85], [312, 115], [312, d.inputs[0][1]], d.inputs[0]]);
  s += poly([[470, d.out[1]], [470, 125], [312, 95], [312, c.inputs[1][1]], c.inputs[1]]);
  return svgDoc(600, 235, s + caption(600, 220, label), label);
}
files["sr-flip-flop-clocked.svg"] = clockedSR({ label: "Clocked SR flip-flop with four NAND gates" });
files["d-flip-flop-circuit.svg"] = clockedSR({ withD: true, label: "D flip-flop: a clocked SR flip-flop with S = D and R = D′" });

// Flip-flop block symbol: inputs on the left (with a clock triangle), Q and Q′ on the right.
function ffSymbol(x, y, name, ins, { clockBubble = false } = {}) {
  const h = 30 + ins.length * 30;
  let s = box(x, y, 80, h, name);
  ins.forEach((n, i) => {
    const py = y + 25 + i * 30;
    if (n === "CLK") {
      s += `<path d="M${x},${py - 7} L${x + 10},${py} L${x},${py + 7}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
      if (clockBubble) s += `<circle cx="${x - 5}" cy="${py}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
      s += line(x - 35, py, clockBubble ? x - 10 : x, py) + text(x - 50, py, "CLK", { size: 13, italic: true });
    } else {
      s += line(x - 35, py, x, py) + text(x - 46, py, n, { italic: true });
    }
  });
  s += line(x + 80, y + 25, x + 110, y + 25) + text(x + 122, y + 25, "Q", { italic: true });
  s += line(x + 80, y + h - 20, x + 110, y + h - 20) + text(x + 124, y + h - 20, "Q′", { italic: true });
  return s;
}
files["flip-flop-symbols.svg"] = (() => {
  let s = ffSymbol(80, 20, "SR", ["S", "CLK", "R"]) + ffSymbol(320, 20, "JK", ["J", "CLK", "K"]);
  s += ffSymbol(560, 20, "D", ["D", "CLK"]) + ffSymbol(800, 20, "T", ["T", "CLK"]);
  return svgDoc(980, 170, s + caption(980, 152, "Symbols of the SR, JK, D and T flip-flops (the triangle marks an edge-triggered clock input)"), "Flip-flop symbols");
})();

files["jk-flip-flop-circuit.svg"] = (() => {
  const a1 = gate("AND", 150, 40, 2), a2 = gate("AND", 150, 150, 2);
  let s = a1.svg + a2.svg + box(280, 50, 120, 150, "SR", { left: [[65, "S"], [185, "R"]], right: [[65, "Q"], [185, "Q′"]] });
  s += `<path d="M280,118 L290,125 L280,132" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
  s += line(40, a1.inputs[0][1], ...a1.inputs[0]) + text(26, a1.inputs[0][1], "J", { italic: true });
  s += line(40, a2.inputs[1][1], ...a2.inputs[1]) + text(26, a2.inputs[1][1], "K", { italic: true });
  s += line(40, 125, 280, 125) + text(22, 125, "CLK", { italic: true, size: 13 });
  s += poly([a1.out, [240, a1.out[1]], [240, 65], [280, 65]]);
  s += poly([a2.out, [240, a2.out[1]], [240, 185], [280, 185]]);
  s += line(400, 65, 520, 65) + result(528, 65, "Q") + dot(460, 65);
  s += line(400, 185, 520, 185) + result(528, 185, "Q′") + dot(470, 185);
  s += poly([[460, 65], [460, 15], [110, 15], [110, a2.inputs[0][1]], a2.inputs[0]]) + note(300, 27, "Q fed back to the K-side AND gate");
  s += poly([[470, 185], [470, 235], [125, 235], [125, a1.inputs[1][1]], a1.inputs[1]]) + note(300, 223, "Q′ fed back to the J-side AND gate");
  return svgDoc(600, 280, s + caption(600, 264, "JK flip-flop: an SR flip-flop with S = JQ′ and R = KQ"), "JK flip-flop");
})();

files["master-slave-jk.svg"] = (() => {
  const pins = { left: [[65, "J"], [100, "CLK"], [135, "K"]], right: [[65, "Q"], [135, "Q′"]] };
  let s = box(150, 40, 140, 120, "Master", pins) + box(400, 40, 140, 120, "Slave", pins);
  s += note(220, 25, "works while CLK = 1") + note(470, 25, "works while CLK = 0");
  s += line(40, 65, 150, 65) + text(26, 65, "J", { italic: true }) + line(40, 135, 150, 135) + text(26, 135, "K", { italic: true });
  s += line(290, 65, 400, 65) + line(290, 135, 400, 135);
  s += line(540, 65, 580, 65) + result(588, 65, "Q") + line(540, 135, 580, 135) + result(588, 135, "Q′");
  const n = gate("NOT", 260, 170, 1);
  s += line(40, 190, n.inputs[0][0], 190) + text(22, 190, "CLK", { italic: true, size: 13 }) + dot(100, 190);
  s += poly([[100, 190], [100, 100], [150, 100]]) + n.svg + poly([n.out, [360, 190], [360, 100], [400, 100]]);
  return svgDoc(640, 245, s + caption(640, 230, "Master-slave JK flip-flop: the slave gets the inverted clock"), "Master-slave JK flip-flop");
})();

files["clock-triggering.svg"] = (() => {
  const pts = [[40, 110], [100, 110], [100, 40], [200, 40], [200, 110], [300, 110], [300, 40], [400, 40], [400, 110], [460, 110]];
  let s = poly(pts);
  s += `<path d="M100,80 l-6,10 h12 Z" fill="${ACCENT}"/>` + note(100, 128, "positive (rising) edge");
  s += `<path d="M200,70 l-6,-10 h12 Z" fill="#c2410c"/>` + note(220, 25, "negative (falling) edge");
  s += note(350, 25, "high level (1)") + note(250, 128, "low level (0)");
  return svgDoc(500, 165, s + caption(500, 152, "Clock signal: levels and edges used to trigger flip-flops"), "Clock signal triggering");
})();

// ---------- 9. Registers ----------
// D flip-flop box: D input at y+20, clock (triangle) at y+50, Q output at y+20.
function dff(x, y, name) {
  return (
    box(x, y, 70, 70, name, { left: [[y + 20, "D"]], right: [[y + 20, "Q"]] }) +
    `<path d="M${x},${y + 43} L${x + 10},${y + 50} L${x},${y + 57}" fill="none" stroke="${INK}" stroke-width="1.6"/>`
  );
}
const FF_X = [120, 260, 400, 540];
const clockLine = (y) =>
  line(40, y, FF_X[3] - 15, y) + text(22, y, "CLK", { italic: true, size: 13 }) +
  FF_X.map((x, i) => (i < 3 ? dot(x - 15, y) : "") + poly([[x - 15, y], [x - 15, 110], [x, 110]])).join("");
function serialRegister(parallelOut, label) {
  let s = FF_X.map((x, i) => dff(x, 60, `FF${3 - i}`)).join("");
  s += line(40, 80, 120, 80) + text(22, 80, "Din", { italic: true, size: 13 });
  for (let i = 0; i < 3; i++) s += line(FF_X[i] + 70, 80, FF_X[i + 1], 80) + arrowRight(FF_X[i + 1], 80);
  if (parallelOut) FF_X.forEach((x, i) => (s += (i < 3 ? dot(x + 85, 80) : line(610, 80, 625, 80)) + line(x + 85, 80, x + 85, 30) + result(x + 92, 30, `Q${3 - i}`)));
  else s += line(610, 80, 680, 80) + text(690, 80, "Serial out", { anchor: "start", size: 13, italic: true });
  s += clockLine(165);
  return svgDoc(780, 215, s + caption(780, 200, label), label);
}
files["shift-register-siso.svg"] = serialRegister(false, "4-bit serial-in serial-out (SISO) shift register made of D flip-flops");
files["shift-register-sipo.svg"] = serialRegister(true, "4-bit serial-in parallel-out (SIPO) shift register: Q3 to Q0 are read together");
files["register-pipo.svg"] = (() => {
  let s = FF_X.map((x, i) => dff(x, 60, `FF${3 - i}`)).join("");
  FF_X.forEach((x, i) => {
    s += poly([[x - 30, 25], [x - 30, 80], [x, 80]]) + text(x - 30, 14, `D${3 - i}`, { italic: true });
    s += poly([[x + 70, 80], [x + 95, 80], [x + 95, 200]]) + result(x + 95, 212, `Q${3 - i}`).replace('text-anchor="start"', 'text-anchor="middle"');
  });
  s += clockLine(165);
  return svgDoc(720, 255, s + caption(720, 240, "4-bit parallel-in parallel-out (PIPO) register (buffer register): all bits load on one clock edge"), "4-bit PIPO register");
})();
files["universal-shift-register-stage.svg"] = (() => {
  let s = box(270, 30, 90, 140, ["4×1", "MUX"], { left: [50, 80, 110, 140].map((py, i) => [py, String(i)]), right: [[85, "Y"]], bottom: [[295, "S1"], [335, "S0"]] });
  s += dff(420, 65, "FFi");
  s += line(360, 85, 420, 85);
  [[80, "Q of previous stage (shift right)"], [110, "Q of next stage (shift left)"], [140, "parallel input Ii (load)"]].forEach(([py, n]) => (s += line(220, py, 270, py) + text(214, py, n, { anchor: "end", size: 13 })));
  s += line(490, 85, 570, 85) + result(578, 85, "Qi") + dot(530, 85);
  s += poly([[530, 85], [530, 8], [240, 8], [240, 50], [270, 50]]) + note(522, 20, "own output Qi fed back to input 0 (hold)", { anchor: "end" });
  s += line(295, 170, 295, 190) + line(335, 170, 335, 190) + note(315, 204, "S1 S0 (shared by all stages)");
  s += poly([[410, 230], [405, 230], [405, 115], [420, 115]]) + line(380, 230, 410, 230) + text(360, 230, "CLK", { italic: true, size: 13 });
  return svgDoc(660, 270, s + caption(660, 256, "One stage of a universal shift register: a 4×1 MUX selects the D input of each flip-flop"), "Universal shift register stage");
})();

// ---------- 10. Counters ----------
// Negative-edge-triggered JK flip-flop box (J, CLK with bubble, K on the left; Q on the right; optional CLR at the bottom).
function jkff(x, y, name, clr = false) {
  let s = box(x, y, 70, 100, name, { left: [[y + 20, "J"], [y + 80, "K"]], right: [[y + 20, "Q"]] });
  s += `<path d="M${x},${y + 43} L${x + 10},${y + 50} L${x},${y + 57}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<circle cx="${x - 5}" cy="${y + 50}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  if (clr) s += `<circle cx="${x + 35}" cy="${y + 105}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(x + 35, y + 88, "CLR", { size: 10, color: NOTE });
  return s;
}
function rippleCounter(n, decade, label) {
  const y = 70, step = 150, x0 = 110;
  let s = line(40, y + 50, x0 - 10, y + 50) + text(22, y + 50, "CLK", { italic: true, size: 13 });
  for (let i = 0; i < n; i++) {
    const x = x0 + i * step;
    s += jkff(x, y, `FF${i}`, decade);
    s += line(x - 25, y + 20, x, y + 20) + line(x - 25, y + 80, x, y + 80) + text(x - 33, y + 20, "1", { size: 13 }) + text(x - 33, y + 80, "1", { size: 13 });
    s += poly([[x + 70, y + 20], [x + 110, y + 20], [x + 110, 25]]) + result(x + 118, 25, `Q${i}`);
    if (i < n - 1) s += dot(x + 90, y + 20) + poly([[x + 90, y + 20], [x + 90, y + 50], [x + step - 10, y + 50]]);
    if (decade) s += line(x + 35, y + 110, x + 35, 260) + (i ? dot(x + 35, 260) : "");
  }
  let w = x0 + n * step + 40;
  if (decade) {
    const g = gate("NAND", 720, 210);
    s += g.svg + dot(370, 45) + poly([[370, 45], [700, 45], [700, g.inputs[0][1]], g.inputs[0]]) + note(705, 33, "Q1", { anchor: "start" });
    s += poly([[670, y + 20], [670, g.inputs[1][1]], g.inputs[1]]);
    s += poly([g.out, [810, g.out[1]], [810, 260], [x0 + 35, 260]]) + note(470, 274, "CLR (active low): clears all flip-flops when Q3 = Q1 = 1 (count 10)");
    w = 850;
  }
  const h = decade ? 320 : 230;
  return svgDoc(w, h, s + caption(w, h - 14, label), label);
}
files["ripple-counter-3bit.svg"] = rippleCounter(3, false, "3-bit asynchronous (ripple) up counter: J = K = 1, each Q clocks the next flip-flop");
files["decade-counter.svg"] = rippleCounter(4, true, "Decade (MOD-10) ripple counter: a NAND gate on Q3 and Q1 resets the count at 1010");
files["ripple-counter-timing.svg"] = (() => {
  const x0 = 70, P = 60, pulses = 8, hi = 26;
  const rows = [["CLK", 40], ["Q0", 100], ["Q1", 160], ["Q2", 220]];
  let s = "";
  const wave = (yb, vals) => {
    const pts = [];
    vals.forEach(([t, v], k) => {
      const yy = v ? yb - hi : yb;
      if (k) pts.push([t, pts[pts.length - 1][1]]);
      pts.push([t, yy]);
    });
    pts.push([x0 + pulses * P + 20, pts[pts.length - 1][1]]);
    return poly(pts);
  };
  const clk = [[x0, 0]];
  for (let k = 0; k < pulses; k++) clk.push([x0 + k * P + 10, 1], [x0 + k * P + 10 + P / 2, 0]);
  s += wave(rows[0][1], clk);
  for (let b = 0; b < 3; b++) {
    const vals = [[x0, 0]];
    for (let k = 1; k <= pulses; k++) {
      const t = x0 + (k - 1) * P + 10 + P / 2;
      const prev = ((k - 1) >> b) & 1, now = (k >> b) & 1;
      if (prev !== now) vals.push([t, now]);
    }
    s += wave(rows[b + 1][1], vals);
  }
  rows.forEach(([n, yb]) => (s += text(30, yb - hi / 2, n, { italic: true, size: 14 })));
  for (let k = 1; k <= pulses; k++) {
    const t = x0 + (k - 1) * P + 10 + P / 2;
    s += `<line x1="${t}" y1="18" x2="${t}" y2="230" stroke="#9aa9ab" stroke-width="1" stroke-dasharray="3 4"/>`;
  }
  for (let k = 0; k <= pulses; k++) {
    const mid = k === 0 ? x0 + 25 : x0 + (k - 1) * P + 10 + P / 2 + P / 2;
    s += note(mid, 250, String(k % 8));
  }
  s += text(30, 250, "count", { size: 13, color: NOTE });
  return svgDoc(640, 290, s + caption(640, 276, "Timing diagram of a 3-bit ripple counter (negative-edge triggered): count = Q2 Q1 Q0"), "Ripple counter timing diagram");
})();

// ---------- 11. A/D and D/A conversion ----------
const zig = (pts) => poly(pts);
// Horizontal resistor from (x, y) to (x + 40, y); vertical resistor from (x, y) to (x, y + 40).
const resH = (x, y, name) => zig([[x, y], [x + 5, y - 7], [x + 13, y + 7], [x + 21, y - 7], [x + 29, y + 7], [x + 35, y - 7], [x + 40, y]]) + note(x + 20, y - 17, name);
const resV = (x, y, name) => zig([[x, y], [x - 7, y + 5], [x + 7, y + 13], [x - 7, y + 21], [x + 7, y + 29], [x - 7, y + 35], [x, y + 40]]) + note(x + 12, y + 20, name, { anchor: "start" });
const ground = (x, y) => line(x - 12, y, x + 12, y) + line(x - 7, y + 5, x + 7, y + 5) + line(x - 3, y + 10, x + 3, y + 10);
// Op-amp: inverting input at (x, y + 20), non-inverting at (x, y + 60), output at (x + 80, y + 40).
const opamp = (x, y) =>
  `<path d="M${x},${y} L${x + 80},${y + 40} L${x},${y + 80} Z" fill="#fff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` +
  text(x + 12, y + 20, "−", { size: 16, weight: "bold" }) + text(x + 12, y + 60, "+", { size: 16, weight: "bold" });

files["dac-weighted-resistor.svg"] = (() => {
  let s = "";
  [["b2 (MSB)", 40, "R"], ["b1", 100, "2R"], ["b0 (LSB)", 160, "4R"]].forEach(([n, y, r]) => {
    s += text(60, y, n, { italic: true, size: 13, anchor: "end" }) + line(70, y, 120, y) + resH(120, y, r) + line(160, y, 230, y);
  });
  s += line(230, 40, 230, 160) + dot(230, 100) + poly([[230, 140], [300, 140]]) + dot(230, 140);
  s += opamp(300, 120) + poly([[300, 180], [285, 180], [285, 195]]) + ground(285, 195);
  s += dot(260, 140) + poly([[260, 140], [260, 240], [320, 240]]) + resH(320, 240, "Rf") + poly([[360, 240], [420, 240], [420, 160]]) + dot(420, 160);
  s += line(380, 160, 470, 160) + result(478, 160, "V0");
  s += note(40, 266, "each bit input is 0 V (bit 0) or −VR (bit 1)", { anchor: "start" });
  return svgDoc(560, 310, s + caption(560, 294, "3-bit binary weighted resistor DAC: resistors R, 2R, 4R feed an inverting adder"), "Binary weighted resistor DAC");
})();

files["dac-r2r-ladder.svg"] = (() => {
  const xs = [110, 200, 290, 380]; // nodes for b0 (LSB) … b3 (MSB)
  let s = poly([[60, 80], [xs[3], 80]]).replace(/points="[^"]*"/, `points="60,80 ${xs[0]},80"`);
  s += resV(60, 80, "2R") + line(60, 120, 60, 190) + ground(60, 190);
  for (let i = 0; i < 3; i++) s += line(xs[i], 80, xs[i] + 25, 80) + resH(xs[i] + 25, 80, "R") + line(xs[i] + 65, 80, xs[i + 1], 80);
  xs.forEach((x, i) => {
    s += dot(x, 80) + line(x, 80, x, 105) + resV(x, 105, "2R") + line(x, 145, x, 190) + text(x, 205, `b${i}`, { italic: true }) + note(x, 222, i === 0 ? "(LSB)" : i === 3 ? "(MSB)" : "", { size: 11 });
  });
  s += note(245, 245, "each bit is switched to 0 V (bit 0) or VR (bit 1)");
  s += line(xs[3], 80, 450, 80) + opamp(450, 60) + poly([[450, 120], [435, 120], [435, 135]]) + ground(435, 135);
  s += dot(430, 80) + poly([[430, 80], [430, 25], [470, 25]]) + resH(470, 25, "Rf") + poly([[510, 25], [560, 25], [560, 100]]) + dot(560, 100);
  s += line(530, 100, 600, 100) + result(608, 100, "V0");
  return svgDoc(660, 290, s + caption(660, 275, "4-bit R-2R ladder DAC: only two resistor values, R and 2R"), "R-2R ladder DAC");
})();

function adcBlock(reg, label) {
  let s = box(40, 30, 100, 50, "Clock") + box(220, 30, 130, 50, reg) + box(220, 130, 130, 50, "DAC") + box(220, 230, 130, 50, "Comparator") + box(40, 130, 100, 50, ["Control", "logic"]);
  s += line(140, 55, 220, 55) + arrowRight(220, 55) + note(180, 43, "pulses");
  s += line(350, 55, 450, 55) + arrowRight(450, 55) + note(400, 40, "digital output") + line(380, 50, 390, 60) + note(394, 70, "n", { size: 11, anchor: "start" });
  s += line(285, 80, 285, 130) + arrowDown(285, 130) + note(295, 105, "binary count", { anchor: "start" });
  s += line(285, 180, 285, 230) + arrowDown(285, 230) + note(295, 205, "Va (analog)", { anchor: "start" });
  s += line(450, 255, 350, 255) + arrowLeft(350, 255) + note(400, 243, "analog input Vi");
  s += poly([[220, 255], [180, 255], [180, 155], [140, 155]]) + arrowLeft(140, 155) + note(174, 205, "Vi > Va ?", { size: 12, anchor: "end" });
  s += line(90, 130, 90, 80) + `<path d="M90,80 l-5,9 h10 Z" fill="${INK}"/>` + note(60, 105, "enable", { size: 12 });
  s += line(0, 155, 40, 155) + arrowRight(40, 155) + note(18, 140, "start", { size: 12 });
  return svgDoc(500, 330, s + caption(500, 315, label), label);
}
files["adc-digital-ramp.svg"] = adcBlock("Counter", "Digital ramp (counter type) ADC");
files["adc-successive-approximation.svg"] = adcBlock("SAR", "Successive approximation ADC (SAR = successive approximation register)");

files["adc-ramp-waveform.svg"] = (() => {
  const x0 = 60, y0 = 220, dx = 40, dy = 22;
  let s = line(x0, y0, 470, y0) + line(x0, y0, x0, 30) + note(470, y0 + 15, "time (clock pulses)", { anchor: "end" }) + note(x0 - 5, 22, "voltage", { anchor: "start" });
  const pts = [[x0, y0]];
  for (let k = 1; k <= 6; k++) pts.push([x0 + (k - 1) * dx, y0 - (k - 1) * dy], [x0 + (k - 1) * dx, y0 - k * dy], [x0 + k * dx, y0 - k * dy]);
  pts.shift();
  s += `<polyline points="${[[x0, y0], ...pts].map((p) => p.join(",")).join(" ")}" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>`;
  const vi = y0 - 5.4 * dy;
  s += `<line x1="${x0}" y1="${vi}" x2="460" y2="${vi}" stroke="#c2410c" stroke-width="2" stroke-dasharray="6 4"/>` + text(465, vi, "Vi", { anchor: "start", italic: true, color: "#c2410c", weight: "bold" });
  s += note(x0 + 5 * dx + 12, y0 - 2 * dy, "Va (DAC output)", { color: ACCENT, anchor: "start" });
  const stop = x0 + 5 * dx;
  s += `<line x1="${stop}" y1="${y0}" x2="${stop}" y2="${y0 - 6 * dy - 10}" stroke="#7a8a8d" stroke-dasharray="3 3"/>` + note(stop + 6, y0 - 6 * dy - 18, "Va ≥ Vi: clock stops, count = 6", { anchor: "start" });
  return svgDoc(540, 270, s + caption(540, 255, "Staircase (digital ramp) voltage of a counter type ADC"), "Digital ramp waveform");
})();

files["adc-flash-3bit.svg"] = (() => {
  const xr = 80, y0 = 40, step = 48;
  let s = text(xr, 20, "VR", { italic: true, weight: "bold" });
  for (let j = 0; j < 8; j++) {
    const y = y0 + j * step;
    s += line(xr, y, xr, y + 4) + resV(xr, y + 4, "R") + line(xr, y + 44, xr, y + step);
  }
  s += ground(xr, y0 + 8 * step);
  s += text(160, 20, "Vi", { italic: true, weight: "bold" }) + line(160, 28, 160, y0 + 7 * step + 12);
  for (let j = 1; j <= 7; j++) {
    const y = y0 + j * step, cx = 200, k = 8 - j;
    s += `<path d="M${cx},${y - 20} L${cx + 44},${y} L${cx},${y + 20} Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(cx + 8, y - 9, "−", { size: 12 }) + text(cx + 8, y + 9, "+", { size: 12 });
    s += dot(xr, y) + poly([[xr, y], [185, y], [185, y - 9], [cx, y - 9]]) + note(118, y - 9, `${k}VR/8`, { size: 11 });
    s += dot(160, y + 9) + line(160, y + 9, cx, y + 9);
    s += line(cx + 44, y, 320, y) + note(290, y - 8, `C${k}`, { size: 11 });
  }
  s += box(320, y0 + 20, 110, 7 * step + 10, ["Priority", "encoder", "(8 to 3)"]);
  ["D2", "D1", "D0"].forEach((n, i) => (s += line(430, 170 + i * 50, 480, 170 + i * 50) + result(488, 170 + i * 50, n)));
  return svgDoc(560, y0 + 8 * step + 60, s + caption(560, y0 + 8 * step + 42, "3-bit flash ADC: 8 resistors, 7 comparators and a priority encoder"), "3-bit flash ADC");
})();

// ---------- 12. PLA ----------
const crossMark = (x, y) => line(x - 5, y - 5, x + 5, y + 5) + line(x - 5, y + 5, x + 5, y - 5);
files["pla-example.svg"] = (() => {
  const inX = { A: 80, "A′": 110, B: 150, "B′": 180, C: 220, "C′": 250 };
  const terms = [["AB", ["A", "B"], [1, 1]], ["BC", ["B", "C"], [1, 0]], ["AC", ["A", "C"], [1, 0]], ["A′B′C", ["A′", "B′", "C"], [0, 1]]];
  const outX = [420, 480];
  let s = "";
  for (const [n, x] of Object.entries(inX)) s += line(x, 50, x, 320) + text(x, 38, n, { italic: true, size: 15 });
  s += note(165, 16, "inputs and their complements");
  terms.forEach(([name, ins, outs], k) => {
    const y = 90 + k * 65;
    const g = gate("AND", 290, y - 25);
    s += line(60, y, 290, y) + g.svg + ins.map((i) => crossMark(inX[i], y)).join("");
    s += line(345, y, 510, y) + note(375, y - 12, name, { color: ACCENT, weight: "bold" });
    outs.forEach((o, j) => o && (s += crossMark(outX[j], y)));
  });
  s += note(170, 335, "AND array (programmable)") + note(450, 446, "OR array (programmable)");
  ["F1", "F2"].forEach((n, j) => {
    const x = outX[j];
    s += line(x, 60, x, 340) + `<g transform="rotate(90 ${x} 340)">${gate("OR", x, 315).svg}</g>` + line(x, 402, x, 412) + result(x - 8, 422, n);
  });
  return svgDoc(560, 490, s + caption(560, 474, "PLA with 3 inputs, 4 product terms and 2 outputs (× = programmed connection)"), "PLA example");
})();

// ---------- 13. Pulse and switching circuits ----------
const dashed = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9aa9ab" stroke-width="1" stroke-dasharray="4 4"/>`;
// Dimension line with end ticks and a label above it.
const dim = (x1, x2, y, label) => line(x1, y, x2, y) + line(x1, y - 5, x1, y + 5) + line(x2, y - 5, x2, y + 5) + note((x1 + x2) / 2, y - 11, label);

files["async-sequential-model.svg"] = (() => {
  let s = box(160, 40, 180, 140, ["Combinational", "circuit"]);
  [["x1", 60], ["xn", 100]].forEach(([n, y]) => (s += line(60, y, 160, y) + arrowRight(160, y) + text(46, y, n, { italic: true })));
  s += text(110, 82, "⋮", { size: 16 }) + note(90, 30, "inputs");
  [["z1", 60], ["zm", 100]].forEach(([n, y]) => (s += line(340, y, 440, y) + arrowRight(440, y) + text(456, y, n, { italic: true })));
  s += note(410, 30, "outputs");
  s += poly([[340, 150], [420, 150], [420, 230], [310, 230]]) + note(380, 138, "Y") + box(250, 212, 60, 36, "Δ");
  s += poly([[250, 230], [110, 230], [110, 150], [160, 150]]) + arrowRight(160, 150) + note(180, 245, "y");
  s += note(250, 272, "Y = next state, y = present state, Δ = delay in the feedback path");
  return svgDoc(500, 315, s + caption(500, 300, "Model of an asynchronous (fundamental mode) sequential circuit"), "Asynchronous sequential circuit model");
})();

files["pulse-parameters.svg"] = (() => {
  const base = 190, top = 70, A = base - top;
  const lvl = (p) => base - (p / 100) * A;
  let s = poly([[40, base], [100, base], [130, top], [260, top], [290, base], [400, base], [430, top], [520, top]]);
  s += dashed(40, lvl(10), 520, lvl(10)) + dashed(40, lvl(90), 520, lvl(90)) + dashed(40, lvl(50), 520, lvl(50));
  s += note(560, lvl(90), "90 %", { anchor: "end" }) + note(560, lvl(50), "50 %", { anchor: "end" }) + note(560, lvl(10), "10 %", { anchor: "end" });
  s += dim(103, 127, 40, "rise time tr") + dashed(103, 40, 103, lvl(10)) + dashed(127, 40, 127, lvl(90));
  s += dim(263, 287, 40, "fall time tf") + dashed(263, 40, 263, lvl(90)) + dashed(287, 40, 287, lvl(10));
  s += dim(115, 275, 215, "pulse width (at 50 %)") + dashed(115, lvl(50), 115, 215) + dashed(275, lvl(50), 275, 215) + dashed(415, lvl(50), 415, 245);
  s += dim(115, 415, 245, "period T") + line(70, top, 70, base) + note(62, (top + base) / 2, "amplitude", { anchor: "end", size: 12 });
  return svgDoc(600, 290, s + caption(600, 276, "Pulse parameters: rise time, fall time, pulse width and period (duty cycle = pulse width / T)"), "Pulse parameters");
})();

files["multivibrator-waveforms.svg"] = (() => {
  const x0 = 130, x1 = 600, hi = 26;
  const wave = (yb, edges, start = 0) => {
    const pts = [[x0, start ? yb - hi : yb]];
    let v = start;
    for (const t of edges) { pts.push([t, v ? yb - hi : yb]); v = 1 - v; pts.push([t, v ? yb - hi : yb]); }
    pts.push([x1, v ? yb - hi : yb]);
    return poly(pts);
  };
  const triggers = [180, 340, 500];
  let s = "";
  s += text(20, 50, "Astable output", { anchor: "start", size: 13 }) + wave(60, [170, 230, 290, 350, 410, 470, 530, 590]);
  s += text(20, 120, "Trigger pulses", { anchor: "start", size: 13 }) + line(x0, 130, x1, 130) + triggers.map((t) => poly([[t - 3, 130], [t, 104], [t + 3, 130]])).join("");
  s += text(20, 190, "Monostable output", { anchor: "start", size: 13 }) + wave(200, triggers.flatMap((t) => [t, t + 70]));
  s += dim(180, 250, 158, "width T (set by RC)");
  s += text(20, 260, "Bistable output", { anchor: "start", size: 13 }) + wave(270, triggers);
  triggers.forEach((t) => (s += dashed(t, 100, t, 280)));
  return svgDoc(620, 320, s + caption(620, 305, "Outputs of the astable, monostable and bistable multivibrators"), "Multivibrator waveforms");
})();

// ---------- 14. Logic families ----------
// MOSFET: channel at x around y; drain (top) at (x + 15, y − 30), source (bottom) at (x + 15, y + 30);
// the gate lead ends at (x − 30, y) with the input name. PMOS has a bubble on the gate.
function mos(x, y, type, input) {
  let s = line(x, y - 20, x, y + 20) + line(x - 8, y - 15, x - 8, y + 15);
  s += poly([[x, y - 15], [x + 15, y - 15], [x + 15, y - 30]]) + poly([[x, y + 15], [x + 15, y + 15], [x + 15, y + 30]]);
  if (type === "P") s += `<circle cx="${x - 13}" cy="${y}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>` + line(x - 30, y, x - 18, y);
  else s += line(x - 30, y, x - 8, y);
  s += text(x - 40, y, input, { italic: true, weight: "bold" }) + note(x + 22, y, type === "P" ? "PMOS" : "NMOS", { anchor: "start", size: 11 });
  return s;
}
const rail = (x1, x2, y, name) => line(x1, y, x2, y) + text(x1 - 8, y, name, { anchor: "end", size: 13, weight: "bold" });
files["cmos-inverter.svg"] = (() => {
  let s = rail(200, 260, 40, "VDD") + line(215, 40, 215, 50) + mos(200, 80, "P", "A") + line(215, 110, 215, 140) + mos(200, 170, "N", "A");
  s += line(215, 200, 215, 215) + ground(215, 215) + dot(215, 125) + line(215, 125, 320, 125) + result(328, 125, "Y = A′");
  return svgDoc(420, 265, s + caption(420, 250, "CMOS inverter (NOT gate): one PMOS and one NMOS transistor"), "CMOS inverter");
})();
files["cmos-nand.svg"] = (() => {
  let s = rail(180, 360, 40, "VDD") + line(195, 40, 195, 50) + line(335, 40, 335, 50);
  s += mos(180, 80, "P", "A") + mos(320, 80, "P", "B") + poly([[195, 110], [195, 125], [335, 125], [335, 110]]);
  s += dot(245, 125) + line(245, 125, 245, 145) + mos(230, 175, "N", "A") + mos(230, 235, "N", "B") + line(245, 265, 245, 275) + ground(245, 275);
  s += line(335, 125, 410, 125) + dot(335, 125) + result(418, 125, "Y = (AB)′");
  return svgDoc(520, 320, s + caption(520, 305, "CMOS NAND: PMOS transistors in parallel, NMOS transistors in series"), "CMOS NAND gate");
})();
files["cmos-nor.svg"] = (() => {
  let s = rail(230, 300, 30, "VDD") + line(245, 30, 245, 40) + mos(230, 70, "P", "A") + mos(230, 130, "P", "B");
  s += line(245, 160, 245, 180) + dot(245, 180) + poly([[195, 200], [195, 180], [335, 180], [335, 200]]);
  s += mos(180, 230, "N", "A") + mos(320, 230, "N", "B") + poly([[195, 260], [195, 275], [335, 275], [335, 260]]) + line(245, 275, 245, 285) + ground(245, 285);
  s += line(335, 180, 410, 180) + dot(335, 180) + result(418, 180, "Y = (A + B)′");
  return svgDoc(520, 330, s + caption(520, 315, "CMOS NOR: PMOS transistors in series, NMOS transistors in parallel"), "CMOS NOR gate");
})();
files["nmos-nor.svg"] = (() => {
  let s = rail(230, 300, 30, "VDD") + line(245, 30, 245, 45) + resV(245, 45, "load") + line(245, 85, 245, 110);
  s += dot(245, 110) + poly([[195, 130], [195, 110], [335, 110], [335, 130]]);
  s += mos(180, 160, "N", "A") + mos(320, 160, "N", "B") + poly([[195, 190], [195, 205], [335, 205], [335, 190]]) + line(245, 205, 245, 215) + ground(245, 215);
  s += line(335, 110, 410, 110) + dot(335, 110) + result(418, 110, "Y = (A + B)′");
  return svgDoc(520, 260, s + caption(520, 245, "NMOS NOR gate: two NMOS transistors in parallel with a pull-up load"), "NMOS NOR gate");
})();

// npn transistor: base lead from (x − 30, y); collector top at (x + 20, y − 35); emitter bottom at (x + 20, y + 35).
const npn = (x, y) =>
  line(x - 30, y, x, y) + line(x, y - 20, x, y + 20) + poly([[x, y - 8], [x + 20, y - 22], [x + 20, y - 35]]) + poly([[x, y + 8], [x + 20, y + 22], [x + 20, y + 35]]) +
  `<path d="M${x + 20},${y + 22} l-9,-1 l4,-7 Z" fill="${INK}"/>` + `<circle cx="${x + 5}" cy="${y}" r="27" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
// Diode pointing left (cathode bar at x, anode at x + 18).
const diodeLeft = (x, y) => `<path d="M${x + 18},${y - 8} L${x},${y} L${x + 18},${y + 8} Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + line(x, y - 8, x, y + 8);
files["dtl-nand.svg"] = (() => {
  let s = rail(120, 420, 30, "+VCC");
  [["A", 120], ["B", 170]].forEach(([n, y]) => (s += line(50, y, 100, y) + text(38, y, n, { italic: true, weight: "bold" }) + diodeLeft(100, y) + line(118, y, 160, y)));
  s += line(160, 120, 160, 170) + dot(160, 145) + line(160, 30, 160, 60) + resV(160, 60, "R1") + line(160, 100, 160, 120) + note(178, 158, "P", { size: 12 });
  s += line(160, 145, 190, 145) + resH(190, 145, "R2") + line(230, 145, 280, 145) + dot(260, 145) + line(260, 145, 260, 170) + resV(260, 170, "R3") + line(260, 210, 260, 225) + text(260, 240, "−V", { size: 13, weight: "bold" });
  s += npn(310, 145) + line(330, 180, 330, 205) + ground(330, 205);
  s += line(330, 110, 330, 100) + resV(330, 60, "RC") + line(330, 30, 330, 60) + dot(330, 105) + line(330, 105, 420, 105) + result(428, 105, "Y = (AB)′");
  return svgDoc(530, 280, s + caption(530, 265, "DTL NAND gate: input diodes form AND, the transistor inverts"), "DTL NAND gate");
})();

// ---------- 15. Op-amp applications ----------
// Op-amp with + on top: non-inverting input at (x, y + 20), inverting at (x, y + 60), output at (x + 80, y + 40).
const opampPlusTop = (x, y) =>
  `<path d="M${x},${y} L${x + 80},${y + 40} L${x},${y + 80} Z" fill="#fff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` +
  text(x + 12, y + 20, "+", { size: 16, weight: "bold" }) + text(x + 12, y + 60, "−", { size: 16, weight: "bold" });
files["opamp-comparator.svg"] = (() => {
  let s = opampPlusTop(200, 40);
  s += line(80, 60, 200, 60) + text(64, 60, "Vi", { italic: true, weight: "bold" });
  s += line(80, 100, 200, 100) + text(56, 100, "Vref", { italic: true, weight: "bold" });
  s += line(280, 80, 360, 80) + result(368, 80, "Vo");
  s += note(310, 140, "Vi > Vref → Vo = +Vsat", { anchor: "start" }) + note(310, 160, "Vi < Vref → Vo = −Vsat", { anchor: "start" });
  return svgDoc(500, 205, s + caption(500, 190, "Non-inverting comparator: input at +, reference at −"), "Op-amp comparator");
})();
files["zero-crossing-detector.svg"] = (() => {
  const x0 = 70, x1 = 550, w = x1 - x0, mid1 = 70, mid2 = 190, A = 40;
  let pts = [];
  for (let i = 0; i <= 120; i++) { const t = i / 120; pts.push([x0 + t * w, mid1 - A * Math.sin(t * 4 * Math.PI)]); }
  let s = line(x0, mid1, x1, mid1) + `<polyline points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ")}" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>`;
  s += text(35, mid1, "Vi", { italic: true, weight: "bold" }) + line(x0, mid2, x1, mid2) + text(35, mid2, "Vo", { italic: true, weight: "bold" });
  const half = w / 4, hi = mid2 - 35, lo = mid2 + 35;
  const sq = [[x0, hi]];
  for (let k = 1; k <= 4; k++) { const t = x0 + k * half; sq.push([t, k % 2 ? hi : lo]); if (k < 4) sq.push([t, k % 2 ? lo : hi]); }
  s += poly(sq) + note(x1 + 8, hi, "+Vsat", { anchor: "start" }) + note(x1 + 8, lo, "−Vsat", { anchor: "start" });
  for (let k = 1; k < 4; k++) s += dashed(x0 + k * half, mid1, x0 + k * half, mid2 + 40);
  return svgDoc(620, 265, s + caption(620, 250, "Non-inverting zero-crossing detector: the output changes state each time the input crosses 0 V"), "Zero-crossing detector");
})();
files["led-level-indicator.svg"] = (() => {
  const xr = 80, y0 = 40, step = 60;
  let s = text(xr, 22, "Vref", { italic: true, weight: "bold" });
  for (let j = 0; j < 4; j++) { const y = y0 + j * step; s += line(xr, y, xr, y + 10) + resV(xr, y + 10, "R") + line(xr, y + 50, xr, y + step); }
  s += ground(xr, y0 + 4 * step);
  s += text(160, 22, "Vi", { italic: true, weight: "bold" }) + line(160, 30, 160, y0 + 3 * step + 12);
  for (let j = 1; j <= 3; j++) {
    const y = y0 + j * step, cx = 200;
    s += `<path d="M${cx},${y - 20} L${cx + 44},${y} L${cx},${y + 20} Z" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(cx + 8, y - 9, "−", { size: 12 }) + text(cx + 8, y + 9, "+", { size: 12 });
    s += dot(xr, y) + poly([[xr, y], [185, y], [185, y - 9], [cx, y - 9]]) + dot(160, y + 9) + line(160, y + 9, cx, y + 9);
    s += line(cx + 44, y, 270, y) + resH(270, y, "") + line(310, y, 330, y);
    s += `<path d="M330,${y - 9} L348,${y} L330,${y + 9} Z" fill="#fde68a" stroke="${INK}" stroke-width="2"/>` + line(348, y - 9, 348, y + 9) + line(348, y, 370, y) + ground(370, y + 0).replace(/line/g, "line");
    s += poly([[352, y - 12], [360, y - 20]]) + poly([[358, y - 10], [366, y - 18]]) + note(400, y, `LED${4 - j}`, { anchor: "start" });
  }
  return svgDoc(480, y0 + 4 * step + 50, s + caption(480, y0 + 4 * step + 34, "Comparator LED level indicator: more LEDs light as Vi rises"), "LED level indicator");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
