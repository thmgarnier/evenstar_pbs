import { ChevronRight, Moon, RotateCcw, Sun } from "lucide-react";
import { useStore } from "../lib/store";
import { useTheme } from "../lib/theme";
import { ProjectDataPanel } from "./project-data-panel";
import { SourceBadge } from "./source-badge";
import { StartFromProject } from "./start-from-project";
import { ThermoLab } from "./thermo-lab";
import { WorkspaceMap } from "./workspace-map";
import { WorkspaceNav } from "./workspace-nav";

export function AppShell() {
  const { ready, error, register, model, selectedRunId, workspace, notice, dispatch, resetSeed } = useStore();
  const { theme, toggle } = useTheme();
  const mode = typeof window !== "undefined" && window.pss ? "electron" : "browser";

  if (!ready) {
    return <main className="grid min-h-screen place-items-center bg-ink text-muted">Loading project register…</main>;
  }
  if (error || !register) {
    return <main className="grid min-h-screen place-items-center bg-ink text-amber">{error ?? "No register"}</main>;
  }

  const runs = register.runs;

  return (
    <main className="relative flex h-screen flex-col bg-ink text-paper">
      <header className="flex min-h-14 items-center gap-3 border-b border-line bg-panel px-4 lg:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-teal/40 bg-teal-dim text-sm font-semibold text-teal">E</span>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[.18em] text-teal">Evenstar</div>
            <div className="truncate text-sm font-medium">Plant Simulation System</div>
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 items-center gap-2 text-xs text-muted md:flex">
          <span className="truncate font-mono text-paper">{register.project.code}</span>
          <ChevronRight size={12} />
          <span className="truncate">{register.project.name}</span>
          <span className="rounded border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wider">Rev {register.project.revision}</span>
        </div>
        <button
          type="button"
          className="hidden rounded-md border border-line px-2 py-1 text-xs text-muted hover:text-paper sm:inline"
          onClick={() => dispatch({ type: "start-open", open: true })}
        >
          Start from Project
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={theme === "dark"}
          aria-label="Toggle dark mode"
          onClick={toggle}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-xs"
        >
          {theme === "dark" ? <Moon size={13} /> : <Sun size={13} />}
          {theme === "dark" ? "Dark" : "Light"}
        </button>
        <button
          type="button"
          title="Reset seed register"
          className="rounded-md border border-line p-1.5 text-muted"
          onClick={() => {
            if (confirm("Replace the local register with the shipped seed? Models and runs in user data will be lost.")) {
              void resetSeed();
            }
          }}
        >
          <RotateCcw size={14} />
        </button>
        <SourceBadge mode={mode} />
      </header>

      {notice && (
        <div className="flex items-center justify-between border-b border-line bg-raised px-4 py-2 text-sm">
          <span>{notice}</span>
          <button type="button" className="text-xs text-muted" onClick={() => dispatch({ type: "notice", notice: null })}>
            Dismiss
          </button>
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[220px_minmax(520px,1fr)_320px]">
        <aside className="hidden border-r border-line bg-panel p-3 xl:block">
          <WorkspaceNav workspace={workspace} onSelect={(id) => dispatch({ type: "workspace", id })} />
          <div className="mt-6 border-t border-line pt-4">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[.16em] text-muted">Models & runs</div>
            {model ? (
              <div className="space-y-1 text-sm">
                <div className="rounded-md bg-teal-dim px-2 py-2">{model.name}</div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "select-run", id: null })}
                  className={`ml-2 block w-[calc(100%-0.5rem)] rounded-md px-2 py-1.5 text-left text-xs ${selectedRunId === null ? "bg-raised text-teal" : "text-muted"}`}
                >
                  Working model · live
                </button>
                {runs.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dispatch({ type: "select-run", id: item.id })}
                    className={`ml-2 block w-[calc(100%-0.5rem)] rounded-md px-2 py-1.5 text-left text-xs ${selectedRunId === item.id ? "bg-raised text-teal" : "text-muted"}`}
                  >
                    Run {String(index + 1).padStart(2, "0")} · {item.status}
                  </button>
                ))}
              </div>
            ) : (
              <p className="px-2 text-xs text-muted">No model yet.</p>
            )}
          </div>
        </aside>
        {workspace === "thermo" ? <ThermoLab /> : <WorkspaceMap id={workspace} />}
        <ProjectDataPanel />
      </div>
      <StartFromProject />
    </main>
  );
}
