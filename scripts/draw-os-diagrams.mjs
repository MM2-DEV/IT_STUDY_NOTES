// Draws the diagrams used in the Operating Systems notes as SVG files in
// public/diagrams/operating-systems/. Run: node scripts/draw-os-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "operating-systems");
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

// ======================= 6.1 Operating System Fundamentals =======================
files["computer-system-layers.svg"] = (() => {
  const users = [100, 230, 360, 490];
  let s = users.map((x, i) => circle(x, 40, `User ${i + 1}`, { r: 30, size: 12, fill: "#fff" })).join("");
  s += box(40, 100, 520, 50, "Application programs\n(word processor, browser, games)", { fill: COLORS[2] });
  s += box(40, 165, 520, 50, "System programs\n(compilers, editors, command interpreter)", { fill: COLORS[1] });
  s += box(40, 230, 520, 50, "Operating system", { fill: COLORS[0], size: 16 });
  s += box(40, 295, 520, 50, "Computer hardware\n(CPU, memory, I/O devices)", { fill: "#d5e0e0" });
  users.forEach((x) => (s += arrow(x, 72, x, 98)));
  return svgDoc(600, 385, s + caption(600, 368, "Abstract view of a computer system: the OS sits between the programs and the hardware"), "Layers of a computer system");
})();

files["dual-mode.svg"] = (() => {
  let s = rect(20, 30, 640, 90, { fill: "#fff", dash: "6 5" }) + text(32, 48, "User mode (mode bit = 1)", { anchor: "start", color: ACCENT, weight: "bold" });
  s += rect(20, 150, 640, 90, { fill: FILL, dash: "6 5" }) + text(32, 168, "Kernel mode (mode bit = 0)", { anchor: "start", color: ACCENT, weight: "bold" });
  s += box(60, 65, 160, 40, "User process\nexecuting", { size: 12 });
  s += box(260, 65, 140, 40, "Calls a\nsystem call", { size: 12 });
  s += box(460, 65, 170, 40, "Return from\nsystem call", { size: 12 });
  s += box(250, 185, 160, 40, "trap: mode bit = 0", { size: 12, fill: COLORS[2] });
  s += box(440, 185, 200, 40, "Execute system call;\nreturn: mode bit = 1", { size: 12, fill: COLORS[0] });
  s += arrow(220, 85, 258, 85) + arrow(330, 105, 330, 183) + arrow(410, 205, 438, 205) + arrow(545, 183, 545, 107);
  return svgDoc(680, 275, s + caption(680, 260, "Switching from user mode to kernel mode on a system call (trap) and back"), "Dual-mode operation");
})();

files["memory-hierarchy.svg"] = (() => {
  const levels = ["Registers", "Cache", "Main memory (RAM)", "Secondary storage (disk, SSD)", "Tertiary storage (tape, optical)"];
  const cx = 300, top = 30, h = 52;
  let s = "";
  levels.forEach((l, i) => {
    const w1 = 90 + i * 95, w2 = 90 + (i + 1) * 95, y = top + i * h;
    s += `<polygon points="${cx - w1 / 2},${y} ${cx + w1 / 2},${y} ${cx + w2 / 2},${y + h} ${cx - w2 / 2},${y + h}" fill="${COLORS[i]}" stroke="${INK}" stroke-width="2"/>`;
    s += text(cx, y + h / 2, l, { size: 13, weight: "bold" });
  });
  s += arrow(620, 290, 620, 40) + text(632, 120, "faster, costlier per bit", { size: 12, anchor: "start", color: NOTE });
  s += arrow(800, 40, 800, 290) + text(788, 210, "larger capacity", { size: 12, anchor: "end", color: NOTE });
  return svgDoc(830, 330, s + caption(830, 315, "Memory hierarchy: speed and cost per bit increase upwards; capacity increases downwards"), "Memory hierarchy");
})();

// ======================= 6.2 Process Management =======================
files["process-memory-layout.svg"] = (() => {
  const x = 150, w = 200;
  let s = text(x - 12, 30, "max", { anchor: "end", color: NOTE, size: 13 }) + text(x - 12, 330, "0", { anchor: "end", color: NOTE, size: 13 });
  s += box(x, 20, w, 60, "Stack", { fill: COLORS[0] });
  s += rect(x, 80, w, 120, { fill: "#fff" }) + arrow(x + w / 2, 85, x + w / 2, 120) + arrow(x + w / 2, 195, x + w / 2, 160) + text(x + w / 2, 140, "free space", { size: 12, color: NOTE });
  s += box(x, 200, w, 50, "Heap", { fill: COLORS[2] });
  s += box(x, 250, w, 40, "Data", { fill: COLORS[1] });
  s += box(x, 290, w, 40, "Text (code)", { fill: COLORS[3] });
  const notes = [[50, "local variables, function parameters, return addresses"], [225, "dynamically allocated memory (malloc)"], [270, "global and static variables"], [310, "program instructions"]];
  notes.forEach(([y, t]) => (s += text(x + w + 14, y, t, { anchor: "start", size: 12, color: NOTE })));
  return svgDoc(720, 370, s + caption(720, 355, "A process in memory: the stack and heap grow towards each other"), "Process in memory");
})();

files["process-states.svg"] = (() => {
  const P = { New: [80, 70], Ready: [260, 170], Running: [520, 170], Terminated: [700, 70], Waiting: [390, 300] };
  let s = Object.entries(P).map(([k, [x, y]]) => ellipse(x, y, 68, 28, k, { fill: k === "Running" ? COLORS[0] : FILL })).join("");
  s += arrow(125, 92, 205, 148, { label: "admitted", lx: -28 });
  s += arrow(320, 155, 460, 155, { label: "scheduler dispatch", ly: -12, curve: -20 });
  s += arrow(460, 185, 320, 185, { label: "interrupt (time slice over)", ly: 12, curve: -20 });
  s += arrow(570, 150, 660, 92, { label: "exit", lx: 22 });
  s += arrow(500, 197, 430, 274, { label: "I/O or event wait", lx: 62 });
  s += arrow(350, 274, 280, 197, { label: "I/O or event completion", lx: -78 });
  return svgDoc(790, 360, s + caption(790, 348, "Five-state process model"), "Process state diagram");
})();

files["process-states-suspend.svg"] = (() => {
  const P = { New: [80, 60], Ready: [260, 140], Running: [520, 140], Exit: [700, 60], Blocked: [520, 290], "Suspended\nready": [100, 260], "Suspended\nblocked": [300, 380] };
  let s = "";
  for (const [k, [x, y]] of Object.entries(P)) {
    const lines = k.split("\n");
    s += `<ellipse cx="${x}" cy="${y}" rx="72" ry="30" fill="${k === "Running" ? COLORS[0] : k.startsWith("Suspended") ? COLORS[1] : FILL}" stroke="${INK}" stroke-width="2"/>`;
    lines.forEach((l, i) => (s += text(x, y + (i - (lines.length - 1) / 2) * 16, l, { size: 13, weight: "bold" })));
  }
  s += arrow(125, 82, 200, 120, { label: "admit", lx: -22 });
  s += arrow(325, 128, 450, 128, { label: "dispatch", ly: -12 });
  s += arrow(450, 152, 325, 152, { label: "time-out", ly: 12 });
  s += arrow(575, 115, 660, 82, { label: "exit", lx: 18 });
  s += arrow(520, 170, 520, 258, { label: "event wait", lx: 42 });
  s += arrow(455, 280, 300, 162, { label: "event occurs", lx: -10, ly: 12 });
  s += arrow(200, 160, 140, 230, { label: "suspend", lx: -36 });
  s += arrow(170, 240, 215, 167, { label: "activate", lx: 40 });
  s += arrow(470, 312, 360, 362, { label: "suspend", lx: 28, ly: 10 });
  s += arrow(372, 380, 520, 322, { label: "activate", lx: 42, ly: 12 });
  s += arrow(250, 360, 130, 290, { label: "event occurs", lx: -48, ly: 10 });
  return svgDoc(790, 440, s + caption(790, 428, "Seven-state process model with two suspended states (processes swapped out to disk)"), "Process states with suspension");
})();

