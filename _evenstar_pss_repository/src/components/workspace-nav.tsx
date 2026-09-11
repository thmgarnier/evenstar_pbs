import { Activity, Droplets, FlaskConical, GitBranch, SlidersHorizontal } from "lucide-react";
import type { WorkspaceId } from "../lib/store";

const items: { id: WorkspaceId; label: string; icon: typeof FlaskConical; status: "live" | "preview" }[] = [
  { id: "thermo", label: "Thermo Lab", icon: FlaskConical, status: "live" },
  { id: "process", label: "Process", icon: GitBranch, status: "preview" },
  { id: "hydraulics", label: "Hydraulics", icon: Activity, status: "preview" },
  { id: "water", label: "Water", icon: Droplets, status: "preview" },
  { id: "dynamics", label: "Dynamics", icon: SlidersHorizontal, status: "preview" },
];

export function WorkspaceNav({
  workspace,
  onSelect,
}: {
  workspace: WorkspaceId;
  onSelect: (id: WorkspaceId) => void;
}) {
  return (
    <nav aria-label="PSS workspaces" className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = workspace === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
              active ? "bg-teal-dim text-paper" : "text-muted hover:bg-raised hover:text-paper"
            }`}
          >
            <Icon size={15} className={active ? "text-teal" : ""} />
            <span className="truncate">{item.label}</span>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-muted">
              {item.status === "live" ? "Live" : "Map"}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
