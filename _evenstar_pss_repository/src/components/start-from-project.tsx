import { ArrowRight } from "lucide-react";
import { useStore } from "../lib/store";

export function StartFromProject() {
  const { register, start, startOpen, dispatch } = useStore();
  if (!startOpen || !register) return null;
  const stream = register.streams[0];
  const composition = register.compositions[0];
  const cse = register.cases[0];

  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-ink/70 p-6">
      <div className="w-full max-w-xl rounded-2xl border border-line bg-panel p-6 shadow-[var(--shadow)]">
        <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-teal">Start from Project</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-.025em]">Seed a thermodynamics model</h2>
        <p className="mt-2 text-sm text-muted">
          Reuse known project information. Values become linked inputs with a snapshot. You can then override T, P and composition locally.
        </p>
        <dl className="mt-5 space-y-2 text-sm">
          <Row label="Project" value={`${register.project.code} · ${register.project.name}`} />
          <Row label="Stream" value={`${stream.tag} · ${stream.name}`} />
          <Row label="Composition" value={`${composition.tag} · rev ${composition.revision} · mole basis`} />
          <Row label="Case" value={`${cse.tag} · ${cse.name}`} />
          <Row label="Conditions" value={`${stream.temperature.value} ${stream.temperature.unit} · ${stream.pressure.value} ${stream.pressure.unit} · ${stream.massFlow.value} ${stream.massFlow.unit}`} />
        </dl>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-line px-3 py-2 text-sm text-muted"
            onClick={() => dispatch({ type: "start-open", open: false })}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-ink"
            onClick={() => void start()}
          >
            Read into model <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 rounded-md border border-line bg-ink px-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
    </div>
  );
}
