// Draws the diagrams used in the Database Management Systems notes as SVG files in
// public/diagrams/dbms/. Run: node scripts/draw-dbms-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "dbms");
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


// ======================= 8.1 Introduction to Database Systems =======================
files["file-vs-database-approach.svg"] = (() => {
  // left: file processing
  let s = text(230, 24, "File processing system", { weight: "bold", size: 16 });
  const apps = ["Accounts\nprogram", "Library\nprogram", "Exam\nprogram"];
  const fls = ["Accounts file\n(roll, name, fees)", "Library file\n(roll, name, books)", "Exam file\n(roll, name, marks)"];
  apps.forEach((a, i) => {
    const x = 20 + i * 150;
    s += box(x, 50, 130, 50, a, { fill: COLORS[1], size: 12 });
    s += arrow(x + 65, 100, x + 65, 148);
    s += box(x, 150, 130, 56, fls[i], { fill: COLORS[4], size: 11 });
  });
  s += text(230, 228, "separate files; name stored three times (redundancy)", { size: 12, color: "#c0392b" });
  // right: database approach
  s += text(720, 24, "Database approach", { weight: "bold", size: 16 });
  apps.forEach((a, i) => {
    const x = 510 + i * 150;
    s += box(x, 50, 130, 50, a, { fill: COLORS[1], size: 12 });
    s += arrow(x + 65, 100, 720 + (i - 1) * 40, 128);
  });
  s += box(600, 130, 240, 40, "DBMS", { fill: COLORS[0], size: 14 });
  s += arrow(720, 170, 720, 188);
  s += box(600, 190, 240, 44, "One shared, integrated\ndatabase", { fill: COLORS[2], size: 12 });
  s += line(490, 40, 490, 240, { color: NOTE, dash: "6 6" });
  return svgDoc(960, 285, s + caption(960, 268, "In file processing each program has its own files; in the database approach all programs share one database through the DBMS"), "File processing vs database approach");
})();

files["database-environment.svg"] = (() => {
  let s = box(40, 20, 180, 50, "End users", { fill: "#fff", size: 13 });
  s += box(40, 110, 180, 50, "User interface", { fill: COLORS[4], size: 13 });
  s += box(40, 200, 180, 56, "Application\nprograms", { fill: COLORS[1], size: 12 });
  s += box(320, 20, 180, 50, "System developers", { fill: "#fff", size: 13 });
  s += box(320, 110, 180, 50, "CASE tools", { fill: COLORS[5], size: 13 });
  s += box(320, 200, 180, 56, "DBMS", { fill: COLORS[0], size: 16 });
  s += box(330, 320, 160, 50, "Database", { fill: COLORS[2], size: 14 });
  s += box(600, 110, 180, 50, "Data and database\nadministrators", { fill: "#fff", size: 11 });
  s += box(600, 320, 180, 50, "Repository\n(metadata)", { fill: COLORS[3], size: 12 });
  s += arrow(130, 70, 130, 108) + arrow(130, 160, 130, 198) + arrow(220, 228, 318, 228);
  s += arrow(410, 70, 410, 108) + arrow(320, 145, 222, 215) + arrow(500, 145, 640, 318, { dash: "5 4" });
  s += arrow(600, 145, 502, 215) + arrow(410, 256, 410, 318) + arrow(500, 240, 600, 330);
  return svgDoc(820, 410, s + caption(820, 395, "Components of the database environment (after Hoffer, Ramesh and Topi)"), "Database environment");
})();

// ======================= 8.2 Data Models and the ER Model =======================
const diamond = (cx, cy, w, h, label, { fill = FILL, double = false, size = 13 } = {}) => {
  const pts = (k) => `${cx},${cy - h / 2 + k} ${cx + w / 2 - k * 1.6},${cy} ${cx},${cy + h / 2 - k} ${cx - w / 2 + k * 1.6},${cy}`;
  let s = `<polygon points="${pts(0)}" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;
  if (double) s += `<polygon points="${pts(5)}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  return s + text(cx, cy + 1, label, { size, weight: "bold" });
};
const oval = (cx, cy, rx, ry, label, { fill = "#fff", double = false, dash = "", underline = false, size = 12 } = {}) => {
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${INK}" stroke-width="2"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
  if (double) s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx - 5}" ry="${ry - 5}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += text(cx, cy + 1, label, { size, weight: "bold" });
  if (underline) { const w = label.length * size * 0.29; s += line(cx - w, cy + 9, cx + w, cy + 9, { width: 1.5 }); }
  return s;
};
const entity = (x, y, w, h, label, { double = false, fill = COLORS[0], size = 13 } = {}) =>
  rect(x, y, w, h, { fill, rx: 0 }) + (double ? rect(x + 5, y + 5, w - 10, h - 10, { fill: "none", rx: 0 }) : "") + text(x + w / 2, y + h / 2 + 1, label, { size, weight: "bold" });

files["er-symbols.svg"] = (() => {
  const items = [
    [(x, y) => entity(x - 55, y - 22, 110, 44, "Entity"), "Strong entity"],
    [(x, y) => entity(x - 55, y - 22, 110, 44, "Entity", { double: true }), "Weak entity"],
    [(x, y) => diamond(x, y, 120, 54, "Relation", { fill: COLORS[2] }), "Relationship"],
    [(x, y) => diamond(x, y, 120, 54, "Identify", { fill: COLORS[2], double: true }), "Identifying relationship"],
    [(x, y) => oval(x, y, 60, 24, "Attribute"), "Attribute"],
    [(x, y) => oval(x, y, 60, 24, "Roll_No", { underline: true }), "Key attribute (underlined)"],
    [(x, y) => oval(x, y, 60, 24, "Phone", { double: true }), "Multivalued attribute"],
    [(x, y) => oval(x, y, 60, 24, "Age", { dash: "6 4" }), "Derived attribute"],
    [(x, y) => oval(x, y - 6, 50, 18, "Address") + line(x - 30, y + 10, x - 50, y + 26) + line(x + 30, y + 10, x + 50, y + 26) + oval(x - 55, y + 34, 28, 12, "City", { size: 10 }) + oval(x + 55, y + 34, 32, 12, "Street", { size: 10 }), "Composite attribute"],
    [(x, y) => line(x - 60, y, x + 60, y), "Partial participation (single line)"],
    [(x, y) => line(x - 60, y - 3, x + 60, y - 3) + line(x - 60, y + 3, x + 60, y + 3), "Total participation (double line)"],
    [(x, y) => text(x - 50, y - 10, "1", { weight: "bold" }) + line(x - 60, y, x + 60, y) + text(x + 50, y - 10, "N", { weight: "bold" }), "Cardinality (1, N, M)"],
  ];
  let s = "";
  items.forEach(([draw, label], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 110 + col * 210, y = 50 + row * 120;
    s += draw(x, y) + text(x, y + 56, label, { size: 12, color: NOTE });
  });
  return svgDoc(860, 390, s + caption(860, 378, "Symbols of the ER diagram (Chen notation)"), "ER diagram symbols");
})();