files["context-switch.svg"] = (() => {
  let s = text(110, 30, "Process P0", { weight: "bold" }) + text(390, 30, "Operating system", { weight: "bold" }) + text(670, 30, "Process P1", { weight: "bold" });
  const exec = (x, y1, y2) => `<rect x="${x - 10}" y="${y1}" width="20" height="${y2 - y1}" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>`;
  const idle = (x, y1, y2) => line(x, y1, x, y2, { dash: "5 5", color: NOTE });
  s += exec(110, 50, 110) + text(135, 80, "executing", { anchor: "start", size: 12, color: NOTE });
  s += arrow(120, 110, 290, 125, { label: "interrupt or system call", ly: -10 });
  s += box(290, 115, 200, 34, "save state into PCB0", { size: 12, fill: COLORS[2] });
  s += box(290, 165, 200, 34, "reload state from PCB1", { size: 12, fill: COLORS[2] });
  s += arrow(490, 199, 660, 215);
  s += idle(110, 110, 230) + text(95, 170, "idle", { anchor: "end", size: 12, color: NOTE });
  s += exec(670, 215, 275) + text(695, 245, "executing", { anchor: "start", size: 12, color: NOTE });
  s += arrow(660, 275, 490, 290, { label: "interrupt or system call", ly: -10 });
  s += box(290, 280, 200, 34, "save state into PCB1", { size: 12, fill: COLORS[2] });
  s += box(290, 330, 200, 34, "reload state from PCB0", { size: 12, fill: COLORS[2] });
  s += idle(670, 60, 215) + idle(670, 275, 390) + text(685, 330, "idle", { anchor: "start", size: 12, color: NOTE });
  s += arrow(290, 364, 120, 380);
  s += exec(110, 380, 420) + text(135, 400, "executing", { anchor: "start", size: 12, color: NOTE });
  return svgDoc(780, 455, s + caption(780, 442, "Context switch from process P0 to P1 and back; the CPU does no useful work during the switch"), "Context switch");
})();

files["process-tree.svg"] = (() => {
  const P = { "init (PID 1)": [320, 40], shell: [320, 120], P: [320, 200], C1: [210, 290], C2: [430, 290], C3: [210, 375] };
  const E = [["init (PID 1)", "shell"], ["shell", "P"], ["P", "C1"], ["P", "C2"], ["C1", "C3"]];
  let s = E.map(([a, b]) => line(...P[a], ...P[b])).join("");
  for (const [k, [x, y]] of Object.entries(P)) s += box(x - 60, y - 20, 120, 40, k, { size: 13, fill: k === "P" ? COLORS[0] : FILL });
  s += text(500, 290, "both created by", { size: 12, color: NOTE, anchor: "start" }) + text(500, 306, "P calling fork() twice", { size: 12, color: NOTE, anchor: "start" });
  return svgDoc(660, 420, s + caption(660, 408, "Process tree: init → shell → P; P's two fork() calls create C1, C2 and C3"), "Process tree");
})();

