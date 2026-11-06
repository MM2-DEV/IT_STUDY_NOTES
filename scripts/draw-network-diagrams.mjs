// Draws the diagrams used in the Computer Networks notes as SVG files in
// public/diagrams/computer-networks/. Run: node scripts/draw-network-diagrams.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "diagrams", "computer-networks");
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


// ======================= 9.1 Introduction to Computer Networks =======================
files["internet-structure.svg"] = (() => {
  // core
  let s = `<ellipse cx="450" cy="170" rx="210" ry="95" fill="${FILL}" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>` + text(450, 92, "Network core (routers, links)", { size: 12, weight: "bold", color: ACCENT });
  const R = [[330, 150], [450, 120], [570, 150], [390, 220], [510, 220]];
  [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [1, 3], [1, 4]].forEach(([a, b]) => { s += line(R[a][0], R[a][1], R[b][0], R[b][1]); });
  let routers = "";
  R.forEach(([x, y]) => { routers += circle(x, y, "R", { r: 16, size: 11, fill: COLORS[2] }); });
  // edge
  const ed = [[105, 70, "Home\n(DSL / cable / FTTH)"], [105, 270, "Mobile\n(4G / 5G)"], [815, 70, "Enterprise LAN\n(Ethernet, Wi-Fi)"], [815, 270, "Data centre\n(servers)"]];
  ed.forEach(([x, y, l], i) => {
    s += box(x - 80, y - 28, 160, 56, l, { fill: COLORS[i % 2 ? 1 : 0], size: 11 });
    const t = R[i === 0 ? 0 : i === 1 ? 3 : i === 2 ? 2 : 4];
    s += line(x + (i < 2 ? 80 : -80), y, t[0], t[1], { color: NOTE });
  });
  s += routers;
  s += text(80, 330, "Network edge: end systems (hosts) and access networks", { size: 12, weight: "bold", color: ACCENT, anchor: "start" });
  return svgDoc(920, 360, s + caption(920, 350, "The Internet: end systems and access networks at the edge, connected through the network core"), "Internet structure");
})();

files["encapsulation.svg"] = (() => {
  const layers = [["Application", "M", 0], ["Transport", "Hₜ | M", 1], ["Network", "Hₙ | Hₜ | M", 2], ["Link", "Hₗ | Hₙ | Hₜ | M", 3], ["Physical", "bits 0101…", 4]];
  const names = ["message", "segment", "datagram (packet)", "frame", "bits"];
  let s = "";
  layers.forEach(([l, p, i]) => {
    const y = 30 + i * 52;
    s += box(30, y, 140, 40, l, { fill: COLORS[i], size: 13 });
    s += rect(220, y + 4, 60 + i * 55, 32, { fill: "#fff" }) + text(250 + i * 27, y + 20, p, { size: 12, weight: "bold" });
    s += text(560, y + 20, names[i], { size: 12, color: NOTE, anchor: "start" });
    if (i < 4) s += arrow(100, y + 40, 100, y + 50);
  });
  s += text(560, 15, "name of the data unit", { size: 11, weight: "bold", anchor: "start" });
  return svgDoc(760, 310, s + caption(760, 300, "Encapsulation: each layer adds its header (H) to the data from the layer above"), "Encapsulation");
})();

// ======================= 9.2 Network Topologies =======================
files["topologies.svg"] = (() => {
  const N = (x, y, l = "") => `<rect x="${x - 14}" y="${y - 11}" width="28" height="22" rx="3" fill="${COLORS[0]}" stroke="${INK}" stroke-width="1.8"/>` + (l ? text(x, y + 1, l, { size: 9, weight: "bold" }) : "");
  const H = (x, y, l) => box(x - 24, y - 13, 48, 26, l, { fill: COLORS[2], size: 10 });
  let s = "";
  // bus
  let x0 = 20, y0 = 30;
  s += text(x0 + 110, y0, "Bus", { weight: "bold" }) + line(x0 + 10, y0 + 70, x0 + 210, y0 + 70, { width: 4 });
  [40, 90, 140, 190].forEach((dx, i) => { const yy = i % 2 ? y0 + 105 : y0 + 35; s += line(x0 + dx, yy + (i % 2 ? -11 : 11), x0 + dx, y0 + 70) + N(x0 + dx, yy); });
  s += rect(x0 + 4, y0 + 64, 8, 12, { fill: INK, rx: 0 }) + rect(x0 + 208, y0 + 64, 8, 12, { fill: INK, rx: 0 });
  // star
  x0 = 300;
  s += text(x0 + 110, y0, "Star", { weight: "bold" });
  [[40, 35], [180, 35], [40, 110], [180, 110], [110, 130]].forEach(([dx, dy]) => { s += line(x0 + 110, y0 + 70, x0 + dx, y0 + dy) + N(x0 + dx, y0 + dy); });
  s += H(x0 + 110, y0 + 70, "Switch");
  // ring
  x0 = 580;
  s += text(x0 + 110, y0, "Ring", { weight: "bold" });
  const rp = [0, 1, 2, 3, 4, 5].map((k) => [x0 + 110 + 70 * Math.cos((k * Math.PI) / 3), y0 + 75 + 45 * Math.sin((k * Math.PI) / 3)]);
  rp.forEach((p, k) => { const q = rp[(k + 1) % 6]; s += line(p[0], p[1], q[0], q[1]); });
  rp.forEach((p) => { s += N(p[0], p[1]); });
  // mesh
  x0 = 20; y0 = 200;
  s += text(x0 + 110, y0, "Mesh (full, n = 5: 10 links)", { weight: "bold" });
  const mp = [0, 1, 2, 3, 4].map((k) => [x0 + 110 + 70 * Math.cos(-Math.PI / 2 + (k * 2 * Math.PI) / 5), y0 + 85 + 55 * Math.sin(-Math.PI / 2 + (k * 2 * Math.PI) / 5)]);
  for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) s += line(mp[a][0], mp[a][1], mp[b][0], mp[b][1], { width: 1.5 });
  mp.forEach((p) => { s += N(p[0], p[1]); });
  // tree
  x0 = 300;
  s += text(x0 + 110, y0, "Tree", { weight: "bold" }) + H(x0 + 110, y0 + 35, "Root");
  s += H(x0 + 50, y0 + 90, "Hub") + H(x0 + 170, y0 + 90, "Hub") + line(x0 + 110, y0 + 48, x0 + 50, y0 + 77) + line(x0 + 110, y0 + 48, x0 + 170, y0 + 77);
  [[20, 1], [80, 1], [140, 2], [200, 2]].forEach(([dx, p]) => { s += line(p === 1 ? x0 + 50 : x0 + 170, y0 + 103, x0 + dx, y0 + 139) + N(x0 + dx, y0 + 150); });
  // hybrid
  x0 = 580;
  s += text(x0 + 110, y0, "Hybrid (star + bus)", { weight: "bold" }) + line(x0 + 10, y0 + 45, x0 + 210, y0 + 45, { width: 4 });
  [[55, "Hub"], [165, "Hub"]].forEach(([dx, l]) => { s += line(x0 + dx, y0 + 45, x0 + dx, y0 + 77) + H(x0 + dx, y0 + 90, l); [-35, 0, 35].forEach((o) => { s += line(x0 + dx, y0 + 103, x0 + dx + o, y0 + 139) + N(x0 + dx + o, y0 + 150); }); });
  return svgDoc(820, 405, s + caption(820, 393, "Network topologies: bus, star, ring, mesh, tree and hybrid"), "Network topologies");
})();

// ======================= 9.3 OSI and TCP/IP =======================
files["osi-tcpip.svg"] = (() => {
  const osi = ["Application", "Presentation", "Session", "Transport", "Network", "Data link", "Physical"];
  const pdu = ["data", "data", "data", "segment", "packet", "frame", "bits"];
  let s = text(170, 22, "OSI model (7 layers)", { weight: "bold" }) + text(560, 22, "TCP/IP model (4 layers)", { weight: "bold" });
  osi.forEach((l, i) => {
    const y = 36 + i * 44;
    s += box(90, y, 160, 38, `${7 - i}. ${l}`, { fill: COLORS[i % COLORS.length], size: 12 });
    s += text(275, y + 19, pdu[i], { size: 11, color: NOTE, anchor: "start" });
  });
  const tcp = [["Application\n(HTTP, FTP, SMTP, DNS)", 0, 3], ["Transport (TCP, UDP)", 3, 1], ["Internet (IP, ICMP, ARP)", 4, 1], ["Network access\n(Ethernet, Wi-Fi)", 5, 2]];
  tcp.forEach(([l, a, n], i) => { s += box(470, 36 + a * 44, 180, n * 44 - 6, l, { fill: COLORS[(i + 2) % COLORS.length], size: 12 }); });
  s += text(325, 4 * 44 + 36 + 19, "", {});
  return svgDoc(720, 360, s + caption(720, 350, "OSI layers and the corresponding TCP/IP layers, with the data unit of each OSI layer"), "OSI and TCP/IP");
})();

// ======================= 9.4 Network Devices =======================
files["devices-layers.svg"] = (() => {
  const rows = [["Layer 7–4: Application to transport", "Gateway"], ["Layer 3: Network", "Router, Layer-3 switch, Brouter (2 + 3)"], ["Layer 2: Data link", "Bridge, Switch, NIC, Access point"], ["Layer 1: Physical", "Repeater, Hub, Modem, Cables"]];
  let s = "";
  rows.forEach(([l, d], i) => {
    const y = 20 + i * 56;
    s += box(20, y, 280, 46, l, { fill: COLORS[i], size: 12 }) + box(320, y, 380, 46, d, { fill: "#fff", size: 12 });
  });
  return svgDoc(720, 260, s + caption(720, 250, "Network devices and the OSI layers at which they work"), "Devices by layer");
})();

