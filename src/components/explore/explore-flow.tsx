"use client";

import "@xyflow/react/dist/base.css";

import { useEffect } from "react";
import Link from "next/link";
import {
  type Edge,
  Handle,
  type Node,
  type NodeProps,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

import { BorderBeams } from "@/components/border-beam";
import { Badge } from "@/components/ui/badge";
import { type ExploreBranch, type ExploreLeaf, exploreTree } from "@/config/site";

// The home page "Explore" tree drawn with React Flow (@xyflow/react, MIT licence):
// CSE Core → Govt IT / Software Engineering → section cards. It is a fixed diagram: nodes cannot
// be dragged, and the view cannot be panned or zoomed, so page scrolling works over it.
// Below the xl breakpoint, explore-tree-list.tsx shows the same tree as a list instead.

export type CategoryInfo = Record<string, { title: string; topics: number }>;

/* ---------- Layout (left to right) ---------- */

const ROOT = { width: 230, height: 138 };
const BRANCH = { width: 250, height: 150 };
const LEAF = { width: 320, height: 128 };
const COLUMN = { root: 0, branch: 430, leaf: 880 };
/** The tree may be drawn slightly larger than its layout size on very wide screens. */
const MAX_ZOOM = 1.05;
/** Seconds between the border beams of neighbouring cards, so they do not move in step. */
const BEAM_STAGGER = 1.1;
const LEAF_GAP = 18;
const GROUP_GAP = 56;

type RootData = { kind: "root" };
type BranchData = { kind: "branch"; branch: ExploreBranch; offset: number };
type LeafData = { kind: "leaf"; leaf: ExploreLeaf; categories: CategoryInfo; offset: number };
type TreeNode = Node<RootData | BranchData | LeafData>;

function buildGraph(categories: CategoryInfo) {
  const nodes: TreeNode[] = [];
  const edges: Edge[] = [];
  const branchCenters: number[] = [];
  let y = 0;
  let leafCount = 0;

  exploreTree.branches.forEach((branch, branchIndex) => {
    const top = y;
    branch.leaves.forEach((leaf, index) => {
      const id = `${branch.id}-${index}`;
      nodes.push({
        id,
        type: "leaf",
        position: { x: COLUMN.leaf, y },
        data: { kind: "leaf", leaf, categories, offset: (leafCount++ + 2) * BEAM_STAGGER },
        ...LEAF,
      });
      edges.push({ id: `${branch.id}->${id}`, source: branch.id, target: id, animated: true });
      y += LEAF.height + LEAF_GAP;
    });
    const center = (top + y - LEAF_GAP) / 2;
    branchCenters.push(center);
    nodes.push({
      id: branch.id,
      type: "branch",
      position: { x: COLUMN.branch, y: center - BRANCH.height / 2 },
      data: { kind: "branch", branch, offset: (branchIndex + 1) * BEAM_STAGGER * 2 },
      ...BRANCH,
    });
    edges.push({ id: `root->${branch.id}`, source: "root", target: branch.id, animated: true });
    y += GROUP_GAP - LEAF_GAP;
  });

  const rootCenter = branchCenters.reduce((sum, c) => sum + c, 0) / branchCenters.length;
  nodes.push({
    id: "root",
    type: "root",
    position: { x: COLUMN.root, y: rootCenter - ROOT.height / 2 },
    data: { kind: "root" },
    ...ROOT,
  });

  const height = y - (GROUP_GAP - LEAF_GAP);
  return { nodes, edges, width: COLUMN.leaf + LEAF.width, height };
}

/* ---------- Nodes ---------- */

const HANDLE = "!size-2.5 !min-w-0 !rounded-full !border-2 !border-background !bg-muted-foreground/60";

function NodeCard({
  title,
  icon: Icon,
  children,
  emphasis = false,
  muted = false,
  beamOffset = 0,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  emphasis?: boolean;
  muted?: boolean;
  beamOffset?: number;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow",
        emphasis ? "border-primary/40 shadow-md" : "border-border",
        muted && "bg-muted/50"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-4 py-2.5",
          emphasis ? "border-primary/20 bg-primary/10" : "border-border/70"
        )}
      >
        <Icon className={cn("size-4 shrink-0", muted ? "text-muted-foreground" : "text-primary")} />
        <span className={cn("font-heading text-sm font-semibold", muted && "text-muted-foreground")}>
          {title}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {children}
      </div>
      <BorderBeams offset={beamOffset} />
    </div>
  );
}

