"use client";

import React, { useState, useMemo, useEffect } from "react";

const S = 0.58;

type NodeColor = "gray" | "blue-light" | "blue-bright";
type NodeShape = "square" | "diamond" | "action";

interface FNode {
  id: string;
  label: string;
  shape: NodeShape;
  cx: number;
  cy: number;
  w: number;
  h: number;
  color: NodeColor;
}

interface FEdge {
  id: string;
  from: string;
  to: string;
}

const NODES_RAW: FNode[] = [
  { id: "entry",   label: "Entry",                            shape: "square",  cx: 166,  cy: 551, w: 176, h: 176, color: "gray" },
  { id: "predef",  label: "Pre defined\n(Data Source)",        shape: "diamond", cx: 421,  cy: 551, w: 229, h: 208, color: "blue-light" },
  { id: "saved",   label: "Select from\nsaved reports",        shape: "diamond", cx: 706,  cy: 273, w: 229, h: 208, color: "blue-light" },
  { id: "reportd", label: "Report page",                       shape: "diamond", cx: 706,  cy: 551, w: 229, h: 208, color: "blue-light" },
  { id: "filter",  label: "Filter Single\nMetric/Dimension",   shape: "square",  cx: 1230, cy: 220, w: 176, h: 176, color: "gray" },
  { id: "metric",  label: "Add Metric",                        shape: "square",  cx: 1230, cy: 443, w: 176, h: 176, color: "gray" },
  { id: "dim",     label: "Add Dimension",                     shape: "square",  cx: 1230, cy: 666, w: 176, h: 176, color: "gray" },
  { id: "date",    label: "Select Date",                       shape: "square",  cx: 1230, cy: 894, w: 176, h: 176, color: "gray" },
  { id: "run",     label: "Run Report",                        shape: "action",  cx: 1969, cy: 543, w: 192, h: 88,  color: "blue-bright" },
  { id: "reportr", label: "Report page",                       shape: "diamond", cx: 2353, cy: 543, w: 192, h: 172, color: "blue-light" },
  { id: "save",    label: "Save/Export/Share",                  shape: "action",  cx: 2353, cy: 291, w: 192, h: 88,  color: "gray" },
  { id: "compare", label: "Compare",                            shape: "action",  cx: 2353, cy: 795, w: 192, h: 88,  color: "gray" },
  { id: "afltr",   label: "Add/Remove filters\n(Client Side)", shape: "action",  cx: 2706, cy: 359, w: 192, h: 88,  color: "gray" },
  { id: "menu",    label: "Report menu",                        shape: "action",  cx: 2706, cy: 477, w: 192, h: 88,  color: "gray" },
  { id: "opts",    label: "Options to help\nanalyze the data", shape: "action",  cx: 2706, cy: 601, w: 192, h: 88,  color: "gray" },
  { id: "graphs",  label: "Graphs",                             shape: "action",  cx: 2706, cy: 725, w: 192, h: 88,  color: "gray" },
];

const NODES: FNode[] = NODES_RAW.map((n) => ({
  ...n,
  cx: n.cx * S,
  cy: n.cy * S,
  w: n.w * S,
  h: n.h * S,
}));

const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES: FEdge[] = [
  { id: "e1",  from: "entry",   to: "predef" },
  { id: "e2",  from: "entry",   to: "saved" },
  { id: "e3",  from: "predef",  to: "reportd" },
  { id: "e4",  from: "saved",   to: "reportd" },
  { id: "e5",  from: "reportd", to: "filter" },
  { id: "e6",  from: "reportd", to: "metric" },
  { id: "e7",  from: "reportd", to: "dim" },
  { id: "e8",  from: "reportd", to: "date" },
  { id: "e24", from: "filter",  to: "metric" },
  { id: "e25", from: "metric",  to: "dim" },
  { id: "e26", from: "dim",     to: "date" },
  { id: "e9",  from: "filter",  to: "run" },
  { id: "e10", from: "metric",  to: "run" },
  { id: "e11", from: "dim",     to: "run" },
  { id: "e12", from: "date",    to: "run" },
  { id: "e27", from: "reportd", to: "run" },
  { id: "e13", from: "run",     to: "reportr" },
  { id: "e14", from: "reportr", to: "save" },
  { id: "e15", from: "reportr", to: "compare" },
  { id: "e16", from: "reportr", to: "afltr" },
  { id: "e17", from: "reportr", to: "menu" },
  { id: "e18", from: "reportr", to: "opts" },
  { id: "e19", from: "reportr", to: "graphs" },
];

// Duration (seconds) each sequential dot spends on an edge
const EDGE_DURATIONS: Record<string, number> = {
  e1: 1.4, e2: 1.8, e3: 1.2, e4: 1.0, e5: 1.6, e6: 1.6, e7: 1.6, e8: 1.8,
  e24: 1.0, e25: 1.0, e26: 1.0,
  e9: 1.8, e10: 1.8, e11: 1.8, e12: 1.8,
  e27: 2.4, e13: 1.6,
  e14: 1.4, e15: 1.6, e16: 1.2, e17: 1.2, e18: 1.2, e19: 1.2,
};

