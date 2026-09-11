import type { Species } from "../domain";

export type FlashInput = {
  T_K: number;
  P_Pa: number;
  z: number[];
  species: Species[];
};

export type PhaseResult = {
  Z: number;
  x: number[];
  density_kg_m3: number;
  molarDensity_mol_m3: number;
  H_J_mol: number;
  S_J_molK: number;
  Cp_J_molK: number;
  Cv_J_molK: number;
  speedOfSound_m_s: number;
  phi: number[];
};

export type FlashResult = {
  engineId: string;
  engineVersion: string;
  method: string;
  assumptions: string[];
  warnings: string[];
  T_K: number;
  P_Pa: number;
  mw_g_mol: number;
  vaporFraction: number;
  phase: "vapour" | "liquid" | "two-phase";
  vapor: PhaseResult | null;
  liquid: PhaseResult | null;
  mixture: {
    Z: number;
    density_kg_m3: number;
    H_J_mol: number;
    S_J_molK: number;
    Cp_J_molK: number;
    speedOfSound_m_s: number;
  };
};

export interface EngineAdapter {
  id: string;
  version: string;
  displayName: string;
  capabilities: Array<"pt-flash" | "properties">;
  ptFlash(input: FlashInput): FlashResult;
}