files["pipe.svg"] = (() => {
  let s = box(30, 60, 160, 70, "Parent process\nwrite(fd[1], …)", { fill: COLORS[0], size: 13 });
  s += box(490, 60, 160, 70, "Child process\nread(fd[0], …)", { fill: COLORS[1], size: 13 });
  s += `<rect x="240" y="75" width="200" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(340, 95, "pipe (kernel buffer, FIFO)", { size: 12, weight: "bold" });
  s += arrow(190, 95, 240, 95) + arrow(440, 95, 490, 95);
  s += text(215, 78, "fd[1]", { size: 12, color: ACCENT, weight: "bold" }) + text(465, 78, "fd[0]", { size: 12, color: ACCENT, weight: "bold" });
  s += text(340, 150, "write end → read end (data flows one way only)", { size: 12, color: NOTE });
  return svgDoc(680, 195, s + caption(680, 182, "A pipe between a parent and its child created with pipe() before fork()"), "Pipe between parent and child");
})();

// ======================= 6.3 Interrupts and OS Organization =======================
files["interrupt-processing.svg"] = (() => {
  const steps = ["Device raises an interrupt (IRQ)", "CPU finishes the current instruction", "Save PC, registers and status; switch to kernel mode", "Find the ISR address in the interrupt vector table", "Interrupt service routine (ISR) runs", "Restore the saved state", "Resume the interrupted program (or dispatch another)"];
  let s = "";
  steps.forEach((t, i) => {
    const y = 20 + i * 58;
    s += box(140, y, 400, 40, `${i + 1}. ${t}`, { size: 13, weight: "normal", fill: i === 4 ? COLORS[0] : FILL });
    if (i < steps.length - 1) s += arrow(340, y + 40, 340, y + 58);
  });
  return svgDoc(680, 440, s + caption(680, 428, "Steps of interrupt processing"), "Interrupt processing");
})();

files["os-structures.svg"] = (() => {
  // Layered
  let s = text(140, 25, "Layered structure", { weight: "bold", color: ACCENT });
  ["Layer N: user interface", "…", "Layer 2", "Layer 1", "Layer 0: hardware"].forEach((l, i) => (s += box(30, 40 + i * 44, 220, 38, l, { size: 13, fill: i === 4 ? "#d5e0e0" : COLORS[i % 3] })));
  // Monolithic
  s += text(420, 25, "Monolithic kernel", { weight: "bold", color: ACCENT });
  s += box(300, 40, 240, 40, "Applications (user mode)", { size: 13, fill: COLORS[2] });
  s += box(300, 90, 240, 100, "Kernel (kernel mode):\nfile system, scheduler,\nmemory manager, IPC,\ndevice drivers", { size: 12, fill: COLORS[0] });
  s += box(300, 200, 240, 40, "Hardware", { size: 13, fill: "#d5e0e0" });
  // Microkernel
  s += text(730, 25, "Microkernel", { weight: "bold", color: ACCENT });
  ["Application", "File server", "Device driver"].forEach((l, i) => (s += box(590 + i * 95, 40, 88, 50, l.replace(" ", "\n"), { size: 12, fill: COLORS[2 - (i > 0 ? 1 : 0)] })));
  s += box(590, 120, 280, 70, "Microkernel (kernel mode):\nIPC, basic scheduling,\nlow-level memory management", { size: 12, fill: COLORS[0] });
  s += box(590, 200, 280, 40, "Hardware", { size: 13, fill: "#d5e0e0" });
  s += arrow(634, 90, 634, 120) + arrow(729, 120, 729, 90) + arrow(824, 90, 824, 120);
  return svgDoc(900, 290, s + caption(900, 275, "Layered, monolithic and microkernel structures (microkernel services run in user mode and communicate by messages)"), "Operating system structures");
})();

// ======================= 6.4 CPU Scheduling =======================
function gantt(segments, { title, unit = 34, x0 = 30 } = {}) {
  const names = [...new Set(segments.map((g) => g[0]))].sort();
  const color = (n) => COLORS[names.indexOf(n) % COLORS.length];
  let s = "";
  for (const [n, a, b] of segments) {
    s += rect(x0 + a * unit, 30, (b - a) * unit, 46, { fill: color(n), rx: 0 }) + text(x0 + ((a + b) / 2) * unit, 53, n, { size: 14, weight: "bold" });
  }
  const ticks = [...new Set(segments.flatMap((g) => [g[1], g[2]]))].sort((p, q) => p - q);
  for (const t of ticks) s += text(x0 + t * unit, 92, t, { size: 13 });
  const end = segments[segments.length - 1][2];
  const w = x0 * 2 + end * unit;
  return svgDoc(w, 135, s + caption(w, 120, title), title);
}
files["gantt-fcfs.svg"] = gantt([["P1", 0, 5], ["P2", 5, 8], ["P3", 8, 16], ["P4", 16, 22]], { title: "FCFS Gantt chart (average waiting time 5.75 ms)" });
files["gantt-sjf.svg"] = gantt([["P1", 0, 5], ["P2", 5, 8], ["P4", 8, 14], ["P3", 14, 22]], { title: "Non-preemptive SJF Gantt chart (average waiting time 5.25 ms)" });
files["gantt-srtf.svg"] = gantt([["P1", 0, 1], ["P2", 1, 4], ["P1", 4, 8], ["P4", 8, 14], ["P3", 14, 22]], { title: "SRTF Gantt chart (average waiting time 5 ms)" });
files["gantt-priority-np.svg"] = gantt([["P1", 0, 5], ["P3", 5, 13], ["P2", 13, 16], ["P4", 16, 22]], { title: "Non-preemptive priority Gantt chart (average waiting time 7 ms)" });
files["gantt-priority-p.svg"] = gantt([["P1", 0, 1], ["P2", 1, 2], ["P3", 2, 10], ["P2", 10, 12], ["P1", 12, 16], ["P4", 16, 22]], { title: "Preemptive priority Gantt chart (average waiting time 8 ms)" });
files["gantt-rr.svg"] = gantt([["P1", 0, 3], ["P2", 3, 6], ["P3", 6, 9], ["P4", 9, 12], ["P1", 12, 14], ["P3", 14, 17], ["P4", 17, 20], ["P3", 20, 22]], { title: "Round Robin (q = 3) Gantt chart (average waiting time 8.5 ms)" });
files["gantt-hrrn.svg"] = gantt([["P1", 0, 6], ["P3", 6, 10], ["P2", 10, 20], ["P4", 20, 25]], { title: "HRRN Gantt chart (average waiting time 5 ms)", unit: 28 });

files["scheduling-queues.svg"] = (() => {
  let s = box(20, 70, 110, 50, "Job pool\n(disk)", { size: 13, fill: "#d5e0e0" });
  s += arrow(130, 95, 200, 95, { label: "long-term", ly: -12 });
  s += rect(200, 75, 230, 40, { fill: "#fff" });
  for (let i = 0; i < 5; i++) s += line(400 - i * 30, 75, 400 - i * 30, 115);
  s += text(300, 132, "ready queue", { size: 12, color: NOTE });
  s += arrow(430, 95, 500, 95, { label: "short-term", ly: -12 });
  s += circle(540, 95, "CPU", { r: 36, fill: COLORS[0] });
  s += arrow(576, 95, 660, 95) + text(690, 95, "end", { size: 13, weight: "bold" });
  s += polyArrow([[540, 131], [540, 220], [430, 220]]) + box(300, 200, 130, 40, "I/O waiting queue", { size: 12 }) + polyArrow([[300, 220], [250, 220], [250, 117]]);
  s += text(470, 236, "I/O request", { size: 12, color: NOTE });
  s += polyArrow([[560, 128], [600, 170], [600, 270], [215, 270], [215, 117]], {});
  s += text(420, 285, "time slice expired", { size: 12, color: NOTE });
  s += box(20, 320, 180, 44, "Swapped-out processes\n(disk)", { size: 12, fill: COLORS[1] });
  s += arrow(110, 320, 205, 118) + arrow(230, 118, 150, 320);
  s += text(400, 340, "medium-term scheduler: swap in / swap out", { size: 12, color: NOTE });
  return svgDoc(730, 400, s + caption(730, 388, "Queueing diagram showing the long-term, short-term and medium-term schedulers"), "Scheduling queues and schedulers");
})();

files["mlfq.svg"] = (() => {
  const q = [["Queue 0: RR, quantum = 8 ms", COLORS[0]], ["Queue 1: RR, quantum = 16 ms", COLORS[2]], ["Queue 2: FCFS", COLORS[1]]];
  let s = text(40, 25, "highest priority", { size: 12, color: NOTE, anchor: "start" });
  q.forEach(([l, c], i) => {
    const y = 40 + i * 80;
    s += box(120, y, 300, 46, l, { size: 13, fill: c }) + arrow(420, y + 23, 470, y + 23) + text(510, y + 23, "CPU", { size: 13, weight: "bold" });
    if (i < 2) s += arrow(270, y + 46, 270, y + 80, { label: "used full quantum → demote", lx: 105, size: 11 });
  });
  s += arrow(40, 63, 118, 63, { label: "new", ly: -10 });
  s += polyArrow([[420, 240], [600, 240], [600, 50], [425, 50]], { dash: "5 4" }) + text(650, 140, "aging:", { size: 12, color: NOTE }) + text(650, 156, "promote", { size: 12, color: NOTE });
  s += text(40, 245, "lowest priority", { size: 12, color: NOTE, anchor: "start" });
  return svgDoc(700, 285, s + caption(700, 272, "Multilevel feedback queue: CPU-bound processes sink, waiting processes are promoted"), "Multilevel feedback queue");
})();

// ======================= 6.5 Synchronization =======================
files["bounded-buffer.svg"] = (() => {
  const n = 8, full = [true, true, true, false, false, false, false, false];
  let s = box(20, 50, 130, 60, "Producer", { fill: COLORS[0] }) + box(610, 50, 130, 60, "Consumer", { fill: COLORS[1] });
  for (let i = 0; i < n; i++) {
    s += rect(190 + i * 48, 55, 48, 50, { fill: full[i] ? COLORS[2] : "#fff", rx: 0 }) + text(214 + i * 48, 80, full[i] ? "item" : "", { size: 11 });
    s += text(214 + i * 48, 122, i, { size: 11, color: NOTE });
  }
  s += arrow(150, 80, 188, 80) + arrow(574, 80, 608, 80);
  s += arrow(358, 26, 358, 53) + text(358, 16, "in (next free slot)", { size: 12, color: ACCENT, weight: "bold" });
  s += arrow(200, 150, 200, 108) + text(200, 162, "out (first full slot)", { size: 12, color: ACCENT, weight: "bold" });
  s += text(560, 160, "count = 3, BUFFER_SIZE = 8", { size: 12, color: NOTE });
  return svgDoc(760, 205, s + caption(760, 192, "Bounded buffer shared by a producer and a consumer (circular array)"), "Bounded buffer");
})();

// ======================= 6.6 Monitors =======================
files["monitor.svg"] = (() => {
  let s = rect(180, 30, 380, 300, { fill: "#fff", rx: 14 });
  s += box(220, 50, 300, 50, "Shared data", { fill: COLORS[2] });
  s += box(220, 120, 300, 90, "Operations (procedures)\nP1(…), P2(…), …, Pn(…)", { fill: COLORS[0], size: 13 });
  s += box(220, 230, 300, 50, "Initialization code", { fill: FILL, size: 13 });
  s += text(370, 310, "only one process active inside at a time", { size: 12, color: NOTE });
  s += text(80, 150, "entry queue", { size: 12, color: NOTE });
  for (let i = 0; i < 3; i++) s += circle(40 + i * 40, 175, "", { r: 13, fill: COLORS[1] });
  s += arrow(150, 175, 218, 165);
  s += text(660, 70, "condition x", { size: 12, weight: "bold", color: ACCENT }) + text(660, 160, "condition y", { size: 12, weight: "bold", color: ACCENT });
  for (let i = 0; i < 3; i++) s += circle(620 + i * 35, 100, "", { r: 12, fill: COLORS[3] });
  for (let i = 0; i < 2; i++) s += circle(635 + i * 35, 190, "", { r: 12, fill: COLORS[3] });
  s += line(560, 100, 606, 100, { dash: "4 4" }) + line(560, 190, 621, 190, { dash: "4 4" });
  return svgDoc(760, 365, s + caption(760, 352, "Structure of a monitor with an entry queue and condition-variable queues"), "Monitor");
})();

// ======================= 6.7 IPC =======================
files["ipc-models.svg"] = (() => {
  let s = text(170, 22, "(a) Shared memory", { weight: "bold", color: ACCENT }) + text(510, 22, "(b) Message passing", { weight: "bold", color: ACCENT });
  s += box(50, 40, 240, 50, "Process A", { fill: COLORS[0] }) + box(50, 110, 240, 50, "Shared memory region", { fill: COLORS[2] }) + box(50, 180, 240, 50, "Process B", { fill: COLORS[1] }) + box(50, 250, 240, 50, "Kernel", { fill: "#d5e0e0" });
  s += arrow(140, 90, 140, 108, { label: "write", lx: -24 }) + arrow(200, 160, 200, 178, { label: "read", lx: 22 });
  s += box(390, 40, 240, 50, "Process A", { fill: COLORS[0] }) + box(390, 180, 240, 50, "Process B", { fill: COLORS[1] }) + box(390, 250, 240, 50, "Kernel (message queue)", { fill: "#d5e0e0" });
  s += polyArrow([[420, 90], [420, 160], [360, 160], [360, 275], [388, 275]], { label: "" }) + text(330, 200, "send(m)", { size: 12, color: NOTE, weight: "bold" });
  s += polyArrow([[632, 275], [660, 275], [660, 205], [632, 205]]) + text(700, 240, "receive(m)", { size: 12, color: NOTE, weight: "bold" });
  return svgDoc(760, 335, s + caption(760, 322, "The two models of interprocess communication"), "IPC models");
})();

files["direct-indirect.svg"] = (() => {
  let s = text(170, 22, "(a) Direct communication", { weight: "bold", color: ACCENT }) + text(580, 22, "(b) Indirect communication", { weight: "bold", color: ACCENT });
  s += circle(80, 110, "P", { r: 28, fill: COLORS[0] }) + circle(270, 110, "Q", { r: 28, fill: COLORS[1] });
  s += arrow(108, 100, 242, 100, { label: "send(Q, msg)", ly: -12 }) + arrow(242, 122, 108, 122, { label: "receive(P, msg)", ly: 14 });
  s += circle(420, 70, "P1", { r: 26, fill: COLORS[0] }) + circle(420, 160, "P2", { r: 26, fill: COLORS[3] });
  s += box(520, 90, 90, 50, "Mailbox\nA", { size: 13, fill: COLORS[2] });
  s += circle(740, 115, "P3", { r: 26, fill: COLORS[1] });
  s += arrow(446, 78, 518, 105, { label: "send(A, m)", lx: 12, ly: -18 }) + arrow(446, 152, 518, 128, { label: "send(A, m)", lx: 12, ly: 20 }) + arrow(610, 115, 712, 115, { label: "receive(A, m)", ly: -16 });
  return svgDoc(800, 220, s + caption(800, 207, "Direct communication names the process; indirect communication uses a shared mailbox"), "Direct and indirect communication");
})();

// ======================= 6.8 Deadlock =======================
function resource(x, y, n, label) {
  let s = rect(x - 30, y - 22, 60, 44, { fill: "#fff" }) + text(x, y - 34, label, { size: 13, weight: "bold" });
  const xs = n === 1 ? [x] : n === 2 ? [x - 12, x + 12] : [x - 16, x, x + 16];
  return s + xs.map((cx) => `<circle cx="${cx}" cy="${y}" r="5" fill="${INK}"/>`).join("");
}
files["rag-deadlock.svg"] = (() => {
  let s = circle(110, 80, "P1", { r: 26, fill: COLORS[0] }) + circle(110, 230, "P2", { r: 26, fill: COLORS[1] });
  s += resource(330, 80, 1, "R1") + resource(330, 230, 1, "R2");
  s += arrow(300, 80, 138, 80, { label: "assigned", ly: -12 }) + arrow(300, 230, 138, 230, { label: "assigned", ly: 14 });
  s += arrow(130, 98, 302, 212, { label: "requests R2", lx: -40, ly: -38 }) + arrow(130, 212, 302, 98, { label: "requests R1", lx: -40, ly: 40 });
  return svgDoc(440, 300, s + caption(440, 288, "Cycle P1 → R2 → P2 → R1 → P1 with single instances: deadlock"), "Resource allocation graph with deadlock");
})();
files["rag-no-deadlock.svg"] = (() => {
  let s = circle(80, 70, "P1", { r: 24, fill: COLORS[0] }) + circle(80, 230, "P3", { r: 24, fill: COLORS[1] }) + circle(420, 70, "P2", { r: 24, fill: COLORS[3] }) + circle(420, 230, "P4", { r: 24, fill: COLORS[2] });
  s += resource(250, 70, 2, "R1") + resource(250, 230, 2, "R2");
  s += arrow(104, 70, 218, 70, { label: "request", ly: -12 });
  s += arrow(238, 92, 96, 212, { label: "", ly: 0 });
  s += arrow(262, 92, 404, 212);
  s += arrow(238, 208, 96, 88);
  s += arrow(262, 208, 404, 88);
  s += arrow(104, 230, 218, 230, { label: "request", ly: 14 });
  return svgDoc(660, 300, `<g transform="translate(80,0)">${s}</g>` + caption(660, 288, "Cycle P1 → R1 → P3 → R2 → P1, but no deadlock: P2 and P4 can finish and release R1 and R2"), "Resource allocation graph with a cycle but no deadlock");
})();
files["safe-unsafe-deadlock.svg"] = (() => {
  let s = `<ellipse cx="260" cy="150" rx="230" ry="120" fill="${COLORS[3]}" stroke="${INK}" stroke-width="2"/>`;
  s += `<ellipse cx="330" cy="160" rx="140" ry="85" fill="${COLORS[4]}" stroke="${INK}" stroke-width="2"/>`;
  s += `<ellipse cx="370" cy="170" rx="65" ry="42" fill="${COLORS[6]}" stroke="${INK}" stroke-width="2"/>`;
  s += text(120, 150, "safe", { weight: "bold" }) + text(250, 120, "unsafe", { weight: "bold" }) + text(370, 170, "deadlock", { weight: "bold", size: 13 });
  return svgDoc(760, 300, `<g transform="translate(120,0)">${s}</g>` + caption(760, 288, "Safe, unsafe and deadlocked state spaces: every deadlock is unsafe, but not every unsafe state is a deadlock"), "Safe, unsafe and deadlock states");
})();
files["wait-for-graph.svg"] = (() => {
  const P = { P1: [80, 60], P2: [260, 60], P3: [440, 60], P4: [350, 200], P5: [170, 200] };
  let s = Object.entries(P).map(([k, [x, y]]) => circle(x, y, k, { r: 26 })).join("");
  s += arrow(106, 60, 234, 60) + arrow(286, 60, 414, 60) + arrow(428, 84, 368, 178) + arrow(324, 200, 196, 200) + arrow(160, 176, 92, 84);
  s += arrow(250, 86, 182, 176, { color: NOTE, dash: "5 4" });
  return svgDoc(520, 270, s + caption(520, 258, "Wait-for graph: the cycle P1 → P2 → P3 → P4 → P5 → P1 means deadlock"), "Wait-for graph");
})();

// ======================= 6.9 Memory Management =======================
files["relocation-register.svg"] = (() => {
  let s = box(20, 70, 90, 50, "CPU", { fill: COLORS[0] });
  s += arrow(110, 95, 200, 95, { label: "346", ly: -12, lx: -10 });
  s += `<circle cx="225" cy="95" r="24" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(225, 96, "+", { size: 22, weight: "bold" });
  s += box(185, 10, 80, 44, "relocation\n14000", { size: 12, fill: COLORS[2] }) + arrow(225, 54, 225, 70);
  s += arrow(249, 95, 360, 95, { label: "14346", ly: -12, lx: 18 });
  s += box(360, 40, 120, 110, "Memory", { fill: "#d5e0e0" });
  s += text(225, 150, "MMU", { size: 13, weight: "bold", color: ACCENT });
  s += rect(165, 4, 120, 160, { fill: "none", dash: "6 5", stroke: ACCENT, rx: 10 });
  return svgDoc(500, 200, s + caption(500, 188, "Logical address 346 + relocation register 14000 = physical address 14346"), "Relocation register");
})();