function RootNode() {
  const { root } = exploreTree;
  return (
    <>
      <NodeCard title={root.title} icon={root.icon} emphasis>
        <p>{root.description}</p>
        <p className="mt-auto font-medium text-primary">2 paths</p>
      </NodeCard>
      <Handle type="source" position={Position.Right} isConnectable={false} className={HANDLE} />
    </>
  );
}

function BranchNode({ data }: NodeProps<Node<BranchData>>) {
  const { branch } = data;
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} className={HANDLE} />
      <NodeCard title={branch.title} icon={branch.icon} emphasis beamOffset={data.offset}>
        <p>{branch.description}</p>
        {branch.href ? (
          <Link
            href={branch.href}
            className="nodrag nopan mt-auto inline-flex items-center gap-1 self-start rounded-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            All {branch.title} topics <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : (
          <p className="mt-auto font-medium text-primary">{branch.leaves.length} sections</p>
        )}
      </NodeCard>
      <Handle type="source" position={Position.Right} isConnectable={false} className={HANDLE} />
    </>
  );
}

function LeafNode({ data }: NodeProps<Node<LeafData>>) {
  const { leaf, categories } = data;
  const covered = (leaf.categories ?? []).map((slug) => categories[slug]).filter(Boolean);
  const topics = covered.reduce((sum, category) => sum + category.topics, 0);

  const card = (
    <NodeCard title={leaf.title} icon={leaf.icon} muted={!leaf.available} beamOffset={data.offset}>
      <p>{leaf.description}</p>
      <div className="mt-auto flex items-center justify-between gap-2">
        {leaf.available ? (
          <>
            <span className="tabular-nums">
              {covered.length > 0 && `${covered.length} categories · ${topics} topics`}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              Open
              <ArrowRight
                className="size-3.5 transition-transform group-hover/leaf:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </>
        ) : (
          <Badge variant="outline">Coming soon</Badge>
        )}
      </div>
    </NodeCard>
  );

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} className={HANDLE} />
      {leaf.available ? (
        <Link
          href={leaf.href}
          title={covered.length > 0 ? covered.map((c) => c.title).join(", ") : undefined}
          className="nodrag nopan group/leaf block h-full rounded-2xl outline-none hover:[&>div]:border-primary/40 hover:[&>div]:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {card}
        </Link>
      ) : (
        card
      )}
    </>
  );
}

const nodeTypes = { root: RootNode, branch: BranchNode, leaf: LeafNode };

/* ---------- Flow ---------- */

/** Keeps the whole tree in view when the window is resized. */
function FitOnResize() {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const refit = () => fitView({ padding: 0.04, maxZoom: MAX_ZOOM });
    window.addEventListener("resize", refit);
    return () => window.removeEventListener("resize", refit);
  }, [fitView]);
  return null;
}

export function ExploreFlow({ categories }: { categories: CategoryInfo }) {
  const { nodes, edges, width, height } = buildGraph(categories);

  return (
    <div
      className="explore-flow relative w-full"
      // The box has the tree's proportions, so fitView fills it without empty bands.
      style={{ aspectRatio: `${width + 40} / ${height + 40}`, maxHeight: (height + 40) * MAX_ZOOM }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ type: "default" }}
          fitView
          fitViewOptions={{ padding: 0.04, maxZoom: MAX_ZOOM }}
          minZoom={0.4}
          maxZoom={MAX_ZOOM}
          // React Flow is MIT-licensed; the attribution link may be hidden.
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          aria-label="Site map: CSE Core branches into Govt IT and Software Engineering"
        >
          <FitOnResize />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
