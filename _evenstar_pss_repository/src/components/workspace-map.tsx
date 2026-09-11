import { useState } from "react";
import type { WorkspaceId } from "../lib/store";
import { useStore } from "../lib/store";

const maps: Record<Exclude<WorkspaceId, "thermo">, { title: string; lead: string; items: { name: string; note: string }[] }> = {
  process: {
    title: "Process simulation",
    lead: "Steady-state flowsheets will consume the same project streams, compositions and cases already in this register.",
    items: [
      { name: "Material and energy balances", note: "Will start from NG-001 rather than a blank feed." },
      { name: "Unit operations", note: "Separators, mixers, valves, exchangers — engine-agnostic adapters." },
      { name: "Recycle / convergence", note: "Solver state stays in PSS; Airtable gets engineering points." },
      { name: "Case studies", note: "Reuse DESIGN / summer / winter cases from Project Data." },
    ],
  },
  hydraulics: {
    title: "Hydraulics",
    lead: "Do not redraw piping PBS already knows. This workspace will extract topology from EV-DEMO-001.",
    items: [
      { name: "Import PBS topology", note: "Same UUIDs as the Object Explorer pump, valve, lines." },
      { name: "Study overrides", note: "DN250 vs DN200 stays local until a design proposal is created." },
      { name: "Node results", note: "Publish ordered engineering stations, not every solver cell." },
      { name: "Pump / valve curves", note: "Simulation-specific; not canonical PBS geometry." },
    ],
  },
  water: {
    title: "Water / wastewater",
    lead: "Aqueous chemistry uses reusable water analyses from the project register, same as feed-gas compositions.",
    items: [
      { name: "Speciation and charge balance", note: "pH, alkalinity, ionic strength." },
      { name: "Carbonate / scaling", note: "Saturation indices as published KPIs, not full speciation dumps." },
      { name: "RO / membrane balances", note: "Recovery, rejection, osmotic pressure." },
      { name: "Dosing", note: "Neutralization cases as operating cases." },
    ],
  },
  dynamics: {
    title: "Process dynamics and control",
    lead: "High-frequency trajectories stay in PSS. Only selected events and KPIs belong in the register.",
    items: [
      { name: "PID / setpoints", note: "Typed signal contracts, not Airtable historian rows." },
      { name: "Trends and alarms", note: "Inspect here; publish summaries." },
      { name: "Python / custom blocks", note: "Adapter boundary still open (OQ-012)." },
      { name: "Clock coordination", note: "Process model and controller share a simulation clock." },
    ],
  },
};

export function WorkspaceMap({ id }: { id: Exclude<WorkspaceId, "thermo"> }) {
  const spec = maps[id];
  const [open, setOpen] = useState(spec.items[0]?.name ?? "");
  const { dispatch } = useStore();

  return (
    <section className="scrollbar min-h-0 overflow-auto bg-ink">
      <div className="border-b border-line px-6 py-5">
        <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-teal">Workspace map</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-.025em]">{spec.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">{spec.lead}</p>
      </div>
      <div className="grid gap-3 p-6 lg:grid-cols-2">
        {spec.items.map((item) => {
          const active = open === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setOpen(item.name)}
              className={`rounded-xl border p-4 text-left transition-colors ${active ? "border-teal bg-teal-dim" : "border-line bg-panel hover:border-teal/40"}`}
            >
              <div className="text-sm font-semibold">{item.name}</div>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
            </button>
          );
        })}
      </div>
      <div className="px-6 pb-8">
        <button
          type="button"
          className="rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-ink"
          onClick={() => dispatch({ type: "workspace", id: "thermo" })}
        >
          Back to Thermodynamics Laboratory
        </button>
      </div>
    </section>
  );
}
