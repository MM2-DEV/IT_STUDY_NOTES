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
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}"${italic ? ' font-style="italic"' : ""} fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${s}</text>`;
const bubble = (x, y) => `<circle cx="${x + 5}" cy="${y}" r="5" fill="#fff" stroke="${INK}" stroke-width="2"/>`;

// Gate bodies. Each returns { svg, inputs: [[x,y]...], out: [x,y] } for a gate whose
// top-left corner is (x, y). Two-input gates are 60 × 50.
function gate(type, x, y, n = 2) {
  const h = n === 3 ? 60 : 50;
  const ys = n === 1 ? [y + 20] : n === 2 ? [y + 15, y + 35] : [y + 12, y + 30, y + 48];
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

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
