import { RefreshCw } from "lucide-react";
import { useStore } from "../lib/store";
import type { CompareRow } from "../lib/project-data";

export function ProjectDataPanel() {
  const { compare, dispatch, readSelected, writeSelected, simulateChange, model } = useStore();

  return (
    <aside className="flex min-h-0 flex-col border-l border-line bg-panel">
      <div className="border-b border-line px-4 py-4">
        <div className="text-[11px] font-semibold uppercase tracking-[.16em] text-muted">Project Data</div>
        <p className="mt-1 text-xs text-muted">Explicit read / write. No silent sync.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Action onClick={() => void readSelected()}>← Read</Action>
          <Action onClick={() => void writeSelected()}>→ Write</Action>
          <Action onClick={() => dispatch({ type: "notice", notice: "Compare is the table below. Nothing was mutated." })}>⇄ Compare</Action>
          <Action onClick={() => dispatch({ type: "notice", notice: "Register is local. Choose Read to accept newer values into the working model." })}>
            <span className="inline-flex items-center gap-1"><RefreshCw size={12} /> Refresh</span>
          </Action>
        </div>
        <button
          type="button"
          className="mt-2 w-full rounded-md border border-amber/40 bg-amber-dim px-2 py-1.5 text-left text-[11px] text-amber"
          onClick={() => void simulateChange()}
        >
          Simulate project-data change
        </button>
      </div>
      <div className="scrollbar min-h-0 flex-1 overflow-auto">
        {!model ? (
          <div className="px-4 py-8 text-center text-sm text-muted">Start from Project to link inputs.</div>
        ) : (
          <table className="w-full border-collapse text-left text-xs">
            <thead className="sticky top-0 bg-raised text-[10px] uppercase tracking-[.11em] text-muted">
              <tr>
                {["Variable", "PSS", "Project", "Action"].map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr
                  key={row.path}
                  className={`border-t border-line ${row.status === "stale" || row.status === "different" ? "bg-amber-dim/40" : ""}`}
                >
                  <td className="px-3 py-2">
                    <div className="font-medium">{row.label}</div>
                    <div className="text-[10px] text-muted">{row.status} · {row.pssRevision}</div>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px]">{row.pssValue}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-muted">{row.projectValue}</td>
                  <td className="px-3 py-2">
                    <select
                      value={row.action}
                      onChange={(event) => dispatch({ type: "row-action", path: row.path, action: event.target.value as CompareRow["action"] })}
                      className="w-full rounded border border-line bg-ink px-1 py-1 text-[11px]"
                    >
                      <option value="keep">Keep</option>
                      <option value="update-pss">Update PSS</option>
                      <option value="update-project">Update Project</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </aside>
  );
}

function Action({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-line bg-raised px-2 py-1.5 text-xs hover:border-teal/50"
    >
      {children}
    </button>
  );
}