files["paging-hardware.svg"] = (() => {
  let s = box(20, 60, 80, 50, "CPU", { fill: COLORS[0] });
  s += rect(130, 65, 60, 40, { fill: COLORS[2], rx: 0 }) + text(160, 85, "p = 2", { size: 13, weight: "bold" });
  s += rect(190, 65, 70, 40, { fill: COLORS[1], rx: 0 }) + text(225, 85, "d = 100", { size: 13, weight: "bold" });
  s += text(195, 50, "logical address 2148", { size: 12, color: NOTE });
  s += arrow(100, 85, 128, 85);
  const ptX = 160, ptY = 160;
  ["5", "2", "9", "12"].forEach((f, i) => {
    s += rect(ptX, ptY + i * 34, 70, 34, { fill: i === 2 ? COLORS[2] : "#fff", rx: 0 }) + text(ptX + 35, ptY + 17 + i * 34, f, { size: 13, weight: "bold" }) + text(ptX - 12, ptY + 17 + i * 34, i, { size: 12, color: NOTE, anchor: "end" });
  });
  s += text(ptX - 40, ptY + 150, "page table", { size: 12, color: NOTE });
  s += arrow(160, 105, 160, 158);
  s += rect(380, 65, 60, 40, { fill: COLORS[2], rx: 0 }) + text(410, 85, "f = 9", { size: 13, weight: "bold" });
  s += rect(440, 65, 70, 40, { fill: COLORS[1], rx: 0 }) + text(475, 85, "d = 100", { size: 13, weight: "bold" });
  s += text(445, 122, "physical address 9316", { size: 12, color: NOTE });
  s += polyArrow([[230, 245], [330, 245], [330, 120], [400, 108]]);
  s += polyArrow([[260, 85], [300, 85], [300, 30], [475, 30], [475, 62]]);
  s += box(560, 40, 130, 200, "Physical\nmemory\n\nframe 9:\n9216 – 10239", { fill: "#d5e0e0", size: 12 });
  s += arrow(510, 85, 558, 85);
  return svgDoc(710, 350, s + caption(710, 338, "Paging hardware: page number p indexes the page table; frame f and offset d form the physical address"), "Paging hardware");
})();

