"use client";

import type { EngineeringObject, ObjectType, ProjectSnapshot } from "@/lib/domain";
import {
  CANVAS,
  connectedObjectIds,
  layoutTopology,
  matchesQuery,
  orthoPath,
} from "@/lib/graph";

const symbol: Record<Exclude<ObjectType, "pipe">, string> = {
  vessel: "M -18 -28 v 44 a 18 12 0 0 0 36 0 v -44 a 18 12 0 0 0 -36 0 z M -18 -16 h 36 M -18 16 h 36",
  pump: "M 0 -22 a 22 22 0 1 1 0 44 a 22 22 0 1 1 0 -44 M -6 -10 l 16 10 -16 10 z",
  valve: "M -20 -16 l 20 16 -20 16 z M 20 -16 l -20 16 20 16 z M 0 -18 v 36",
  tank: "M -22 -26 h 44 v 48 h -44 z M -22 -26 q 22 -10 44 0 M -14 22 h 28",
};

function SymbolMark({ type, accent }: { type: ObjectType; accent: boolean }) {
  if (type === "pipe") return null;
  return (
    <path
      d={symbol[type]}
      fill={accent ? "#35d0ba22" : "#152833"}
      stroke={accent ? "#35d0ba" : "#8fb0bb"}
      strokeWidth="2.2"
    />
  );
}

export function TopologyCanvas({
  project,
  selectedId,
  query,
  onSelect,
}: {
  project: ProjectSnapshot;
  selectedId: string;
  query: string;
  onSelect: (id: string) => void;
}) {
  const { nodes, edges } = layoutTopology(project);
  const related = connectedObjectIds(project, selectedId);
  const { width, height, nodeWidth, nodeHeight } = CANVAS;

  return (
    <div className="technical-grid relative overflow-hidden rounded-xl border border-[#2a424d] shadow-[inset_0_0_80px_#071117]">
      <div className="absolute left-4 top-4 z-10 rounded-md border border-[#34505c] bg-[#0d1b23dd] px-3 py-2 text-[11px] uppercase tracking-[.14em] text-[#89a0aa]">
        Physical topology · PBS authority
      </div>
      <svg
        role="img"
        aria-label="Physical topology of the water transfer system"
        viewBox={`0 0 ${width} ${height}`}
        className="h-[min(420px,58vw)] w-full min-h-[280px]"
      >
        {edges.map((edge, index) => {
          const active = related.has(edge.from.object.id) && related.has(edge.to.object.id);
          const pipeSelected = edge.pipe?.id === selectedId;
          const dimmed =
            Boolean(query.trim()) &&
            !(
              matchesQuery(edge.from.object, query) ||
              matchesQuery(edge.to.object, query) ||
              (edge.pipe && matchesQuery(edge.pipe, query))
            );
          const d = orthoPath(edge.from.x, edge.from.y, edge.to.x, edge.to.y);
          const midX = (edge.from.x + edge.to.x) / 2;
          const midY = (edge.from.y + edge.to.y) / 2;
          const labelPipe = Boolean(edge.pipe) && edges.findIndex((item) => item.pipe?.id === edge.pipe?.id) === index;
          return (
            <g key={edge.connection.id} opacity={dimmed ? 0.28 : 1}>
              <path d={d} fill="none" stroke="#071217" strokeWidth="10" />
              <path
                d={d}
                fill="none"
                stroke={pipeSelected || active ? "#35d0ba" : "#7ea0ab"}
                strokeWidth={pipeSelected ? 5 : 3.4}
              />
              <polygon
                points={`${midX + 8},${midY} ${midX - 6},${midY - 7} ${midX - 6},${midY + 7}`}
                fill="#f2b84b"
              />
              {labelPipe && edge.pipe && (
                <g
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer"
                  onClick={() => onSelect(edge.pipe!.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") onSelect(edge.pipe!.id);
                  }}
                >
                  <rect
                    x={midX - 58}
                    y={midY + 14}
                    width="116"
                    height="28"
                    rx="4"
                    fill={pipeSelected ? "#35d0ba" : "#13242d"}
                    stroke={pipeSelected ? "#35d0ba" : "#3d5864"}
                  />
                  <text
                    x={midX}
                    y={midY + 33}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="11"
                    fill={pipeSelected ? "#08201e" : "#d5e4e8"}
                  >
                    {edge.pipe.tag}
                    {edge.segment ? `  ${edge.segment.nominalDiameterMm ? `DN${edge.segment.nominalDiameterMm}` : ""}` : ""}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {nodes.map((node) => {
          const selected = node.object.id === selectedId;
          const neighbor = related.has(node.object.id);
          const dimmed = Boolean(query.trim()) && !matchesQuery(node.object, query);
          return (
            <g
              key={node.object.id}
              transform={`translate(${node.x} ${node.y})`}
              opacity={dimmed ? 0.28 : 1}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              className="cursor-pointer"
              onClick={() => onSelect(node.object.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onSelect(node.object.id);
              }}
            >
              <rect
                x={-nodeWidth / 2}
                y={-nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight}
                rx="10"
                fill={selected ? "#18333a" : "#12232c"}
                stroke={selected ? "#35d0ba" : neighbor ? "#f2b84b" : "#35505e"}
                strokeWidth={selected ? 2.4 : 1.4}
              />
              <g transform="translate(-48 -2)">
                <SymbolMark type={node.object.objectType} accent={selected} />
              </g>
              <text x="18" y="-14" textAnchor="start" fontSize="9" fill="#7f97a1" letterSpacing="0.12em">
                {node.object.objectType.toUpperCase()}
              </text>
              <text x="18" y="4" textAnchor="start" className="font-mono" fontSize="11" fill="#35d0ba">
                {node.object.tag}
              </text>
              <text x="18" y="22" textAnchor="start" fontSize="12" fill="#eef4f1">
                {shortName(node.object)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function shortName(object: EngineeringObject) {
  return object.name.replace("Discharge Isolation ", "").replace("Receiving ", "");
}
