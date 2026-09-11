export function SourceBadge({ mode }: { mode: "electron" | "browser" }) {
  return (
    <span className="rounded border border-line bg-raised px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
      {mode === "electron" ? "Local register" : "Browser register"}
    </span>
  );
}