// ======================= 9.5 Data Transmission Basics =======================
// Polyline through f(t) sampled from x0 to x0+w.
const wave = (x0, y0, w, f, { color = ACCENT, width = 2.5, n = 240 } = {}) => {
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push(`${(x0 + t * w).toFixed(1)},${(y0 - f(t)).toFixed(1)}`); }
  return `<polyline points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
};
const axes = (x0, y0, w, h, xl = "time") =>
  line(x0, y0, x0 + w, y0, { color: NOTE, width: 1.5 }) + line(x0, y0 - h, x0, y0 + h, { color: NOTE, width: 1.5 }) + text(x0 + w - 4, y0 + 14, xl, { size: 11, color: NOTE, anchor: "end" });

files["analog-digital-signals.svg"] = (() => {
  let s = text(185, 22, "Analog signal", { weight: "bold" }) + text(545, 22, "Digital signal", { weight: "bold" });
  s += axes(30, 120, 310, 70) + wave(30, 120, 265, (t) => 55 * Math.sin(2 * Math.PI * 2 * t) * (0.7 + 0.3 * Math.cos(2 * Math.PI * 3 * t)));
  s += axes(390, 120, 310, 70);
  const bits = [1, 0, 1, 1, 0, 0, 1, 0];
  let d = "", x = 390;
  bits.forEach((b, i) => { const y = b ? 70 : 160; d += (i ? ` L${x},${y}` : `M${x},${y}`) + ` L${x + 33},${y}`; s += text(x + 16, 58, String(b), { size: 13, weight: "bold" }); x += 33; });
  s += `<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>`;
  s += text(185, 205, "continuous: infinitely many values", { size: 12, color: NOTE }) + text(545, 205, "discrete: a limited set of values (0 and 1)", { size: 12, color: NOTE });
  return svgDoc(720, 250, s + caption(720, 238, "An analog signal varies continuously; a digital signal has discrete levels"), "Analog and digital signals");
})();

files["sine-wave-parameters.svg"] = (() => {
  const x0 = 60, y0 = 160, A = 80, P = 240;
  let s = axes(x0, y0, 600, 100) + wave(x0, y0, 2 * P, (t) => A * Math.sin(2 * Math.PI * 2 * t));
  s += line(x0 + P / 4, y0, x0 + P / 4, y0 - A, { color: RED, dash: "4 3" }) + text(x0 + P / 4, y0 - A - 16, "Peak amplitude (A)", { size: 12, color: RED, weight: "bold" });
  s += line(x0, y0 + 75, x0 + P, y0 + 75, { color: INK, width: 1.5 }) + line(x0, y0 + 68, x0, y0 + 82, { width: 1.5 }) + line(x0 + P, y0 + 68, x0 + P, y0 + 82, { width: 1.5 });
  s += text(x0 + P / 2, y0 + 92, "Period T (one cycle)", { size: 12, weight: "bold" });
  s += text(x0 + 1.5 * P, y0 + 92, "Frequency f = 1 / T (cycles per second, Hz)", { size: 12, color: NOTE });
  return svgDoc(720, 300, s + caption(720, 288, "Parameters of a sine wave: peak amplitude, period and frequency (phase is its position at time 0)"), "Sine wave parameters");
})();

files["bit-rate-baud-rate.svg"] = (() => {
  const levels = { "00": 0, "01": 1, "10": 2, "11": 3 };
  const pairs = ["10", "01", "11", "00", "10", "11"];
  const x0 = 110, y0 = 200, w = 90, step = 38;
  let s = "";
  [0, 1, 2, 3].forEach((l) => { s += line(x0, y0 - l * step - 20, x0 + pairs.length * w, y0 - l * step - 20, { color: "#d6e2e2", width: 1 }) + text(x0 - 10, y0 - l * step - 20, `Level ${l}`, { size: 11, color: NOTE, anchor: "end" }); });
  let d = "";
  pairs.forEach((p, i) => { const y = y0 - levels[p] * step - 20, x = x0 + i * w; d += (i ? ` L${x},${y}` : `M${x},${y}`) + ` L${x + w},${y}`; s += text(x + w / 2, 30, p, { size: 15, weight: "bold" }); s += line(x, 44, x, y0, { color: NOTE, width: 1, dash: "3 3" }); });
  s += `<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="3"/>`;
  s += line(x0 + pairs.length * w, 44, x0 + pairs.length * w, y0, { color: NOTE, width: 1, dash: "3 3" });
  s += text(360, 222, "4 signal levels (L = 4): each signal element (baud) carries log₂4 = 2 bits", { size: 12, color: NOTE });
  s += text(360, 242, "6 signal elements carry 12 bits, so bit rate = 2 × baud rate", { size: 12, color: NOTE });
  return svgDoc(720, 280, s + caption(720, 268, "Bit rate and baud rate with a four-level signal"), "Bit rate vs baud rate");
})();

files["baseband-broadband.svg"] = (() => {
  let s = text(185, 22, "Baseband", { weight: "bold" }) + text(545, 22, "Broadband", { weight: "bold" });
  s += axes(40, 170, 300, 0, "frequency");
  s += `<path d="M40,170 L40,70 Q190,60 320,170 Z" fill="${COLORS[0]}" stroke="${INK}" stroke-width="2"/>` + text(150, 125, "one signal uses", { size: 12, weight: "bold" }) + text(150, 142, "the whole bandwidth", { size: 12, weight: "bold" });
  s += text(40, 186, "0 Hz", { size: 11, color: NOTE });
  s += axes(400, 170, 300, 0, "frequency");
  [0, 1, 2, 3].forEach((i) => { const x = 420 + i * 68; s += rect(x, 90, 56, 80, { fill: COLORS[i + 1], rx: 3 }) + text(x + 28, 130, `Ch ${i + 1}`, { size: 12, weight: "bold" }); });
  s += text(185, 210, "digital signal sent directly, no modulation", { size: 12, color: NOTE }) + text(545, 210, "many modulated signals on separate frequencies (FDM)", { size: 12, color: NOTE });
  return svgDoc(720, 255, s + caption(720, 242, "Baseband uses the whole channel for one signal; broadband divides it into frequency channels"), "Baseband and broadband");
})();

files["transmission-impairments.svg"] = (() => {
  const titles = ["Attenuation", "Distortion", "Noise"];
  const sent = (t) => 40 * Math.sin(2 * Math.PI * 3 * t);
  const recv = [
    (t) => 15 * Math.sin(2 * Math.PI * 3 * t),
    (t) => 28 * Math.sin(2 * Math.PI * 3 * t - 0.9) + 14 * Math.sin(2 * Math.PI * 9 * t + 1.6),
    (t) => 40 * Math.sin(2 * Math.PI * 3 * t) + 10 * Math.sin(2 * Math.PI * 41 * t) + 7 * Math.sin(2 * Math.PI * 67 * t + 1),
  ];
  const notes = ["signal loses energy (amplitude) with distance", "signal changes shape (components arrive at different times)", "unwanted signals are added to it"];
  let s = text(170, 22, "Sent signal", { weight: "bold" }) + text(530, 22, "Received signal", { weight: "bold" });
  titles.forEach((tt, i) => {
    const y = 95 + i * 130;
    s += text(20, y - 50, `${i + 1}. ${tt}`, { size: 13, weight: "bold", anchor: "start", color: ACCENT });
    s += axes(40, y, 270, 0) + wave(40, y, 225, sent);
    s += arrow(325, y, 385, y, { color: RED });
    s += axes(400, y, 270, 0) + wave(400, y, 225, recv[i], { color: RED });
    s += text(530, y + 62, notes[i], { size: 11, color: NOTE });
  });
  return svgDoc(720, 480, s + caption(720, 466, "The three causes of transmission impairment"), "Transmission impairments");
})();

// ======================= 9.6 Transmission Modes and Media =======================
files["transmission-modes.svg"] = (() => {
  const rows = [["Simplex", "one direction only", [[1, 0]]], ["Half-duplex", "both directions, one at a time", [[1, 0], [0, 1]]], ["Full-duplex", "both directions at the same time", [[1, 0], [0, 1]]]];
  let s = "";
  rows.forEach(([name, note, dirs], i) => {
    const y = 20 + i * 90;
    s += text(20, y + 30, name, { size: 14, weight: "bold", anchor: "start", color: ACCENT });
    s += box(140, y + 8, 110, 44, "Station A", { size: 13 }) + box(470, y + 8, 110, 44, "Station B", { size: 13 });
    if (i === 0) s += arrow(255, y + 30, 465, y + 30);
    if (i === 1) { s += arrow(255, y + 22, 465, y + 22) + arrow(465, y + 38, 255, y + 38, { dash: "6 4" }); }
    if (i === 2) { s += arrow(255, y + 22, 465, y + 22) + arrow(465, y + 38, 255, y + 38); }
    s += text(360, y + 66, note + (i === 1 ? " (dashed: at another time)" : ""), { size: 12, color: NOTE });
  });
  s += text(600, 50, "Keyboard, TV", { size: 12, anchor: "start" }) + text(600, 140, "Walkie-talkie", { size: 12, anchor: "start" }) + text(600, 230, "Telephone", { size: 12, anchor: "start" });
  return svgDoc(720, 300, s + caption(720, 290, "Simplex, half-duplex and full-duplex transmission"), "Transmission modes");
})();

files["serial-parallel.svg"] = (() => {
  const bits = ["0", "1", "1", "0", "0", "0", "1", "0"];
  let s = text(180, 20, "Parallel transmission", { weight: "bold" }) + text(540, 20, "Serial transmission", { weight: "bold" });
  s += box(20, 40, 70, 250, "Sender", { size: 12 }) + box(270, 40, 70, 250, "Receiver", { size: 12 });
  bits.forEach((b, i) => { const y = 58 + i * 30; s += line(90, y, 270, y, { color: NOTE, width: 1.5 }) + circle(180, y, b, { r: 11, size: 12, fill: COLORS[0] }); });
  s += text(180, 305, "8 bits sent together on 8 wires", { size: 12, color: NOTE });
  s += box(380, 140, 70, 50, "Sender", { size: 12 }) + box(640, 140, 70, 50, "Receiver", { size: 12 });
  s += line(450, 165, 640, 165, { color: NOTE, width: 1.5 });
  bits.forEach((b, i) => { s += circle(468 + i * 22, 165, b, { r: 10, size: 11, fill: COLORS[2] }); });
  s += text(545, 210, "8 bits sent one after another on 1 wire", { size: 12, color: NOTE });
  return svgDoc(720, 345, s + caption(720, 333, "Parallel transmission sends a group of bits at once; serial transmission sends one bit at a time"), "Parallel and serial transmission");
})();

files["async-sync-frame.svg"] = (() => {
  let s = text(20, 22, "Asynchronous: each byte has a start bit (0) and a stop bit (1); gaps between bytes", { size: 13, weight: "bold", anchor: "start", color: ACCENT });
  const byteBox = (x, y, fill) => { let t = rect(x, y, 26, 36, { fill: "#f2b880", rx: 2 }) + text(x + 13, y + 18, "0", { size: 12, weight: "bold" }); t += rect(x + 26, y, 120, 36, { fill, rx: 2 }) + text(x + 86, y + 18, "8 data bits", { size: 12 }); t += rect(x + 146, y, 26, 36, { fill: "#9fd3a8", rx: 2 }) + text(x + 159, y + 18, "1", { size: 12, weight: "bold" }); return t; };
  s += byteBox(30, 40, FILL) + byteBox(260, 40, FILL) + byteBox(500, 40, FILL);
  s += text(230, 58, "gap", { size: 11, color: NOTE }) + text(468, 58, "gap", { size: 11, color: NOTE });
  s += text(43, 92, "start", { size: 11, color: NOTE }) + text(189, 92, "stop", { size: 11, color: NOTE });
  s += text(20, 130, "Synchronous: bytes sent one after another as a frame, with no start/stop bits or gaps", { size: 13, weight: "bold", anchor: "start", color: ACCENT });
  ["Header (sync)", "byte", "byte", "byte", "byte", "byte", "Trailer"].forEach((l, i) => { const w = i === 0 || i === 6 ? 110 : 80; const x = i === 0 ? 30 : i === 6 ? 540 : 140 + (i - 1) * 80; s += rect(x, 148, w, 36, { fill: i === 0 || i === 6 ? COLORS[1] : FILL, rx: 2 }) + text(x + w / 2, 166, l, { size: 12 }); });
  s += arrow(650, 205, 60, 205, { label: "direction of flow", ly: -10 });
  return svgDoc(720, 250, s + caption(720, 238, "Asynchronous and synchronous serial transmission"), "Asynchronous and synchronous transmission");
})();

files["guided-media.svg"] = (() => {
  let s = text(120, 22, "Twisted pair", { weight: "bold" }) + text(360, 22, "Coaxial cable", { weight: "bold" }) + text(600, 22, "Optical fibre", { weight: "bold" });
  // twisted pair: two twisted wires
  s += wave(30, 110, 180, (t) => 18 * Math.sin(2 * Math.PI * 4 * t), { color: "#c0392b", width: 5 }) + wave(30, 110, 180, (t) => -18 * Math.sin(2 * Math.PI * 4 * t), { color: "#2471a3", width: 5 });
  s += text(120, 160, "two insulated copper wires", { size: 12, color: NOTE }) + text(120, 178, "twisted together; UTP has no", { size: 12, color: NOTE }) + text(120, 196, "shield, STP has a metal foil", { size: 12, color: NOTE });
  // coax: concentric circles
  const cx = 360, cy = 105;
  [[60, "#4b6166", "Outer jacket"], [50, "#b7c4c6", "Braided shield"], [40, "#ffffff", "Insulator"], [9, "#d68910", "Copper core"]].forEach(([r, f]) => { s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${INK}" stroke-width="1.5"/>`; });
  s += text(cx, 185, "core, insulator, braided shield, jacket", { size: 12, color: NOTE });
  // fibre
  const fx = 600;
  [[60, "#4b6166"], [46, "#cbadd1"], [16, "#fef9e7"]].forEach(([r, f]) => { s += `<circle cx="${fx}" cy="${cy}" r="${r}" fill="${f}" stroke="${INK}" stroke-width="1.5"/>`; });
  s += text(fx, cy, "Core", { size: 11, weight: "bold" }) + text(fx, cy - 30, "Cladding", { size: 11, weight: "bold" }) + text(fx, cy - 53, "Jacket", { size: 10, weight: "bold", color: "#fff" });
  s += text(fx, 185, "glass core, cladding, jacket;", { size: 12, color: NOTE }) + text(fx, 203, "carries light", { size: 12, color: NOTE });
  return svgDoc(720, 245, s + caption(720, 233, "Structure of twisted-pair, coaxial and optical-fibre cables"), "Guided media");
})();

files["fiber-modes.svg"] = (() => {
  let s = "";
  const rows = [["Multimode step-index", 28], ["Multimode graded-index", 28], ["Single-mode", 7]];
  rows.forEach(([name, core], i) => {
    const y = 60 + i * 95;
    s += text(20, y - 34, name, { size: 13, weight: "bold", anchor: "start", color: ACCENT });
    s += rect(20, y - 32 + 8, 680, 48, { fill: "#cbadd1", rx: 0 });
    s += rect(20, y - core / 2, 680, core, { fill: "#fef9e7", rx: 0, stroke: "#cbadd1" });
    if (i === 0) { let d = `M20,${y}`; for (let k = 0; k < 7; k++) d += ` L${70 + k * 95},${y + (k % 2 ? -12 : 12)}`; s += `<path d="${d} L700,${y}" fill="none" stroke="${RED}" stroke-width="2"/>`; }
    if (i === 1) { s += wave(20, y, 680, (t) => 11 * Math.sin(2 * Math.PI * 6 * t), { color: RED, width: 2 }); }
    if (i === 2) s += line(20, y, 700, y, { color: RED, width: 2 });
  });
  s += text(360, 300, "Step-index: rays reflect sharply and arrive at different times (more distortion)", { size: 12, color: NOTE });
  s += text(360, 318, "Graded-index: rays curve gradually; single-mode: one straight ray, the least distortion", { size: 12, color: NOTE });
  return svgDoc(720, 360, s + caption(720, 345, "Propagation modes of light in optical fibre (core shown light, cladding shown purple)"), "Optical fibre modes");
})();

files["null-modem.svg"] = (() => {
  const pins = [["TxD", 3, "RxD", 2], ["RxD", 2, "TxD", 3], ["RTS", 7, "CTS", 8], ["CTS", 8, "RTS", 7], ["DTR", 4, "DSR + DCD", "6 + 1"], ["DSR + DCD", "6 + 1", "DTR", 4], ["GND", 5, "GND", 5]];
  let s = box(20, 30, 130, 300, "Computer A\n(DTE)\nDB-9", { size: 13 }) + box(570, 30, 130, 300, "Computer B\n(DTE)\nDB-9", { size: 13 });
  pins.forEach(([a, pa, b, pb], i) => {
    const y = 50 + i * 40;
    s += text(160, y, `${a} (${pa})`, { size: 12, anchor: "start", weight: "bold" }) + text(560, y, `${b} (${pb})`, { size: 12, anchor: "end", weight: "bold" });
  });
  const pair = (i, j) => line(285, 50 + i * 40, 435, 50 + j * 40, { color: ACCENT });
  s += line(285, 50, 435, 50, { color: ACCENT }) + line(285, 90, 435, 90, { color: ACCENT }) + line(285, 130, 435, 130, { color: ACCENT }) + line(285, 170, 435, 170, { color: ACCENT }) + line(285, 210, 435, 210, { color: ACCENT }) + line(285, 250, 435, 250, { color: ACCENT }) + line(285, 290, 435, 290, { color: NOTE });
  s += text(360, 345, "Pin numbers are for DB-9 connectors (full-handshaking wiring)", { size: 12, color: NOTE });
  return svgDoc(720, 385, s + caption(720, 372, "Null modem: the output signals of each computer go to the input signals of the other"), "Null modem wiring");
})();

// ======================= 9.7 Data Encoding =======================
// Each scheme returns two levels (+1 / -1) per bit: first half and second half.
const BITS = [0, 1, 0, 0, 1, 1, 1, 0];
const lineCodes = {
  "NRZ-L": (bits) => bits.flatMap((b) => [b ? 1 : -1, b ? 1 : -1]),
  "NRZ-I": (bits) => { let lv = -1; return bits.flatMap((b) => { if (b) lv = -lv; return [lv, lv]; }); },
  "Manchester": (bits) => bits.flatMap((b) => (b ? [-1, 1] : [1, -1])),
  "Differential Manchester": (bits) => { let lv = 1; return bits.flatMap((b) => { const first = b ? lv : -lv; lv = -first; return [first, -first]; }); },
};
export const lineCodeLevels = (name) => lineCodes[name](BITS);

files["line-coding.svg"] = (() => {
  const x0 = 200, bw = 60, rowH = 80, top = 50;
  let s = "";
  BITS.forEach((b, i) => { s += text(x0 + i * bw + bw / 2, 24, String(b), { size: 16, weight: "bold" }); });
  for (let i = 0; i <= BITS.length; i++) s += line(x0 + i * bw, 38, x0 + i * bw, top + rowH * 4 - 10, { color: "#c9d6d6", width: 1, dash: "3 3" });
  Object.keys(lineCodes).forEach((name, r) => {
    const yc = top + r * rowH + rowH / 2 - 8, amp = 22;
    const lv = lineCodes[name](BITS);
    s += text(185, yc, name, { size: 13, weight: "bold", anchor: "end", color: ACCENT });
    s += line(x0, yc, x0 + BITS.length * bw, yc, { color: "#dde6e6", width: 1 });
    let d = "";
    lv.forEach((l, k) => { const x = x0 + k * (bw / 2), y = yc - l * amp; d += (k ? ` L${x},${y}` : `M${x},${y}`) + ` L${x + bw / 2},${y}`; });
    s += `<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="2.5"/>`;
  });
  s += text(360, top + rowH * 4 + 4, "NRZ-L: 1 = high, 0 = low.  NRZ-I: 1 = invert the level, 0 = no change (starts low).", { size: 12, color: NOTE });
  s += text(360, top + rowH * 4 + 22, "Manchester (IEEE 802.3): 1 = low-to-high, 0 = high-to-low in the middle of the bit.", { size: 12, color: NOTE });
  s += text(360, top + rowH * 4 + 40, "Differential Manchester: always a mid-bit transition; 0 = transition at the start, 1 = none.", { size: 12, color: NOTE });
  return svgDoc(720, top + rowH * 4 + 80, s + caption(720, top + rowH * 4 + 66, "The bit pattern 01001110 in four line-coding schemes"), "Line coding schemes");
})();

