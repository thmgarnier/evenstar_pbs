import { assertMoleSum, orderedSpecies } from "./composition";
import {
  IDS,
  type EngineeringRegister,
  type InputClass,
  type ModelInput,
  type RowAction,
  type StreamRecord,
  type ThermoModel,
} from "./domain";
import { makeSnapshot, snapshotHash, type SnapshotPayload } from "./provenance";
import { compatible, convert, q, type Quantity } from "./units";

export type CompareRow = {
  path: string;
  label: string;
  pssValue: string;
  projectValue: string;
  unit: string;
  pssRevision: string;
  projectRevision: string;
  status: "same" | "different" | "stale" | "local-only";
  inputClass: InputClass;
  action: RowAction;
};

function qtyText(value: number | string, unit: string | null) {
  return unit ? `${value} ${unit}` : String(value);
}

function streamPayload(stream: StreamRecord, field: "temperature" | "pressure" | "massFlow"): SnapshotPayload {
  const qty = stream[field];
  return {
    recordId: stream.id,
    field,
    value: qty.value,
    unit: qty.unit,
    basis: stream.caseId,
    revision: stream.revision,
  };
}

function compositionPayload(register: EngineeringRegister, compositionId: string): SnapshotPayload {
  const composition = register.compositions.find((c) => c.id === compositionId);
  if (!composition) throw new Error("Composition not found");
  return {
    recordId: composition.id,
    field: "composition",
    value: composition.tag,
    unit: composition.basis,
    basis: composition.basis,
    revision: composition.revision,
  };
}

export function livePayload(register: EngineeringRegister, input: ModelInput): SnapshotPayload | null {
  if (!input.registerRecordId || !input.registerField) return null;
  if (input.registerField === "composition") {
    const composition = register.compositions.find((c) => c.id === input.registerRecordId);
    if (!composition) return null;
    return compositionPayload(register, composition.id);
  }
  const stream = register.streams.find((s) => s.id === input.registerRecordId);
  if (!stream) return null;
  if (input.registerField === "temperature" || input.registerField === "pressure" || input.registerField === "massFlow") {
    return streamPayload(stream, input.registerField);
  }
  return null;
}

function linkedQuantity(
  path: string,
  label: string,
  quantity: Quantity,
  stream: StreamRecord,
  field: "temperature" | "pressure" | "massFlow",
): ModelInput {
  const payload = streamPayload(stream, field);
  return {
    path,
    label,
    class: "linked",
    value: quantity.value,
    unit: quantity.unit,
    dimension: quantity.dimension,
    basis: stream.caseId,
    registerRecordId: stream.id,
    registerField: field,
    snapshot: makeSnapshot(payload),
  };
}

export function startFromProject(register: EngineeringRegister, streamId = IDS.stream): ThermoModel {
  const stream = register.streams.find((s) => s.id === streamId);
  if (!stream) throw new Error("Stream NG-001 is not in the project register.");
  const composition = register.compositions.find((c) => c.id === stream.compositionId);
  if (!composition) throw new Error("Feed composition is not in the project register.");
  assertMoleSum(composition);
  orderedSpecies(register, composition);

  if (!compatible(stream.temperature.unit, "°C")) throw new Error("Temperature unit cannot be mapped.");
  if (!compatible(stream.pressure.unit, "bar")) throw new Error("Pressure unit cannot be mapped.");
  if (!compatible(stream.massFlow.unit, "t/h")) throw new Error("Mass-flow unit cannot be mapped.");

  const T = convert(stream.temperature, "°C");
  const P = convert(stream.pressure, "bar");
  const F = convert(stream.massFlow, "t/h");
  const compPayload = compositionPayload(register, composition.id);

  return {
    id: IDS.model,
    projectId: register.project.id,
    name: "NG-001 PT flash",
    workspace: "thermo",
    streamId: stream.id,
    compositionId: composition.id,
    caseId: stream.caseId,
    createdAt: new Date().toISOString(),
    localComponents: composition.components.map((c) => ({ ...c })),
    inputs: [
      linkedQuantity("feed.temperature", "Temperature", T, stream, "temperature"),
      linkedQuantity("feed.pressure", "Pressure", P, stream, "pressure"),
      linkedQuantity("feed.massFlow", "Mass flow", F, stream, "massFlow"),
      {
        path: "feed.composition",
        label: "Composition",
        class: "linked",
        value: composition.tag,
        unit: composition.basis,
        dimension: "fraction",
        basis: composition.basis,
        registerRecordId: composition.id,
        registerField: "composition",
        snapshot: makeSnapshot(compPayload),
      },
    ],
  };
}

