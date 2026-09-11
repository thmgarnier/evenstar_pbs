import type { SimulationRun } from "../lib/domain";

export function RunInspector({ run }: { run: SimulationRun | null }) {
  if (!run) {
    return (
      <div className="rounded-xl border border-line bg-panel px-4 py-8 text-center text-sm text-muted">
        Live properties update as you edit. Snapshot run writes provenance for publication.
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-line bg-panel">
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold">Run provenance</h2>
        <p className="mt-1 font-mono text-[11px] text-muted">{run.id}</p>
      </div>
      <div className="space-y-3 px-4 py-4 text-sm">
        <p>{run.method}</p>
        <p className="text-xs text-muted">{run.engineId}@{run.engineVersion} · {run.status} · {new Date(run.createdAt).toLocaleString()}</p>
        <div>
          <div className="mb-1 text-[11px] uppercase tracking-[.13em] text-muted">Assumptions</div>
          <ul className="list-disc space-y-1 pl-4 text-xs text-muted">
            {run.assumptions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        {run.warnings.length > 0 && (
          <div className="rounded-md border border-amber/40 bg-amber-dim px-3 py-2 text-xs text-amber">
            {run.warnings.join(" ")}
          </div>
        )}
        <div>
          <div className="mb-1 text-[11px] uppercase tracking-[.13em] text-muted">Input snapshot</div>
          <table className="w-full text-left text-xs">
            <tbody>
              {run.inputSnapshot.map((input) => (
                <tr key={input.path} className="border-t border-line">
                  <td className="py-1.5 pr-2">{input.label}</td>
                  <td className="py-1.5 font-mono text-teal">{String(input.value)} {input.unit ?? ""}</td>
                  <td className="py-1.5 text-muted">rev {input.snapshot?.revision ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
