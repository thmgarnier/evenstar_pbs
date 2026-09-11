import type { SolverResult } from "../lib/domain";

export function ResultsTable({ results, publishedOnly }: { results: SolverResult[]; publishedOnly?: boolean }) {
  const rows = publishedOnly ? results.filter((r) => r.publish) : results;
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold">{publishedOnly ? "Engineering results (publish set)" : "Committed run records"}</h2>
        <span className="text-xs text-muted">{rows.length} shown</span>
      </div>
      <div className="scrollbar overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-raised text-[11px] uppercase tracking-[.11em] text-muted">
            <tr>
              {["Name", "Value", "Unit", "Group", "Publish"].map((cell) => (
                <th key={cell} className="px-4 py-3 font-semibold">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-line">
                <td className="px-4 py-2.5">{row.label}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-teal">{String(row.value)}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted">{row.unit}</td>
                <td className="px-4 py-2.5 text-muted">{row.group}</td>
                <td className="px-4 py-2.5 text-xs">{row.publish ? "yes" : "solver only"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