files["er-example.svg"] = (() => {
  let s = entity(60, 150, 140, 50, "STUDENT");
  s += diamond(370, 175, 140, 64, "ENROLS", { fill: COLORS[2] });
  s += entity(540, 150, 140, 50, "COURSE");
  s += entity(60, 330, 140, 50, "GUARDIAN", { double: true });
  s += diamond(130, 260, 130, 54, "HAS", { fill: COLORS[2], double: true });
  // participation lines
  s += line(200, 172, 300, 172) + line(200, 178, 300, 178) + line(440, 175, 540, 175);
  s += text(225, 160, "M", { weight: "bold" }) + text(515, 160, "N", { weight: "bold" });
  s += line(130, 200, 130, 233) + line(127, 287, 127, 330) + line(133, 287, 133, 330);
  s += text(144, 215, "1", { weight: "bold" }) + text(146, 312, "N", { weight: "bold" });
  // attributes
  s += oval(60, 60, 50, 20, "Roll_No", { underline: true }) + line(85, 80, 110, 150);
  s += oval(180, 40, 44, 20, "Name") + line(170, 60, 145, 150);
  s += oval(290, 90, 44, 20, "Phone", { double: true }) + line(255, 100, 190, 150);
  s += oval(290, 40, 40, 20, "Age", { dash: "6 4" }) + line(262, 52, 175, 150);
  s += oval(370, 90, 40, 20, "Grade") + line(370, 110, 370, 143);
  s += oval(560, 70, 54, 20, "Course_ID", { underline: true }) + line(580, 90, 590, 150);
  s += oval(680, 70, 44, 20, "Title") + line(670, 90, 640, 150);
  s += oval(330, 355, 58, 20, "G_Name") + line(272, 357, 200, 357) + line(308, 367, 352, 367, { dash: "4 3", width: 1.5 });
  return svgDoc(760, 420, s + caption(760, 405, "ER diagram: STUDENT enrols in COURSE (M:N); weak entity GUARDIAN depends on STUDENT"), "ER diagram example");
})();

files["hierarchical-network-model.svg"] = (() => {
  let s = text(200, 22, "Hierarchical model (tree)", { weight: "bold" });
  s += box(140, 40, 120, 40, "Department", { fill: COLORS[0], size: 12 });
  s += box(40, 130, 120, 40, "Teacher", { fill: COLORS[1], size: 12 }) + box(240, 130, 120, 40, "Course", { fill: COLORS[1], size: 12 });
  s += box(240, 220, 120, 40, "Student", { fill: COLORS[2], size: 12 });
  s += arrow(180, 80, 110, 128) + arrow(220, 80, 290, 128) + arrow(300, 170, 300, 218);
  s += text(200, 290, "each child has exactly ONE parent (1:N)", { size: 12, color: NOTE });
  s += line(420, 30, 420, 300, { color: NOTE, dash: "6 6" });
  s += text(640, 22, "Network model (graph)", { weight: "bold" });
  s += box(470, 40, 120, 40, "Teacher", { fill: COLORS[1], size: 12 }) + box(690, 40, 120, 40, "Department", { fill: COLORS[0], size: 12 });
  s += box(470, 180, 120, 40, "Course", { fill: COLORS[1], size: 12 }) + box(690, 180, 120, 40, "Student", { fill: COLORS[2], size: 12 });
  s += arrow(530, 80, 530, 178) + arrow(750, 80, 750, 178) + arrow(700, 80, 580, 178);
  s += text(640, 290, "a record can have MANY parents (M:N)", { size: 12, color: NOTE });
  return svgDoc(860, 325, s + caption(860, 313, "Hierarchical (tree) and network (graph) data models"), "Hierarchical and network models");
})();

files["generalization-specialization.svg"] = (() => {
  let s = entity(300, 30, 160, 50, "EMPLOYEE");
  s += oval(110, 40, 46, 20, "Emp_ID", { underline: true }) + line(156, 45, 300, 50) + oval(110, 95, 42, 20, "Name") + line(150, 90, 300, 68);
  s += `<polygon points="380,110 330,175 430,175" fill="${COLORS[2]}" stroke="${INK}" stroke-width="2"/>` + text(380, 152, "ISA", { weight: "bold", size: 13 });
  s += line(380, 80, 380, 110);
  s += entity(150, 240, 160, 50, "DEVELOPER", { fill: COLORS[1] }) + entity(450, 240, 160, 50, "TESTER", { fill: COLORS[1] });
  s += line(350, 175, 230, 240) + line(410, 175, 530, 240);
  s += oval(140, 330, 60, 20, "Language") + line(170, 312, 210, 290) + oval(560, 330, 60, 20, "Test_Type") + line(550, 310, 535, 290);
  s += arrow(628, 260, 628, 70, { color: ACCENT }) + text(700, 165, "Generalization", { size: 12, color: ACCENT, weight: "bold" }) + text(700, 182, "(bottom-up)", { size: 11, color: ACCENT });
  s += arrow(40, 70, 40, 260, { color: RED }) + text(85, 205, "Specialization", { size: 12, color: RED, weight: "bold" }) + text(85, 222, "(top-down)", { size: 11, color: RED });
  return svgDoc(780, 380, s + caption(780, 368, "Generalization and specialization: DEVELOPER and TESTER are subclasses (ISA) of EMPLOYEE"), "Generalization and specialization");
})();

files["aggregation.svg"] = (() => {
  let s = rect(30, 30, 560, 110, { fill: "#fff", dash: "7 5", rx: 8 });
  s += entity(50, 60, 140, 50, "EMPLOYEE") + diamond(310, 85, 140, 60, "WORKS_ON", { fill: COLORS[2] }) + entity(430, 60, 140, 50, "PROJECT");
  s += line(190, 85, 240, 85) + line(380, 85, 430, 85);
  s += text(310, 20, "aggregated relationship treated as one entity", { size: 12, color: NOTE });
  s += diamond(310, 210, 130, 56, "USES", { fill: COLORS[2] }) + line(310, 140, 310, 182);
  s += entity(500, 185, 140, 50, "MACHINERY", { fill: COLORS[1] }) + line(375, 210, 500, 210);
  return svgDoc(670, 280, s + caption(670, 268, "Aggregation: the WORKS_ON relationship (with its entities) takes part in the USES relationship"), "Aggregation");
})();

