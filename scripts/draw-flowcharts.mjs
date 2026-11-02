// Draws the flowchart diagrams used in the Programming notes as SVG files in
// public/diagrams/programming/. Run: node scripts/draw-flowcharts.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "programming");
const INK = "#17292d";
const ACCENT = "#08595a";
const NOTE = "#4b6166";
const FILL = "#eef7f6";
const FONT = 'font-family="Arial, Helvetica, sans-serif"';

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = (x, y, s, { size = 14, anchor = "middle", color = INK, weight = "normal" } = {}) =>
  `<text x="${x}" y="${y}" ${FONT} font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" dominant-baseline="middle">${esc(s)}</text>`;
const lines = (x, y, s, opts) => {
  const parts = [].concat(s);
  return parts.map((p, i) => text(x, y + (i - (parts.length - 1) / 2) * 17, p, opts)).join("");
};
const stroke = `fill="${FILL}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"`;

// Shapes are centred on (x, y) with width w and height h.
const terminal = (x, y, s, w = 120, h = 40) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" ${stroke}/>` + lines(x, y, s, { weight: "bold" });
const proc = (x, y, s, w = 170, h = 44) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" ${stroke}/>` + lines(x, y, s);
const io = (x, y, s, w = 170, h = 44) => {
  const k = 16;
  return `<path d="M${x - w / 2 + k},${y - h / 2} H${x + w / 2 + k} L${x + w / 2 - k},${y + h / 2} H${x - w / 2 - k} Z" ${stroke}/>` + lines(x, y, s);
};
const decision = (x, y, s, w = 150, h = 80) => `<path d="M${x},${y - h / 2} L${x + w / 2},${y} L${x},${y + h / 2} L${x - w / 2},${y} Z" ${stroke}/>` + lines(x, y, s);
const connector = (x, y, s, r = 16) => `<circle cx="${x}" cy="${y}" r="${r}" ${stroke}/>` + text(x, y, s, { weight: "bold" });
const offpage = (x, y, s) => `<path d="M${x - 18},${y - 18} H${x + 18} V${y + 6} L${x},${y + 20} L${x - 18},${y + 6} Z" ${stroke}/>` + text(x, y - 2, s, { weight: "bold" });
const docShape = (x, y, s, w = 130, h = 50) =>
  `<path d="M${x - w / 2},${y - h / 2} H${x + w / 2} V${y + h / 2 - 8} Q${x + w / 4},${y + h / 2 - 22} ${x},${y + h / 2 - 8} T${x - w / 2},${y + h / 2 - 8} Z" ${stroke}/>` + lines(x, y - 4, s);
const predefined = (x, y, s, w = 170, h = 44) => proc(x, y, s, w, h) + `<line x1="${x - w / 2 + 12}" y1="${y - h / 2}" x2="${x - w / 2 + 12}" y2="${y + h / 2}" stroke="${INK}" stroke-width="2"/><line x1="${x + w / 2 - 12}" y1="${y - h / 2}" x2="${x + w / 2 - 12}" y2="${y + h / 2}" stroke="${INK}" stroke-width="2"/>`;

// Arrow along a polyline; the head is drawn at the last point.
function arrow(pts, label, labelAt = 0, dx = 8, dy = -10) {
  const p = pts.map((q) => q.join(",")).join(" ");
  const [x2, y2] = pts[pts.length - 1];
  const [x1, y1] = pts[pts.length - 2];
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = (d) => [x2 - 10 * Math.cos(a + d), y2 - 10 * Math.sin(a + d)];
  let s = `<polyline points="${p}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<path d="M${x2},${y2} L${h(0.45).join(",")} L${h(-0.45).join(",")} Z" fill="${INK}"/>`;
  if (label) {
    const [lx, ly] = pts[labelAt];
    s += text(lx + dx, ly + dy, label, { size: 13, anchor: "start", color: ACCENT, weight: "bold" });
  }
  return s;
}
const down = (x, y1, y2) => arrow([[x, y1], [x, y2]]);

