import type { Species } from "../domain";
import { pengRobinsonEngine } from "./peng-robinson";
import { mixtureMw_g_mol } from "./species";

export type Point = { x: number; y: number };

function wilsonFactor(species: Species, T: number) {
  const { tc_K: Tc, pc_Pa: Pc, omega } = species.pr;
  return Pc * Math.exp(5.373 * (1 + omega) * (1 - Tc / T));
}

export function wilsonBubbleP_Pa(T_K: number, z: number[], species: Species[]): number {
  return z.reduce((sum, zi, i) => sum + zi * wilsonFactor(species[i], T_K), 0);
}

export function wilsonDewP_Pa(T_K: number, z: number[], species: Species[]): number {
  const den = z.reduce((sum, zi, i) => sum + zi / wilsonFactor(species[i], T_K), 0);
  return den > 0 ? 1 / den : Number.NaN;
}

export function kayTc_K(z: number[], species: Species[]): number {
  return z.reduce((sum, zi, i) => sum + zi * species[i].pr.tc_K, 0);
}

export function envelopeWilson(z: number[], species: Species[], steps = 36): {
  bubble: Point[];
  dew: Point[];
  method: string;
} {
  const tc = kayTc_K(z, species);
  const tMin = Math.max(110, Math.min(...species.map((s) => s.pr.tc_K)) * 0.55);
  const tMax = tc * 0.98;
  const bubble: Point[] = [];
  const dew: Point[] = [];
  for (let i = 0; i < steps; i++) {
    const T = tMin + (tMax - tMin) * (i / (steps - 1));
    const pb = wilsonBubbleP_Pa(T, z, species) / 1e5;
    const pd = wilsonDewP_Pa(T, z, species) / 1e5;
    if (Number.isFinite(pb) && pb > 0.2 && pb < 250) bubble.push({ x: T - 273.15, y: pb });
    if (Number.isFinite(pd) && pd > 0.2 && pd < 250) dew.push({ x: T - 273.15, y: pd });
  }
  return {
    bubble,
    dew,
    method: "Wilson K envelope (initial estimate, kij = 0). Operating point from Peng–Robinson PT flash.",
  };
}

export function sweepPR(
  z: number[],
  species: Species[],
  axis: "T" | "P",
  T_K: number,
  P_Pa: number,
  steps = 24,
): { T: Point[]; P: Point[]; Z: Point[]; rho: Point[]; Cp: Point[]; H: Point[] } {
  const Tpoints: Point[] = [];
  const Ppoints: Point[] = [];
  const Z: Point[] = [];
  const rho: Point[] = [];
  const Cp: Point[] = [];
  const H: Point[] = [];
  if (axis === "T") {
    const lo = Math.max(160, T_K - 80);
    const hi = T_K + 80;
    for (let i = 0; i < steps; i++) {
      const T = lo + (hi - lo) * (i / (steps - 1));
      const flash = pengRobinsonEngine.ptFlash({ T_K: T, P_Pa, z, species });
      const x = T - 273.15;
      Tpoints.push({ x, y: x });
      Z.push({ x, y: flash.mixture.Z });
      rho.push({ x, y: flash.mixture.density_kg_m3 });
      Cp.push({ x, y: flash.mixture.Cp_J_molK });
      H.push({ x, y: flash.mixture.H_J_mol / 1000 });
    }
  } else {
    const lo = Math.max(1e5, P_Pa / 6);
    const hi = Math.min(1.5e7, P_Pa * 2.2);
    for (let i = 0; i < steps; i++) {
      const P = lo + (hi - lo) * (i / (steps - 1));
      const flash = pengRobinsonEngine.ptFlash({ T_K, P_Pa: P, z, species });
      const x = P / 1e5;
      Ppoints.push({ x, y: x });
      Z.push({ x, y: flash.mixture.Z });
      rho.push({ x, y: flash.mixture.density_kg_m3 });
      Cp.push({ x, y: flash.mixture.Cp_J_molK });
      H.push({ x, y: flash.mixture.H_J_mol / 1000 });
    }
  }
  return { T: Tpoints, P: Ppoints, Z, rho, Cp, H };
}

export function mixtureMw(z: number[], species: Species[]) {
  return mixtureMw_g_mol(z, species);
}