export function compareRows(model: ThermoModel, register: EngineeringRegister): CompareRow[] {
  return model.inputs.map((input) => {
    const live = livePayload(register, input);
    if (!live) {
      return {
        path: input.path,
        label: input.label,
        pssValue: qtyText(input.value, input.unit),
        projectValue: "—",
        unit: input.unit ?? "",
        pssRevision: input.snapshot ? String(input.snapshot.revision) : "local",
        projectRevision: "—",
        status: "local-only" as const,
        inputClass: input.class,
        action: "keep" as const,
      };
    }
    const sameValue = String(input.value) === String(live.value) && (input.unit ?? null) === live.unit;
    const sameRev = input.snapshot?.revision === live.revision;
    const stale = input.snapshot ? input.snapshot.hash !== snapshotHash(live) : true;
    let status: CompareRow["status"] = "same";
    if (!sameValue || stale) status = sameRev && sameValue ? "same" : stale ? "stale" : "different";
    if (!sameValue) status = stale ? "stale" : "different";
    return {
      path: input.path,
      label: input.label,
      pssValue: qtyText(input.value, input.unit),
      projectValue: qtyText(live.value, live.unit),
      unit: live.unit ?? input.unit ?? "",
      pssRevision: input.snapshot ? `rev ${input.snapshot.revision}` : "local",
      projectRevision: `rev ${live.revision}`,
      status,
      inputClass: input.class,
      action: "keep",
    };
  });
}

export function applyRead(model: ThermoModel, register: EngineeringRegister, paths: string[]): ThermoModel {
  const inputs = model.inputs.map((input) => {
    if (!paths.includes(input.path)) return input;
    const live = livePayload(register, input);
    if (!live) return input;
    return {
      ...input,
      class: "linked" as const,
      value: live.value,
      unit: live.unit,
      snapshot: makeSnapshot(live),
    };
  });
  let localComponents = model.localComponents;
  if (paths.includes("feed.composition")) {
    const composition = register.compositions.find((c) => c.id === model.compositionId);
    if (composition) localComponents = composition.components.map((c) => ({ ...c }));
  }
  return { ...model, inputs, localComponents };
}

export function applyWrite(model: ThermoModel, register: EngineeringRegister, paths: string[]): EngineeringRegister {
  const next = structuredClone(register);
  for (const path of paths) {
    const input = model.inputs.find((item) => item.path === path);
    if (!input?.registerRecordId || !input.registerField) continue;
    if (input.registerField === "composition") continue;
    const stream = next.streams.find((s) => s.id === input.registerRecordId);
    if (!stream) continue;
    if (input.registerField === "temperature" || input.registerField === "pressure" || input.registerField === "massFlow") {
      const current = stream[input.registerField];
      stream[input.registerField] = q(Number(input.value), input.unit ?? current.unit, current.dimension);
      stream.revision += 1;
      stream.source = "pss write-to-project";
    }
  }
  return next;
}

export function simulateProjectChange(register: EngineeringRegister): EngineeringRegister {
  const next = structuredClone(register);
  const stream = next.streams.find((s) => s.id === IDS.stream);
  const composition = next.compositions.find((c) => c.id === IDS.composition);
  if (stream) {
    stream.pressure = q(68, "bar", "pressure");
    stream.massFlow = q(130, "t/h", "massFlow");
    stream.revision += 1;
    stream.source = "simulated project-data change";
  }
  if (composition) {
    composition.revision += 1;
    composition.source = "simulated project-data change";
  }
  return next;
}

export function markLocalOverride(model: ThermoModel, path: string, value: number): ThermoModel {
  return {
    ...model,
    inputs: model.inputs.map((input) => {
      if (input.path !== path) return input;
      return {
        ...input,
        class: input.class === "linked" ? "local" : input.class,
        value,
      };
    }),
  };
}

export function setLocalFraction(model: ThermoModel, speciesId: string, fraction: number): ThermoModel {
  const components = (model.localComponents ?? []).map((c) => (
    c.speciesId === speciesId ? { ...c, fraction: Math.max(0, fraction) } : c
  ));
  return {
    ...model,
    localComponents: components,
    inputs: model.inputs.map((input) => (
      input.path === "feed.composition"
        ? { ...input, class: "local", value: `${String(input.value).split(" ·")[0]} · local` }
        : input
    )),
  };
}

export function renormalizeLocal(model: ThermoModel): ThermoModel {
  const sum = (model.localComponents ?? []).reduce((s, c) => s + c.fraction, 0);
  if (sum <= 0) return model;
  return {
    ...model,
    localComponents: (model.localComponents ?? []).map((c) => ({ ...c, fraction: c.fraction / sum })),
    inputs: model.inputs.map((input) => (
      input.path === "feed.composition" ? { ...input, class: "local" } : input
    )),
  };
}
