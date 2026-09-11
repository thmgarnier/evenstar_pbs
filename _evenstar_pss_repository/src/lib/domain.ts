import type { Quantity } from "./units";

export type InputClass = "local" | "project" | "linked";
export type CompositionBasis = "mole" | "mass";
export type CaseKind = "design" | "summer" | "winter" | "turndown";
export type RunStatus = "completed" | "failed";
export type WorkspaceId = "thermo" | "process" | "hydraulics" | "water" | "dynamics";
export type RowAction = "keep" | "update-pss" | "update-project";

export type Species = {
  id: string;
  formula: string;
  name: string;
  cas: string;
  mw_g_mol: number;
  igCp_J_molK: number;
  pr: {
    tc_K: number;
    pc_Pa: number;
    omega: number;
  };
};

export type CompositionComponent = {
  speciesId: string;
  fraction: number;
};

export type Composition = {
  id: string;
  tag: string;
  name: string;
  basis: CompositionBasis;
  revision: number;
  status: string;
  source: string;
  components: CompositionComponent[];
};

export type OperatingCase = {
  id: string;
  tag: string;
  name: string;
  kind: CaseKind;
};

export type StreamRecord = {
  id: string;
  tag: string;
  name: string;
  fluidClass: string;
  compositionId: string;
  caseId: string;
  temperature: Quantity;
  pressure: Quantity;
  massFlow: Quantity;
  revision: number;
  source: string;
};

export type EngineeringVariable = {
  id: string;
  objectTag: string;
  name: string;
  value: number;
  unit: string;
  basis: string;
  caseId: string | null;
  revision: number;
  source: string;
};

export type Project = {
  id: string;
  code: string;
  name: string;
  revision: string;
};

export type Snapshot = {
  recordId: string;
  field: string;
  value: number | string;
  unit: string | null;
  basis: string | null;
  revision: number;
  sourceSystem: string;
  importedAt: string;
  hash: string;
};

export type ModelInput = {
  path: string;
  label: string;
  class: InputClass;
  value: number | string;
  unit: string | null;
  dimension: string | null;
  basis: string | null;
  registerRecordId: string | null;
  registerField: string | null;
  snapshot: Snapshot | null;
};

export type ThermoModel = {
  id: string;
  projectId: string;
  name: string;
  workspace: "thermo";
  streamId: string;
  compositionId: string;
  caseId: string;
  createdAt: string;
  inputs: ModelInput[];
  localComponents: CompositionComponent[] | null;
};

export type SolverResult = {
  key: string;
  label: string;
  value: number | string;
  unit: string;
  group: "state" | "phase" | "transport" | "energy" | "composition" | "method";
  publish: boolean;
};

export type PublishedResult = {
  id: string;
  runId: string;
  modelId: string;
  caseId: string;
  name: string;
  value: number | string;
  unit: string;
  group: string;
  publishedAt: string;
};

export type SimulationRun = {
  id: string;
  modelId: string;
  status: RunStatus;
  engineId: string;
  engineVersion: string;
  method: string;
  assumptions: string[];
  warnings: string[];
  createdAt: string;
  inputSnapshot: ModelInput[];
  results: SolverResult[];
  publishedIds: string[];
};

export type EngineeringRegister = {
  schemaVersion: string;
  project: Project;
  species: Species[];
  compositions: Composition[];
  streams: StreamRecord[];
  variables: EngineeringVariable[];
  cases: OperatingCase[];
  models: ThermoModel[];
  runs: SimulationRun[];
  publishedResults: PublishedResult[];
};

export const IDS = {
  project: "10000000-0000-4000-8000-000000000001",
  methane: "60000000-0000-4000-8000-000000000001",
  ethane: "60000000-0000-4000-8000-000000000002",
  propane: "60000000-0000-4000-8000-000000000003",
  ibutane: "60000000-0000-4000-8000-000000000004",
  nbutane: "60000000-0000-4000-8000-000000000005",
  nitrogen: "60000000-0000-4000-8000-000000000006",
  co2: "60000000-0000-4000-8000-000000000007",
  composition: "70000000-0000-4000-8000-000000000001",
  stream: "80000000-0000-4000-8000-000000000001",
  caseDesign: "90000000-0000-4000-8000-000000000001",
  varAmbient: "a0000000-0000-4000-8000-000000000001",
  varHumidity: "a0000000-0000-4000-8000-000000000002",
  model: "b0000000-0000-4000-8000-000000000001",
} as const;

export function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}
