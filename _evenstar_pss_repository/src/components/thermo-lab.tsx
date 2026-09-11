import { useMemo, useState } from "react";
import { Play, Upload } from "lucide-react";
import { envelopeWilson, sweepPR, wilsonBubbleP_Pa, wilsonDewP_Pa } from "../lib/engine/diagrams";
import { isStale } from "../lib/provenance";
import { livePayload } from "../lib/project-data";
import { liveFlash } from "../lib/results";
import { useStore } from "../lib/store";
import { Plot } from "./plot";
import { QuantityField, ClassBadge } from "./quantity-field";
import { ResultsTable } from "./results-table";
import { RunInspector } from "./run-inspector";

type CalcMode = "pt" | "bubble" | "dew" | "envelope";
type PlotId = "envelope" | "z-p" | "rho-t" | "cp-t" | "h-t";
type Sheet = "state" | "energy" | "fugacity" | "method";

const packages = [
  { id: "pr", label: "PSS Peng–Robinson 0.1", live: true },
  { id: "srk", label: "Soave–Redlich–Kwong", live: false },
  { id: "cpa", label: "CPA / association", live: false },
];

export function ThermoLab() {
  const { model, register, selectedRun, run, publish, override, setFraction, renormalize, dispatch } = useStore();
  const [calc, setCalc] = useState<CalcMode>("pt");
  const [plotId, setPlotId] = useState<PlotId>("envelope");
  const [sheet, setSheet] = useState<Sheet>("state");
  const [pkg, setPkg] = useState("pr");
  const [speciesId, setSpeciesId] = useState<string | null>(null);

  const composition = register?.compositions.find((c) => c.id === model?.compositionId);
  const cse = register?.cases.find((c) => c.id === model?.caseId);
  const components = model?.localComponents ?? composition?.components ?? [];

  const live = useMemo(() => {
    if (!register || !model) return null;
    try {
      return liveFlash(register, model);
    } catch {
      return null;
    }
  }, [register, model]);

  const diagrams = useMemo(() => {
    if (!live) return null;
    const { z, species, T_C, P_bar, flash } = live;
    const env = envelopeWilson(z, species);
    const vsP = sweepPR(z, species, "P", flash.T_K, flash.P_Pa);
    const vsT = sweepPR(z, species, "T", flash.T_K, flash.P_Pa);
    const bubbleBar = wilsonBubbleP_Pa(flash.T_K, z, species) / 1e5;
    const dewBar = wilsonDewP_Pa(flash.T_K, z, species) / 1e5;
    return { env, vsP, vsT, bubbleBar, dewBar, T_C, P_bar };
  }, [live]);

  if (!model || !register) {
    return (
      <section className="technical-grid flex min-h-0 flex-col items-center justify-center p-8 text-center">
        <div className="max-w-lg rounded-2xl border border-line bg-panel p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-teal">Thermodynamics Laboratory</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-.025em]">Start from the project, not from scratch</h1>
          <p className="mt-3 text-sm text-muted">
            Import NG-001, GAS-FEED-R1 and the design case. Then edit T, P and composition live — plots and properties update immediately.
          </p>
          <button
            type="button"
            className="mt-5 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink"
            onClick={() => dispatch({ type: "start-open", open: true })}
          >
            Start from Project
          </button>
        </div>
      </section>
    );
  }

  const temperature = model.inputs.find((i) => i.path === "feed.temperature")!;
  const pressure = model.inputs.find((i) => i.path === "feed.pressure")!;
  const flow = model.inputs.find((i) => i.path === "feed.massFlow")!;
  const flash = live?.flash;
  const selectedSpecies = register.species.find((s) => s.id === speciesId);
  const moleSum = components.reduce((s, c) => s + c.fraction, 0);
  const teal = "var(--teal)";
  const amber = "var(--amber)";
  const blue = "var(--blue)";

  const plot = (() => {
    if (!diagrams || !live) return null;
    const marker = { x: diagrams.T_C, y: diagrams.P_bar, label: "Operating point", color: teal };
    if (plotId === "envelope") {
      return (
        <Plot
          title="Phase envelope"
          xLabel="T (°C)"
          yLabel="P (bar)"
          method={diagrams.env.method}
          series={[
            { id: "bub", label: "Bubble (Wilson)", color: teal, points: diagrams.env.bubble },
            { id: "dew", label: "Dew (Wilson)", color: amber, points: diagrams.env.dew, dashed: true },
          ]}
          markers={[marker]}
        />
      );
    }
    if (plotId === "z-p") {
      return (
        <Plot
          title="Compressibility vs pressure"
          xLabel="P (bar)"
          yLabel="Z"
          method="Peng–Robinson PT flash along current T"
          series={[{ id: "z", label: "Z", color: teal, points: diagrams.vsP.Z }]}
          markers={[{ x: diagrams.P_bar, y: live.flash.mixture.Z, label: "Now", color: amber }]}
        />
      );
    }
    if (plotId === "rho-t") {
      return (
        <Plot
          title="Density vs temperature"
          xLabel="T (°C)"
          yLabel="ρ (kg/m³)"
          method="Peng–Robinson PT flash along current P"
          series={[{ id: "rho", label: "Density", color: blue, points: diagrams.vsT.rho }]}
          markers={[{ x: diagrams.T_C, y: live.flash.mixture.density_kg_m3, label: "Now", color: amber }]}
        />
      );
    }
    if (plotId === "cp-t") {
      return (
        <Plot
          title="Heat capacity vs temperature"
          xLabel="T (°C)"
          yLabel="Cp (J/mol-K)"
          method="PR residual + constant IG Cp (298 K)"
          series={[{ id: "cp", label: "Cp", color: teal, points: diagrams.vsT.Cp }]}
          markers={[{ x: diagrams.T_C, y: live.flash.mixture.Cp_J_molK, label: "Now", color: amber }]}
        />
      );
    }
    return (
      <Plot
        title="Enthalpy vs temperature"
        xLabel="T (°C)"
        yLabel="H (kJ/mol)"
        method="IG reference 298.15 K, 1 bar + PR residual"
        series={[{ id: "h", label: "H", color: amber, points: diagrams.vsT.H }]}
        markers={[{ x: diagrams.T_C, y: live.flash.mixture.H_J_mol / 1000, label: "Now", color: teal }]}
      />
    );
  })();

  const phi = flash?.vapor?.phi ?? flash?.liquid?.phi ?? [];

  return (
    <section className="scrollbar min-h-0 overflow-auto bg-ink">
      <div className="flex flex-col gap-4 border-b border-line px-5 py-4 lg:flex-row lg:items-end lg:justify-between lg:px-6">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="font-mono">{register.project.code}</span>
            <span>·</span>
            <span>{model.name}</span>
            <span>·</span>
            <span>{cse?.tag ?? "DESIGN"}</span>
            {flash && <span className="rounded border border-line px-1.5 py-0.5 uppercase tracking-wider">{flash.phase}</span>}
          </div>
          <h1 className="text-2xl font-semibold tracking-[-.025em]">Thermodynamics Laboratory</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={run} className="inline-flex items-center gap-2 rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-ink">
            <Play size={15} /> Snapshot run
          </button>
          <button
            type="button"
            onClick={() => void publish()}
            disabled={!selectedRun}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm disabled:opacity-40"
          >
            <Upload size={15} /> Publish
          </button>
        </div>
      </div>

      <div className="space-y-4 p-4 lg:p-6">
        <div className="flex flex-wrap gap-2">
          {([
            ["pt", "PT flash"],
            ["bubble", "Bubble P(T)"],
            ["dew", "Dew P(T)"],
            ["envelope", "Phase envelope"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setCalc(id);
                if (id === "envelope") setPlotId("envelope");
              }}
              className={`rounded-full border px-3 py-1 text-xs ${calc === id ? "border-teal bg-teal-dim" : "border-line"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          {packages.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPkg(item.id)}
              className={`rounded-xl border px-3 py-3 text-left ${pkg === item.id ? "border-teal bg-teal-dim" : "border-line bg-panel"}`}
            >
              <div className="text-[11px] uppercase tracking-[.12em] text-muted">{item.live ? "Active engine" : "Not in this adapter"}</div>
              <div className="mt-1 text-sm font-medium">{item.label}</div>
            </button>
          ))}
          <div className="rounded-xl border border-line bg-panel px-3 py-3">
            <div className="text-[11px] uppercase tracking-[.12em] text-muted">Validity</div>
            <div className="mt-1 text-sm">Classic PR · kij = 0 · IG Cp constant at 298 K</div>
          </div>
        </div>
        {pkg !== "pr" && (
          <div className="rounded-lg border border-amber/40 bg-amber-dim px-3 py-2 text-sm text-amber">
            {packages.find((p) => p.id === pkg)?.label} is not in this slice. Calculations continue on Peng–Robinson so the lab stays usable.
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <QuantityField
            label="Temperature"
            value={Number(temperature.value)}
            unit={temperature.unit}
            cls={temperature.class}
            stale={isStale(temperature, livePayload(register, temperature))}
            min={-40}
            max={120}
            step={0.5}
            onChange={(value) => override(temperature.path, value)}
          />
          <QuantityField
            label="Pressure"
            value={Number(pressure.value)}
            unit={pressure.unit}
            cls={pressure.class}
            stale={isStale(pressure, livePayload(register, pressure))}
            min={1}
            max={150}
            step={0.5}
            onChange={(value) => override(pressure.path, value)}
          />
          <QuantityField
            label="Mass flow"
            value={Number(flow.value)}
            unit={flow.unit}
            cls={flow.class}
            stale={isStale(flow, livePayload(register, flow))}
            min={10}
            max={250}
            step={1}
            onChange={(value) => override(flow.path, value)}
          />
          <div className="rounded-xl border border-line bg-panel px-3 py-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[.13em] text-muted">Wilson saturation</span>
              <ClassBadge cls="local" />
            </div>
            <div className="font-mono text-sm">
              {calc === "dew"
                ? `Dew ${diagrams?.dewBar.toFixed(2) ?? "—"} bar`
                : `Bubble ${diagrams?.bubbleBar.toFixed(2) ?? "—"} bar`}
            </div>
            <p className="mt-1 text-[11px] text-muted">At current T · {live && live.T_C.toFixed(1)} °C is above mix Tc if the operating point sits outside the envelope.</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {([
                ["envelope", "Envelope"],
                ["z-p", "Z(P)"],
                ["rho-t", "ρ(T)"],
                ["cp-t", "Cp(T)"],
                ["h-t", "H(T)"],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPlotId(id)}
                  className={`rounded-md border px-2.5 py-1 text-xs ${plotId === id ? "border-teal bg-teal-dim" : "border-line bg-panel"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {plot}
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <h2 className="text-sm font-semibold">Composition</h2>
              <button type="button" onClick={renormalize} className="text-[11px] text-teal">
                Renormalize {moleSum.toFixed(4)}
              </button>
            </div>
            <div className="scrollbar max-h-[360px] overflow-auto">
              {components.map((component) => {
                const species = register.species.find((s) => s.id === component.speciesId);
                const active = speciesId === component.speciesId;
                return (
                  <button
                    key={component.speciesId}
                    type="button"
                    onClick={() => setSpeciesId(component.speciesId)}
                    className={`flex w-full items-center gap-2 border-b border-line px-3 py-2 text-left ${active ? "bg-teal-dim" : "hover:bg-raised"}`}
                  >
                    <span className="w-16 font-mono text-[11px] text-teal">{species?.formula}</span>
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      value={component.fraction}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => setFraction(component.speciesId, Number(event.target.value))}
                      className="w-20 rounded border border-line bg-ink px-1.5 py-1 font-mono text-xs outline-none"
                    />
                    <span className="flex-1 text-xs text-muted">{species?.name}</span>
                  </button>
                );
              })}
            </div>
            {Math.abs(moleSum - 1) > 1e-3 && (
              <div className="border-t border-amber/40 bg-amber-dim px-3 py-2 text-[11px] text-amber">
                Mole fractions sum to {moleSum.toFixed(4)}. Live flash normalizes; snapshot runs require 1.000.
              </div>
            )}
            {selectedSpecies && (
              <div className="border-t border-line px-3 py-3 text-xs">
                <div className="font-medium">{selectedSpecies.name}</div>
                <div className="mt-1 grid grid-cols-2 gap-1 font-mono text-[11px] text-muted">
                  <span>CAS {selectedSpecies.cas}</span>
                  <span>MW {selectedSpecies.mw_g_mol} g/mol</span>
                  <span>Tc {selectedSpecies.pr.tc_K} K</span>
                  <span>Pc {(selectedSpecies.pr.pc_Pa / 1e5).toFixed(2)} bar</span>
                  <span>ω {selectedSpecies.pr.omega}</span>
                  <span>Cp° {selectedSpecies.igCp_J_molK} J/mol-K</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {flash && (
          <div className="rounded-xl border border-line bg-panel">
            <div className="flex flex-wrap gap-1 border-b border-line px-2 py-2">
              {([
                ["state", "State"],
                ["energy", "Energy / residuals"],
                ["fugacity", "Fugacity"],
                ["method", "Method"],
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSheet(id)}
                  className={`rounded-md px-3 py-1 text-xs ${sheet === id ? "bg-teal-dim text-paper" : "text-muted"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {sheet === "state" && (
                <>
                  <Cell k="Phase" v={flash.phase} />
                  <Cell k="Vapour fraction" v={flash.vaporFraction.toFixed(4)} />
                  <Cell k="Z" v={flash.mixture.Z.toPrecision(5)} />
                  <Cell k="Density" v={`${flash.mixture.density_kg_m3.toFixed(2)} kg/m³`} />
                  <Cell k="MW" v={`${flash.mw_g_mol.toFixed(3)} g/mol`} />
                  <Cell k="Speed of sound" v={`${flash.mixture.speedOfSound_m_s.toFixed(1)} m/s`} />
                  <Cell k="Bubble P (Wilson)" v={`${diagrams?.bubbleBar.toFixed(2)} bar`} />
                  <Cell k="Dew P (Wilson)" v={`${diagrams?.dewBar.toFixed(2)} bar`} />
                </>
              )}
              {sheet === "energy" && (
                <>
                  <Cell k="H" v={`${(flash.mixture.H_J_mol / 1000).toFixed(3)} kJ/mol`} />
                  <Cell k="S" v={`${flash.mixture.S_J_molK.toFixed(2)} J/mol-K`} />
                  <Cell k="Cp" v={`${flash.mixture.Cp_J_molK.toFixed(2)} J/mol-K`} />
                  <Cell k="Cv" v={`${(flash.vapor ?? flash.liquid)?.Cv_J_molK.toFixed(2) ?? "—"} J/mol-K`} />
                  <Cell k="Reference" v="IG 298.15 K, 1 bar" />
                  <Cell k="Residual" v="Peng–Robinson departure" />
                </>
              )}
              {sheet === "fugacity" && live?.species.map((s, i) => (
                <Cell key={s.id} k={`φ ${s.formula}`} v={(phi[i] ?? 1).toPrecision(4)} />
              ))}
              {sheet === "method" && (
                <>
                  <Cell k="Engine" v={flash.method} />
                  <Cell k="Adapter" v={`${flash.engineId}@${flash.engineVersion}`} />
                  {flash.assumptions.map((a) => <Cell key={a} k="Assumption" v={a} />)}
                  {flash.warnings.map((a) => <Cell key={a} k="Warning" v={a} />)}
                </>
              )}
            </div>
          </div>
        )}

        {selectedRun && <ResultsTable results={selectedRun.results} />}
        <RunInspector run={selectedRun} />
      </div>
    </section>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-panel px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[.12em] text-muted">{k}</div>
      <div className="mt-0.5 text-sm">{v}</div>
    </div>
  );
}