// One dot travels the main user journey sequentially
const FLOW_SEQUENCE = [
  "e1", "e3", "e5", "e24", "e25", "e26", "e12", "e13",
  "e14", "e16", "e17", "e18", "e19", "e15",
  "e27", "e2", "e4",
];

function getPort(node: FNode, side: "left" | "right" | "top" | "bottom"): [number, number] {
  switch (side) {
    case "right":  return [node.cx + node.w / 2, node.cy];
    case "left":   return [node.cx - node.w / 2, node.cy];
    case "top":    return [node.cx, node.cy - node.h / 2];
    case "bottom": return [node.cx, node.cy + node.h / 2];
  }
}

function makePath(edge: FEdge): string {
  const from = NODE_MAP[edge.from];
  const to   = NODE_MAP[edge.to];
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;

  let x1: number, y1: number, x2: number, y2: number;
  let cp1x: number, cp1y: number, cp2x: number, cp2y: number;

  if (Math.abs(dx) >= Math.abs(dy)) {
    [x1, y1] = dx >= 0 ? getPort(from, "right") : getPort(from, "left");
    [x2, y2] = dx >= 0 ? getPort(to, "left")    : getPort(to, "right");
    const mx = (x1 + x2) / 2;
    cp1x = mx; cp1y = y1;
    cp2x = mx; cp2y = y2;
  } else {
    [x1, y1] = dy >= 0 ? getPort(from, "bottom") : getPort(from, "top");
    [x2, y2] = dy >= 0 ? getPort(to, "top")      : getPort(to, "bottom");
    const my = (y1 + y2) / 2;
    cp1x = x1; cp1y = my;
    cp2x = x2; cp2y = my;
  }

  return `M ${x1.toFixed(1)},${y1.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

function makeBypassPath(): string {
  const from = NODE_MAP["reportd"];
  const to   = NODE_MAP["run"];
  const dateNode = NODE_MAP["date"];
  const bypassY  = dateNode.cy + dateNode.h / 2 + 55;
  const [x1, y1] = getPort(from, "bottom");
  const [x2, y2] = getPort(to, "bottom");
  return `M ${x1.toFixed(1)},${y1.toFixed(1)} C ${x1.toFixed(1)},${bypassY.toFixed(1)} ${x2.toFixed(1)},${bypassY.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
}

const PATHS: Record<string, string> = Object.fromEntries(
  EDGES.map((e) => [e.id, e.id === "e27" ? makeBypassPath() : makePath(e)])
);

// Bounding box around the 4 config nodes
function getContainerBounds() {
  const pad = 18;
  const nodes = ["filter", "metric", "dim", "date"].map((id) => NODE_MAP[id]);
  const xs = nodes.flatMap((n) => [n.cx - n.w / 2, n.cx + n.w / 2]);
  const ys = nodes.flatMap((n) => [n.cy - n.h / 2, n.cy + n.h / 2]);
  return {
    x: Math.min(...xs) - pad,
    y: Math.min(...ys) - pad,
    w: Math.max(...xs) - Math.min(...xs) + pad * 2,
    h: Math.max(...ys) - Math.min(...ys) + pad * 2,
  };
}
const CONTAINER = getContainerBounds();

// Tight viewBox from actual node positions
const PAD = 30;
const allXs = NODES.flatMap((n) => [n.cx - n.w / 2, n.cx + n.w / 2]);
const allYs = NODES.flatMap((n) => [n.cy - n.h / 2, n.cy + n.h / 2]);
const bypassMaxY = NODE_MAP["date"].cy + NODE_MAP["date"].h / 2 + 55;
allYs.push(bypassMaxY);
const minX = Math.min(...allXs) - PAD;
const minY = Math.min(...allYs) - PAD;
const SVG_W = Math.max(...allXs) + PAD - minX;
const SVG_H = Math.max(...allYs) + PAD - minY;
const VIEW_BOX = `${minX} ${minY} ${SVG_W} ${SVG_H}`;

export default function UserFlowDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [seqIdx, setSeqIdx] = useState(0);

  // Advance the sequential dot along FLOW_SEQUENCE when not hovering
  useEffect(() => {
    if (hoveredNode) return;
    const edgeId = FLOW_SEQUENCE[seqIdx];
    const dur = (EDGE_DURATIONS[edgeId] ?? 1.5) * 1000;
    const t = setTimeout(() => setSeqIdx((i) => (i + 1) % FLOW_SEQUENCE.length), dur);
    return () => clearTimeout(t);
  }, [seqIdx, hoveredNode]);

  const activeEdgeIds = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    return new Set(
      EDGES.filter((e) => e.from === hoveredNode || e.to === hoveredNode).map((e) => e.id)
    );
  }, [hoveredNode]);

  const hasHover = hoveredNode !== null;
  const seqEdgeId = hasHover ? null : FLOW_SEQUENCE[seqIdx];

  return (
    <div className="w-full my-10 rounded-[18px] bg-white">
      <svg viewBox={VIEW_BOX} className="block w-full h-auto">
        <defs>
          {EDGES.map((e) => (
            <path key={`def-${e.id}`} id={`mp-${e.id}`} d={PATHS[e.id]} />
          ))}
          <filter id="glow-idle" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-active" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>


        {/* Connector lines */}
        {EDGES.map((edge) => {
          const active   = activeEdgeIds.has(edge.id);
          const isSeq    = edge.id === seqEdgeId;
          const dim      = hasHover && !active;
          const isBypass = edge.id === "e27";
          const dur      = EDGE_DURATIONS[edge.id] ?? 1.5;
          const hoverDur = dur * 1.4;

          return (
            <g key={edge.id} style={{ transition: "opacity 0.3s" }} opacity={dim ? 0.15 : 1}>
              {/* Base wire */}
              <path
                d={PATHS[edge.id]}
                fill="none"
                stroke={active || isSeq ? "#93c5fd" : "#d1d5db"}
                strokeWidth={active || isSeq ? 2 : 1.5}
                strokeDasharray={isBypass && !active && !isSeq ? "5 7" : undefined}
                opacity={active ? 0.7 : isSeq ? 0.6 : isBypass ? 0.35 : 0.45}
                style={{ transition: "stroke 0.3s, opacity 0.3s, stroke-width 0.3s" }}
              />

              {/* Sequential idle dot — CSS offset-path, one at a time */}
              {isSeq && (
                <circle
                  key={`dot-${seqIdx}`}
                  r={3.5}
                  style={{
                    fill: "#9ca3af",
                    filter: "url(#glow-idle)",
                    offsetPath: `path("${PATHS[edge.id]}")`,
                    offsetDistance: "0%",
                    offsetRotate: "0deg",
                    animation: `travelEdge ${dur}s linear forwards`,
                  } as React.CSSProperties}
                />
              )}

              {/* Hover: flowing dash + particle */}
              {active && (
                <>
                  <path
                    d={PATHS[edge.id]}
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth={2}
                    strokeDasharray="6 18"
                    opacity={0.6}
                    style={{ animation: `flowDash ${hoverDur * 0.38}s linear infinite` }}
                  />
                  <circle r={3} fill="#60a5fa" filter="url(#glow-active)" opacity={0.7}>
                    <animateMotion dur={`${hoverDur * 0.38}s`} repeatCount="indefinite">
                      <mpath href={`#mp-${edge.id}`} />
                    </animateMotion>
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isHovered   = hoveredNode === node.id;
          const isConnected = hasHover && EDGES.some(
            (e) => (e.from === hoveredNode && e.to === node.id) ||
                   (e.to === hoveredNode && e.from === node.id)
          );
          const dim = hasHover && !isHovered && !isConnected;

          const fill   = node.color === "gray" ? "#e4e4e7"
                       : node.color === "blue-light" ? "#dbeafe"
                       : "#0ea5e9";
          const stroke  = node.color === "blue-light" ? "#3b82f6" : "none";
          const txtFill = node.color === "blue-bright" ? "#fff" : "#1d4ed8";
          const fs = node.shape === "action" ? 10.5 : node.shape === "square" ? 10 : 11;
          const rx = node.shape === "action" ? 44 * S : 12;

          const lines = node.label.split("\n");
          const lineH = 13;

          return (
            <g
              key={node.id}
              style={{ cursor: "pointer", transition: "opacity 0.25s" }}
              opacity={dim ? 0.25 : 1}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {isHovered && (
                node.shape === "diamond" ? (
                  <polygon
                    points={`${node.cx},${node.cy - node.h / 2 - 5} ${node.cx + node.w / 2 + 5},${node.cy} ${node.cx},${node.cy + node.h / 2 + 5} ${node.cx - node.w / 2 - 5},${node.cy}`}
                    fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.45"
                    filter="url(#node-glow)"
                  />
                ) : (
                  <rect
                    x={node.cx - node.w / 2 - 5} y={node.cy - node.h / 2 - 5}
                    width={node.w + 10} height={node.h + 10}
                    rx={rx + 3} fill="none"
                    stroke={node.color === "blue-bright" ? "#38bdf8" : "#3b82f6"}
                    strokeWidth="2" opacity="0.45"
                    filter="url(#node-glow)"
                  />
                )
              )}

              {node.shape === "diamond" ? (
                <polygon
                  points={`${node.cx},${node.cy - node.h / 2} ${node.cx + node.w / 2},${node.cy} ${node.cx},${node.cy + node.h / 2} ${node.cx - node.w / 2},${node.cy}`}
                  fill={fill} stroke={stroke} strokeWidth="1.5"
                  filter={isHovered ? "url(#node-glow)" : undefined}
                />
              ) : (
                <rect
                  x={node.cx - node.w / 2} y={node.cy - node.h / 2}
                  width={node.w} height={node.h} rx={rx}
                  fill={fill} stroke={stroke} strokeWidth="1.5"
                  filter={isHovered ? "url(#node-glow)" : undefined}
                />
              )}

              {lines.map((line, li) => (
                <text
                  key={li}
                  x={node.cx}
                  y={node.cy + (li - (lines.length - 1) / 2) * lineH}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={txtFill} fontSize={fs}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="500"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
