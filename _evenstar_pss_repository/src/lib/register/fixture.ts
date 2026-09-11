import { IDS, type EngineeringRegister } from "../domain";
import { SPECIES } from "../engine/species";

export const FIXTURE_REGISTER: EngineeringRegister = {
  schemaVersion: "pss-register-0.1",
  project: {
    id: IDS.project,
    code: "EV-DEMO-001",
    name: "Evenstar Reference Skid",
    revision: "A",
  },
  species: SPECIES,
  compositions: [
    {
      id: IDS.composition,
      tag: "GAS-FEED-R1",
      name: "Feed gas — design basis",
      basis: "mole",
      revision: 4,
      status: "approved",
      source: "seed / design basis",
      components: [
        { speciesId: IDS.methane, fraction: 0.89 },
        { speciesId: IDS.ethane, fraction: 0.06 },
        { speciesId: IDS.propane, fraction: 0.025 },
        { speciesId: IDS.ibutane, fraction: 0.004 },
        { speciesId: IDS.nbutane, fraction: 0.006 },
        { speciesId: IDS.nitrogen, fraction: 0.008 },
        { speciesId: IDS.co2, fraction: 0.007 },
      ],
    },
  ],
  streams: [
    {
      id: IDS.stream,
      tag: "NG-001",
      name: "Feed gas",
      fluidClass: "gas",
      compositionId: IDS.composition,
      caseId: IDS.caseDesign,
      temperature: { value: 25, unit: "°C", dimension: "temperature" },
      pressure: { value: 70, unit: "bar", dimension: "pressure" },
      massFlow: { value: 125, unit: "t/h", dimension: "massFlow" },
      revision: 4,
      source: "seed / design basis",
    },
  ],
  variables: [
    {
      id: IDS.varAmbient,
      objectTag: "SITE",
      name: "Ambient temperature",
      value: 15,
      unit: "°C",
      basis: "dry bulb",
      caseId: IDS.caseDesign,
      revision: 1,
      source: "seed / site data",
    },
    {
      id: IDS.varHumidity,
      objectTag: "SITE",
      name: "Relative humidity",
      value: 60,
      unit: "-",
      basis: "site average",
      caseId: null,
      revision: 1,
      source: "seed / site data",
    },
  ],
  cases: [
    {
      id: IDS.caseDesign,
      tag: "DESIGN",
      name: "Design case",
      kind: "design",
    },
  ],
  models: [],
  runs: [],
  publishedResults: [],
};

export function cloneFixture(): EngineeringRegister {
  return structuredClone(FIXTURE_REGISTER);
}