files["paging-tlb.svg"] = (() => {
  let s = box(20, 60, 80, 50, "CPU", { fill: COLORS[0] }) + text(160, 50, "p | d", { size: 13, weight: "bold" });
  s += arrow(100, 85, 200, 85);
  s += rect(200, 40, 140, 100, { fill: COLORS[2] }) + text(270, 60, "TLB", { weight: "bold" }) + text(270, 82, "page | frame", { size: 12, color: NOTE }) + text(270, 104, "(recent entries)", { size: 12, color: NOTE });
  s += arrow(340, 70, 470, 70, { label: "TLB hit → f", ly: -12 });
  s += arrow(270, 140, 270, 210, { label: "TLB miss", lx: 34 });
  s += box(200, 210, 140, 60, "Page table\n(in memory)", { fill: COLORS[1], size: 13 });
  s += polyArrow([[340, 240], [420, 240], [420, 100], [470, 100]], { label: "" }) + text(470, 250, "f (and update the TLB)", { size: 12, color: NOTE });
  s += box(470, 55, 110, 60, "f | d", { fill: "#fff" }) + arrow(580, 85, 620, 85) + box(620, 40, 90, 90, "Physical\nmemory", { fill: "#d5e0e0", size: 12 });
  return svgDoc(730, 300, s + caption(730, 288, "Paging with a TLB: a hit needs one memory access, a miss needs two"), "Paging with TLB");
})();

files["segmentation-hardware.svg"] = (() => {
  let s = box(20, 60, 80, 50, "CPU", { fill: COLORS[0] }) + text(155, 50, "⟨s = 2, d = 53⟩", { size: 13, weight: "bold" });
  s += arrow(100, 85, 200, 85);
  s += rect(200, 40, 180, 150, { fill: "#fff" }) + text(290, 30, "segment table", { size: 12, color: NOTE });
  [["limit", "base"], ["1000", "1400"], ["400", "6300"], ["400", "4300"], ["1100", "3200"]].forEach(([l, b], i) => {
    s += text(245, 58 + i * 28, l, { size: 12, weight: i === 0 || i === 3 ? "bold" : "normal", color: i === 3 ? ACCENT : INK }) + text(335, 58 + i * 28, b, { size: 12, weight: i === 0 || i === 3 ? "bold" : "normal", color: i === 3 ? ACCENT : INK });
  });
  s += `<polygon points="470,60 520,95 470,130 420,95" fill="${COLORS[2]}" stroke="${INK}" stroke-width="2"/>` + text(470, 96, "d < limit?", { size: 11, weight: "bold" });
  s += arrow(380, 95, 420, 95) + arrow(470, 130, 470, 175, { label: "no → trap", lx: 42 });
  s += arrow(520, 95, 570, 95, { label: "yes", ly: -12 });
  s += box(570, 70, 120, 50, "base + d\n4300 + 53 = 4353", { size: 12, fill: COLORS[0] });
  return svgDoc(710, 220, s + caption(710, 208, "Segmentation hardware: the offset is checked against the limit and added to the base"), "Segmentation hardware");
})();

