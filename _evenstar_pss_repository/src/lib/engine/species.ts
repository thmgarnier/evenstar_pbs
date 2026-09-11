import { IDS, type Species } from "../domain";

/** Standard critical constants (Poling / DIPPR-class values). */
export const SPECIES: Species[] = [
  {
    id: IDS.methane,
    formula: "CH4",
    name: "Methane",
    cas: "74-82-8",
    mw_g_mol: 16.043,
    igCp_J_molK: 35.7,
    pr: { tc_K: 190.564, pc_Pa: 4.5992e6, omega: 0.01142 },
  },
  {
    id: IDS.ethane,
    formula: "C2H6",
    name: "Ethane",
    cas: "74-84-0",
    mw_g_mol: 30.069,
    igCp_J_molK: 52.5,
    pr: { tc_K: 305.32, pc_Pa: 4.8722e6, omega: 0.0995 },
  },
  {
    id: IDS.propane,
    formula: "C3H8",
    name: "Propane",
    cas: "74-98-6",
    mw_g_mol: 44.096,
    igCp_J_molK: 73.6,
    pr: { tc_K: 369.83, pc_Pa: 4.248e6, omega: 0.1523 },
  },
  {
    id: IDS.ibutane,
    formula: "i-C4H10",
    name: "Isobutane",
    cas: "75-28-5",
    mw_g_mol: 58.122,
    igCp_J_molK: 96.8,
    pr: { tc_K: 407.817, pc_Pa: 3.640e6, omega: 0.1835 },
  },
  {
    id: IDS.nbutane,
    formula: "n-C4H10",
    name: "n-Butane",
    cas: "106-97-8",
    mw_g_mol: 58.122,
    igCp_J_molK: 98.5,
    pr: { tc_K: 425.12, pc_Pa: 3.796e6, omega: 0.2002 },
  },
  {
    id: IDS.nitrogen,
    formula: "N2",
    name: "Nitrogen",
    cas: "7727-37-9",
    mw_g_mol: 28.014,
    igCp_J_molK: 29.1,
    pr: { tc_K: 126.192, pc_Pa: 3.3958e6, omega: 0.0372 },
  },
  {
    id: IDS.co2,
    formula: "CO2",
    name: "Carbon dioxide",
    cas: "124-38-9",
    mw_g_mol: 44.01,
    igCp_J_molK: 37.1,
    pr: { tc_K: 304.1282, pc_Pa: 7.3773e6, omega: 0.22394 },
  },
];

export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map((s) => [s.id, s])) as Record<string, Species>;

export function mixtureMw_g_mol(z: number[], species: Species[]): number {
  return z.reduce((sum, zi, i) => sum + zi * species[i].mw_g_mol, 0);
}
