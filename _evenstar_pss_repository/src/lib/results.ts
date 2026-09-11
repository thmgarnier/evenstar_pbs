import type { EngineeringRegister, PublishedResult, SimulationRun, SolverResult, ThermoModel } from "./domain";
import { assertMoleSum, orderedSpecies, resolveComposition } from "./composition";
import { pengRobinsonEngine } from "./engine/peng-robinson";
import { cloneInputs } from "./provenance";
import { toSI, q } from "./units";
import { newId } from "./domain";
import { IDS } from "./domain";

function num(value: number, digits = 5) {
  if (!Number.isFinite(value)) return "—";
  return Number(value.toPrecision(digits));
}

export function runFlash(register: EngineeringRegister, model: ThermoModel): SimulationRun {
  const composition = resolveComposition(register, model.compositionId, model.localComponents);
  assertMoleSum(composition);
  const { species, z } = orderedSpecies(register, composition);
  const T = model.inputs.find((i) => i.path === "feed.temperature");
  const P = model.inputs.find((i) => i.path === "feed.pressure");
  const F = model.inputs.find((i) => i.path === "feed.massFlow");
  if (!T?.unit || !P?.unit || !F?.unit) throw new Error("Temperature, pressure and mass flow are required.");

  const flash = pengRobinsonEngine.ptFlash({
    T_K: toSI(q(Number(T.value), T.unit, "temperature")),
    P_Pa: toSI(q(Number(P.value), P.unit, "pressure")),
    z,
    species,
  });

  const bulk = flash.mixture;
  const methaneIndex = species.findIndex((s) => s.id === IDS.methane);
  const methaneY = flash.vapor?.x[methaneIndex] ?? flash.liquid?.x[methaneIndex] ?? z[methaneIndex];
  const phaseLabel = flash.phase;

  const results: SolverResult[] = [
    { key: "phase", label: "Phase", value: phaseLabel, unit: "—", group: "phase", publish: true },
    { key: "beta", label: "Vapour fraction", value: num(flash.vaporFraction), unit: "mol/mol", group: "phase", publish: true },
    { key: "mw", label: "Molecular weight", value: num(flash.mw_g_mol, 6), unit: "g/mol", group: "state", publish: true },
    { key: "Z", label: "Compressibility Z", value: num(bulk.Z), unit: "—", group: "state", publish: true },
    { key: "rho", label: "Mass density", value: num(bulk.density_kg_m3), unit: "kg/m3", group: "state", publish: true },
    { key: "H", label: "Molar enthalpy", value: num(bulk.H_J_mol / 1000), unit: "kJ/mol", group: "energy", publish: true },
    { key: "S", label: "Molar entropy", value: num(bulk.S_J_molK), unit: "J/mol-K", group: "energy", publish: true },
    { key: "Cp", label: "Cp", value: num(bulk.Cp_J_molK), unit: "J/mol-K", group: "energy", publish: true },
    { key: "c", label: "Speed of sound", value: num(bulk.speedOfSound_m_s, 4), unit: "m/s", group: "transport", publish: true },
    { key: "yCH4", label: "Methane mole fraction", value: num(methaneY, 6), unit: "mol/mol", group: "composition", publish: true },
    { key: "flow", label: "Mass flow (project)", value: Number(F.value), unit: F.unit, group: "state", publish: true },
    { key: "method", label: "Method", value: flash.method, unit: "—", group: "method", publish: true },
    { key: "engine", label: "Engine", value: `${flash.engineId}@${flash.engineVersion}`, unit: "—", group: "method", publish: false },
    { key: "T", label: "Temperature (solver)", value: num(flash.T_K, 7), unit: "K", group: "state", publish: false },
    { key: "P", label: "Pressure (solver)", value: num(flash.P_Pa, 8), unit: "Pa", group: "state", publish: false },
  ];

  if (flash.vapor) {
    results.push(
      { key: "Zv", label: "Z vapour (solver)", value: num(flash.vapor.Z), unit: "—", group: "state", publish: false },
      { key: "phiCH4v", label: "φ methane vapour (solver)", value: num(flash.vapor.phi[methaneIndex] ?? 1), unit: "—", group: "composition", publish: false },
    );
  }
  if (flash.liquid) {
    results.push({ key: "Zl", label: "Z liquid (solver)", value: num(flash.liquid.Z), unit: "—", group: "state", publish: false });
  }

  return {
    id: newId("run"),
    modelId: model.id,
    status: "completed",
    engineId: flash.engineId,
    engineVersion: flash.engineVersion,
    method: flash.method,
    assumptions: flash.assumptions,
    warnings: flash.warnings,
    createdAt: new Date().toISOString(),
    inputSnapshot: cloneInputs(model.inputs),
    results,
    publishedIds: [],
  };
}

export function publishRun(register: EngineeringRegister, run: SimulationRun, model: ThermoModel): {
  register: EngineeringRegister;
  run: SimulationRun;
} {
  const published: PublishedResult[] = run.results
    .filter((row) => row.publish)
    .map((row) => ({
      id: newId("pub"),
      runId: run.id,
      modelId: model.id,
      caseId: model.caseId,
      name: row.label,
      value: row.value,
      unit: row.unit,
      group: row.group,
      publishedAt: new Date().toISOString(),
    }));
  const nextRun = { ...run, publishedIds: published.map((p) => p.id) };
  return {
    register: {
      ...register,
      runs: register.runs.map((item) => (item.id === run.id ? nextRun : item)),
      publishedResults: [
        ...register.publishedResults.filter((row) => row.runId !== run.id),
        ...published,
      ],
    },
    run: nextRun,
  };
}

export function liveFlash(register: EngineeringRegister, model: ThermoModel) {
  const composition = resolveComposition(register, model.compositionId, model.localComponents);
  const { species, z: raw } = orderedSpecies(register, composition);
  const sum = raw.reduce((a, b) => a + b, 0);
  const z = sum > 0 ? raw.map((v) => v / sum) : raw;
  const T = model.inputs.find((i) => i.path === "feed.temperature");
  const P = model.inputs.find((i) => i.path === "feed.pressure");
  if (!T?.unit || !P?.unit) throw new Error("Temperature and pressure are required.");
  const flash = pengRobinsonEngine.ptFlash({
    T_K: toSI(q(Number(T.value), T.unit, "temperature")),
    P_Pa: toSI(q(Number(P.value), P.unit, "pressure")),
    z,
    species,
  });
  return { flash, species, z, sum, T_C: Number(T.value), P_bar: Number(P.value) };
}

export function persistModel(register: EngineeringRegister, model: ThermoModel): EngineeringRegister {
  const others = register.models.filter((item) => item.id !== model.id);
  return { ...register, models: [...others, model] };
}

export function persistRun(register: EngineeringRegister, run: SimulationRun): EngineeringRegister {
  const others = register.runs.filter((item) => item.id !== run.id);
  return { ...register, runs: [...others, run] };
}