// ======================= 8.3 The Relational Model =======================
files["relation-anatomy.svg"] = (() => {
  const cols = ["Roll_No", "Name", "Dept", "CGPA"], w = [100, 130, 90, 90];
  const rows = [["101", "Rahim", "CSE", "3.75"], ["102", "Karim", "EEE", "3.40"], ["103", "Sumi", "CSE", "3.90"], ["104", "Nila", "BBA", "NULL"]];
  const x0 = 200, y0 = 80, rh = 34;
  let s = text(x0 + 205, 30, "Relation (table): STUDENT", { weight: "bold", size: 15 });
  let x = x0;
  cols.forEach((c, j) => {
    s += rect(x, y0, w[j], rh, { fill: COLORS[1], rx: 0 }) + text(x + w[j] / 2, y0 + rh / 2, c, { weight: "bold", size: 13 });
    if (j === 0) s += line(x + 18, y0 + rh / 2 + 9, x + w[j] - 18, y0 + rh / 2 + 9, { width: 1.5 });
    rows.forEach((r, i) => {
      const fill = i === 1 ? "#fff6c8" : "#fff";
      s += rect(x, y0 + rh * (i + 1), w[j], rh, { fill, rx: 0 }) + text(x + w[j] / 2, y0 + rh * (i + 1) + rh / 2, r[j], { size: 13, color: r[j] === "NULL" ? RED : INK });
    });
    x += w[j];
  });
  const xe = x;
  // labels
  s += arrow(175, 56, 385, y0 - 2, { color: ACCENT }) + text(110, 52, "attribute (column)", { size: 12, color: ACCENT, weight: "bold" });
  s += arrow(140, y0 + rh * 2 + 17, x0 - 2, y0 + rh * 2 + 17, { color: ACCENT }) + text(80, y0 + rh * 2 + 17, "tuple (row)", { size: 12, color: ACCENT, weight: "bold" });
  s += text(90, y0 + 17, "primary key", { size: 12, color: ACCENT, weight: "bold" }) + line(140, y0 + 17, x0 + 20, y0 + 26, { color: ACCENT });
  s += line(x0, y0 + rh * 5 + 14, xe, y0 + rh * 5 + 14, { color: NOTE }) + text(x0 + 205, y0 + rh * 5 + 30, "degree = number of attributes = 4", { size: 12, color: NOTE, weight: "bold" });
  s += line(xe + 14, y0 + rh, xe + 14, y0 + rh * 5, { color: NOTE }) + text(xe + 24, y0 + rh * 3, "cardinality = number", { size: 12, color: NOTE, weight: "bold", anchor: "start" }) + text(xe + 24, y0 + rh * 3 + 16, "of tuples = 4", { size: 12, color: NOTE, weight: "bold", anchor: "start" });
  s += text(xe + 24, y0 + rh * 4 + 17, "missing value", { size: 11, color: RED, anchor: "start" });
  return svgDoc(820, 330, s + caption(820, 318, "Parts of a relation: attributes, tuples, primary key, degree, cardinality and a NULL value"), "Anatomy of a relation");
})();

// ======================= 8.4 Normalization =======================
files["normal-forms.svg"] = (() => {
  const steps = [["UNF", "unnormalized"], ["1NF", "atomic values"], ["2NF", "no partial\ndependency"], ["3NF", "no transitive\ndependency"], ["BCNF", "every determinant\nis a super key"], ["4NF", "no multivalued\ndependency"], ["5NF", "no join\ndependency"]];
  let s = "";
  steps.forEach(([n, d], i) => {
    const x = 20 + i * 128, y = 190 - i * 22;
    s += rect(x, y, 112, 275 - y, { fill: i === 0 ? "#fff" : COLORS[(i - 1) % COLORS.length], rx: 4 });
    s += text(x + 56, y + 20, n, { weight: "bold", size: 16 });
    d.split("\n").forEach((l, k) => { s += text(x + 56, y + 46 + k * 15, l, { size: 11 }); });
    if (i > 0) s += text(x - 8, y + 10, "→", { size: 18, color: NOTE, weight: "bold" });
  });
  s += arrow(30, 22, 880, 22, { color: ACCENT }) + text(455, 12, "stricter normal form, less redundancy, more tables", { size: 12, color: ACCENT, weight: "bold" });
  return svgDoc(920, 310, s + caption(920, 296, "Normal forms: each one includes the previous and removes one more kind of dependency"), "Normal forms");
})();

// ======================= 8.5 SQL =======================
files["sql-commands.svg"] = (() => {
  let s = box(390, 20, 140, 44, "SQL commands", { fill: COLORS[0], size: 14 });
  const groups = [
    ["DDL", "Data Definition", "CREATE\nALTER\nDROP\nTRUNCATE\nRENAME"],
    ["DML", "Data Manipulation", "INSERT\nUPDATE\nDELETE"],
    ["DQL", "Data Query", "SELECT"],
    ["DCL", "Data Control", "GRANT\nREVOKE"],
    ["TCL", "Transaction Control", "COMMIT\nROLLBACK\nSAVEPOINT"],
  ];
  groups.forEach(([a, b, c], i) => {
    const x = 20 + i * 180;
    s += box(x, 110, 160, 56, `${a}\n${b}`, { fill: COLORS[(i + 1) % COLORS.length], size: 12 });
    s += line(460, 64, x + 80, 108);
    const ls = c.split("\n");
    s += rect(x + 20, 182, 120, 22 * ls.length + 10, { fill: "#fff" });
    ls.forEach((l, k) => { s += text(x + 80, 199 + k * 22, l, { size: 12 }); });
  });
  return svgDoc(920, 330, s + caption(920, 318, "Categories of SQL commands"), "SQL command categories");
})();