function svgDoc(w, h, inner, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${inner}
</svg>
`;
}
const caption = (w, y, s) => text(w / 2, y, s, { size: 14, color: NOTE });

const files = {};

// ---------- Flowchart symbols ----------
files["flowchart-symbols.svg"] = (() => {
  const rows = [
    [terminal(110, 0, "Start / Stop"), "Terminal", "Start or end of the flowchart (oval)"],
    [io(110, 0, "Read / Print", 140), "Input / Output", "Reading data or printing results (parallelogram)"],
    [proc(110, 0, "sum = a + b", 150), "Process", "Calculation or assignment (rectangle)"],
    [decision(110, 0, "a > b ?", 120, 64), "Decision", "Question with Yes/No (True/False) exits (diamond)"],
    [arrow([[60, 0], [160, 0]]), "Flow line", "Direction of flow (arrow)"],
    [connector(110, 0, "A"), "On-page connector", "Joins parts on the same page (small circle)"],
    [offpage(110, 0, "B"), "Off-page connector", "Continues on another page (pentagon)"],
    [predefined(110, 0, "Find average", 150), "Predefined process", "A sub-program (module) defined elsewhere"],
    [docShape(110, 0, "Report"), "Document", "A printed document or report"],
  ];
  const gap = 78, top = 50;
  let s = text(110, 18, "Symbol", { weight: "bold" }) + text(250, 18, "Name", { anchor: "start", weight: "bold" }) + text(430, 18, "Meaning", { anchor: "start", weight: "bold" });
  rows.forEach(([sym, name, meaning], i) => {
    const y = top + 18 + i * gap;
    s += `<g transform="translate(0 ${y})">${sym}</g>`;
    s += text(250, y, name, { anchor: "start", weight: "bold", color: ACCENT }) + text(430, y, meaning, { anchor: "start", size: 13 });
    s += `<line x1="10" y1="${y + gap / 2}" x2="790" y2="${y + gap / 2}" stroke="#d5e0e0" stroke-width="1"/>`;
  });
  const H = top + rows.length * gap + 30;
  return svgDoc(800, H, s + caption(800, H - 14, "Standard flowchart symbols"), "Flowchart symbols");
})();

// ---------- Example: sum and average of three numbers (sequence) ----------
files["flowchart-sum-average.svg"] = (() => {
  const x = 200;
  let s = terminal(x, 40, "Start") + down(x, 60, 95);
  s += io(x, 120, "Read a, b, c") + down(x, 142, 177);
  s += proc(x, 200, "sum = a + b + c") + down(x, 222, 257);
  s += proc(x, 280, "avg = sum / 3") + down(x, 302, 337);
  s += io(x, 360, "Print sum, avg") + down(x, 382, 417);
  s += terminal(x, 440, "Stop");
  return svgDoc(400, 500, s + caption(400, 485, "Sequence: sum and average of three numbers"), "Flowchart: sum and average");
})();

// ---------- Example: larger of two numbers (decision) ----------
files["flowchart-larger-of-two.svg"] = (() => {
  const x = 250;
  let s = terminal(x, 40, "Start") + down(x, 60, 95) + io(x, 120, "Read a, b") + down(x, 142, 180);
  s += decision(x, 220, "Is a > b ?");
  s += arrow([[x - 75, 220], [110, 220], [110, 285]], "Yes", 0, -40, -10) + io(110, 310, "Print a", 130);
  s += arrow([[x + 75, 220], [390, 220], [390, 285]], "No", 0) + io(390, 310, "Print b", 130);
  s += arrow([[110, 332], [110, 380], [x, 380], [x, 405]]) + arrow([[390, 332], [390, 380], [x + 2, 380]]);
  s += terminal(x, 425, "Stop");
  return svgDoc(500, 490, s + caption(500, 475, "Decision: printing the larger of two numbers"), "Flowchart: larger of two numbers");
})();

// ---------- Example: sum of 1 to N (loop) ----------
files["flowchart-sum-1-to-n.svg"] = (() => {
  const x = 220;
  let s = terminal(x, 40, "Start") + down(x, 60, 95) + io(x, 120, "Read N") + down(x, 142, 177);
  s += proc(x, 200, "sum = 0, i = 1") + down(x, 222, 260);
  s += decision(x, 300, "Is i ≤ N ?");
  s += arrow([[x, 340], [x, 380]], "Yes", 0, 8, 14) + proc(x, 402, "sum = sum + i") + down(x, 424, 459) + proc(x, 482, "i = i + 1");
  s += arrow([[x - 85, 482], [60, 482], [60, 300], [x - 75, 300]]);
  s += arrow([[x + 75, 300], [400, 300], [400, 540], [x + 70, 540]], "No", 0);
  s += io(x, 540, "Print sum", 130) + down(x, 562, 597) + terminal(x, 617, "Stop");
  return svgDoc(460, 680, s + caption(460, 665, "Loop: sum of the numbers 1 to N"), "Flowchart: sum of 1 to N");
})();

// ---------- Example: even or odd ----------
files["flowchart-even-odd.svg"] = (() => {
  const x = 250;
  let s = terminal(x, 40, "Start") + down(x, 60, 95) + io(x, 120, "Read n") + down(x, 142, 175);
  s += decision(x, 220, ["Is n % 2", "= 0 ?"], 160, 90);
  s += arrow([[x - 80, 220], [110, 220], [110, 285]], "Yes", 0, -40, -10) + io(110, 310, "Print \"Even\"", 140);
  s += arrow([[x + 80, 220], [390, 220], [390, 285]], "No", 0) + io(390, 310, "Print \"Odd\"", 140);
  s += arrow([[110, 332], [110, 380], [x, 380], [x, 405]]) + arrow([[390, 332], [390, 380], [x + 2, 380]]);
  s += terminal(x, 425, "Stop");
  return svgDoc(500, 490, s + caption(500, 475, "Checking whether a number is even or odd"), "Flowchart: even or odd");
})();

// ---------- Example: factorial ----------
files["flowchart-factorial.svg"] = (() => {
  const x = 220;
  let s = terminal(x, 40, "Start") + down(x, 60, 95) + io(x, 120, "Read n") + down(x, 142, 177);
  s += proc(x, 200, "fact = 1, i = 1") + down(x, 222, 260);
  s += decision(x, 300, "Is i ≤ n ?");
  s += arrow([[x, 340], [x, 380]], "Yes", 0, 8, 14) + proc(x, 402, "fact = fact × i") + down(x, 424, 459) + proc(x, 482, "i = i + 1");
  s += arrow([[x - 85, 482], [60, 482], [60, 300], [x - 75, 300]]);
  s += arrow([[x + 75, 300], [400, 300], [400, 540], [x + 70, 540]], "No", 0);
  s += io(x, 540, "Print fact", 130) + down(x, 562, 597) + terminal(x, 617, "Stop");
  return svgDoc(460, 680, s + caption(460, 665, "Loop: factorial of n (n! = 1 × 2 × … × n)"), "Flowchart: factorial");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