files["placement-algorithms.svg"] = (() => {
  const holes = [100, 500, 200, 300, 600];
  const res = {
    "First fit": [[1, 212], [4, 417], [1, 112]],
    "Best fit": [[3, 212], [1, 417], [2, 112], [4, 426]],
    "Worst fit": [[4, 212], [1, 417], [4, 112]],
  };
  const scale = 0.55;
  let s = "";
  Object.entries(res).forEach(([name, allocs], r) => {
    const y = 40 + r * 90;
    s += text(20, y + 20, name, { anchor: "start", weight: "bold", color: ACCENT });
    let x = 120;
    holes.forEach((h, i) => {
      const w = h * scale;
      s += rect(x, y, w, 40, { fill: "#fff", rx: 0 });
      let off = 0;
      allocs.filter(([k]) => k === i).forEach(([, p], j) => {
        s += rect(x + off * scale, y, p * scale, 40, { fill: COLORS[[212, 417, 112, 426].indexOf(p)], rx: 0 }) + text(x + (off + p / 2) * scale, y + 20, p, { size: 11, weight: "bold" });
        off += p;
      });
      s += text(x + w / 2, y + 54, `${h} KB`, { size: 11, color: NOTE });
      x += w + 8;
    });
    if (allocs.length < 4) s += text(1080, y + 20, "426 KB waits", { size: 12, color: RED, weight: "bold", anchor: "end" });
  });
  return svgDoc(1100, 320, s + caption(1100, 305, "Holes 100, 500, 200, 300, 600 KB; requests 212, 417, 112, 426 KB — only best fit places all four"), "First, best and worst fit");
})();

// ======================= 6.10 Virtual Memory =======================
files["page-fault-steps.svg"] = (() => {
  let s = box(20, 40, 140, 50, "load M", { fill: COLORS[0] }) + text(90, 26, "process", { size: 12, color: NOTE });
  s += rect(240, 20, 110, 150, { fill: "#fff" }) + text(295, 12, "page table", { size: 12, color: NOTE });
  s += rect(250, 70, 90, 30, { fill: COLORS[6], rx: 0 }) + text(295, 85, "i (invalid)", { size: 12, weight: "bold" });
  s += box(420, 30, 150, 50, "Operating system", { fill: COLORS[2], size: 13 });
  s += box(420, 210, 150, 60, "Backing store\n(disk)", { fill: "#d5e0e0", size: 13 });
  s += rect(660, 60, 130, 210, { fill: "#fff", rx: 6 }) + text(725, 85, "Physical memory", { size: 12, weight: "bold" });
  s += rect(675, 175, 100, 30, { fill: COLORS[3], rx: 0 }) + text(725, 190, "free frame", { size: 11 });
  s += arrow(160, 65, 248, 82, { label: "1 reference", ly: -14 });
  s += arrow(340, 70, 420, 55, { label: "2 trap", ly: -12 });
  s += arrow(480, 80, 480, 208) + text(490, 140, "3 page is on disk", { size: 12, color: NOTE, weight: "bold", anchor: "start" });
  s += arrow(570, 245, 673, 200) + text(660, 290, "4 bring in the missing page", { size: 12, color: NOTE, weight: "bold" });
  s += polyArrow([[675, 185], [365, 185], [365, 85], [342, 85]]) + text(600, 174, "5 reset page table", { size: 12, color: NOTE, weight: "bold" });
  s += arrow(250, 150, 160, 80, { label: "6 restart instruction", lx: -70, ly: 20 });
  return svgDoc(820, 330, s + caption(820, 318, "Steps in handling a page fault"), "Page fault handling");
})();

files["thrashing.svg"] = (() => {
  let s = line(60, 260, 560, 260) + line(60, 260, 60, 30) + arrow(560, 260, 575, 260) + arrow(60, 30, 60, 18);
  s += text(320, 284, "degree of multiprogramming", { size: 13, color: NOTE }) + `<text x="25" y="150" ${FONT} font-size="13" fill="${NOTE}" text-anchor="middle" transform="rotate(-90 25 150)">CPU utilization</text>`;
  s += `<path d="M60,250 C150,120 230,60 320,60 C380,60 420,120 470,220 L520,245" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  s += line(400, 40, 400, 260, { dash: "5 4", color: RED }) + text(470, 70, "thrashing", { color: RED, weight: "bold" });
  return svgDoc(600, 320, s + caption(600, 310, "Thrashing: beyond a point, more processes make CPU utilization fall sharply"), "Thrashing");
})();

files["beladys-anomaly.svg"] = (() => {
  const pts = [[1, 12], [2, 12], [3, 9], [4, 10], [5, 5], [6, 5], [7, 5]]; // FIFO faults, checked with a simulation
  const X = (f) => 60 + (f - 1) * 70, Y = (n) => 250 - n * 15;
  let s = line(60, 250, 520, 250) + line(60, 250, 60, 40);
  pts.forEach(([f]) => (s += text(X(f), 268, f, { size: 12 })));
  [0, 4, 8, 12].forEach((n) => (s += text(48, Y(n), n, { size: 12, anchor: "end" })));
  s += `<polyline points="${pts.map(([f, n]) => `${X(f)},${Y(n)}`).join(" ")}" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  pts.forEach(([f, n]) => (s += `<circle cx="${X(f)}" cy="${Y(n)}" r="5" fill="${f === 3 || f === 4 ? RED : ACCENT}"/>`));
  s += text(X(3) + 70, Y(10) - 26, "3 frames: 9 faults, 4 frames: 10 faults", { size: 12, color: RED, weight: "bold" });
  s += text(290, 292, "number of frames", { size: 13, color: NOTE }) + `<text x="20" y="150" ${FONT} font-size="13" fill="${NOTE}" text-anchor="middle" transform="rotate(-90 20 150)">page faults</text>`;
  return svgDoc(560, 330, s + caption(560, 318, "Belady's anomaly with FIFO for 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5"), "Belady's anomaly");
})();