// ======================= 9.8 Modulation Techniques =======================
files["digital-modulation.svg"] = (() => {
  const bits = [1, 0, 1, 1, 0];
  const x0 = 130, w = 560, bw = w / bits.length, amp = 26, cyc = 3;
  const rows = [
    ["Data", null],
    ["ASK", (b, u) => (b ? amp : amp * 0.25) * Math.sin(2 * Math.PI * cyc * u)],
    ["FSK", (b, u) => amp * Math.sin(2 * Math.PI * (b ? 4 : 2) * u)],
    ["PSK", (b, u) => amp * Math.sin(2 * Math.PI * cyc * u + (b ? 0 : Math.PI))],
  ];
  let s = "";
  for (let i = 0; i <= bits.length; i++) s += line(x0 + i * bw, 20, x0 + i * bw, 330, { color: "#c9d6d6", width: 1, dash: "3 3" });
  rows.forEach(([name, f], r) => {
    const yc = 45 + r * 80;
    s += text(110, yc, name, { size: 14, weight: "bold", anchor: "end", color: ACCENT });
    if (!f) {
      let d = "";
      bits.forEach((b, i) => { const y = b ? yc - 20 : yc + 20, x = x0 + i * bw; d += (i ? ` L${x},${y}` : `M${x},${y}`) + ` L${x + bw},${y}`; s += text(x + bw / 2, yc - 32, String(b), { size: 14, weight: "bold" }); });
      s += `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
      return;
    }
    s += line(x0, yc, x0 + w, yc, { color: "#dde6e6", width: 1 });
    bits.forEach((b, i) => { s += wave(x0 + i * bw, yc, bw, (u) => f(b, u), { n: 120 }); });
  });
  s += text(410, 352, "ASK: amplitude changes  ·  FSK: frequency changes  ·  PSK: phase changes (180° for 0)", { size: 12, color: NOTE });
  return svgDoc(720, 395, s + caption(720, 382, "Digital modulation of the bits 10110"), "ASK, FSK and PSK");
})();

files["analog-modulation.svg"] = (() => {
  const x0 = 130, w = 560, amp = 26;
  const m = (t) => Math.sin(2 * Math.PI * 2 * t);           // message: 2 cycles
  const M = (t) => -Math.cos(2 * Math.PI * 2 * t) / (2 * Math.PI * 2); // integral of m
  const fc = 18;
  const rows = [
    ["Message", (t) => amp * m(t)],
    ["Carrier", (t) => amp * Math.sin(2 * Math.PI * fc * t)],
    ["AM", (t) => amp * (0.6 + 0.4 * m(t)) * Math.sin(2 * Math.PI * fc * t)],
    ["FM", (t) => amp * Math.sin(2 * Math.PI * fc * t + 2 * Math.PI * 9 * M(t))],
    ["PM", (t) => amp * Math.sin(2 * Math.PI * fc * t + 2.2 * m(t))],
  ];
  let s = "";
  rows.forEach(([name, f], r) => {
    const yc = 40 + r * 72;
    s += text(110, yc, name, { size: 14, weight: "bold", anchor: "end", color: ACCENT });
    s += line(x0, yc, x0 + w, yc, { color: "#dde6e6", width: 1 });
    s += wave(x0, yc, w, f, { color: r === 0 ? INK : ACCENT, width: 2, n: 900 });
  });
  s += text(410, 395, "AM: amplitude follows the message  ·  FM: frequency follows the message  ·  PM: phase follows the message", { size: 12, color: NOTE });
  return svgDoc(720, 440, s + caption(720, 425, "Amplitude, frequency and phase modulation of a carrier by a message signal"), "AM, FM and PM");
})();

files["pulse-modulation.svg"] = (() => {
  const x0 = 130, w = 560, n = 10, T = w / n;
  const m = (t) => 0.55 + 0.4 * Math.sin(2 * Math.PI * t);
  let s = "";
  for (let k = 0; k <= n; k++) s += line(x0 + k * T, 20, x0 + k * T, 350, { color: "#e3eaea", width: 1 });
  // message
  let yc = 85; s += text(110, yc - 25, "Message", { size: 14, weight: "bold", anchor: "end", color: ACCENT });
  s += line(x0, yc, x0 + w, yc, { color: "#c9d6d6", width: 1 }) + wave(x0, yc, w, (t) => 55 * m(t), { color: INK });
  const rows = ["PAM", "PWM", "PPM"];
  rows.forEach((name, r) => {
    const base = 165 + r * 80;
    s += text(110, base - 22, name, { size: 14, weight: "bold", anchor: "end", color: ACCENT });
    s += line(x0, base, x0 + w, base, { color: "#c9d6d6", width: 1 });
    for (let k = 0; k < n; k++) {
      const v = m((k + 0.5) / n), x = x0 + k * T;
      if (name === "PAM") s += rect(x + T * 0.35, base - 55 * v, T * 0.3, 55 * v, { fill: COLORS[0], rx: 0 });
      if (name === "PWM") s += rect(x + 2, base - 40, (T - 4) * v, 40, { fill: COLORS[1], rx: 0 });
      if (name === "PPM") s += rect(x + 2 + (T - 14) * v, base - 40, 10, 40, { fill: COLORS[2], rx: 0 });
    }
  });
  s += text(410, 372, "PAM: pulse height  ·  PWM: pulse width  ·  PPM: pulse position — each follows the sample value", { size: 12, color: NOTE });
  return svgDoc(720, 415, s + caption(720, 400, "Pulse amplitude, pulse width and pulse position modulation"), "PAM, PWM and PPM");
})();

files["pcm-process.svg"] = (() => {
  let s = "";
  const steps = ["Analog\nsignal", "Low-pass\nfilter", "Sampler\n(PAM)", "Quantizer", "Encoder", "Digital\ndata"];
  steps.forEach((l, i) => { const x = 15 + i * 118; s += box(x, 20, 100, 56, l, { size: 12, fill: i === 0 || i === 5 ? "#fff" : COLORS[i] }); if (i) s += arrow(x - 18, 48, x - 2, 48); });
  // quantization chart
  const x0 = 90, y0 = 330, W = 540, H = 200, L = 8;
  for (let k = 0; k <= L; k++) { const y = y0 - (k / L) * H; s += line(x0, y, x0 + W, y, { color: "#dde6e6", width: 1 }); }
  for (let k = 0; k < L; k++) { const y = y0 - ((k + 0.5) / L) * H; s += text(x0 - 8, y, format3(k), { size: 11, anchor: "end", color: NOTE }); }
  s += text(x0 - 8, y0 - H - 14, "code", { size: 11, anchor: "end", color: NOTE });
  const f = (t) => 0.5 + 0.42 * Math.sin(2 * Math.PI * t * 1.1 + 0.3);
  s += wave(x0, y0, W, (t) => H * f(t), { color: INK });
  const N = 12;
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) / N, v = f(t), k = Math.min(L - 1, Math.floor(v * L)), q = (k + 0.5) / L, x = x0 + t * W;
    s += line(x, y0, x, y0 - v * H, { color: NOTE, width: 1, dash: "3 2" });
    s += `<circle cx="${x}" cy="${y0 - v * H}" r="4" fill="${INK}"/>` + `<circle cx="${x}" cy="${y0 - q * H}" r="5" fill="none" stroke="${RED}" stroke-width="2"/>`;
    s += text(x, y0 + 16, format3(k), { size: 10, color: RED, weight: "bold" });
  }
  s += text(360, y0 + 40, "• sample value   ○ quantized level (middle of its zone)   red: 3-bit code (8 levels)", { size: 12, color: NOTE });
  return svgDoc(720, 410, s + caption(720, 395, "Pulse code modulation: sampling, quantization (8 levels) and encoding"), "PCM process");
})();
function format3(k) { return k.toString(2).padStart(3, "0"); }

files["delta-modulation.svg"] = (() => {
  const x0 = 60, y0 = 230, W = 620, H = 90, N = 40, step = 15;
  const f = (t) => H * Math.sin(2 * Math.PI * t);
  let s = line(x0, y0, x0 + W, y0, { color: "#dde6e6", width: 1 });
  s += wave(x0, y0, W, (t) => f(t), { color: INK });
  let est = 0, d = "", bitsTxt = "";
  for (let i = 0; i < N; i++) {
    const t = i / N, x = x0 + t * W, b = f(t) > est ? 1 : 0;
    est += b ? step : -step;
    d += (i ? ` L${x},${y0 - est}` : `M${x},${y0 - est}`) + ` L${x + W / N},${y0 - est}`;
    s += text(x + W / N / 2, 370, String(b), { size: 10, weight: "bold", color: RED });
  }
  s = s + `<path d="${d}" fill="none" stroke="${RED}" stroke-width="2"/>`;
  s += text(360, 350, "Output bits: 1 = staircase goes up one step (Δ), 0 = goes down one step", { size: 12, color: NOTE });
  s += text(360, 40, "Steep part at the start: the staircase lags behind (slope overload)", { size: 12, color: NOTE });
  s += text(360, 60, "Flat parts at the peaks: the staircase hunts up and down (granular noise)", { size: 12, color: NOTE });
  return svgDoc(720, 410, s + caption(720, 395, "Delta modulation: the staircase approximation follows the signal one step per sample"), "Delta modulation");
})();

files["constellations.svg"] = (() => {
  let s = "";
  const panel = (cx, title, pts, labels) => {
    let t = text(cx, 24, title, { weight: "bold" });
    t += line(cx - 95, 145, cx + 95, 145, { color: NOTE, width: 1 }) + line(cx, 50, cx, 240, { color: NOTE, width: 1 });
    pts.forEach(([x, y], i) => { t += `<circle cx="${cx + x}" cy="${145 - y}" r="6" fill="${ACCENT}"/>`; if (labels) t += text(cx + x, 145 - y - 15, labels[i], { size: 11, weight: "bold" }); });
    return t;
  };
  s += panel(120, "BPSK (1 bit/symbol)", [[-60, 0], [60, 0]], ["0", "1"]);
  s += panel(360, "QPSK (2 bits/symbol)", [[50, 50], [-50, 50], [-50, -50], [50, -50]], ["00", "01", "11", "10"]);
  const q = []; [-3, -1, 1, 3].forEach((i) => [-3, -1, 1, 3].forEach((j) => q.push([i * 25, j * 25])));
  s += panel(600, "16-QAM (4 bits/symbol)", q, null);
  s += text(360, 268, "Each dot is one signal element: its distance from the centre is the amplitude and its angle is the phase", { size: 12, color: NOTE });
  return svgDoc(720, 310, s + caption(720, 296, "Constellation diagrams of BPSK, QPSK and 16-QAM"), "Constellation diagrams");
})();

// ======================= 9.9 Data Link Control =======================
// Timeline helper: sender at x=sx, receiver at x=rx, time flows downward.
const timeline = (sx, rx, top, bottom, l1 = "Sender", l2 = "Receiver") =>
  text(sx, top - 14, l1, { size: 13, weight: "bold" }) + text(rx, top - 14, l2, { size: 13, weight: "bold" }) +
  line(sx, top, sx, bottom, { width: 3 }) + line(rx, top, rx, bottom, { width: 3 });
const msg = (x1, y1, x2, y2, label, { color = ACCENT, lost = false, dash = "", at = 0.5, below = false, off = 9 } = {}) => {
  if (!lost) return arrow(x1, y1, x2, y2, { color, dash }) + text(x1 + (x2 - x1) * at, y1 + (y2 - y1) * at + (below ? 12 : -off), label, { size: 11, weight: "bold", color });
  const mx = x1 + (x2 - x1) * 0.55, my = y1 + (y2 - y1) * 0.55;
  return line(x1, y1, mx, my, { color: RED, width: 2 }) + text(mx + (x2 > x1 ? 10 : -10), my, "✕", { size: 18, color: RED, weight: "bold" }) + text((x1 + mx) / 2, (y1 + my) / 2 - 9, label + " (lost)", { size: 11, weight: "bold", color: RED });
};

files["stop-and-wait.svg"] = (() => {
  const sx = 170, rx = 550;
  let s = timeline(sx, rx, 40, 470);
  s += msg(sx, 50, rx, 100, "Frame 0") + msg(rx, 105, sx, 155, "ACK 1", { color: INK });
  s += msg(sx, 165, rx, 215, "Frame 1", { lost: true });
  s += line(sx - 10, 165, sx - 10, 290, { color: NOTE, width: 1.5 }) + text(sx - 16, 228, "timeout", { size: 11, color: NOTE, anchor: "end" });
  s += msg(sx, 290, rx, 340, "Frame 1 (resent)") + msg(rx, 345, sx, 395, "ACK 0", { color: INK });
  s += msg(sx, 405, rx, 455, "Frame 0");
  return svgDoc(720, 510, s + caption(720, 495, "Stop-and-wait ARQ: one frame at a time; a lost frame is resent after a timeout"), "Stop-and-wait ARQ");
})();

files["gbn-sr.svg"] = (() => {
  let s = "";
  const panel = (ox, title, after) => {
    const sx = ox + 60, rx = ox + 290;
    let t = text(ox + 175, 18, title, { size: 14, weight: "bold", color: ACCENT }) + timeline(sx, rx, 58, 470);
    [0, 1, 2, 3].forEach((f, i) => { const y = 66 + i * 30; t += f === 1 ? msg(sx, y, rx, y + 40, "F1", { lost: true }) : msg(sx, y, rx, y + 40, "F" + f); });
    t += after(sx, rx);
    return t;
  };
  s += panel(0, "Go-Back-N ARQ", (sx, rx) =>
    msg(rx, 106, sx, 146, "ACK 1", { color: INK, at: 0.3, below: true }) +
    text(rx - 6, 230, "F2, F3 discarded", { size: 11, color: RED, anchor: "end" }) +
    line(sx - 8, 96, sx - 8, 260, { color: NOTE, width: 1.5 }) + text(sx - 12, 180, "timeout", { size: 11, color: NOTE, anchor: "end" }) +
    msg(sx, 270, rx, 310, "F1") + msg(sx, 300, rx, 340, "F2") + msg(sx, 330, rx, 370, "F3") +
    text(175, 400, "Frame 1 and all frames after it", { size: 12, color: NOTE }) + text(175, 418, "are resent (here F1, F2, F3)", { size: 12, color: NOTE }));
  s += panel(360, "Selective Repeat ARQ", (sx, rx) =>
    text(rx - 6, 240, "F2, F3 buffered", { size: 11, color: ACCENT, anchor: "end" }) +
    msg(rx, 168, sx, 208, "NAK 1", { color: RED, at: 0.75, below: true }) +
    msg(sx, 270, rx, 310, "F1") +
    text(535, 400, "Only the lost frame F1 is resent;", { size: 12, color: NOTE }) + text(535, 418, "the receiver delivers F1, F2, F3 in order", { size: 12, color: NOTE }));
  return svgDoc(720, 505, s + caption(720, 490, "Frame 1 is lost: Go-Back-N resends from frame 1 onward; Selective Repeat resends only frame 1"), "Go-Back-N and Selective Repeat");
})();

files["sliding-window.svg"] = (() => {
  const x0 = 40, w = 52, y = 70;
  let s = text(360, 22, "Sender sliding window (3-bit sequence numbers: 0–7, window size 7)", { size: 13, weight: "bold" });
  const seq = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3];
  seq.forEach((n, i) => {
    const fill = i < 2 ? "#e3eaea" : i < 5 ? COLORS[2] : i < 9 ? COLORS[0] : "#fff";
    s += box(x0 + i * w, y, w, 44, String(n), { size: 14, fill });
  });
  s += `<rect x="${x0 + 2 * w - 4}" y="${y - 8}" width="${7 * w + 8}" height="60" fill="none" stroke="${RED}" stroke-width="3" rx="6"/>`;
  s += text(x0 + w, y + 72, "acknowledged", { size: 11, color: NOTE }) + text(x0 + 3.5 * w, y + 72, "sent, not yet ACKed", { size: 11, color: NOTE }) + text(x0 + 7 * w, y + 72, "can be sent now", { size: 11, color: NOTE }) + text(x0 + 10.5 * w, y + 72, "cannot be sent yet", { size: 11, color: NOTE });
  s += arrow(x0 + 2 * w + 40, y + 100, x0 + 4 * w + 40, y + 100, { color: RED, label: "window slides right when an ACK arrives", ly: 16 });
  return svgDoc(720, 230, s + caption(720, 215, "The sender may have up to 7 unacknowledged frames; each ACK slides the window forward"), "Sliding window");
})();

files["hdlc-frame.svg"] = (() => {
  const fields = [["Flag", "8 bits", "01111110"], ["Address", "8 bits (or more)", ""], ["Control", "8 or 16 bits", ""], ["Information", "variable", "(I-frames and some U-frames)"], ["FCS", "16 or 32 bits", "CRC"], ["Flag", "8 bits", "01111110"]];
  const ws = [80, 110, 100, 190, 100, 80];
  let x = 30, s = "";
  fields.forEach(([n, size, note], i) => {
    s += box(x, 30, ws[i], 50, n, { size: 13, fill: COLORS[i % COLORS.length] });
    s += text(x + ws[i] / 2, 98, size, { size: 11, color: NOTE }) + (note ? text(x + ws[i] / 2, 115, note, { size: 11, color: NOTE }) : "");
    x += ws[i];
  });
  // control field formats
  const rows = [["I-frame", ["0", "N(S) 3", "P/F", "N(R) 3"]], ["S-frame", ["1 0", "Code 2", "P/F", "N(R) 3"]], ["U-frame", ["1 1", "Code 2", "P/F", "Code 3"]]];
  s += text(360, 150, "Control field (8 bits, first bit sent on the left)", { size: 13, weight: "bold" });
  rows.forEach(([n, parts], r) => {
    const y = 165 + r * 46;
    s += text(160, y + 18, n, { size: 13, weight: "bold", anchor: "end", color: ACCENT });
    const pw = [60, 110, 60, 110];
    let px = 180;
    parts.forEach((p, i) => { s += box(px, y, pw[i], 36, p, { size: 12, fill: "#fff" }); px += pw[i]; });
  });
  s += text(360, 318, "N(S) = send sequence number, N(R) = receive (acknowledgement) number, P/F = poll/final bit", { size: 12, color: NOTE });
  return svgDoc(720, 355, s + caption(720, 342, "HDLC frame format and the three control-field formats"), "HDLC frame");
})();

// ======================= 9.10 Multiplexing =======================
files["fdm.svg"] = (() => {
  let s = "";
  ["Source 1", "Source 2", "Source 3"].forEach((l, i) => { s += box(15, 30 + i * 60, 90, 40, l, { size: 12 }); s += box(125, 30 + i * 60, 90, 40, `Modulator\nf${i + 1}`, { size: 11, fill: COLORS[i] }); s += arrow(105, 50 + i * 60, 123, 50 + i * 60); s += arrow(215, 50 + i * 60, 255, 110); });
  s += box(255, 80, 70, 60, "MUX", { size: 14, fill: COLORS[4] });
  s += arrow(325, 110, 375, 110, { label: "one link", ly: -12 });
  // spectrum
  const x0 = 390, y0 = 185;
  s += line(x0, y0, x0 + 310, y0, { color: NOTE, width: 1.5 }) + text(x0 + 306, y0 + 15, "frequency", { size: 11, color: NOTE, anchor: "end" });
  [0, 1, 2].forEach((i) => { const x = x0 + 15 + i * 100; s += rect(x, 60, 75, y0 - 60, { fill: COLORS[i], rx: 2 }) + text(x + 37, 120, `Channel ${i + 1}`, { size: 11, weight: "bold" }) + text(x + 37, 138, `around f${i + 1}`, { size: 11 }); if (i < 2) { s += rect(x + 75, 60, 25, y0 - 60, { fill: "#fff", stroke: NOTE, rx: 0, dash: "3 3" }); } });
  s += text(x0 + 102, 52, "guard band", { size: 10, color: RED }) + text(x0 + 202, 52, "guard band", { size: 10, color: RED });
  return svgDoc(720, 245, s + caption(720, 230, "FDM: each signal is modulated onto its own carrier; channels are separated by guard bands"), "Frequency-division multiplexing");
})();

files["tdm-frames.svg"] = (() => {
  let s = "";
  const data = { A: [1, 1, 0, 1], B: [0, 1, 0, 0], C: [1, 0, 1, 1], D: [0, 0, 1, 0] }; // which rounds each source has data
  s += text(360, 20, "Sources A, B, C, D; a filled cell means the source has data in that round", { size: 12, color: NOTE });
  s += text(20, 52, "Synchronous TDM (one slot per source in every frame; empty slots are wasted)", { size: 13, weight: "bold", anchor: "start", color: ACCENT });
  let x = 20;
  for (let r = 0; r < 3; r++) {
    ["A", "B", "C", "D"].forEach((k) => { const has = data[k][r]; s += box(x, 64, 40, 34, has ? k + (r + 1) : "", { size: 11, fill: has ? COLORS["ABCD".indexOf(k)] : "#fff", dash: has ? "" : "4 3" }); x += 40; });
    s += text(x - 80, 112, `frame ${r + 1}`, { size: 11, color: NOTE }); x += 14;
  }
  s += text(20, 150, "Statistical (asynchronous) TDM (slots only for sources with data; each slot carries an address)", { size: 13, weight: "bold", anchor: "start", color: ACCENT });
  x = 20; let n = 0, frame = 1;
  for (let r = 0; r < 3; r++) ["A", "B", "C", "D"].forEach((k) => { if (data[k][r]) { s += box(x, 162, 22, 34, k, { size: 10, fill: "#fff" }) + box(x + 22, 162, 36, 34, k + (r + 1), { size: 11, fill: COLORS["ABCD".indexOf(k)] }); x += 58; n++; if (n % 3 === 0) { s += text(x - 87, 210, `frame ${frame++}`, { size: 11, color: NOTE }); x += 14; } } });
  s += text(360, 240, "Small white box = address of the source", { size: 12, color: NOTE });
  return svgDoc(720, 280, s + caption(720, 266, "Synchronous TDM sends empty slots; statistical TDM fills slots only with data that is ready"), "Synchronous and statistical TDM");
})();

// ======================= 9.11 Switching Techniques =======================
files["circuit-packet-switching.svg"] = (() => {
  const nodes = { A: [30, 110], S1: [120, 55], S2: [120, 165], S3: [230, 55], S4: [230, 165], B: [320, 110] };
  const links = [["A", "S1"], ["A", "S2"], ["S1", "S3"], ["S2", "S4"], ["S1", "S4"], ["S3", "B"], ["S4", "B"], ["S2", "S3"]];
  const panel = (ox, title, paths, notes) => {
    let t = text(ox + 175, 18, title, { size: 14, weight: "bold", color: ACCENT });
    links.forEach(([a, b]) => { t += line(ox + nodes[a][0], 25 + nodes[a][1], ox + nodes[b][0], 25 + nodes[b][1], { color: "#c9d6d6", width: 2 }); });
    paths.forEach(([path, color, w]) => { for (let k = 0; k < path.length - 1; k++) { const [a, b] = [path[k], path[k + 1]]; t += line(ox + nodes[a][0], 25 + nodes[a][1], ox + nodes[b][0], 25 + nodes[b][1], { color, width: w }); } });
    Object.entries(nodes).forEach(([k, [x, y]]) => { t += k.length === 1 ? box(ox + x - 20, 25 + y - 16, 40, 32, k, { size: 13, fill: COLORS[0] }) : circle(ox + x, 25 + y, k, { r: 19, size: 11 }); });
    notes.forEach((n, i) => { t += text(ox + 175, 228 + i * 18, n, { size: 12, color: NOTE }); });
    return t;
  };
  let s = panel(0, "Circuit switching", [[["A", "S1", "S3", "B"], RED, 6]], ["one dedicated path (red) is reserved", "for the whole call; all data follows it"]);
  s += line(360, 30, 360, 260, { color: "#dde6e6", width: 1 });
  s += panel(370, "Packet switching (datagram)", [[["A", "S1", "S3", "B"], RED, 4], [["A", "S2", "S4", "B"], "#2471a3", 4], [["A", "S1", "S4", "B"], "#d68910", 4]], ["packets 1, 2, 3 (three colours) are", "routed separately and share the links"]);
  return svgDoc(730, 300, s + caption(730, 286, "Circuit switching reserves a path; in packet switching each packet is forwarded on its own"), "Circuit and packet switching");
})();

// ======================= 9.12 Ethernet and LAN Standards =======================
files["ethernet-frame.svg"] = (() => {
  const f = [["Preamble", "7 bytes"], ["SFD", "1 byte"], ["Destination\naddress", "6 bytes"], ["Source\naddress", "6 bytes"], ["Length /\nType", "2 bytes"], ["Data and padding", "46–1500 bytes"], ["CRC", "4 bytes"]];
  const ws = [80, 55, 95, 95, 75, 200, 70];
  let x = 25, s = "";
  f.forEach(([n, b], i) => { s += box(x, 40, ws[i], 56, n, { size: 12, fill: i < 2 ? "#e3eaea" : COLORS[i % COLORS.length] }); s += text(x + ws[i] / 2, 112, b, { size: 11, color: NOTE }); x += ws[i]; });
  s += line(25, 30, 160, 30, { color: NOTE, width: 1.5 }) + text(92, 20, "physical-layer header", { size: 11, color: NOTE });
  s += line(160, 135, 695, 135, { color: RED, width: 1.5 }) + line(160, 128, 160, 142, { color: RED, width: 1.5 }) + line(695, 128, 695, 142, { color: RED, width: 1.5 });
  s += text(427, 152, "frame: minimum 64 bytes, maximum 1518 bytes", { size: 12, color: RED, weight: "bold" });
  return svgDoc(720, 190, s + caption(720, 178, "IEEE 802.3 Ethernet frame format"), "Ethernet frame");
})();

files["csma-cd.svg"] = (() => {
  let s = "";
  const B = (x, y, w, h, t, fill = FILL) => box(x, y, w, h, t, { size: 12, fill });
  s += B(250, 10, 220, 36, "Station has a frame to send", "#fff");
  s += B(250, 70, 220, 44, "Sense the medium:\nis it idle?", COLORS[0]);
  s += B(520, 70, 170, 44, "Wait until idle", "#fff");
  s += B(250, 140, 220, 44, "Transmit the frame and\nlisten (detect collision)", COLORS[2]);
  s += B(250, 210, 220, 44, "Collision detected\nduring transmission?", COLORS[0]);
  s += B(250, 285, 220, 36, "Success", COLORS[3]);
  s += B(520, 210, 170, 44, "Stop and send\na jam signal", COLORS[6]);
  s += B(520, 285, 170, 56, "Attempts n = n + 1;\nwait K × slot time,\nK random in 0 … 2ⁿ − 1", "#fff");
  s += B(520, 375, 170, 40, "n > 15: abort", "#fff");
  s += arrow(360, 46, 360, 68) + arrow(470, 92, 518, 92, { label: "busy", ly: -10 }) + polyArrow([[605, 70], [605, 58], [360, 58], [360, 68]]);
  s += arrow(360, 114, 360, 138, { label: "idle", lx: 18 }) + arrow(360, 184, 360, 208);
  s += arrow(360, 254, 360, 283, { label: "no", lx: 14 }) + arrow(470, 232, 518, 232, { label: "yes", ly: -10 });
  s += arrow(605, 254, 605, 283) + polyArrow([[690, 313], [705, 313], [705, 92], [692, 92]], { label: "" });
  s += arrow(605, 341, 605, 373, { label: "too many attempts", lx: -62 });
  return svgDoc(720, 450, s + caption(720, 438, "CSMA/CD: carrier sense, transmission with collision detection, jam signal and binary exponential backoff"), "CSMA/CD");
})();

// ======================= 9.13 Application Layer =======================
files["client-server-p2p.svg"] = (() => {
  let s = text(180, 20, "Client-server", { size: 14, weight: "bold", color: ACCENT }) + text(545, 20, "Peer-to-peer (P2P)", { size: 14, weight: "bold", color: ACCENT });
  const sv = [180, 135];
  [[60, 60], [300, 60], [60, 210], [300, 210], [180, 255]].forEach(([x, y], i) => { s += line(x, y, sv[0], sv[1], { color: NOTE }); });
  s += box(130, 110, 100, 50, "Server\n(always on)", { size: 12, fill: COLORS[2] });
  [[60, 60], [300, 60], [60, 210], [300, 210], [180, 255]].forEach(([x, y]) => { s += box(x - 32, y - 16, 64, 32, "Client", { size: 11, fill: COLORS[0] }); });
  const peers = [[460, 70], [630, 70], [420, 175], [670, 175], [545, 250]];
  [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 3], [1, 4], [2, 3]].forEach(([a, b]) => { s += line(...peers[a], ...peers[b], { color: NOTE }); });
  peers.forEach(([x, y]) => { s += box(x - 30, y - 16, 60, 32, "Peer", { size: 11, fill: COLORS[1] }); });
  s += text(180, 290, "clients talk only to the server", { size: 12, color: NOTE }) + text(545, 290, "peers act as both clients and servers", { size: 12, color: NOTE });
  return svgDoc(720, 330, s + caption(720, 318, "Client-server and peer-to-peer application architectures"), "Client-server and P2P");
})();

files["http-persistent.svg"] = (() => {
  let s = "";
  const panel = (ox, title, steps, note) => {
    const cx = ox + 50, sx = ox + 300;
    let t = text(ox + 175, 18, title, { size: 13, weight: "bold", color: ACCENT }) + timeline(cx, sx, 52, 400, "Client", "Server");
    let y = 60;
    steps.forEach(([l1, l2, tag]) => { t += msg(cx, y, sx, y + 30, l1, { at: 0.5 }) + msg(sx, y + 34, cx, y + 64, l2, { color: INK, at: 0.5 }); t += text(cx - 8, y + 34, tag, { size: 10, color: RED, anchor: "end", weight: "bold" }); y += 72; });
    t += text(ox + 175, 420, note, { size: 12, color: NOTE });
    return t;
  };
  s += panel(10, "Non-persistent HTTP", [["TCP SYN", "SYN+ACK", "RTT 1"], ["ACK + GET page", "page", "RTT 2"], ["TCP SYN (new)", "SYN+ACK", "RTT 3"], ["ACK + GET image", "image", "RTT 4"]], "a new TCP connection for every object: 2 RTT each");
  s += panel(370, "Persistent HTTP (with pipelining)", [["TCP SYN", "SYN+ACK", "RTT 1"], ["ACK + GET page", "page", "RTT 2"], ["GET img1, img2, img3", "img1, img2, img3", "RTT 3"]], "one connection; all images in about 1 more RTT");
  return svgDoc(730, 460, s + caption(730, 448, "Non-persistent and persistent HTTP connections (transmission times ignored)"), "HTTP connections");
})();

files["email-system.svg"] = (() => {
  let s = "";
  s += box(10, 70, 110, 50, "Sender's\nuser agent", { size: 12, fill: COLORS[0] });
  s += box(190, 70, 120, 50, "Sender's\nmail server", { size: 12, fill: COLORS[2] });
  s += box(430, 70, 120, 50, "Receiver's\nmail server", { size: 12, fill: COLORS[2] });
  s += box(620, 70, 95, 50, "Receiver's\nuser agent", { size: 12, fill: COLORS[0] });
  s += arrow(120, 95, 188, 95, { label: "SMTP", ly: -12 }) + arrow(310, 95, 428, 95, { label: "SMTP", ly: -12 }) + arrow(618, 95, 552, 95, { label: "POP3/IMAP", ly: -12 });
  s += text(154, 115, "push", { size: 11, color: NOTE }) + text(369, 115, "push", { size: 11, color: NOTE }) + text(585, 115, "pull", { size: 11, color: NOTE });
  s += text(490, 140, "mailbox", { size: 11, color: NOTE });
  s += text(360, 175, "SMTP (TCP port 25) pushes mail from the sender to the receiver's mail server;", { size: 12, color: NOTE });
  s += text(360, 193, "the receiver pulls it from the mailbox with POP3 or IMAP (or HTTP for web mail)", { size: 12, color: NOTE });
  return svgDoc(720, 235, s + caption(720, 225, "Main parts of the Internet e-mail system"), "E-mail system");
})();

files["dns-hierarchy.svg"] = (() => {
  let s = box(330, 15, 100, 36, "Root (.)", { size: 13, fill: COLORS[2] });
  const tld = [["com", 190], ["org", 330], ["edu", 450], ["bd", 600]];
  tld.forEach(([n, x]) => { s += line(380, 51, x, 95, { color: NOTE }) + box(x - 40, 95, 80, 34, "." + n, { size: 13, fill: COLORS[0] }); });
  const auth = [["google.com", 135, 190], ["amazon.com", 250, 190], ["wikipedia.org", 370, 330], ["gov.bd", 545, 600], ["ac.bd", 660, 600]];
  auth.forEach(([n, x, px]) => { s += line(px, 129, x, 175, { color: NOTE }) + box(x - 52, 175, 104, 34, n, { size: 11, fill: COLORS[1] }); });
  s += line(660, 209, 660, 245, { color: NOTE }) + box(608, 245, 104, 34, "buet.ac.bd", { size: 11, fill: "#fff" });
  s += text(10, 33, "Root servers", { size: 11, color: NOTE, anchor: "start" }) + text(10, 112, "TLD servers", { size: 11, color: NOTE, anchor: "start" }) + text(10, 192, "Authoritative", { size: 11, color: NOTE, anchor: "start" }) + text(10, 207, "servers", { size: 11, color: NOTE, anchor: "start" });
  return svgDoc(720, 315, s + caption(720, 302, "The hierarchy of the Domain Name System"), "DNS hierarchy");
})();

files["dns-resolution.svg"] = (() => {
  // two parallel arrows (request and reply) offset from each other
  const pair = (x1, y1, x2, y2, l1, l2) => {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), ox = (-dy / len) * 8, oy = (dx / len) * 8;
    return arrow(x1 + ox, y1 + oy, x2 + ox, y2 + oy) + arrow(x2 - ox, y2 - oy, x1 - ox, y1 - oy) +
      text((x1 + x2) / 2 + ox * 2.6, (y1 + y2) / 2 + oy * 2.6, l1, { size: 12, weight: "bold", color: ACCENT }) +
      text((x1 + x2) / 2 - ox * 2.6, (y1 + y2) / 2 - oy * 2.6, l2, { size: 12, weight: "bold", color: INK });
  };
  let s = "";
  s += box(15, 150, 100, 46, "Host\n(client)", { size: 12, fill: COLORS[0] });
  s += box(215, 150, 130, 46, "Local DNS\nserver (resolver)", { size: 11, fill: COLORS[2] });
  s += box(530, 20, 170, 40, "Root DNS server", { size: 12, fill: "#fff" });
  s += box(530, 153, 170, 40, "TLD (.com) server", { size: 12, fill: "#fff" });
  s += box(530, 286, 170, 40, "Authoritative server", { size: 12, fill: "#fff" });
  s += pair(115, 173, 215, 173, "1", "8");
  s += pair(345, 160, 530, 45, "2", "3") + pair(345, 173, 530, 173, "4", "5") + pair(345, 186, 530, 301, "6", "7");
  s += text(360, 350, "1 = query for www.example.com (recursive); 2, 4, 6 = iterative queries; 3 = address of the TLD server;", { size: 11, color: NOTE });
  s += text(360, 367, "5 = address of the authoritative server; 7 = IP address of www.example.com; 8 = answer to the host", { size: 11, color: NOTE });
  return svgDoc(720, 405, s + caption(720, 393, "Resolving a name: a recursive query to the local server, then iterative queries from it"), "DNS resolution");
})();

files["ftp-connections.svg"] = (() => {
  let s = box(20, 40, 190, 150, "", { fill: COLORS[0] }) + text(115, 58, "FTP client", { size: 13, weight: "bold" });
  s += box(510, 40, 190, 150, "", { fill: COLORS[2] }) + text(605, 58, "FTP server", { size: 13, weight: "bold" });
  s += box(40, 75, 150, 40, "Control process", { size: 12, fill: "#fff" }) + box(40, 135, 150, 40, "Data transfer process", { size: 12, fill: "#fff" });
  s += box(530, 75, 150, 40, "Control process", { size: 12, fill: "#fff" }) + box(530, 135, 150, 40, "Data transfer process", { size: 12, fill: "#fff" });
  s += line(190, 95, 530, 95, { color: ACCENT, width: 3 }) + text(360, 84, "Control connection (port 21)", { size: 12, color: ACCENT, weight: "bold" });
  s += line(190, 155, 530, 155, { color: RED, width: 3, dash: "8 4" }) + text(360, 144, "Data connection (port 20)", { size: 12, color: RED, weight: "bold" });
  s += text(360, 212, "Control: commands and replies, open for the whole session.  Data: opened for each file, then closed.", { size: 11, color: NOTE });
  return svgDoc(720, 255, s + caption(720, 242, "FTP uses two TCP connections: control (out-of-band) and data"), "FTP connections");
})();

// ======================= 9.14 Transport Layer =======================
files["transport-mux.svg"] = (() => {
  let s = "";
  const host = (x, title, procs) => {
    let t = rect(x, 30, 250, 230, { fill: "#f7fbfa", rx: 8 }) + text(x + 125, 48, title, { size: 13, weight: "bold" });
    procs.forEach(([n, port], i) => { t += box(x + 15 + i * 80, 60, 72, 50, n + "\nport " + port, { size: 10, fill: COLORS[i] }); });
    t += box(x + 15, 135, 220, 40, "Transport layer (TCP / UDP)", { size: 12, fill: COLORS[4] });
    t += box(x + 15, 200, 220, 40, "Network layer (IP address)", { size: 12, fill: "#fff" });
    procs.forEach((_, i) => { t += line(x + 51 + i * 80, 110, x + 51 + i * 80, 135, { color: NOTE }); });
    t += line(x + 125, 175, x + 125, 200, { color: NOTE });
    return t;
  };
  s += host(15, "Host A (sender)", [["Browser", "50123"], ["Mail", "50200"], ["DNS", "53001"]]);
  s += host(455, "Server B (receiver)", [["Web", "80"], ["SMTP", "25"], ["DNS", "53"]]);
  s += arrow(265, 220, 453, 220, { label: "segments with port numbers", ly: -12 });
  s += text(140, 285, "Multiplexing: data from many sockets", { size: 12, color: NOTE }) + text(140, 302, "gets headers with port numbers", { size: 12, color: NOTE });
  s += text(580, 285, "Demultiplexing: each segment goes to the", { size: 12, color: NOTE }) + text(580, 302, "socket named by its destination port", { size: 12, color: NOTE });
  return svgDoc(720, 340, s + caption(720, 328, "Transport-layer multiplexing and demultiplexing with port numbers"), "Multiplexing and demultiplexing");
})();

files["udp-header.svg"] = (() => {
  let s = text(360, 20, "32 bits", { size: 12, color: NOTE });
  s += line(160, 28, 560, 28, { color: NOTE, width: 1 });
  s += box(160, 35, 200, 44, "Source port (16)", { size: 12, fill: COLORS[0] }) + box(360, 35, 200, 44, "Destination port (16)", { size: 12, fill: COLORS[0] });
  s += box(160, 79, 200, 44, "Length (16)", { size: 12, fill: COLORS[2] }) + box(360, 79, 200, 44, "Checksum (16)", { size: 12, fill: COLORS[2] });
  s += box(160, 123, 400, 50, "Application data (message)", { size: 12, fill: "#fff" });
  s += text(600, 79, "8-byte header", { size: 12, color: RED, weight: "bold", anchor: "start" });
  return svgDoc(720, 215, s + caption(720, 200, "UDP segment format: an 8-byte header of four 16-bit fields"), "UDP header");
})();

files["tcp-segment.svg"] = (() => {
  const x0 = 120, W = 480, rowH = 38;
  let s = text(360, 16, "32 bits", { size: 12, color: NOTE }) + line(x0, 24, x0 + W, 24, { color: NOTE, width: 1 });
  const rows = [
    [["Source port (16)", 0.5], ["Destination port (16)", 0.5]],
    [["Sequence number (32)", 1]],
    [["Acknowledgement number (32)", 1]],
    [["Header\nlength (4)", 0.13], ["Rsvd", 0.1], ["Flags: URG ACK PSH\nRST SYN FIN", 0.27], ["Receive window (16)", 0.5]],
    [["Checksum (16)", 0.5], ["Urgent data pointer (16)", 0.5]],
    [["Options (variable, 0–40 bytes)", 1]],
    [["Data", 1]],
  ];
  rows.forEach((r, i) => { let x = x0; const y = 30 + i * rowH; r.forEach(([l, f], k) => { const w = W * f; s += box(x, y, w, rowH, l, { size: 11, fill: i === 6 ? "#fff" : COLORS[(i + k) % COLORS.length] }); x += w; }); });
  s += text(x0 + W + 12, 30 + 2.5 * rowH, "20-byte", { size: 12, color: RED, weight: "bold", anchor: "start" }) + text(x0 + W + 12, 30 + 2.5 * rowH + 16, "header", { size: 12, color: RED, weight: "bold", anchor: "start" });
  return svgDoc(720, 330, s + caption(720, 318, "TCP segment structure (header 20 to 60 bytes)"), "TCP segment");
})();

files["tcp-handshake.svg"] = (() => {
  let s = "";
  const panel = (ox, title, steps, endNote) => {
    const cx = ox + 50, sx = ox + 300;
    let t = text(ox + 175, 18, title, { size: 13, weight: "bold", color: ACCENT }) + timeline(cx, sx, 52, 330, "Client", "Server");
    steps.forEach(([dir, l, y]) => { t += dir > 0 ? msg(cx, y, sx, y + 25, l, { off: 16 }) : msg(sx, y, cx, y + 25, l, { color: INK, off: 16 }); });
    t += text(ox + 175, 350, endNote, { size: 12, color: NOTE });
    return t;
  };
  s += panel(10, "Connection setup (three-way handshake)", [[1, "SYN, seq = x", 60], [-1, "SYN + ACK, seq = y, ack = x + 1", 120], [1, "ACK, seq = x + 1, ack = y + 1", 180]], "connection ESTABLISHED; data can flow");
  s += panel(370, "Connection release (four-way)", [[1, "FIN", 60], [-1, "ACK", 115], [-1, "FIN", 170], [1, "ACK", 225]], "client waits (TIME_WAIT), then CLOSED");
  return svgDoc(730, 385, s + caption(730, 373, "Opening and closing a TCP connection"), "TCP handshake");
})();

files["tcp-cwnd.svg"] = (() => {
  const x0 = 70, y0 = 300, dx = 38, dy = 15;
  const tahoe = [1, 2, 4, 8, 9, 10, 11, 12, 1, 2, 4, 6, 7, 8, 9, 10];
  const reno = [1, 2, 4, 8, 9, 10, 11, 12, 9, 10, 11, 12, 13, 14, 15, 16];
  let s = line(x0, y0, x0 + 16 * dx + 10, y0, { color: INK, width: 1.5 }) + line(x0, y0, x0, y0 - 17 * dy, { color: INK, width: 1.5 });
  for (let v = 0; v <= 16; v += 2) { s += line(x0 - 4, y0 - v * dy, x0, y0 - v * dy, { width: 1 }) + text(x0 - 8, y0 - v * dy, String(v), { size: 10, anchor: "end" }); if (v) s += line(x0, y0 - v * dy, x0 + 16 * dx, y0 - v * dy, { color: "#eef2f2", width: 1 }); }
  for (let r = 1; r <= 16; r++) s += text(x0 + (r - 0.5) * dx, y0 + 14, String(r), { size: 10 });
  s += text(x0 + 8 * dx, y0 + 32, "Transmission round (RTT)", { size: 12, weight: "bold" });
  s += `<text x="22" y="${y0 - 8 * dy}" ${FONT} font-size="12" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 22 ${y0 - 8 * dy})">cwnd (segments)</text>`;
  const pts = (arr) => arr.map((v, i) => `${x0 + (i + 0.5) * dx},${y0 - v * dy}`).join(" ");
  s += `<polyline points="${pts(tahoe)}" fill="none" stroke="${RED}" stroke-width="2.5"/>` + `<polyline points="${pts(reno)}" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-dasharray="7 4"/>`;
  tahoe.forEach((v, i) => { s += `<circle cx="${x0 + (i + 0.5) * dx}" cy="${y0 - v * dy}" r="3.5" fill="${RED}"/>`; });
  reno.forEach((v, i) => { if (i >= 8) s += `<circle cx="${x0 + (i + 0.5) * dx}" cy="${y0 - v * dy}" r="3.5" fill="${ACCENT}"/>`; });
  s += line(x0, y0 - 8 * dy, x0 + 8 * dx, y0 - 8 * dy, { color: NOTE, width: 1.5, dash: "3 3" }) + text(x0 + 4, y0 - 8 * dy - 8, "ssthresh = 8", { size: 11, color: NOTE, anchor: "start" });
  s += line(x0 + 8 * dx, y0 - 6 * dy, x0 + 16 * dx, y0 - 6 * dy, { color: NOTE, width: 1.5, dash: "3 3" }) + text(x0 + 16 * dx, y0 - 6 * dy - 8, "new ssthresh = 6", { size: 11, color: NOTE, anchor: "end" });
  s += text(x0 + 7.5 * dx, y0 - 12 * dy - 14, "3 duplicate ACKs", { size: 11, color: INK, weight: "bold" });
  s += line(x0 + 30, 40, x0 + 60, 40, { color: RED, width: 2.5 }) + text(x0 + 65, 40, "TCP Tahoe", { size: 12, anchor: "start" });
  s += line(x0 + 30, 60, x0 + 60, 60, { color: ACCENT, width: 2.5, dash: "7 4" }) + text(x0 + 65, 60, "TCP Reno", { size: 12, anchor: "start" });
  return svgDoc(760, 370, s + caption(760, 358, "Congestion window of TCP Tahoe and TCP Reno (loss detected by 3 duplicate ACKs after round 8)"), "TCP congestion window");
})();

// ======================= 9.15 Network Layer and IP =======================
// Generic 32-bit header drawer: rows of [label, bits]
const headerRows = (x0, y0, W, rows, rowH = 36, fills = COLORS) => {
  let t = "";
  rows.forEach((r, i) => { let x = x0; r.forEach(([l, b], k) => { const w = (W * b) / 32; t += box(x, y0 + i * rowH, w, rowH, l, { size: 11, fill: l === "Data" || l.startsWith("Payload") ? "#fff" : fills[(i * 2 + k) % fills.length] }); x += w; }); });
  return t;
};
files["ipv4-header.svg"] = (() => {
  const rows = [
    [["Version\n(4)", 4], ["HLEN\n(4)", 4], ["Type of service (8)", 8], ["Total length (16)", 16]],
    [["Identification (16)", 16], ["Flags\n(3)", 3], ["Fragment offset (13)", 13]],
    [["Time to live (8)", 8], ["Protocol (8)", 8], ["Header checksum (16)", 16]],
    [["Source IP address (32)", 32]],
    [["Destination IP address (32)", 32]],
    [["Options (0–40 bytes) and padding", 32]],
    [["Data", 32]],
  ];
  let s = text(360, 16, "32 bits", { size: 12, color: NOTE }) + line(110, 24, 610, 24, { color: NOTE, width: 1 });
  s += headerRows(110, 30, 500, rows, 38);
  s += text(625, 30 + 2.5 * 38, "20-byte", { size: 12, color: RED, weight: "bold", anchor: "start" }) + text(625, 30 + 2.5 * 38 + 16, "fixed part", { size: 12, color: RED, weight: "bold", anchor: "start" });
  return svgDoc(720, 330, s + caption(720, 318, "IPv4 datagram header (20 to 60 bytes)"), "IPv4 header");
})();

files["router-architecture.svg"] = (() => {
  let s = "";
  [0, 1, 2].forEach((i) => {
    const y = 40 + i * 70;
    s += box(20, y, 190, 46, "Input port " + (i + 1) + "\n(link layer, lookup, queue)", { size: 11, fill: COLORS[0] });
    s += box(510, y, 190, 46, "Output port " + (i + 1) + "\n(queue, link layer)", { size: 11, fill: COLORS[2] });
    s += arrow(210, y + 23, 268, y + 23) + arrow(452, y + 23, 508, y + 23);
  });
  s += box(270, 40, 180, 186, "Switching fabric\n(memory, bus or\ncrossbar)", { size: 12, fill: COLORS[1] });
  s += box(270, 250, 180, 46, "Routing processor\n(control plane)", { size: 11, fill: COLORS[3] });
  s += line(360, 226, 360, 250, { color: NOTE, dash: "4 3" }) + text(470, 270, "computes forwarding table", { size: 11, color: NOTE, anchor: "start" });
  s += text(115, 255, "data plane: forwarding", { size: 11, color: NOTE }) + text(115, 271, "(hardware, nanoseconds)", { size: 11, color: NOTE });
  return svgDoc(720, 330, s + caption(720, 318, "Inside a router: input ports, switching fabric, output ports and routing processor"), "Router architecture");
})();

files["ip-classes.svg"] = (() => {
  const x0 = 120, W = 520, unit = W / 32;
  const rows = [["A", [["0", 1], ["Network (7 bits)", 7], ["Host (24 bits)", 24]]], ["B", [["10", 2], ["Network (14 bits)", 14], ["Host (16 bits)", 16]]], ["C", [["110", 3], ["Network (21 bits)", 21], ["Host (8)", 8]]], ["D", [["1110", 4], ["Multicast address (28 bits)", 28]]], ["E", [["1111", 4], ["Reserved for future use (28 bits)", 28]]]];
  let s = "";
  [0, 8, 16, 24, 32].forEach((b) => { s += text(x0 + b * unit, 18, String(b), { size: 10, color: NOTE }); });
  rows.forEach(([c, parts], i) => {
    const y = 28 + i * 44; let x = x0;
    s += text(x0 - 14, y + 18, "Class " + c, { size: 13, weight: "bold", anchor: "end", color: ACCENT });
    parts.forEach(([l, b], k) => { s += box(x, y, b * unit, 36, l, { size: 11, fill: k === 0 ? "#fff" : COLORS[(i + k) % COLORS.length] }); x += b * unit; });
  });
  s += text(380, 260, "The leading bits identify the class; in classes A, B and C the network part ends on a byte boundary (8, 16 or 24 bits)", { size: 11, color: NOTE });
  return svgDoc(720, 295, s + caption(720, 284, "Classful IPv4 addresses: leading bits, network part and host part"), "IP address classes");
})();

files["subnet-example.svg"] = (() => {
  const bits = (n) => n.toString(2).padStart(8, "0");
  const ipb = [172, 16, 16, 137].map(bits).join("");
  const mb = "1".repeat(22) + "0".repeat(10);
  const nb = ipb.split("").map((c, i) => (c === "1" && mb[i] === "1" ? "1" : "0")).join("");
  const x0 = 120, cw = 14;
  let s = "";
  const row = (y, label, str, dec) => {
    let t = text(x0 - 12, y + 12, label, { size: 12, weight: "bold", anchor: "end", color: ACCENT });
    str.split("").forEach((c, i) => { const x = x0 + i * cw + Math.floor(i / 8) * 6; t += rect(x, y, cw, 24, { fill: i < 22 ? COLORS[0] : COLORS[2], rx: 0, stroke: "#9aaeb0" }) + text(x + cw / 2, y + 12, c, { size: 11 }); });
    return t + text(x0 + 32 * cw + 30, y + 12, dec, { size: 12, weight: "bold", anchor: "start" });
  };
  s += row(30, "IP address", ipb, "172.16.16.137") + row(64, "Mask (/22)", mb, "255.255.252.0") + text(x0 + 16 * cw, 104, "bitwise AND", { size: 12, color: RED, weight: "bold" }) + row(116, "Network", nb, "172.16.16.0");
  s += text(x0 + 11 * cw, 160, "network part: 22 bits", { size: 12, color: ACCENT, weight: "bold" }) + text(x0 + 27 * cw + 18, 160, "host part: 10 bits", { size: 12, color: "#8a7a00", weight: "bold" });
  s += text(380, 185, "Broadcast = network with all host bits 1 = 172.16.19.255; usable hosts = 2¹⁰ − 2 = 1022", { size: 12, color: NOTE });
  return svgDoc(760, 225, s + caption(760, 212, "Finding the network address of 172.16.16.137/22 with the subnet mask"), "Subnet mask AND");
})();

files["arp.svg"] = (() => {
  let s = line(30, 150, 690, 150, { color: INK, width: 3 }) + text(700, 150, "LAN", { size: 11, color: NOTE, anchor: "start" });
  const hosts = [["A", "192.168.1.2", 90], ["C", "192.168.1.4", 270], ["B", "192.168.1.3", 450], ["D", "192.168.1.5", 620]];
  hosts.forEach(([n, ipa, x]) => { s += line(x, 150, x, 120, { color: NOTE }) + box(x - 55, 80, 110, 40, "Host " + n + "\n" + ipa, { size: 11, fill: n === "A" ? COLORS[0] : n === "B" ? COLORS[2] : "#fff" }); });
  s += text(360, 22, "1. ARP request (broadcast to FF:FF:FF:FF:FF:FF): \"Who has 192.168.1.3? Tell 192.168.1.2\"", { size: 12, color: ACCENT, weight: "bold" });
  s += polyArrow([[90, 75], [90, 40], [620, 40], [620, 76]], { color: ACCENT }) + arrow(270, 40, 270, 76, { color: ACCENT }) + arrow(450, 40, 450, 76, { color: ACCENT });
  s += text(270, 200, "2. ARP reply (unicast to A): \"192.168.1.3 is at BB:BB:BB:BB:BB:BB\"", { size: 12, color: RED, weight: "bold" });
  s += polyArrow([[450, 152], [450, 180], [90, 180], [90, 154]], { color: RED });
  s += text(360, 228, "3. A stores the mapping in its ARP cache and sends the frame to B's MAC address", { size: 12, color: NOTE });
  return svgDoc(730, 265, s + caption(730, 254, "ARP: the request is broadcast; only the owner of the IP address replies"), "ARP");
})();

files["ipv6-header.svg"] = (() => {
  const rows = [
    [["Version\n(4)", 4], ["Traffic class (8)", 8], ["Flow label (20)", 20]],
    [["Payload length (16)", 16], ["Next header (8)", 8], ["Hop limit (8)", 8]],
    [["Source address (128 bits)", 32]],
    [["Destination address (128 bits)", 32]],
    [["Payload (extension headers and data)", 32]],
  ];
  let s = text(360, 16, "32 bits", { size: 12, color: NOTE }) + line(110, 24, 610, 24, { color: NOTE, width: 1 });
  const hs = [38, 38, 70, 70, 38]; let y = 30;
  rows.forEach((r, i) => { let x = 110; r.forEach(([l, b], k) => { const w = (500 * b) / 32; s += box(x, y, w, hs[i], l, { size: 11, fill: i === 4 ? "#fff" : COLORS[(i * 2 + k) % COLORS.length] }); x += w; }); y += hs[i]; });
  s += text(625, 140, "40-byte", { size: 12, color: RED, weight: "bold", anchor: "start" }) + text(625, 156, "fixed header", { size: 12, color: RED, weight: "bold", anchor: "start" });
  return svgDoc(720, 330, s + caption(720, 318, "IPv6 base header (fixed 40 bytes)"), "IPv6 header");
})();

// ======================= 9.16 Routing =======================
const weightedGraph = (nodes, edges, { r = 22, highlight = [] } = {}) => {
  let t = "";
  edges.forEach(([a, b, c, lx = 0, ly = 0]) => {
    const on = highlight.some(([p, q]) => (p === a && q === b) || (p === b && q === a));
    const [x1, y1] = nodes[a], [x2, y2] = nodes[b];
    t += line(x1, y1, x2, y2, { color: on ? RED : NOTE, width: on ? 4 : 2 });
    t += `<circle cx="${(x1 + x2) / 2 + lx}" cy="${(y1 + y2) / 2 + ly}" r="11" fill="#fff"/>` + text((x1 + x2) / 2 + lx, (y1 + y2) / 2 + ly, String(c), { size: 13, weight: "bold", color: ACCENT });
  });
  Object.entries(nodes).forEach(([k, [x, y]]) => { t += circle(x, y, k, { r, size: 15, fill: COLORS[0] }); });
  return t;
};
files["lsr-graph.svg"] = (() => {
  const nodes = { u: [70, 150], v: [230, 60], w: [450, 60], x: [230, 240], y: [450, 240], z: [610, 150] };
  const edges = [["u", "v", 2], ["u", "x", 1], ["u", "w", 5, 30, -25], ["v", "x", 2], ["v", "w", 3], ["x", "w", 3, -25, 15], ["x", "y", 1], ["w", "y", 1], ["w", "z", 5], ["y", "z", 2]];
  let s = weightedGraph(nodes, edges, { highlight: [["u", "v"], ["u", "x"], ["x", "y"], ["y", "w"], ["y", "z"]] });
  s += text(360, 292, "Red links: the shortest-path tree from u found by Dijkstra's algorithm", { size: 12, color: NOTE });
  return svgDoc(700, 330, s + caption(700, 318, "A network with link costs and the shortest-path tree of router u"), "Link-state graph");
})();

files["dv-example.svg"] = (() => {
  const nodes = { x: [120, 170], y: [300, 40], z: [480, 170] };
  let s = weightedGraph(nodes, [["x", "y", 2], ["y", "z", 1], ["x", "z", 7, 0, 14]], { r: 24 });
  s += text(300, 225, "Dx(z) = min{ c(x,y) + Dy(z),  c(x,z) + Dz(z) } = min{ 2 + 1,  7 + 0 } = 3   (via y)", { size: 12, weight: "bold" });
  return svgDoc(600, 270, s + caption(600, 256, "Distance-vector calculation at router x using the Bellman-Ford equation"), "Distance vector example");
})();

files["as-routing.svg"] = (() => {
  const R = { "1a": [150, 110], "1b": [205, 175], "1c": [250, 110], "2a": [520, 110], "2b": [610, 110], "2c": [565, 175], "3a": [380, 300], "3b": [340, 360], "3c": [430, 360] };
  const gw = ["1b", "1c", "2a", "3a"];
  const ell = (cx, cy, rx, ry, name, proto, ny, py, nx = cx, px = cx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${FILL}" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>` + text(nx, ny, name, { size: 13, weight: "bold", color: ACCENT }) + text(px, py, proto, { size: 11, color: NOTE });
  let s = ell(200, 140, 140, 95, "AS 1", "intra-AS: OSPF or RIP", 62, 212, 200, 140) + ell(565, 140, 140, 95, "AS 2", "intra-AS: OSPF", 62, 222) + ell(385, 340, 125, 75, "AS 3", "intra-AS: RIP", 330, 400, 470, 385);
  [["1a", "1b"], ["1a", "1c"], ["1b", "1c"], ["2a", "2b"], ["2a", "2c"], ["2b", "2c"], ["3a", "3b"], ["3a", "3c"], ["3b", "3c"]].forEach(([a, b]) => { s += line(...R[a], ...R[b], { color: NOTE }); });
  s += line(...R["1c"], ...R["2a"], { color: RED, width: 3 }) + text(385, 98, "eBGP", { size: 12, color: RED, weight: "bold" });
  s += line(...R["1b"], ...R["3a"], { color: RED, width: 3 }) + text(272, 255, "eBGP", { size: 12, color: RED, weight: "bold" });
  Object.entries(R).forEach(([k, [x, y]]) => { s += circle(x, y, k, { r: 17, size: 11, fill: gw.includes(k) ? COLORS[2] : "#fff" }); });
  s += text(380, 438, "Yellow = gateway routers. Intra-AS protocols route inside each AS; BGP routes between ASes (iBGP spreads routes inside an AS).", { size: 11, color: NOTE });
  return svgDoc(760, 475, s + caption(760, 462, "Hierarchical routing: autonomous systems, intra-AS routing and inter-AS routing (BGP)"), "Autonomous systems");
})();

// ======================= 9.17 Wireless and Cellular Networks =======================
files["wlan-architecture.svg"] = (() => {
  let s = "";
  const bss = (cx, cy, name) => `<ellipse cx="${cx}" cy="${cy}" rx="120" ry="80" fill="${FILL}" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>` + text(cx, cy - 64, name, { size: 12, weight: "bold", color: ACCENT });
  s += box(150, 15, 330, 34, "Distribution system (wired LAN) → router → Internet", { size: 12, fill: COLORS[4] });
  s += bss(160, 175, "BSS 1") + bss(460, 175, "BSS 2");
  s += line(160, 49, 160, 140, { color: INK, width: 2 }) + line(460, 49, 460, 140, { color: INK, width: 2 });
  s += box(125, 140, 70, 30, "AP 1", { size: 12, fill: COLORS[2] }) + box(425, 140, 70, 30, "AP 2", { size: 12, fill: COLORS[2] });
  [[95, 205], [160, 222], [225, 205], [395, 205], [460, 222], [525, 205]].forEach(([x, y], i) => { const ax = i < 3 ? 160 : 460; s += line(ax, 170, x, y - 12, { color: ACCENT, dash: "4 3" }) + circle(x, y, "S", { r: 12, size: 10 }); });
  s += text(310, 270, "ESS = BSS 1 + BSS 2 + distribution system (infrastructure mode)", { size: 12, color: NOTE });
  s += `<ellipse cx="660" cy="175" rx="80" ry="70" fill="#fff" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/>` + text(660, 120, "Ad hoc (IBSS)", { size: 12, weight: "bold", color: ACCENT });
  [[625, 165], [695, 165], [660, 215]].forEach(([x, y]) => { s += circle(x, y, "S", { r: 12, size: 10 }); });
  s += line(637, 165, 683, 165, { color: ACCENT, dash: "4 3" }) + line(630, 176, 652, 205, { color: ACCENT, dash: "4 3" }) + line(690, 176, 668, 205, { color: ACCENT, dash: "4 3" });
  s += text(660, 262, "no access point", { size: 11, color: NOTE });
  return svgDoc(750, 310, s + caption(750, 298, "IEEE 802.11 architecture: BSS with access points, ESS and an ad hoc network (S = station)"), "WLAN architecture");
})();

files["hidden-terminal.svg"] = (() => {
  let s = `<circle cx="160" cy="145" r="132" fill="${COLORS[0]}" fill-opacity="0.25" stroke="${ACCENT}" stroke-dasharray="5 4"/>` + `<circle cx="400" cy="145" r="132" fill="${COLORS[1]}" fill-opacity="0.3" stroke="${ACCENT}" stroke-dasharray="5 4"/>`;
  s += circle(160, 145, "A", { r: 20 }) + circle(280, 145, "B", { r: 20, fill: COLORS[2] }) + circle(400, 145, "C", { r: 20 });
  s += text(100, 220, "range of A", { size: 11, color: NOTE }) + text(460, 220, "range of C", { size: 11, color: NOTE });
  s += text(280, 300, "B is in the range of both A and C, but A and C cannot hear each other:", { size: 12, color: NOTE }) + text(280, 317, "their frames collide at B (hidden terminals)", { size: 12, color: NOTE });
  const ax = 560, bx = 680;
  s += text(ax, 22, "A", { size: 13, weight: "bold" }) + text(bx, 22, "B", { size: 13, weight: "bold" }) + line(ax, 30, ax, 290, { width: 3 }) + line(bx, 30, bx, 290, { width: 3 });
  s += msg(ax, 45, bx, 70, "RTS") + msg(bx, 85, ax, 110, "CTS", { color: INK }) + msg(ax, 130, bx, 190, "DATA") + msg(bx, 205, ax, 230, "ACK", { color: INK });
  s += text(bx + 8, 95, "C also hears", { size: 10, color: RED, anchor: "start" }) + text(bx + 8, 109, "the CTS and", { size: 10, color: RED, anchor: "start" }) + text(bx + 8, 123, "stays silent", { size: 10, color: RED, anchor: "start" });
  return svgDoc(790, 355, s + caption(790, 343, "The hidden-terminal problem and its solution with RTS/CTS"), "Hidden terminal");
})();

files["vsat-network.svg"] = (() => {
  let s = box(300, 15, 140, 40, "GEO satellite\n(35 786 km)", { size: 11, fill: COLORS[2] });
  s += box(300, 230, 140, 46, "Hub earth station\n(large dish)", { size: 11, fill: COLORS[4] });
  s += arrow(370, 228, 370, 58, { color: ACCENT }) + arrow(380, 58, 380, 228, { color: RED });
  s += box(470, 238, 120, 30, "Internet / data centre", { size: 10, fill: "#fff" }) + line(440, 253, 470, 253, { color: NOTE });
  [[70, 160, "VSAT\n(bank branch)"], [170, 200, "VSAT\n(ATM)"], [590, 160, "VSAT\n(remote office)"], [640, 90, "VSAT\n(ship)"]].forEach(([x, y, l]) => { s += box(x - 48, y - 20, 96, 40, l, { size: 10, fill: COLORS[0] }) + line(x, y - 20, x < 370 ? 300 : 440, 45, { color: NOTE, dash: "5 4" }); });
  s += text(370, 300, "Star topology: every VSAT talks to the hub through the satellite (VSAT → satellite → hub → satellite → VSAT)", { size: 11, color: NOTE });
  return svgDoc(740, 340, s + caption(740, 328, "A VSAT network: small terminals connected through a satellite to a central hub"), "VSAT network");
})();

// ======================= 9.18 ATM =======================
files["atm-cell.svg"] = (() => {
  let s = box(20, 30, 120, 50, "Header\n5 bytes", { size: 12, fill: COLORS[2] }) + box(140, 30, 560, 50, "Payload (user data) — 48 bytes", { size: 12, fill: "#fff" });
  s += text(360, 98, "ATM cell = 53 bytes", { size: 13, weight: "bold", color: RED });
  const hdr = (y, title, fields) => {
    let t = text(20, y - 10, title, { size: 12, weight: "bold", anchor: "start", color: ACCENT }); let x = 20; const unit = 680 / 40;
    fields.forEach(([l, b], i) => { t += box(x, y, b * unit, 38, b > 1 ? l + "\n" + b + " bits" : "C", { size: 10, fill: COLORS[i % COLORS.length] }); x += b * unit; });
    return t;
  };
  s += hdr(145, "UNI header (user–network interface)", [["GFC", 4], ["VPI", 8], ["VCI", 16], ["PT", 3], ["CLP", 1], ["HEC", 8]]);
  s += hdr(225, "NNI header (network–network interface)", [["VPI", 12], ["VCI", 16], ["PT", 3], ["CLP", 1], ["HEC", 8]]);
  s += text(360, 285, "GFC = generic flow control, VPI = virtual path identifier, VCI = virtual channel identifier,", { size: 11, color: NOTE });
  s += text(360, 301, "PT = payload type, C = CLP (cell loss priority, 1 bit), HEC = header error control (CRC of the header)", { size: 11, color: NOTE });
  return svgDoc(720, 340, s + caption(720, 328, "The ATM cell and its UNI and NNI headers"), "ATM cell");
})();

files["atm-layers.svg"] = (() => {
  let s = box(250, 20, 260, 40, "Upper layers (IP, voice, video)", { size: 12, fill: "#fff" });
  s += box(250, 70, 260, 70, "", { fill: COLORS[0] }) + text(380, 86, "ATM adaptation layer (AAL)", { size: 12, weight: "bold" });
  s += box(262, 98, 116, 34, "CS (convergence)", { size: 10, fill: "#fff" }) + box(382, 98, 116, 34, "SAR (segmentation\nand reassembly)", { size: 10, fill: "#fff" });
  s += box(250, 150, 260, 44, "ATM layer\n(cell header, VPI/VCI switching)", { size: 11, fill: COLORS[2] });
  s += box(250, 204, 260, 70, "", { fill: COLORS[1] }) + text(380, 220, "Physical layer", { size: 12, weight: "bold" });
  s += box(262, 232, 116, 34, "TC (transmission\nconvergence)", { size: 10, fill: "#fff" }) + box(382, 232, 116, 34, "PMD (physical\nmedium dependent)", { size: 10, fill: "#fff" });
  s += text(530, 105, "splits data into 48-byte payloads", { size: 11, color: NOTE, anchor: "start" }) + text(530, 172, "adds the 5-byte header", { size: 11, color: NOTE, anchor: "start" }) + text(530, 240, "sends cells as bits (SONET, fibre)", { size: 11, color: NOTE, anchor: "start" });
  s += text(230, 105, "AAL1, AAL2, AAL3/4, AAL5", { size: 11, color: NOTE, anchor: "end" });
  return svgDoc(760, 310, s + caption(760, 298, "Layers of the ATM reference model"), "ATM layers");
})();

files["atm-vp-vc.svg"] = (() => {
  let s = "";
  // a transmission path containing two VPs each with VCs
  s += rect(30, 30, 300, 150, { fill: "#f7fbfa", rx: 8 }) + text(180, 20, "Transmission path (TP) — the physical link", { size: 12, weight: "bold" });
  [[50, "VP 1"], [110, "VP 2"]].forEach(([y, l]) => { s += rect(45, y, 270, 50, { fill: COLORS[0], rx: 25 }) + text(65, y + 25, l, { size: 11, weight: "bold", anchor: "start" }); [0, 1, 2].forEach((k) => { s += line(110, y + 13 + k * 12, 300, y + 13 + k * 12, { color: INK, width: 2 }); }); });
  s += text(205, 190, "each line = one virtual channel (VC); a VP is a bundle of VCs", { size: 11, color: NOTE });
  // switching table
  s += box(420, 40, 100, 90, "ATM\nswitch", { size: 13, fill: COLORS[2] });
  s += arrow(345, 100, 418, 100) + text(381, 72, "in: port 1", { size: 11 }) + text(381, 88, "VPI 14, VCI 21", { size: 11 }) + arrow(520, 100, 600, 100) + text(560, 72, "out: port 3", { size: 11 }) + text(560, 88, "VPI 22, VCI 74", { size: 11 });
  
  const tb = [["In port", "In VPI", "In VCI", "Out port", "Out VPI", "Out VCI"], ["1", "14", "21", "3", "22", "74"]];
  tb.forEach((r, i) => r.forEach((c, k) => { s += box(370 + k * 60, 150 + i * 26, 60, 26, c, { size: 10, fill: i === 0 ? COLORS[4] : "#fff", weight: i === 0 ? "bold" : "normal" }); }));
  s += text(550, 222, "switching table: the switch changes the VPI/VCI at each hop", { size: 11, color: NOTE });
  return svgDoc(740, 255, s + caption(740, 244, "Virtual paths and virtual channels, and a VP/VC switch with its switching table"), "ATM VP and VC");
})();

files["banyan-switch.svg"] = (() => {
  let s = "";
  const N = 8, stages = 3, x0 = 120, dx = 160, y0 = 40, dy = 42;
  // microswitches: each stage has 4 boxes handling inputs (2k, 2k+1) in a shuffle order
  const portY = (i) => y0 + i * dy;
  for (let st = 0; st < stages; st++) for (let k = 0; k < 4; k++) s += rect(x0 + st * dx, portY(2 * k) - 12, 50, dy + 24, { fill: COLORS[st], rx: 4 });
  for (let i = 0; i < N; i++) { s += text(x0 - 30, portY(i), "in " + i, { size: 11, anchor: "end" }) + line(x0 - 25, portY(i), x0, portY(i), { color: NOTE }); s += text(x0 + 2 * dx + 50 + 40, portY(i), (i).toString(2).padStart(3, "0"), { size: 11, anchor: "start", weight: "bold" }) + line(x0 + 2 * dx + 50, portY(i), x0 + 2 * dx + 80, portY(i), { color: NOTE }); }
  // inter-stage wiring (banyan: stage1->2 swap by bit2 groups, 2->3 by bit1)
  const wire = (st, from, to, color = "#9aaeb0", w = 1.2) => line(x0 + st * dx + 50, portY(from), x0 + (st + 1) * dx, portY(to), { color, width: w });
  // stage 1 switch k, output u -> stage 2 switch 2u + floor(k/2), input k%2
  for (let k = 0; k < 4; k++) for (let u = 0; u < 2; u++) s += wire(0, 2 * k + u, 2 * (2 * u + Math.floor(k / 2)) + (k % 2));
  // stage 2 switch m, output u -> stage 3 switch 2*floor(m/2) + u, input m%2
  for (let m = 0; m < 4; m++) for (let u = 0; u < 2; u++) s += wire(1, 2 * m + u, 2 * (2 * Math.floor(m / 2) + u) + (m % 2));
  s += text(x0 + 25, 18, "Stage 1 (1st bit)", { size: 11, weight: "bold" }) + text(x0 + dx + 25, 18, "Stage 2 (2nd bit)", { size: 11, weight: "bold" }) + text(x0 + 2 * dx + 25, 18, "Stage 3 (3rd bit)", { size: 11, weight: "bold" });
  s += text(x0 + 2 * dx + 105, 18, "output", { size: 11, weight: "bold", anchor: "start" });
  s += text(330, 390, "Each 2×2 microswitch sends a cell up for bit 0 and down for bit 1 of the output port number.", { size: 11, color: NOTE });
  s += text(330, 406, "8 inputs need log₂ 8 = 3 stages of 4 microswitches = 12 microswitches (a crossbar needs 64 crosspoints).", { size: 11, color: NOTE });
  return svgDoc(660, 445, s + caption(660, 432, "An 8 × 8 banyan switch: three stages of 2 × 2 microswitches"), "Banyan switch");
})();

// ======================= 9.19 Telecommunication =======================
files["telecom-system.svg"] = (() => {
  const b = [["Information\nsource", "#fff"], ["Input\ntransducer", COLORS[0]], ["Transmitter", COLORS[2]], ["Channel\n(medium)", COLORS[1]], ["Receiver", COLORS[2]], ["Output\ntransducer", COLORS[0]], ["Destination", "#fff"]];
  let s = "";
  b.forEach(([l, f], i) => { const x = 10 + i * 102; s += box(x, 60, 88, 52, l, { size: 11, fill: f }); if (i) s += arrow(x - 14, 86, x - 1, 86); });
  s += box(316, 160, 88, 36, "Noise", { size: 12, fill: "#f6d5d5" }) + arrow(360, 160, 360, 114, { color: RED });
  s += text(105, 135, "e.g. microphone", { size: 10, color: NOTE }) + text(207, 135, "modulation", { size: 10, color: NOTE }) + text(462, 135, "demodulation", { size: 10, color: NOTE }) + text(564, 135, "e.g. loudspeaker", { size: 10, color: NOTE });
  s += text(360, 30, "electrical signal ←— message —→ electrical signal", { size: 11, color: NOTE });
  return svgDoc(720, 230, s + caption(720, 218, "Block diagram of a telecommunication system"), "Telecommunication system");
})();

files["pstn-hierarchy.svg"] = (() => {
  let s = box(285, 15, 150, 40, "International gateway\nexchange", { size: 11, fill: COLORS[4] });
  s += box(140, 85, 150, 40, "Trunk (toll)\nexchange", { size: 11, fill: COLORS[2] }) + box(430, 85, 150, 40, "Trunk (toll)\nexchange", { size: 11, fill: COLORS[2] });
  s += box(60, 160, 130, 40, "Local exchange\n(central office)", { size: 11, fill: COLORS[0] }) + box(240, 160, 130, 40, "Local exchange", { size: 11, fill: COLORS[0] }) + box(530, 160, 130, 40, "Local exchange", { size: 11, fill: COLORS[0] });
  s += line(215, 85, 330, 55, { color: NOTE }) + line(505, 85, 390, 55, { color: NOTE }) + line(290, 105, 430, 105, { color: RED, width: 2 }) + text(360, 98, "trunks", { size: 10, color: RED });
  s += line(125, 160, 195, 125, { color: NOTE }) + line(305, 160, 235, 125, { color: NOTE }) + line(595, 160, 505, 125, { color: NOTE });
  [[85, 250], [165, 250], [270, 250], [345, 250], [560, 250], [635, 250]].forEach(([x, y], i) => { const lx = [125, 125, 305, 305, 595, 595][i]; s += line(lx, 200, x, y - 14, { color: ACCENT, dash: "4 3" }) + box(x - 26, y - 14, 52, 28, "☎", { size: 13, fill: "#fff" }); });
  s += text(360, 292, "local loop (subscriber line): twisted pair from each telephone to its local exchange", { size: 11, color: NOTE });
  return svgDoc(720, 330, s + caption(720, 318, "The hierarchy of the public switched telephone network (PSTN)"), "PSTN hierarchy");
})();

files["cellular-reuse.svg"] = (() => {
  const R = 34, hex = (cx, cy, label, fill) => { const pts = []; for (let k = 0; k < 6; k++) { const a = (Math.PI / 3) * k; pts.push(`${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`); } return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.5"/>` + text(cx, cy, label, { size: 13, weight: "bold" }); };
  const w = 1.5 * R, h = Math.sqrt(3) * R;
  const cluster = [[0, 0, "A"], [0, -1, "B"], [1, -0.5, "C"], [1, 0.5, "D"], [0, 1, "E"], [-1, 0.5, "F"], [-1, -0.5, "G"]];
  const fills = { A: COLORS[0], B: COLORS[1], C: COLORS[2], D: COLORS[3], E: COLORS[4], F: COLORS[5], G: COLORS[6] };
  let s = "";
  const centres = [[240, 170], [240 + 2 * w + w, 170 - 0.5 * h], [240 + w, 170 + 2.5 * h]];
  centres.slice(0, 2).forEach(([cx, cy]) => { cluster.forEach(([dx, dy, l]) => { s += hex(cx + dx * w, cy + dy * h, l, fills[l]); }); });
  s += line(240, 170, 240 + 3 * w, 170 - 0.5 * h, { color: RED, width: 2.5, dash: "6 4" }) 
  s += text(560, 120, "Cluster of N = 7 cells", { size: 12, weight: "bold", anchor: "start" }) + text(560, 140, "(A–G use different", { size: 11, anchor: "start", color: NOTE }) + text(560, 156, "frequency groups)", { size: 11, anchor: "start", color: NOTE });
  s += text(560, 190, "Cells with the same letter", { size: 11, anchor: "start", color: NOTE }) + text(560, 206, "reuse the same frequencies", { size: 11, anchor: "start", color: NOTE });
  s += text(560, 240, "Red dashed line: reuse distance", { size: 11, anchor: "start", color: RED }) + text(560, 262, "D = R √(3N) = 4.58 R", { size: 12, weight: "bold", anchor: "start" });
  return svgDoc(760, 310, s + caption(760, 298, "Frequency reuse with seven-cell clusters"), "Frequency reuse");
})();

files["gsm-architecture.svg"] = (() => {
  let s = rect(10, 40, 110, 200, { fill: "#f7fbfa", rx: 8 }) + text(65, 30, "Mobile station", { size: 12, weight: "bold" });
  s += box(25, 70, 80, 40, "ME\n(phone)", { size: 11, fill: COLORS[0] }) + box(25, 130, 80, 40, "SIM", { size: 11, fill: COLORS[0] });
  s += rect(150, 40, 200, 200, { fill: "#f7fbfa", rx: 8 }) + text(250, 30, "Base station subsystem (BSS)", { size: 12, weight: "bold" });
  s += box(165, 70, 70, 40, "BTS", { size: 12, fill: COLORS[2] }) + box(165, 150, 70, 40, "BTS", { size: 12, fill: COLORS[2] }) + box(265, 110, 70, 40, "BSC", { size: 12, fill: COLORS[2] });
  s += line(235, 90, 265, 125, { color: NOTE }) + line(235, 170, 265, 135, { color: NOTE });
  s += rect(380, 40, 230, 200, { fill: "#f7fbfa", rx: 8 }) + text(495, 30, "Network switching subsystem (NSS)", { size: 12, weight: "bold" });
  s += box(395, 110, 80, 40, "MSC\n(+ VLR)", { size: 11, fill: COLORS[1] }) + box(515, 55, 80, 34, "HLR", { size: 11, fill: COLORS[3] }) + box(515, 105, 80, 34, "AuC", { size: 11, fill: COLORS[3] }) + box(515, 155, 80, 34, "EIR", { size: 11, fill: COLORS[3] }) + box(395, 185, 80, 40, "GMSC", { size: 11, fill: COLORS[1] });
  s += line(475, 125, 515, 72, { color: NOTE }) + line(475, 130, 515, 122, { color: NOTE }) + line(475, 135, 515, 172, { color: NOTE }) + line(435, 150, 435, 185, { color: NOTE });
  s += box(640, 185, 70, 40, "PSTN /\nother nets", { size: 10, fill: "#fff" }) + line(475, 205, 640, 205, { color: NOTE });
  s += arrow(105, 90, 163, 90) + text(134, 120, "Um", { size: 10, color: NOTE }) + text(134, 134, "(radio)", { size: 10, color: NOTE }) + text(250, 220, "Abis", { size: 10, color: NOTE }) + line(335, 130, 395, 130, { color: NOTE }) + text(365, 120, "A", { size: 10, color: NOTE });
  s += box(360, 265, 280, 36, "Operation support subsystem (OSS / OMC)", { size: 11, fill: COLORS[4] });
  return svgDoc(720, 330, s + caption(720, 320, "GSM architecture: MS, BSS, NSS and OSS"), "GSM architecture");
})();

files["multiple-access.svg"] = (() => {
  let s = "";
  const panel = (ox, title, kind) => {
    let t = text(ox + 105, 20, title, { size: 13, weight: "bold", color: ACCENT });
    t += line(ox + 20, 220, ox + 200, 220, { color: INK, width: 1.5 }) + line(ox + 20, 220, ox + 20, 40, { color: INK, width: 1.5 });
    t += text(ox + 110, 238, "time", { size: 11, color: NOTE }) + `<text x="${ox + 10}" y="130" ${FONT} font-size="11" fill="${NOTE}" text-anchor="middle" transform="rotate(-90 ${ox + 10} 130)">frequency</text>`;
    if (kind === "F") [0, 1, 2, 3].forEach((k) => { t += rect(ox + 24, 50 + k * 42, 172, 34, { fill: COLORS[k], rx: 2 }) + text(ox + 110, 67 + k * 42, "User " + (k + 1), { size: 11, weight: "bold" }); });
    if (kind === "T") [0, 1, 2, 3].forEach((k) => { t += rect(ox + 24 + k * 43, 45, 39, 172, { fill: COLORS[k], rx: 2 }) + `<text x="${ox + 44 + k * 43}" y="130" ${FONT} font-size="11" font-weight="bold" fill="${INK}" text-anchor="middle" transform="rotate(-90 ${ox + 44 + k * 43} 130)">User ${k + 1}</text>`; });
    if (kind === "C") { [0, 1, 2, 3].forEach((k) => { t += `<rect x="${ox + 24 + k * 6}" y="${45 + k * 6}" width="${160}" height="${160}" fill="${COLORS[k]}" fill-opacity="0.55" stroke="${INK}"/>`; }); t += text(ox + 125, 130, "all users,", { size: 11, weight: "bold" }) + text(ox + 125, 146, "different codes", { size: 11, weight: "bold" }); }
    return t;
  };
  s += panel(10, "FDMA", "F") + panel(250, "TDMA", "T") + panel(490, "CDMA", "C");
  return svgDoc(720, 280, s + caption(720, 268, "FDMA divides frequency, TDMA divides time, CDMA separates users by codes"), "Multiple access");
})();

files["fiber-system.svg"] = (() => {
  const b = [["Electrical\ninput signal", "#fff"], ["Driver +\nlight source\n(LED / laser)", COLORS[2]], ["Optical fibre", COLORS[1]], ["Repeater /\noptical amplifier", COLORS[0]], ["Optical fibre", COLORS[1]], ["Photodetector\n(PIN / APD)", COLORS[2]], ["Amplifier +\nelectrical output", "#fff"]];
  let s = "";
  b.forEach(([l, f], i) => { const x = 8 + i * 102; s += box(x, 50, 90, 62, l, { size: 10, fill: f }); if (i) s += arrow(x - 12, 81, x - 1, 81); });
  s += text(155, 135, "transmitter (E → O)", { size: 11, color: ACCENT, weight: "bold" }) + text(360, 135, "channel", { size: 11, color: ACCENT, weight: "bold" }) + text(615, 135, "receiver (O → E)", { size: 11, color: ACCENT, weight: "bold" });
  return svgDoc(730, 175, s + caption(730, 163, "Block diagram of an optical fibre communication system"), "Optical fibre system");
})();

files["satellite-orbits.svg"] = (() => {
  let s = `<circle cx="200" cy="170" r="60" fill="#a9c4eb" stroke="${INK}" stroke-width="2"/>` + text(200, 170, "Earth", { size: 13, weight: "bold" });
  [[80, "LEO (160–2000 km)", COLORS[3]], [110, "MEO (2000–35 786 km)", COLORS[2]], [150, "GEO (35 786 km)", COLORS[4]]].forEach(([r, l, c], i) => { s += `<circle cx="200" cy="170" r="${r}" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="${i === 2 ? "" : "5 4"}"/>` + circle(200 + r * Math.cos(-0.6 - i * 0.35), 170 + r * Math.sin(-0.6 - i * 0.35), "", { r: 6, fill: c }); s += circle(386, 60 + i * 20, "", { r: 6, fill: c }) + text(398, 60 + i * 20, l, { size: 12, anchor: "start", color: INK }); });
  s += text(380, 30, "Orbits (not to scale)", { size: 12, weight: "bold", anchor: "start", color: ACCENT });
  // uplink/downlink
  s += box(470, 140, 110, 34, "Satellite\n(transponder)", { size: 10, fill: COLORS[4] });
  s += box(395, 270, 90, 30, "Earth station A", { size: 10, fill: "#fff" }) + box(570, 270, 90, 30, "Earth station B", { size: 10, fill: "#fff" });
  s += arrow(440, 268, 505, 176, { color: ACCENT, label: "uplink (f₁)", lx: -38, size: 10 }) + arrow(550, 176, 612, 268, { color: RED, label: "downlink (f₂)", lx: 40, size: 10 });
  s += text(525, 318, "f₁ ≠ f₂: e.g. C band 6 GHz up, 4 GHz down", { size: 11, color: NOTE });
  return svgDoc(720, 360, s + caption(720, 348, "Satellite orbits and the uplink and downlink of a transponder"), "Satellite orbits");
})();

mkdirSync(OUT, { recursive: true });
for (const [name, svg] of Object.entries(files)) writeFileSync(path.join(OUT, name), svg);
console.log(`Wrote ${Object.keys(files).length} diagrams to ${path.relative(process.cwd(), OUT)}`);