files["sql-joins.svg"] = (() => {
  const venn = (cx, cy, mode, title, sql) => {
    const r = 46, d = 30;
    const fillA = mode === "left" || mode === "full" ? COLORS[0] : "#fff";
    const fillB = mode === "right" || mode === "full" ? COLORS[0] : "#fff";
    let s = `<defs><clipPath id="c${title.replace(/\W/g, "")}"><circle cx="${cx - d}" cy="${cy}" r="${r}"/></clipPath></defs>`;
    s += `<circle cx="${cx - d}" cy="${cy}" r="${r}" fill="${fillA}" stroke="none"/>`;
    s += `<circle cx="${cx + d}" cy="${cy}" r="${r}" fill="${fillB}" stroke="none"/>`;
    s += `<circle cx="${cx + d}" cy="${cy}" r="${r}" fill="${COLORS[0]}" clip-path="url(#c${title.replace(/\W/g, "")})"/>`;
    s += `<circle cx="${cx - d}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="${cx + d}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    s += text(cx - d - 20, cy, "A", { weight: "bold" }) + text(cx + d + 20, cy, "B", { weight: "bold" });
    s += text(cx, cy + 66, title, { weight: "bold", size: 13 }) + text(cx, cy + 84, sql, { size: 11, color: NOTE });
    return s;
  };
  let s = venn(120, 80, "inner", "INNER JOIN", "only matching rows");
  s += venn(340, 80, "left", "LEFT JOIN", "all of A + matches of B");
  s += venn(560, 80, "right", "RIGHT JOIN", "all of B + matches of A");
  s += venn(780, 80, "full", "FULL OUTER JOIN", "all rows of A and B");
  return svgDoc(900, 200, s + caption(900, 190, "SQL joins: the shaded part shows the rows returned (unmatched columns are NULL)"), "SQL joins");
})();

// ======================= 8.6 File Organization =======================
files["file-organizations.svg"] = (() => {
  const blk = (x, y, recs, label, fill) => {
    let s = rect(x, y, 70, 26 * recs.length + 8, { fill: "#fff" }) + text(x + 35, y - 10, label, { size: 11, color: NOTE });
    recs.forEach((r, i) => { s += rect(x + 6, y + 4 + i * 26, 58, 22, { fill: r ? fill : "#fff", rx: 3, dash: r ? "" : "4 3" }) + (r ? text(x + 35, y + 15 + i * 26, r, { size: 12 }) : ""); });
    return s;
  };
  let s = text(140, 24, "Heap (unordered)", { weight: "bold" });
  s += blk(30, 60, ["125", "101", "138"], "block 1", COLORS[1]) + blk(140, 60, ["112", "140", ""], "block 2", COLORS[1]);
  s += text(140, 175, "new record: any free space", { size: 11, color: NOTE });
  s += text(420, 24, "Sequential (sorted on key)", { weight: "bold" });
  s += blk(310, 60, ["101", "112", "125"], "block 1", COLORS[2]) + blk(420, 60, ["138", "140", ""], "block 2", COLORS[2]);
  s += text(420, 175, "records kept in key order", { size: 11, color: NOTE });
  s += text(730, 24, "Hash: bucket = key mod 7", { weight: "bold" });
  const b = [["0", "112", "140"], ["3", "101", ""], ["5", "138", ""], ["6", "125", ""]];
  b.forEach(([n, a, c], i) => {
    const y = 50 + i * 32;
    s += text(620, y + 13, `bucket ${n}`, { size: 11, color: NOTE, anchor: "end" }) + rect(630, y, 60, 26, { fill: COLORS[0], rx: 3 }) + text(660, y + 13, a, { size: 12 });
    if (c) s += arrow(690, y + 13, 728, y + 13) + rect(730, y, 60, 26, { fill: COLORS[6], rx: 3 }) + text(760, y + 13, c, { size: 12 }) + text(800, y + 13, "overflow (collision)", { size: 11, color: RED, anchor: "start" });
  });
  return svgDoc(960, 210, s + caption(960, 200, "Heap, sequential and hash file organization of the keys 101, 112, 125, 138, 140"), "File organizations");
})();

files["slotted-page.svg"] = (() => {
  let s = rect(40, 40, 820, 90, { fill: "#fff" });
  s += rect(40, 40, 200, 90, { fill: COLORS[2], rx: 0 }) + text(140, 62, "Block header", { weight: "bold", size: 13 });
  s += text(140, 84, "no. of entries, end of free space,", { size: 11 }) + text(140, 100, "(offset, size) of each record", { size: 11 });
  s += rect(240, 40, 300, 90, { fill: "#fff", rx: 0 }) + text(390, 85, "free space", { size: 14, color: NOTE, weight: "bold" });
  const recs = [["R3", 540, 90], ["R2", 630, 110], ["R1", 740, 120]];
  recs.forEach(([n, x, w]) => { s += rect(x, 40, w, 90, { fill: COLORS[0], rx: 0 }) + text(x + w / 2, 85, n, { weight: "bold" }); });
  s += arrow(200, 130, 790, 132, { curve: 60 }) + arrow(180, 130, 685, 132, { curve: 45 }) + arrow(160, 130, 585, 132, { curve: 30 });
  s += text(450, 30, "records are added at the end of free space; the header grows from the front", { size: 11, color: NOTE });
  return svgDoc(900, 220, s + caption(900, 208, "Slotted-page structure for variable-length records: header entries point to the records"), "Slotted page");
})();

// ======================= 8.7 Indexing and Hashing =======================
const recTable = (x, y, rows, w = 150) => {
  let s = "";
  rows.forEach((r, i) => { s += rect(x, y + i * 26, w, 26, { fill: "#fff", rx: 0 }) + text(x + w / 2, y + i * 26 + 13, r, { size: 12 }); });
  return s;
};
files["dense-sparse-index.svg"] = (() => {
  const data = ["101 Rahim", "103 Sumi", "105 Rafi", "107 Joy", "109 Mina", "111 Rina"];
  let s = text(170, 22, "Dense index", { weight: "bold" }) + text(620, 22, "Sparse index", { weight: "bold" });
  // dense
  data.forEach((d, i) => {
    s += rect(30, 40 + i * 26, 60, 26, { fill: COLORS[2], rx: 0 }) + text(60, 53 + i * 26, d.split(" ")[0], { size: 12 });
    s += arrow(90, 53 + i * 26, 168, 53 + i * 26, {});
  });
  s += recTable(170, 40, data, 120);
  s += line(170, 92, 290, 92, { width: 3 }) + line(170, 144, 290, 144, { width: 3 });
  s += text(170, 216, "one index entry for EVERY search-key value", { size: 11, color: NOTE });
  // sparse
  [0, 2, 4].forEach((i, k) => {
    s += rect(480, 40 + k * 52, 60, 26, { fill: COLORS[2], rx: 0 }) + text(510, 53 + k * 52, data[i].split(" ")[0], { size: 12 });
    s += arrow(540, 53 + k * 52, 618, 53 + i * 26, {});
  });
  s += recTable(620, 40, data, 120);
  s += line(620, 92, 740, 92, { width: 3 }) + line(620, 144, 740, 144, { width: 3 });
  s += text(620, 216, "one entry for the FIRST record of each block", { size: 11, color: NOTE });
  s += text(780, 66, "block 1", { size: 11, color: NOTE, anchor: "start" }) + text(780, 118, "block 2", { size: 11, color: NOTE, anchor: "start" }) + text(780, 170, "block 3", { size: 11, color: NOTE, anchor: "start" });
  return svgDoc(860, 250, s + caption(860, 240, "Dense and sparse indexes on a data file sorted by roll number (2 records per block)"), "Dense and sparse index");
})();

files["multilevel-index.svg"] = (() => {
  let s = text(90, 22, "Outer index", { weight: "bold", size: 13 }) + text(300, 22, "Inner index", { weight: "bold", size: 13 }) + text(530, 22, "Data blocks", { weight: "bold", size: 13 });
  s += recTable(40, 50, ["101", "301"], 100);
  const inner = ["101", "151", "201", "251", "301", "351"];
  s += recTable(250, 40, inner, 100);
  s += arrow(140, 63, 248, 53) + arrow(140, 89, 248, 157);
  const blocks = [["101 …", "149 …"], ["151 …", "199 …"], ["201 …", "249 …"], ["251 …", "299 …"]];
  blocks.forEach((b, i) => { s += recTable(480, 40 + i * 62, b, 110); s += arrow(350, 53 + i * 26, 478, 53 + i * 62); });
  s += text(535, 300, "…", { size: 16 });
  s += text(90, 130, "fits in one block;", { size: 11, color: NOTE }) + text(90, 145, "kept in memory", { size: 11, color: NOTE });
  return svgDoc(640, 330, s + caption(640, 318, "Two-level (multilevel) index: a sparse outer index on the inner index"), "Multilevel index");
})();

files["extendible-hashing.svg"] = (() => {
  let s = text(110, 22, "Directory (global depth 3)", { weight: "bold", size: 13 });
  const dirs = ["000", "001", "010", "011", "100", "101", "110", "111"];
  const target = { "000": 0, "100": 1, "010": 2, "110": 3, "001": 4, "011": 4, "101": 4, "111": 4 };
  const bks = [["16, 24", 3], ["4, 20", 3], ["10, 26", 3], ["6, 22", 3], ["31, 7, 9", 1]];
  bks.forEach(([k, ld], i) => {
    const y = 40 + i * 62;
    s += rect(420, y, 150, 40, { fill: i === 4 ? COLORS[1] : COLORS[0] }) + text(495, y + 20, k, { size: 13, weight: "bold" });
    s += text(580, y + 20, `local depth ${ld}`, { size: 11, color: NOTE, anchor: "start" });
  });
  dirs.forEach((d, i) => {
    const y = 40 + i * 34;
    s += rect(60, y, 100, 30, { fill: COLORS[2], rx: 0 }) + text(110, y + 15, d, { size: 13 });
    const t = target[d];
    s += arrow(160, y + 15, 418, 60 + t * 62, { color: t === 4 ? NOTE : INK });
  });
  return svgDoc(720, 380, s + caption(720, 366, "Extendible hashing after inserting 16, 4, 6, 22, 24, 10, 31, 7, 9, 20, 26 (bucket size 3, last bits)"), "Extendible hashing");
})();

// ======================= 8.8 Query Processing =======================
files["query-processing-steps.svg"] = (() => {
  let s = box(20, 30, 130, 50, "SQL query", { fill: "#fff", size: 13 });
  s += box(200, 30, 150, 50, "Parser and\ntranslator", { fill: COLORS[0], size: 12 });
  s += box(400, 30, 150, 50, "Relational algebra\nexpression", { fill: "#fff", size: 11 });
  s += box(400, 130, 150, 50, "Optimizer", { fill: COLORS[2], size: 13 });
  s += box(400, 230, 150, 50, "Evaluation plan", { fill: "#fff", size: 12 });
  s += box(200, 230, 150, 50, "Evaluation\nengine", { fill: COLORS[1], size: 12 });
  s += box(20, 230, 130, 50, "Query output", { fill: "#fff", size: 13 });
  s += box(620, 130, 150, 50, "Statistics about\ndata (catalog)", { fill: COLORS[3], size: 11 });
  s += box(200, 330, 150, 44, "Data", { fill: COLORS[4], size: 13 });
  s += arrow(150, 55, 198, 55) + arrow(350, 55, 398, 55) + arrow(475, 80, 475, 128) + arrow(475, 180, 475, 228) + arrow(400, 255, 352, 255) + arrow(200, 255, 152, 255) + arrow(620, 155, 552, 155) + arrow(275, 330, 275, 282);
  s += text(275, 105, "1. parsing and translation", { size: 11, color: NOTE, weight: "bold" }) + text(600, 210, "2. optimization", { size: 11, color: NOTE, weight: "bold" }) + text(120, 305, "3. evaluation", { size: 11, color: NOTE, weight: "bold" });
  return svgDoc(800, 400, s + caption(800, 390, "Steps in query processing"), "Query processing steps");
})();

files["query-tree.svg"] = (() => {
  let s = circle(200, 40, "π", { r: 22, fill: COLORS[2] }) + text(240, 40, "name", { size: 12, anchor: "start" });
  s += circle(200, 120, "⋈", { r: 22, fill: COLORS[0] }) + text(240, 120, "s.dept_id = d.dept_id", { size: 11, anchor: "start" });
  s += circle(110, 200, "σ", { r: 22, fill: COLORS[1] }) + text(60, 236, "cgpa > 3.5", { size: 11 });
  s += box(60, 260, 100, 36, "Student", { fill: "#fff", size: 12 }) + box(250, 180, 110, 36, "Department", { fill: "#fff", size: 12 });
  s += line(200, 62, 200, 98) + line(185, 136, 125, 182) + line(215, 136, 290, 180) + line(110, 222, 110, 258);
  s += text(480, 80, "π name (", { size: 13, anchor: "start" }) + text(480, 104, "   σ cgpa>3.5 (Student)", { size: 13, anchor: "start" }) + text(480, 128, "   ⋈ dept_id Department )", { size: 13, anchor: "start" });
  s += text(480, 170, "leaves = relations,", { size: 12, color: NOTE, anchor: "start" }) + text(480, 188, "internal nodes = operations;", { size: 12, color: NOTE, anchor: "start" }) + text(480, 206, "evaluated from the leaves upward", { size: 12, color: NOTE, anchor: "start" });
  return svgDoc(760, 330, s + caption(760, 318, "Query tree for: names of students with CGPA above 3.5, with their department"), "Query tree");
})();

// ======================= 8.9 Query Optimization =======================
files["query-tree-optimization.svg"] = (() => {
  const node = (x, y, sym, label, fill) => circle(x, y, sym, { r: 20, fill }) + text(x + 28, y, label, { size: 11, anchor: "start" });
  const leaf = (x, y, l) => box(x - 55, y - 16, 110, 32, l, { fill: "#fff", size: 12 });
  let s = text(170, 20, "Initial tree", { weight: "bold" });
  s += node(170, 50, "π", "name, title", COLORS[2]);
  s += node(170, 120, "σ", "dept = 'CSE' ∧ year = 2025", COLORS[1]);
  s += node(170, 190, "⋈", "", COLORS[0]);
  s += node(90, 260, "⋈", "", COLORS[0]);
  s += leaf(70, 330, "Teacher") + leaf(190, 330, "Teaches") + leaf(270, 260, "Course");
  s += line(170, 70, 170, 100) + line(170, 140, 170, 170) + line(155, 205, 105, 245) + line(185, 205, 255, 244) + line(82, 278, 70, 314) + line(100, 278, 180, 314);
  s += line(430, 30, 430, 360, { color: NOTE, dash: "6 6" });
  s += text(640, 20, "Optimized tree (selections pushed down)", { weight: "bold" });
  s += node(640, 50, "π", "name, title", COLORS[2]);
  s += node(640, 120, "⋈", "", COLORS[0]);
  s += node(560, 190, "⋈", "", COLORS[0]);
  s += node(500, 260, "σ", "dept = 'CSE'", COLORS[1]) + node(640, 260, "σ", "year = 2025", COLORS[1]);
  s += leaf(500, 330, "Teacher") + leaf(640, 330, "Teaches") + leaf(760, 190, "Course");
  s += line(640, 70, 640, 100) + line(625, 135, 575, 175) + line(655, 135, 745, 174) + line(548, 206, 510, 242) + line(572, 206, 628, 242) + line(500, 280, 500, 314) + line(640, 280, 640, 314);
  return svgDoc(860, 390, s + caption(860, 378, "Heuristic optimization: selections are applied before the joins, so the joins work on fewer tuples"), "Query tree optimization");
})();

// ======================= 8.10 Transactions =======================
files["transaction-states.svg"] = (() => {
  let s = ellipse(110, 150, 70, 30, "Active", { fill: COLORS[0], size: 13 });
  s += ellipse(330, 70, 85, 32, "Partially committed", { fill: COLORS[2], size: 12 });
  s += ellipse(560, 70, 70, 30, "Committed", { fill: COLORS[3], size: 13 });
  s += ellipse(330, 230, 70, 30, "Failed", { fill: COLORS[6], size: 13 });
  s += ellipse(560, 230, 70, 30, "Aborted", { fill: COLORS[4], size: 13 });
  s += ellipse(760, 150, 75, 30, "Terminated", { fill: "#fff", size: 13 });
  s += arrow(160, 128, 260, 88, { label: "last operation done", lx: -40, ly: -14, size: 11 });
  s += arrow(415, 70, 488, 70, { label: "changes saved", ly: -12, size: 11 });
  s += arrow(160, 172, 262, 220, { label: "error / failure", ly: 14, size: 11 });
  s += arrow(330, 102, 330, 198, { label: "failure", lx: 30, size: 11 });
  s += arrow(400, 230, 488, 230, { label: "roll back", ly: 14, size: 11 });
  s += arrow(625, 85, 700, 132) + arrow(625, 215, 700, 168);
  s += polyArrow([[560, 260], [560, 295], [80, 295], [80, 180]], { dash: "5 4" }) + text(330, 285, "restart (new transaction)", { size: 11, color: NOTE, weight: "bold" });
  return svgDoc(860, 340, s + caption(860, 328, "States of a transaction"), "Transaction states");
})();

files["precedence-graph.svg"] = (() => {
  let s = text(170, 22, "S1: no cycle → conflict serializable", { weight: "bold", size: 13 });
  s += circle(80, 90, "T1", { r: 26, fill: COLORS[0] }) + circle(260, 90, "T3", { r: 26, fill: COLORS[0] }) + circle(170, 190, "T2", { r: 26, fill: COLORS[0] });
  s += arrow(106, 90, 232, 90, { label: "x", ly: -12 }) + arrow(98, 110, 150, 170, { label: "x", lx: -14 }) + arrow(242, 110, 190, 170, { label: "x", lx: 14 });
  s += text(170, 240, "equivalent serial order: T1 → T3 → T2", { size: 12, color: NOTE });
  s += line(370, 30, 370, 250, { color: NOTE, dash: "6 6" });
  s += text(570, 22, "S2: cycle → not conflict serializable", { weight: "bold", size: 13 });
  s += circle(480, 130, "T1", { r: 26, fill: COLORS[6] }) + circle(660, 130, "T2", { r: 26, fill: COLORS[6] });
  s += arrow(500, 112, 640, 112, { curve: -30, label: "A", ly: -8 }) + arrow(640, 148, 500, 148, { curve: -30, label: "B", ly: 8 });
  return svgDoc(760, 280, s + caption(760, 268, "Precedence graphs: S1 = r1(x) r3(y) w1(x) w2(y) r3(x) w2(x); S2 has edges T1 → T2 and T2 → T1"), "Precedence graph");
})();

// ======================= 8.11 Concurrency Control =======================
files["two-phase-locking.svg"] = (() => {
  let s = line(60, 250, 760, 250) + line(60, 250, 60, 30);
  s += text(410, 275, "time →", { size: 12, color: NOTE }) + `<text x="28" y="140" ${FONT} font-size="12" fill="${NOTE}" text-anchor="middle" transform="rotate(-90 28 140)">number of locks held</text>`;
  s += `<polyline points="60,250 140,250 140,200 240,200 240,140 340,140 340,80 400,80 470,80 470,140 560,140 560,200 650,200 650,250 720,250" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  s += line(400, 40, 400, 250, { color: RED, dash: "5 4" }) + text(400, 30, "lock point", { size: 12, color: RED, weight: "bold" });
  s += text(240, 60, "Growing phase", { weight: "bold", size: 13 }) + text(240, 78, "locks acquired, none released", { size: 11, color: NOTE });
  s += text(580, 60, "Shrinking phase", { weight: "bold", size: 13 }) + text(580, 78, "locks released, none acquired", { size: 11, color: NOTE });
  return svgDoc(800, 300, s + caption(800, 292, "Two-phase locking: the number of locks rises in the growing phase and falls in the shrinking phase"), "Two-phase locking");
})();

files["wait-for-graph.svg"] = (() => {
  let s = circle(120, 70, "T1", { r: 26, fill: COLORS[6] }) + circle(340, 70, "T2", { r: 26, fill: COLORS[6] }) + circle(230, 200, "T3", { r: 26, fill: COLORS[6] });
  s += arrow(146, 70, 312, 70, { label: "waits for B (held by T2)", ly: -14, size: 11 });
  s += arrow(328, 94, 248, 178, { label: "waits for C", lx: 45, size: 11 });
  s += arrow(210, 180, 136, 94, { label: "waits for A", lx: -45, size: 11 });
  s += text(560, 90, "Edge Ti → Tj: Ti waits for", { size: 12, anchor: "start" }) + text(560, 110, "a data item held by Tj.", { size: 12, anchor: "start" });
  s += text(560, 150, "A cycle T1 → T2 → T3 → T1", { size: 12, anchor: "start", color: RED, weight: "bold" }) + text(560, 170, "means a deadlock.", { size: 12, anchor: "start", color: RED, weight: "bold" });
  return svgDoc(820, 260, s + caption(820, 250, "Wait-for graph used for deadlock detection"), "Wait-for graph");
})();

// ======================= 8.12 Recovery System =======================
files["checkpoint-recovery.svg"] = (() => {
  const tc = 330, tf = 640;
  let s = line(80, 230, 740, 230) + text(760, 230, "time", { size: 12, color: NOTE, anchor: "start" });
  s += line(tc, 30, tc, 240, { color: ACCENT, dash: "6 4" }) + text(tc, 255, "checkpoint", { size: 12, color: ACCENT, weight: "bold" });
  s += line(tf, 30, tf, 240, { color: RED, width: 3 }) + text(tf, 255, "system failure", { size: 12, color: RED, weight: "bold" });
  const tx = [["T1", 100, 260, true, "ignore (committed before checkpoint)"], ["T2", 180, 450, true, "redo"], ["T3", 380, 560, true, "redo"], ["T4", 240, null, false, "undo"], ["T5", 470, null, false, "undo"]];
  tx.forEach(([n, a, b, c, act], i) => {
    const y = 50 + i * 36;
    const end = c ? b : tf;
    s += text(60, y, n, { weight: "bold", size: 13 });
    s += line(a, y, end, y, { color: c ? ACCENT : RED, width: 5 });
    if (c) s += text(end + 6, y - 9, "commit", { size: 10, color: NOTE, anchor: "start" });
    s += text(660, y, act, { size: 11, color: c && act === "redo" ? ACCENT : act === "undo" ? RED : NOTE, anchor: "start", weight: "bold" });
  });
  return svgDoc(900, 290, s + caption(900, 280, "Recovery with a checkpoint: committed after the checkpoint → redo; not committed → undo"), "Checkpoint recovery");
})();

// ======================= 8.13 Object-Oriented Databases =======================
files["inheritance-mapping.svg"] = (() => {
  const tbl = (x, y, name, cols, fill) => {
    let s = rect(x, y, 170, 26, { fill, rx: 0 }) + text(x + 85, y + 13, name, { size: 12, weight: "bold" });
    cols.forEach((c, i) => { s += rect(x, y + 26 + i * 22, 170, 22, { fill: "#fff", rx: 0 }) + text(x + 85, y + 37 + i * 22, c, { size: 11 }); });
    return s;
  };
  let s = text(110, 20, "Classes", { weight: "bold" });
  s += box(40, 40, 140, 44, "Person\nid, name", { fill: COLORS[0], size: 11 });
  s += box(10, 140, 100, 44, "Student\ncgpa", { fill: COLORS[1], size: 11 }) + box(120, 140, 100, 44, "Teacher\nsalary", { fill: COLORS[1], size: 11 });
  s += arrow(60, 138, 90, 86) + arrow(170, 138, 140, 86);
  s += text(345, 20, "1. Table per hierarchy", { weight: "bold", size: 12 });
  s += tbl(260, 40, "PERSON", ["id (PK)", "type (Student/Teacher)", "name", "cgpa (NULL for teachers)", "salary (NULL for students)"], COLORS[2]);
  s += text(565, 20, "2. Table per concrete class", { weight: "bold", size: 12 });
  s += tbl(480, 40, "STUDENT", ["id (PK)", "name", "cgpa"], COLORS[2]) + tbl(480, 150, "TEACHER", ["id (PK)", "name", "salary"], COLORS[2]);
  s += text(800, 20, "3. Table per class (joined)", { weight: "bold", size: 12 });
  s += tbl(710, 40, "PERSON", ["id (PK)", "name"], COLORS[2]) + tbl(710, 130, "STUDENT", ["id (PK, FK)", "cgpa"], COLORS[2]) + tbl(710, 220, "TEACHER", ["id (PK, FK)", "salary"], COLORS[2]);
  return svgDoc(900, 330, s + caption(900, 318, "Three ways to store an inheritance hierarchy in relational tables"), "Inheritance mapping");
})();

// ======================= 8.14 Data Analysis and Mining =======================
files["kdd-process.svg"] = (() => {
  const st = ["Databases,\nfiles", "Cleaning and\nintegration", "Selection and\ntransformation", "Data\nmining", "Pattern\nevaluation", "Knowledge\npresentation"];
  let s = "";
  st.forEach((t, i) => {
    const x = 20 + i * 145;
    s += box(x, 60, 120, 60, t, { fill: i === 3 ? COLORS[2] : i === 0 ? "#fff" : COLORS[0], size: 12 });
    if (i) s += arrow(x - 25, 90, x - 2, 90);
  });
  s += polyArrow([[805, 120], [805, 160], [80, 160], [80, 122]], { dash: "5 4", color: NOTE }) + text(440, 175, "iterative: results may lead back to earlier steps", { size: 11, color: NOTE });
  return svgDoc(900, 210, s + caption(900, 200, "Steps of knowledge discovery in databases (KDD)"), "KDD process");
})();

files["decision-tree-tennis.svg"] = (() => {
  let s = box(330, 20, 140, 44, "Outlook?", { fill: COLORS[2], size: 13, rx: 22 });
  s += box(80, 150, 140, 44, "Humidity?", { fill: COLORS[2], size: 13, rx: 22 });
  s += box(340, 150, 120, 44, "Yes", { fill: "#9fd3a8", size: 13 });
  s += box(580, 150, 140, 44, "Wind?", { fill: COLORS[2], size: 13, rx: 22 });
  s += box(20, 270, 110, 40, "No", { fill: COLORS[6], size: 13 }) + box(170, 270, 110, 40, "Yes", { fill: "#9fd3a8", size: 13 });
  s += box(520, 270, 110, 40, "No", { fill: COLORS[6], size: 13 }) + box(670, 270, 110, 40, "Yes", { fill: "#9fd3a8", size: 13 });
  s += arrow(360, 64, 170, 148, { label: "Sunny", lx: -20, ly: -6, size: 11 }) + arrow(400, 64, 400, 148, { label: "Overcast", lx: 34, size: 11 }) + arrow(440, 64, 630, 148, { label: "Rain", lx: 20, ly: -6, size: 11 });
  s += arrow(130, 194, 80, 268, { label: "High", lx: -20, size: 11 }) + arrow(170, 194, 220, 268, { label: "Normal", lx: 26, size: 11 });
  s += arrow(630, 194, 580, 268, { label: "Strong", lx: -24, size: 11 }) + arrow(670, 194, 720, 268, { label: "Weak", lx: 22, size: 11 });
  s += text(400, 225, "root: highest information gain (0.247)", { size: 11, color: NOTE });
  return svgDoc(800, 350, s + caption(800, 338, "Decision tree built by ID3 for the play-tennis data (rounded boxes = tests, square boxes = class labels)"), "Decision tree");
})();

// ======================= 8.15–8.17 Architectures, Parallel and Distributed =======================
files["client-server-tiers.svg"] = (() => {
  let s = text(130, 20, "Two-tier", { weight: "bold" });
  s += box(60, 40, 140, 50, "Client\n(UI + application)", { fill: COLORS[1], size: 11 });
  s += box(60, 160, 140, 50, "Database server", { fill: COLORS[0], size: 12 });
  s += arrow(130, 90, 130, 158, { label: "SQL via ODBC/JDBC", lx: 60, size: 10 }) + arrow(110, 158, 110, 92);
  s += line(330, 20, 330, 300, { color: NOTE, dash: "6 6" });
  s += text(560, 20, "Three-tier", { weight: "bold" });
  s += box(490, 40, 140, 50, "Client\n(presentation tier)", { fill: COLORS[1], size: 11 });
  s += box(490, 140, 140, 50, "Application server\n(business logic)", { fill: COLORS[2], size: 11 });
  s += box(490, 240, 140, 50, "Database server\n(data tier)", { fill: COLORS[0], size: 11 });
  s += arrow(560, 90, 560, 138) + arrow(560, 190, 560, 238);
  s += text(570, 114, "HTTP / forms", { size: 10, color: NOTE, anchor: "start" }) + text(570, 214, "SQL", { size: 10, color: NOTE, anchor: "start" });
  return svgDoc(820, 330, s + caption(820, 318, "Two-tier and three-tier client-server architectures"), "Client-server architectures");
})();

files["parallel-architectures.svg"] = (() => {
  const P = (x, y) => circle(x, y, "P", { r: 14, size: 11, fill: COLORS[1] });
  const M = (x, y, w = 40) => box(x - w / 2, y - 12, w, 24, "M", { fill: COLORS[2], size: 11 });
  const D = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="16" ry="8" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/><path d="M${x - 16},${y} v14 a16,8 0 0 0 32,0 v-14" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>`;
  let s = "";
  const titles = ["Shared memory", "Shared disk", "Shared nothing"];
  titles.forEach((t, k) => {
    const x0 = 20 + k * 290;
    s += text(x0 + 125, 20, t, { weight: "bold", size: 13 });
    const xs = [x0 + 40, x0 + 125, x0 + 210];
    if (k === 0) { xs.forEach((x) => { s += P(x, 60) + line(x, 74, x, 110); }); s += line(x0 + 20, 110, x0 + 230, 110, { width: 3 }) + M(x0 + 125, 145, 120) + line(x0 + 125, 110, x0 + 125, 133) + line(x0 + 60, 110, x0 + 60, 190) + line(x0 + 190, 110, x0 + 190, 190) + D(x0 + 60, 200) + D(x0 + 190, 200); }
    if (k === 1) { xs.forEach((x) => { s += M(x, 50) + P(x, 95) + line(x, 62, x, 81) + line(x, 109, x, 140); }); s += line(x0 + 20, 140, x0 + 230, 140, { width: 3 }) + line(x0 + 80, 140, x0 + 80, 190) + line(x0 + 170, 140, x0 + 170, 190) + D(x0 + 80, 200) + D(x0 + 170, 200); }
    if (k === 2) { xs.forEach((x) => { s += M(x, 50) + P(x, 95) + line(x, 62, x, 81) + line(x, 109, x, 125) + D(x, 132); }); s += line(x0 + 20, 180, x0 + 230, 180, { width: 3 }); xs.forEach((x) => { s += line(x, 155, x, 180); }); s += text(x0 + 125, 200, "interconnection network", { size: 10, color: NOTE }); }
  });
  s += text(145, 245, "processors share memory and disks", { size: 11, color: NOTE }) + text(435, 245, "own memory, shared disks", { size: 11, color: NOTE }) + text(725, 245, "own memory and own disk", { size: 11, color: NOTE });
  return svgDoc(890, 285, s + caption(890, 275, "Parallel database architectures (P = processor, M = memory)"), "Parallel architectures");
})();

files["partitioning.svg"] = (() => {
  const keys = [7, 12, 25, 31, 44, 50];
  let s = "";
  const cols = [["Round-robin", (k, i) => i % 3], ["Hash (key mod 3)", (k) => k % 3], ["Range (≤20, 21–40, >40)", (k) => (k <= 20 ? 0 : k <= 40 ? 1 : 2)]];
  cols.forEach(([t, f], c) => {
    const x0 = 20 + c * 300;
    s += text(x0 + 135, 22, t, { weight: "bold", size: 13 });
    const disks = [[], [], []];
    keys.forEach((k, i) => disks[f(k, i)].push(k));
    disks.forEach((d, j) => {
      s += rect(x0 + j * 90, 40, 80, 90, { fill: COLORS[0] }) + text(x0 + j * 90 + 40, 54, `disk ${j}`, { size: 11, weight: "bold" });
      d.forEach((k, m) => { s += text(x0 + j * 90 + 40, 76 + m * 18, String(k), { size: 12 }); });
    });
  });
  return svgDoc(900, 170, s + caption(900, 158, "Partitioning the keys 7, 12, 25, 31, 44, 50 across three disks"), "Partitioning techniques");
})();

files["two-phase-commit.svg"] = (() => {
  let s = box(60, 20, 160, 40, "Coordinator", { fill: COLORS[2], size: 13 }) + box(560, 20, 160, 40, "Participants (sites)", { fill: COLORS[0], size: 13 });
  s += line(140, 60, 140, 330, { dash: "5 5", color: NOTE }) + line(640, 60, 640, 330, { dash: "5 5", color: NOTE });
  const msg = [[1, 90, "Phase 1: <prepare T>  (log <prepare T>)"], [-1, 130, "<ready T>  (log <ready T>)  or  <abort T>"], [0, 175, "all ready → log <commit T>;  any abort/timeout → log <abort T>"], [1, 220, "Phase 2: <commit T>  or  <abort T>"], [-1, 265, "acknowledge (after logging commit/abort)"], [0, 305, "coordinator logs <complete T>"]];
  msg.forEach(([d, y, l]) => {
    if (d === 1) s += arrow(142, y, 638, y) + text(390, y - 8, l, { size: 11 });
    else if (d === -1) s += arrow(638, y, 142, y) + text(390, y - 8, l, { size: 11 });
    else s += text(390, y, l, { size: 11, color: ACCENT, weight: "bold" });
  });
  return svgDoc(780, 350, s + caption(780, 340, "Two-phase commit protocol"), "Two-phase commit");
})();

// ======================= 8.18 Database Design, Tuning and Security =======================
files["star-schema.svg"] = (() => {
  const tbl = (x, y, name, cols, fill) => {
    let s = rect(x, y, 150, 26, { fill, rx: 0 }) + text(x + 75, y + 13, name, { size: 12, weight: "bold" });
    cols.forEach((c, i) => { s += rect(x, y + 26 + i * 22, 150, 22, { fill: "#fff", rx: 0 }) + text(x + 75, y + 37 + i * 22, c, { size: 11 }); });
    return s;
  };
  let s = tbl(330, 120, "SALES (fact)", ["time_key (FK)", "item_key (FK)", "branch_key (FK)", "location_key (FK)", "dollars_sold", "units_sold"], COLORS[2]);
  s += tbl(60, 20, "TIME", ["time_key (PK)", "day, month", "quarter, year"], COLORS[0]);
  s += tbl(600, 20, "ITEM", ["item_key (PK)", "item_name, brand", "type, supplier"], COLORS[0]);
  s += tbl(60, 260, "BRANCH", ["branch_key (PK)", "branch_name", "branch_type"], COLORS[0]);
  s += tbl(600, 260, "LOCATION", ["location_key (PK)", "street, city", "province, country"], COLORS[0]);
  s += line(210, 70, 330, 160) + line(600, 70, 480, 160) + line(210, 300, 330, 230) + line(600, 300, 480, 230);
  return svgDoc(820, 400, s + caption(820, 388, "Star schema: a central fact table with foreign keys to the dimension tables"), "Star schema");
})();

files["olap-cube.svg"] = (() => {
  const ox = 120, oy = 90, w = 60, h = 40, dx = 22, dy = -16;
  let s = "";
  for (let k = 2; k >= 0; k--) for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
    const x = ox + i * w + k * dx, y = oy + j * h + k * dy;
    const fill = i === 0 ? COLORS[2] : COLORS[0];
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${INK}" stroke-width="1.2"/>`;
  }
  ["Q1", "Q2", "Q3", "Q4"].forEach((q, i) => { s += text(ox + i * w + w / 2, oy + 3 * h + 14, q, { size: 11 }); });
  ["Dhaka", "Khulna", "Sylhet"].forEach((c, j) => { s += text(ox - 8, oy + j * h + h / 2, c, { size: 11, anchor: "end" }); });
  s += text(ox + 120, oy + 3 * h + 34, "Time (quarter)", { size: 12, weight: "bold" }) + `<text x="40" y="${oy + 60}" ${FONT} font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 40 ${oy + 60})">Location</text>`;
  s += text(ox + 4 * w + 3 * dx + 30, oy + 2 * dy, "Item", { size: 12, weight: "bold", anchor: "start" });
  s += text(ox + 4 * w + 70, 150, "each cell = a measure (sales)", { size: 11, color: NOTE, anchor: "start" });
  const ops = ["Roll-up: Q1–Q4 → year (summarize)", "Drill-down: quarter → month (more detail)", "Slice: Time = Q1 (one dimension fixed)", "Dice: Q1–Q2 × Dhaka, Sylhet (sub-cube)", "Pivot: swap Location and Time axes"];
  ops.forEach((o, i) => { s += text(470, 190 + i * 20, o, { size: 11, anchor: "start" }); });
  return svgDoc(790, 300, s + caption(790, 290, "A data cube with three dimensions; the shaded face is the slice Time = Q1"), "OLAP data cube");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