// ======================= 6.11 Disk scheduling =======================
function diskChart(order, title, { returnJumps = [] } = {}) {
  const X = (c) => 40 + c * 3.2, rowH = 30;
  const w = 720, h = 70 + order.length * rowH + 40;
  let s = line(X(0), 40, X(199), 40);
  [0, 14, 37, 53, 65, 67, 98, 122, 124, 183, 199].forEach((c, i) => {
    s += line(X(c), 36, X(c), 44) + text(X(c), i % 2 ? 28 : 18, c, { size: 11 });
  });
  order.forEach((c, i) => (s += `<circle cx="${X(c)}" cy="${60 + i * rowH}" r="5" fill="${i === 0 ? RED : ACCENT}"/>`));
  for (let i = 0; i < order.length - 1; i++) {
    const jump = returnJumps.includes(i);
    s += arrow(X(order[i]), 60 + i * rowH, X(order[i + 1]), 60 + (i + 1) * rowH, { dash: jump ? "6 5" : "", color: jump ? NOTE : INK });
  }
  return svgDoc(w, h, s + caption(w, h - 14, title), title);
}
files["disk-fcfs.svg"] = diskChart([53, 98, 183, 37, 122, 14, 124, 65, 67], "FCFS: total head movement 640 cylinders");
files["disk-sstf.svg"] = diskChart([53, 65, 67, 37, 14, 98, 122, 124, 183], "SSTF: total head movement 236 cylinders");
files["disk-scan.svg"] = diskChart([53, 37, 14, 0, 65, 67, 98, 122, 124, 183], "SCAN (moving towards 0): total head movement 236 cylinders");
files["disk-cscan.svg"] = diskChart([53, 65, 67, 98, 122, 124, 183, 199, 0, 14, 37], "C-SCAN (towards 199): 382 cylinders including the return 199 → 0 (dashed)", { returnJumps: [7] });
files["disk-look.svg"] = diskChart([53, 37, 14, 65, 67, 98, 122, 124, 183], "LOOK (moving towards 0): total head movement 208 cylinders");
files["disk-clook.svg"] = diskChart([53, 65, 67, 98, 122, 124, 183, 14, 37], "C-LOOK (towards 199): 322 cylinders including the jump 183 → 14 (dashed)", { returnJumps: [6] });

// ======================= 6.12 File System =======================
const fileNode = (x, y, l, fill = "#fff") => rect(x - 26, y - 14, 52, 28, { fill, rx: 14 }) + text(x, y, l, { size: 11, weight: "bold" });
const dirNode = (x, y, l, fill = COLORS[2], w = 80) => box(x - w / 2, y - 16, w, 32, l, { size: 12, fill, rx: 4 });
files["directory-single-level.svg"] = (() => {
  let s = dirNode(300, 40, "directory");
  ["cat", "bo", "a", "test", "data", "mail", "hex"].forEach((f, i) => {
    const x = 90 + i * 70;
    s += line(300, 56, x, 106) + fileNode(x, 120, f);
  });
  return svgDoc(600, 175, s + caption(600, 162, "Single-level directory: all files of all users in one directory"), "Single-level directory");
})();
files["directory-two-level.svg"] = (() => {
  let s = dirNode(330, 35, "MFD", COLORS[0]);
  const users = [[130, ["cat", "bo", "a"]], [330, ["a", "data"]], [530, ["test", "x"]]];
  users.forEach(([x, fs], u) => {
    s += line(330, 51, x, 89) + dirNode(x, 105, `user ${u + 1} UFD`);
    fs.forEach((f, i) => {
      const fx = x + (i - (fs.length - 1) / 2) * 62;
      s += line(x, 121, fx, 166) + fileNode(fx, 180, f);
    });
  });
  return svgDoc(660, 235, s + caption(660, 222, "Two-level directory: a master file directory (MFD) and one user file directory (UFD) per user"), "Two-level directory");
})();
files["directory-tree.svg"] = (() => {
  const N = { "/": [340, 30, "d"], bin: [120, 100, "d"], home: [340, 100, "d"], etc: [560, 100, "d"], ls: [70, 175, "f"], cp: [170, 175, "f"], ali: [280, 175, "d"], sara: [420, 175, "d"], passwd: [560, 175, "f"], notes: [240, 250, "d"], "a.c": [330, 250, "f"], "os.txt": [240, 320, "f"], "b.txt": [420, 250, "f"] };
  const E = [["/", "bin"], ["/", "home"], ["/", "etc"], ["bin", "ls"], ["bin", "cp"], ["home", "ali"], ["home", "sara"], ["etc", "passwd"], ["ali", "notes"], ["ali", "a.c"], ["notes", "os.txt"], ["sara", "b.txt"]];
  let s = E.map(([a, b]) => line(N[a][0], N[a][1], N[b][0], N[b][1])).join("");
  for (const [k, [x, y, t]] of Object.entries(N)) s += t === "d" ? dirNode(x, y, k, k === "/" ? COLORS[0] : COLORS[2]) : fileNode(x, y, k);
  s += text(470, 320, "absolute path: /home/ali/notes/os.txt", { size: 12, color: ACCENT, weight: "bold" });
  return svgDoc(680, 365, s + caption(680, 352, "Tree-structured directory (rectangles are directories, rounded boxes are files)"), "Tree-structured directory");
})();
files["directory-acyclic.svg"] = (() => {
  const N = { root: [300, 30, "d"], dict: [170, 100, "d"], spell: [430, 100, "d"], list: [100, 180, "f"], all: [200, 180, "f"], count: [330, 180, "f"], words: [460, 180, "f"] };
  const E = [["root", "dict"], ["root", "spell"], ["dict", "list"], ["dict", "all"], ["dict", "count"], ["spell", "count"], ["spell", "words"]];
  let s = E.map(([a, b]) => line(N[a][0], N[a][1], N[b][0], N[b][1], { color: (a === "spell" && b === "count") ? RED : INK })).join("");
  for (const [k, [x, y, t]] of Object.entries(N)) s += t === "d" ? dirNode(x, y, k) : fileNode(x, y, k, k === "count" ? COLORS[6] : "#fff");
  return svgDoc(580, 240, s + caption(580, 225, "Acyclic-graph directory: the file count is shared by dict and spell (a link)"), "Acyclic-graph directory");
})();

