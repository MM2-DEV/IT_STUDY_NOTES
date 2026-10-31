import {
  Binary,
  BookOpen,
  BrainCircuit,
  CodeXml,
  Cpu,
  Database,
  FileCode,
  Laptop,
  ListTree,
  type LucideIcon,
  Microchip,
  MonitorCog,
  Network,
  Palette,
  ShieldCheck,
  Sigma,
  ToggleRight,
  UtilityPole,
  Workflow,
  Wrench,
} from "lucide-react";

/** Icon for each category folder in content/. Categories not listed here use BookOpen. */
const categoryIcons: Record<string, LucideIcon> = {
  "computer-fundamentals": Laptop,
  "number-systems": Binary,
  "digital-logic": ToggleRight,
  "computer-architecture": Cpu,
  microprocessors: Microchip,
  "computer-maintenance": Wrench,
  "operating-systems": MonitorCog,
  "data-structures-algorithms": ListTree,
  programming: CodeXml,
  "software-engineering": Workflow,
  dbms: Database,
  "computer-networks": Network,
  cybersecurity: ShieldCheck,
  "graphics-multimedia": Palette,
  "compiler-theory": FileCode,
  "artificial-intelligence": BrainCircuit,
  "discrete-mathematics": Sigma,
  "power-sector": UtilityPole,
};

export function categoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] ?? BookOpen;
}
