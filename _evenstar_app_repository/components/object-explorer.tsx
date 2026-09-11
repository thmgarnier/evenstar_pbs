"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Box,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  Database,
  FileText,
  GitBranch,
  Layers3,
  Network,
  Search,
  Workflow,
} from "lucide-react";
import { ObjectInspector } from "@/components/object-inspector";
import { TopologyCanvas } from "@/components/topology-canvas";
import { typeLabel, type EngineeringObject, type ObjectType, type ProjectSnapshot } from "@/lib/domain";
import { compactId, counts, matchesQuery } from "@/lib/graph";

const typeIcon = {
  pump: CircleGauge,
  vessel: Box,
  valve: Workflow,
  tank: Box,
  pipe: GitBranch,
} as const;

type MobilePane = "tree" | "plant" | "inspect";

export function ObjectExplorer({ project }: { project: ProjectSnapshot }) {
  const [selectedId, setSelectedId] = useState(project.objects.find((item) => item.objectType === "pump")?.id ?? project.objects[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [pane, setPane] = useState<MobilePane>("plant");
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = project.objects.find((item) => item.id === selectedId) ?? project.objects[0];
  const visibleObjects = useMemo(
    () => project.objects.filter((item) => matchesQuery(item, query)),
    [project.objects, query],
  );
  const stats = counts(project);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const inField = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }
      if (event.key === "/" && !inField) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (event.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (!visibleObjects.length) return;
      if (inField && target !== searchRef.current) return;
      event.preventDefault();
      const index = Math.max(0, visibleObjects.findIndex((item) => item.id === selectedId));
      const next = event.key === "ArrowDown"
        ? visibleObjects[(index + 1) % visibleObjects.length]
        : visibleObjects[(index - 1 + visibleObjects.length) % visibleObjects.length];
      setSelectedId(next.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, visibleObjects]);

  if (!selected) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0c151c] text-[#9eb1b9]">
        No engineering objects in this project.
      </main>
    );
  }

  const select = (id: string) => {
    setSelectedId(id);
    setPane("inspect");
  };

  return (
    <main className="min-h-screen bg-[#0c151c] text-[#eef4f1]">
      <header className="flex min-h-16 items-center gap-4 border-b border-[#273b45] bg-[#0e1a22] px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#35d0ba55] bg-[#13262d] font-semibold text-[#35d0ba]">E</span>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#35d0ba]">Evenstar</div>
            <div className="truncate text-sm font-medium">Plant Build System</div>
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 items-center gap-2 text-xs text-[#8fa4ad] md:flex">
          <span className="truncate font-mono text-[#d5e4e8]">{project.code}</span>
          <ChevronRight size={12} />
          <span className="truncate">{project.plantName}</span>
          <span className="rounded border border-[#2b414d] px-1.5 py-0.5 text-[10px] uppercase tracking-wider">Rev {project.revision}</span>
        </div>
        <SourceBadge project={project} />
      </header>

      {project.loadNote === "fallback-error" && (
        <div className="border-b border-[#5a3b1f] bg-[#24180f] px-4 py-2 text-sm text-[#f2b84b]">
          Supabase could not be read{project.loadError ? `: ${project.loadError}` : "."} Showing the local seed fixture.
        </div>
      )}

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 pb-16 xl:grid-cols-[274px_minmax(620px,1fr)_360px] xl:pb-0">
        <aside className={`${pane === "tree" ? "block" : "hidden"} border-b border-[#273b45] bg-[#0e1a22] p-4 xl:block xl:border-b-0 xl:border-r`}>
          <nav aria-label="PBS workspaces" className="space-y-1">
            <NavItem icon={Network} label="Object Explorer" active />
            <NavItem icon={Workflow} label="P&ID" muted />
            <NavItem icon={Layers3} label="Plant 3D" muted />
            <NavItem icon={Database} label="Engineering Data" muted />
            <NavItem icon={FileText} label="Documents" muted />
          </nav>

          <div className="mt-6 border-t border-[#273b45] pt-5">
            <div className="mb-3 flex items-center justify-between px-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#6f8791]">
              Plant hierarchy <ChevronDown size={14} />
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 rounded-md px-2 py-2 text-[#d7e2e3]">
                <ChevronDown size={14} />
                <Box size={15} className="text-[#66a8ff]" />
                <span className="truncate">{project.plantName}</span>
              </div>
              {project.systems.map((system) => {
                const members = project.objects.filter((item) => item.systemId === system.id);
                const equipment = members.filter((item) => item.objectType !== "pipe");
                const lines = members.filter((item) => item.objectType === "pipe");
                return (
                  <div key={system.id}>
                    <div className="ml-5 flex items-center gap-2 rounded-md px-2 py-2 text-[#d7e2e3]">
                      <ChevronDown size={14} />
                      <Activity size={15} className="text-[#f2b84b]" />
                      <span className="truncate">{system.code} {system.name}</span>
                    </div>
                    <HierarchyGroup title="Equipment" objects={equipment} selectedId={selected.id} onSelect={select} />
                    <HierarchyGroup title="Lines" objects={lines} selectedId={selected.id} onSelect={select} />
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        <section className={`${pane === "plant" ? "block" : "hidden"} min-w-0 bg-[#0b151c] xl:block`}>
          <div className="flex flex-col gap-4 border-b border-[#273b45] px-5 py-5 lg:flex-row lg:items-end lg:justify-between lg:px-7">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#738b95]">
                <span className="font-mono">{project.code}</span>
                <ChevronRight size={13} />
                <span>{project.plantCode} {project.plantName}</span>
                <ChevronRight size={13} />
                <span>{selected.systemCode}</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-[-.025em] lg:text-[28px]">{selected.systemName} system</h1>
              <p className="mt-1 text-sm text-[#879da6]">Canonical equipment, ports, and physical connections · the same UUID everywhere</p>
            </div>
            <label className="flex min-w-0 items-center gap-2 rounded-lg border border-[#2d4652] bg-[#101e26] px-3 py-2.5 text-sm text-[#91a6af] lg:w-80">
              <Search size={16} />
              <span className="sr-only">Search objects</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[#eaf2ef] outline-none placeholder:text-[#637983]"
                placeholder="Search tag, UUID, name, type…"
              />
              <kbd className="hidden rounded border border-[#314853] px-1.5 py-0.5 font-mono text-[10px] text-[#6f8791] sm:inline">/</kbd>
            </label>
          </div>

          <div className="p-4 lg:p-7">
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Canonical objects", stats.objects],
                ["Equipment", stats.equipment],
                ["Ports", stats.ports],
                ["Physical connections", stats.connections],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-[#273d48] bg-[#101e26] px-4 py-3">
                  <div className="text-[11px] uppercase tracking-[.13em] text-[#6f8791]">{label}</div>
                  <div className="mt-1 text-xl font-semibold">{value}</div>
                </div>
              ))}
            </div>

            <TopologyCanvas project={project} selectedId={selected.id} query={query} onSelect={select} />

            <div className="mt-5 overflow-hidden rounded-xl border border-[#293f4a] bg-[#0f1d25]">
              <div className="flex items-center justify-between border-b border-[#293f4a] px-4 py-3">
                <h2 className="text-sm font-semibold">Engineering object register</h2>
                <span className="text-xs text-[#718993]">{visibleObjects.length} shown</span>
              </div>
              {visibleObjects.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-[#728b95]">No objects match “{query}”.</div>
              ) : (
                <div className="scrollbar overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead className="bg-[#13242d] text-[11px] uppercase tracking-[.11em] text-[#718993]">
                      <tr>
                        {["Tag", "Name", "Type", "System", "UUID", "Status"].map((cell) => (
                          <th key={cell} className="px-4 py-3 font-semibold">{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleObjects.map((object) => (
                        <tr
                          key={object.id}
                          onClick={() => select(object.id)}
                          className={`cursor-pointer border-t border-[#233943] ${selected.id === object.id ? "bg-[#173039]" : "hover:bg-[#12242c]"}`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-[#35d0ba]">{object.tag}</td>
                          <td className="px-4 py-3 font-medium">{object.name}</td>
                          <td className="px-4 py-3 text-[#9db0b7]">{typeLabel[object.objectType]}</td>
                          <td className="px-4 py-3 text-[#9db0b7]">{object.systemCode}</td>
                          <td className="px-4 py-3 font-mono text-[11px] text-[#7f97a1]">{compactId(object.id)}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full border border-[#4b6370] px-2 py-1 text-[11px] capitalize text-[#b2c2c7]">{object.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#6f8791]">
              PBS owns plant identity and topology. P&ID, 3D, PSS and PMS are later representations of the same objects — not separate records.
              Keyboard: <span className="font-mono text-[#9eb1b9]">/</span> or <span className="font-mono text-[#9eb1b9]">Ctrl+K</span> to search, arrows to move selection.
            </p>
          </div>
        </section>

        <div className={`${pane === "inspect" ? "block" : "hidden"} min-h-[70vh] xl:block`}>
          <ObjectInspector project={project} selected={selected} onSelect={select} />
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-[#273b45] bg-[#0e1a22] xl:hidden" aria-label="Explorer panels">
        {([
          ["tree", "Hierarchy"],
          ["plant", "Plant"],
          ["inspect", "Inspector"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setPane(id)}
            className={`py-3 text-xs uppercase tracking-[.14em] ${pane === id ? "text-[#35d0ba]" : "text-[#6f8791]"}`}
          >
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function SourceBadge({ project }: { project: ProjectSnapshot }) {
  const live = project.source === "supabase";
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#2b414d] bg-[#111e27] px-3 py-2 text-xs text-[#9eb1b9]">
      <span className={`h-2 w-2 rounded-full ${live ? "bg-[#35d0ba]" : "bg-[#f2b84b]"}`} />
      {live ? "Supabase live" : "Local seed fixture"}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  muted = false,
}: {
  icon: typeof Box;
  label: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${active ? "bg-[#1e3842] text-white" : muted ? "cursor-default text-[#536873]" : "text-[#a7bac2] hover:bg-[#162730] hover:text-white"}`}
      disabled={muted}
    >
      <Icon size={17} strokeWidth={1.7} />
      <span>{label}</span>
      {muted && <span className="ml-auto text-[10px] uppercase tracking-wider">Later</span>}
    </button>
  );
}

function HierarchyGroup({
  title,
  objects,
  selectedId,
  onSelect,
}: {
  title: string;
  objects: EngineeringObject[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (!objects.length) return null;
  return (
    <div className="ml-11 border-l border-[#2b414d] pl-2">
      <div className="px-2 py-1 text-[10px] uppercase tracking-[.14em] text-[#5f7680]">{title}</div>
      {objects.map((object) => {
        const Icon = typeIcon[object.objectType as ObjectType];
        return (
          <button
            key={object.id}
            onClick={() => onSelect(object.id)}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] ${selectedId === object.id ? "bg-[#1d333c] text-white" : "text-[#92a8b1] hover:text-white"}`}
          >
            <Icon size={14} />
            <span className="truncate font-mono text-[12px]">{object.tag}</span>
          </button>
        );
      })}
    </div>
  );
}