function diskGrid(cells, { cols = 8 } = {}) {
  let s = "";
  for (let i = 0; i < 32; i++) {
    const x = 40 + (i % cols) * 56, y = 40 + Math.floor(i / cols) * 46;
    const c = cells[i];
    s += rect(x, y, 50, 40, { fill: c ? c.fill : "#fff", rx: 2 }) + text(x + 25, y + (c && c.label ? 13 : 20), i, { size: 11, color: NOTE });
    if (c && c.label) s += text(x + 25, y + 29, c.label, { size: 11, weight: "bold" });
  }
  return s;
}
files["allocation-contiguous.svg"] = (() => {
  const cells = {};
  [[0, 2, COLORS[0]], [14, 3, COLORS[2]], [19, 6, COLORS[1]], [28, 4, COLORS[3]], [6, 2, COLORS[4]]].forEach(([st, n, c]) => { for (let i = 0; i < n; i++) cells[st + i] = { fill: c }; });
  let s = diskGrid(cells);
  const tbl = [["file", "start", "length"], ["count", "0", "2"], ["tr", "14", "3"], ["mail", "19", "6"], ["list", "28", "4"], ["f", "6", "2"]];
  tbl.forEach((r, i) => r.forEach((v, j) => (s += text(520 + j * 70, 50 + i * 26, v, { size: 12, weight: i === 0 ? "bold" : "normal" }))));
  s += text(590, 20, "directory", { size: 12, color: NOTE });
  return svgDoc(740, 250, s + caption(740, 238, "Contiguous allocation: each file occupies consecutive blocks (start, length)"), "Contiguous allocation");
})();
files["allocation-linked.svg"] = (() => {
  const chain = [9, 16, 1, 10, 25];
  const cells = {};
  chain.forEach((b, i) => (cells[b] = { fill: COLORS[2], label: i < chain.length - 1 ? `→${chain[i + 1]}` : "-1" }));
  let s = diskGrid(cells);
  s += text(590, 20, "directory", { size: 12, color: NOTE });
  [["file", "start", "end"], ["jeep", "9", "25"]].forEach((r, i) => r.forEach((v, j) => (s += text(520 + j * 70, 50 + i * 26, v, { size: 12, weight: i === 0 ? "bold" : "normal" }))));
  s += text(590, 130, "9 → 16 → 1 → 10 → 25", { size: 12, color: ACCENT, weight: "bold" });
  return svgDoc(740, 250, s + caption(740, 238, "Linked allocation: each block holds a pointer to the next block of the file"), "Linked allocation");
})();
files["allocation-indexed.svg"] = (() => {
  const data = [9, 16, 1, 10, 25];
  const cells = { 19: { fill: COLORS[0], label: "index" } };
  data.forEach((b) => (cells[b] = { fill: COLORS[2] }));
  let s = diskGrid(cells);
  s += text(590, 20, "directory", { size: 12, color: NOTE });
  [["file", "index block"], ["jeep", "19"]].forEach((r, i) => r.forEach((v, j) => (s += text(540 + j * 90, 50 + i * 26, v, { size: 12, weight: i === 0 ? "bold" : "normal" }))));
  s += text(590, 120, "index block 19:", { size: 12, color: ACCENT, weight: "bold" });
  data.forEach((b, i) => (s += rect(560, 132 + i * 18, 60, 18, { fill: "#fff", rx: 0 }) + text(590, 141 + i * 18, b, { size: 11 })));
  return svgDoc(740, 250, s + caption(740, 238, "Indexed allocation: the index block lists all the blocks of the file"), "Indexed allocation");
})();
files["inode.svg"] = (() => {
  let s = rect(30, 20, 170, 330, { fill: "#fff" }) + text(115, 12, "inode", { size: 13, weight: "bold", color: ACCENT });
  ["mode", "owners (UID, GID)", "size", "timestamps", "link count"].forEach((l, i) => (s += rect(40, 30 + i * 28, 150, 26, { fill: FILL, rx: 0 }) + text(115, 43 + i * 28, l, { size: 11 })));
  const ptr = ["direct 0", "…", "direct 11", "single indirect", "double indirect", "triple indirect"];
  ptr.forEach((l, i) => (s += rect(40, 180 + i * 28, 150, 26, { fill: i < 3 ? COLORS[2] : COLORS[0], rx: 0 }) + text(115, 193 + i * 28, l, { size: 11, weight: "bold" })));
  const dataBlk = (x, y) => rect(x, y, 46, 22, { fill: COLORS[3], rx: 0 }) + text(x + 23, y + 11, "data", { size: 10 });
  const idx = (x, y) => rect(x, y, 46, 22, { fill: COLORS[1], rx: 0 }) + text(x + 23, y + 11, "index", { size: 10 });
  s += arrow(190, 193, 260, 175) + dataBlk(262, 164) + arrow(190, 249, 260, 230) + dataBlk(262, 219);
  s += arrow(190, 277, 300, 277) + idx(302, 266) + arrow(348, 277, 420, 260) + dataBlk(422, 249);
  s += arrow(190, 305, 300, 310) + idx(302, 299) + arrow(348, 310, 420, 300) + idx(422, 289) + arrow(468, 300, 540, 290) + dataBlk(542, 279);
  s += arrow(190, 333, 300, 345) + idx(302, 334) + arrow(348, 345, 420, 340) + idx(422, 329) + arrow(468, 340, 540, 335) + idx(542, 324) + arrow(588, 335, 650, 330) + dataBlk(652, 319);
  return svgDoc(720, 395, s + caption(720, 382, "UNIX inode with 12 direct pointers and single, double and triple indirect pointers"), "Inode structure");
})();
files["unix-disk-layout.svg"] = (() => {
  const parts = [["Boot block", 110, COLORS[4]], ["Superblock", 120, COLORS[2]], ["Inode list (inode table)", 240, COLORS[0]], ["Data blocks", 300, COLORS[3]]];
  let x = 20, s = "";
  for (const [l, w, c] of parts) { s += box(x, 40, w, 60, l, { fill: c, size: 13, rx: 0 }); x += w; }
  return svgDoc(810, 140, s + caption(810, 125, "Layout of a UNIX file system on a disk partition"), "UNIX file system layout");
})();
files["file-system-layers.svg"] = (() => {
  const L = ["Application programs", "Logical file system (metadata, FCBs, directories)", "File-organization module (logical → physical blocks, free space)", "Basic file system (buffers, caches, generic block I/O)", "I/O control (device drivers, interrupt handlers)", "Devices (disks, SSDs)"];
  let s = "";
  L.forEach((l, i) => {
    s += box(60, 20 + i * 54, 480, 40, l, { size: 13, fill: i === 5 ? "#d5e0e0" : COLORS[i % 4] });
    if (i < L.length - 1) s += arrow(300, 60 + i * 54, 300, 74 + i * 54);
  });
  return svgDoc(600, 370, s + caption(600, 358, "Layered file system"), "Layered file system");
})();

// ======================= 6.14 Linux =======================
files["linux-architecture.svg"] = (() => {
  let s = "";
  const rings = [[260, "Applications and utilities", COLORS[2]], [205, "Shell", COLORS[1]], [150, "Kernel", COLORS[0]], [85, "Hardware", "#d5e0e0"]];
  for (const [r, , c] of rings) s += `<circle cx="300" cy="280" r="${r}" fill="${c}" stroke="${INK}" stroke-width="2"/>`;
  s += text(300, 280, "Hardware", { weight: "bold" }) + text(300, 155, "Kernel", { weight: "bold" }) + text(300, 100, "Shell", { weight: "bold" }) + text(300, 44, "Applications and utilities", { weight: "bold" });
  s += text(300, 182, "process, memory, files, devices", { size: 11, color: NOTE });
  s += text(300, 125, "bash, sh, csh, ksh, zsh", { size: 11, color: NOTE });
  s += text(300, 64, "ls, cp, vi, gcc, browsers", { size: 11, color: NOTE });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="320" viewBox="0 0 600 320" role="img" aria-label="Linux architecture"><title>Linux architecture</title><rect width="600" height="320" fill="#ffffff"/><clipPath id="c"><rect width="600" height="295"/></clipPath><g clip-path="url(#c)">${s}</g>${caption(600, 308, "Layers of the Linux system")}</svg>\n`;
})();

files["linux-fhs.svg"] = (() => {
  const dirs = ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "sbin", "tmp", "usr", "var"];
  let s = dirNode(470, 30, "/", COLORS[0]);
  dirs.forEach((d, i) => {
    const x = 40 + i * 62;
    s += line(470, 46, x, 92) + dirNode(x, 108, d, COLORS[2], 56);
  });
  const kids = [["home", "ali", 250, 190], ["home", "sara", 310, 230], ["usr", "bin", 740, 190], ["usr", "lib", 790, 230], ["usr", "local", 840, 190], ["var", "log", 900, 230], ["var", "mail", 950, 190]];
  for (const [p, k, x, y] of kids) {
    const px = 40 + dirs.indexOf(p) * 62;
    s += line(px, 124, x, y - 14) + fileNode(x, y, k, "#fff");
  }
  return svgDoc(1000, 280, s + caption(1000, 268, "Part of the Linux file system hierarchy (FHS), starting at the root /"), "Linux file system hierarchy");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
