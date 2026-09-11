import type { Species } from "../domain";
import type { EngineAdapter, FlashInput, FlashResult, PhaseResult } from "./adapter";
import { mixtureMw_g_mol } from "./species";

const R = 8.314462618;
const SQRT2 = Math.SQRT2;
const TREF = 298.15;
const PREF = 1e5;

export const PR_ENGINE_ID = "pss.peng-robinson";
export const PR_ENGINE_VERSION = "0.1.0";

type Pure = {
  a: number;
  b: number;
  kappa: number;
  alpha: number;
  da_dT: number;
};

function kappa(omega: number) {
  return 0.37464 + 1.54226 * omega - 0.26992 * omega * omega;
}

function pures(species: Species[], T: number): Pure[] {
  return species.map((s) => {
    const { tc_K: Tc, pc_Pa: Pc, omega } = s.pr;
    const k = kappa(omega);
    const Tr = T / Tc;
    const sq = 1 + k * (1 - Math.sqrt(Tr));
    const alpha = sq * sq;
    const ac = 0.45724 * (R * R * Tc * Tc) / Pc;
    const a = ac * alpha;
    const b = 0.07780 * R * Tc / Pc;
    const dalpha_dT = -k * Math.sqrt(Math.max(alpha, 0)) / Math.sqrt(T * Tc);
    return { a, b, kappa: k, alpha, da_dT: ac * dalpha_dT };
  });
}

function mix(z: number[], p: Pure[], kij: number[][]) {
  const n = z.length;
  let a = 0;
  let da_dT = 0;
  let b = 0;
  const aRow = Array.from({ length: n }, () => 0);
  for (let i = 0; i < n; i++) {
    b += z[i] * p[i].b;
    for (let j = 0; j < n; j++) {
      const aij = Math.sqrt(p[i].a * p[j].a) * (1 - kij[i][j]);
      a += z[i] * z[j] * aij;
      aRow[i] += z[j] * aij;
      const daij_dT =
        0.5 * Math.sqrt(p[i].a * p[j].a) * (1 - kij[i][j]) * (p[i].da_dT / p[i].a + p[j].da_dT / p[j].a);
      da_dT += z[i] * z[j] * daij_dT;
    }
  }
  return { a, b, da_dT, aRow };
}

function zeroKij(n: number): number[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
}

function cubicRoots(A: number, B: number): number[] {
  // Z^3 + c2 Z^2 + c1 Z + c0 = 0
  const c2 = -(1 - B);
  const c1 = A - 3 * B * B - 2 * B;
  const c0 = -(A * B - B * B - B * B * B);
  const p = c1 - (c2 * c2) / 3;
  const q = c0 + (2 * c2 * c2 * c2) / 27 - (c2 * c1) / 3;
  const disc = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);
  const roots: number[] = [];
  if (disc > 1e-16) {
    const s = Math.sqrt(disc);
    const u = Math.cbrt(-q / 2 + s);
    const v = Math.cbrt(-q / 2 - s);
    roots.push(u + v - c2 / 3);
  } else if (Math.abs(disc) <= 1e-16) {
    const u = Math.cbrt(-q / 2);
    roots.push(2 * u - c2 / 3, -u - c2 / 3);
  } else {
    const r = Math.sqrt((-p) / 3);
    const phi = Math.acos(Math.min(1, Math.max(-1, (-q / 2) / (r * r * r))));
    roots.push(
      2 * r * Math.cos(phi / 3) - c2 / 3,
      2 * r * Math.cos((phi + 2 * Math.PI) / 3) - c2 / 3,
      2 * r * Math.cos((phi + 4 * Math.PI) / 3) - c2 / 3,
    );
  }
  return [...new Set(roots.filter((z) => Number.isFinite(z) && z > B + 1e-12))].sort((a, b) => a - b);
}

function lnPhi(z: number[], p: Pure[], kij: number[][], T: number, P: number, Z: number) {
  const n = z.length;
  const m = mix(z, p, kij);
  const A = m.a * P / (R * R * T * T);
  const B = m.b * P / (R * T);
  const phi = Array.from({ length: n }, () => 1);
  if (m.b <= 0 || Z <= B) return phi;
  const logTerm = Math.log((Z + (1 + SQRT2) * B) / (Z + (1 - SQRT2) * B));
  for (let i = 0; i < n; i++) {
    const bi_b = p[i].b / m.b;
    const sumA = 2 * m.aRow[i] / m.a;
    const lnphi =
      bi_b * (Z - 1) -
      Math.log(Z - B) -
      (A / (2 * SQRT2 * B)) * (sumA - bi_b) * logTerm;
    phi[i] = Math.exp(lnphi);
  }
  return phi;
}

function residualHS(z: number[], p: Pure[], kij: number[][], T: number, P: number, Z: number) {
  const m = mix(z, p, kij);
  const B = m.b * P / (R * T);
  const logTerm = Math.log((Z + (1 + SQRT2) * B) / (Z + (1 - SQRT2) * B));
  const Hr = R * T * (Z - 1) + (T * m.da_dT - m.a) / (2 * SQRT2 * m.b) * logTerm;
  const Sr = R * Math.log(Z - B) + m.da_dT / (2 * SQRT2 * m.b) * logTerm;
  return { Hr, Sr };
}

function idealHS(species: Species[], z: number[], T: number, P: number) {
  let Cp = 0;
  let H = 0;
  let S = 0;
  for (let i = 0; i < z.length; i++) {
    const cp = species[i].igCp_J_molK;
    Cp += z[i] * cp;
    H += z[i] * cp * (T - TREF);
    S += z[i] * (cp * Math.log(T / TREF) - R * Math.log(P / PREF));
    if (z[i] > 1e-16) S -= z[i] * R * Math.log(z[i]);
  }
  return { H, S, Cp };
}

function dPdV(V: number, a: number, b: number, T: number) {
  const denom = V * (V + b) + b * (V - b);
  return -R * T / ((V - b) * (V - b)) + a * (2 * V + 2 * b) / (denom * denom);
}

function phaseProps(
  z: number[],
  species: Species[],
  p: Pure[],
  kij: number[][],
  T: number,
  P: number,
  Z: number,
): PhaseResult {
  const m = mix(z, p, kij);
  const V = Z * R * T / P;
  const mw_kg_mol = mixtureMw_g_mol(z, species) / 1000;
  const molarDensity = 1 / V;
  const density = molarDensity * mw_kg_mol;
  const { Hr, Sr } = residualHS(z, p, kij, T, P, Z);
  const ig = idealHS(species, z, T, P);
  const H = ig.H + Hr;
  const S = ig.S + Sr;
  const dT = 0.15;
  const pHot = pures(species, T + dT);
  const rootsHot = cubicRoots(
    mix(z, pHot, kij).a * P / (R * R * (T + dT) * (T + dT)),
    mix(z, pHot, kij).b * P / (R * (T + dT)),
  );
  const Zhot = pickNearest(rootsHot, Z);
  const Hhot = idealHS(species, z, T + dT, P).H + residualHS(z, pHot, kij, T + dT, P, Zhot).Hr;
  const Cp = (Hhot - H) / dT;
  const dPdT = R / (V - m.b) - m.da_dT / (V * (V + m.b) + m.b * (V - m.b));
  const CvExact = Cp + T * dPdT * dPdT / dPdV(V, m.a, m.b, T);
  const gamma = Cp / Math.max(CvExact, 1e-6);
  const dPdrho = -V * V * dPdV(V, m.a, m.b, T); // P vs molar density
  const speed = Math.sqrt(Math.max(gamma * dPdrho / mw_kg_mol, 0));
  return {
    Z,
    x: [...z],
    density_kg_m3: density,
    molarDensity_mol_m3: molarDensity,
    H_J_mol: H,
    S_J_molK: S,
    Cp_J_molK: Cp,
    Cv_J_molK: CvExact,
    speedOfSound_m_s: speed,
    phi: lnPhi(z, p, kij, T, P, Z),
  };
}

function pickNearest(roots: number[], target: number) {
  if (!roots.length) return target;
  return roots.reduce((best, z) => (Math.abs(z - target) < Math.abs(best - target) ? z : best), roots[0]);
}

function gres(Z: number, A: number, B: number) {
  if (Z <= B) return Number.POSITIVE_INFINITY;
  return Z - 1 - Math.log(Z - B) - (A / (2 * SQRT2 * B)) * Math.log((Z + (1 + SQRT2) * B) / (Z + (1 - SQRT2) * B));
}

function mixG(z: number[], phi: number[]) {
  let g = 0;
  for (let i = 0; i < z.length; i++) {
    if (z[i] > 1e-16 && phi[i] > 0) g += z[i] * Math.log(z[i] * phi[i]);
  }
  return g;
}

function stableRoots(A: number, B: number) {
  const roots = cubicRoots(A, B);
  if (!roots.length) throw new Error("Peng-Robinson cubic has no physical root");
  if (roots.length === 1) return { liquid: roots[0], vapor: roots[0] };
  return { liquid: roots[0], vapor: roots[roots.length - 1] };
}

function wilsonK(species: Species[], T: number, P: number) {
  return species.map((s) => {
    const { tc_K: Tc, pc_Pa: Pc, omega } = s.pr;
    return (Pc / P) * Math.exp(5.373 * (1 + omega) * (1 - Tc / T));
  });
}

function rachfordRice(z: number[], K: number[], beta: number) {
  let f = 0;
  let df = 0;
  for (let i = 0; i < z.length; i++) {
    const d = 1 + beta * (K[i] - 1);
    f += z[i] * (K[i] - 1) / d;
    df -= z[i] * (K[i] - 1) * (K[i] - 1) / (d * d);
  }
  return { f, df };
}

function solveBeta(z: number[], K: number[]) {
  const kmin = Math.min(...K);
  const kmax = Math.max(...K);
  if (kmax < 1) return 0;
  if (kmin > 1) return 1;
  let lo = 0;
  let hi = 1;
  let beta = 0.5;
  for (let n = 0; n < 40; n++) {
    const { f, df } = rachfordRice(z, K, beta);
    if (Math.abs(f) < 1e-12) return Math.min(1, Math.max(0, beta));
    let next = beta - f / df;
    if (!Number.isFinite(next) || next <= lo || next >= hi) next = 0.5 * (lo + hi);
    if (f > 0) lo = beta;
    else hi = beta;
    beta = next;
  }
  return Math.min(1, Math.max(0, beta));
}

function normalize(v: number[]) {
  const s = v.reduce((a, b) => a + b, 0);
  if (s <= 0) return v.map(() => 1 / v.length);
  return v.map((x) => x / s);
}

function ptFlash(input: FlashInput): FlashResult {
  const { T_K: T, P_Pa: P, species } = input;
  const z = normalize(input.z);
  const n = z.length;
  const kij = zeroKij(n);
  const p = pures(species, T);
  let K = wilsonK(species, T, P);
  let beta = 0.5;
  let x = [...z];
  let y = [...z];
  let converged = false;

  for (let iter = 0; iter < 80; iter++) {
    beta = solveBeta(z, K);
    x = normalize(z.map((zi, i) => zi / (1 + beta * (K[i] - 1))));
    y = normalize(x.map((xi, i) => K[i] * xi));
    const mx = mix(x, p, kij);
    const my = mix(y, p, kij);
    const Ax = mx.a * P / (R * R * T * T);
    const Bx = mx.b * P / (R * T);
    const Ay = my.a * P / (R * R * T * T);
    const By = my.b * P / (R * T);
    const rx = stableRoots(Ax, Bx);
    const ry = stableRoots(Ay, By);
    const phiL = lnPhi(x, p, kij, T, P, rx.liquid);
    const phiV = lnPhi(y, p, kij, T, P, ry.vapor);
    const Knew = phiL.map((pL, i) => pL / phiV[i]);
    const err = Math.max(...Knew.map((k, i) => Math.abs(Math.log(k / K[i]))));
    K = Knew;
    if (err < 1e-10) {
      converged = true;
      break;
    }
  }

  const warnings: string[] = [];
  if (!converged) warnings.push("Flash successive-substitution did not fully converge; last iterate used.");

  const feedMix = mix(z, p, kij);
  const Af = feedMix.a * P / (R * R * T * T);
  const Bf = feedMix.b * P / (R * T);
  const feedRoots = stableRoots(Af, Bf);
  const gL = gres(feedRoots.liquid, Af, Bf);
  const gV = gres(feedRoots.vapor, Af, Bf);
  const singleZ = gL <= gV ? feedRoots.liquid : feedRoots.vapor;
  const phiFeedL = lnPhi(z, p, kij, T, P, feedRoots.liquid);
  const phiFeedV = lnPhi(z, p, kij, T, P, feedRoots.vapor);
  const gFeed = Math.min(mixG(z, phiFeedL), mixG(z, phiFeedV));

  const split = Math.max(...x.map((xi, i) => Math.abs(xi - y[i])));
  const candidateTwoPhase = beta > 1e-5 && beta < 1 - 1e-5 && split > 1e-4;
  let gTwo = Number.POSITIVE_INFINITY;
  if (candidateTwoPhase) {
    const rx = stableRoots(mix(x, p, kij).a * P / (R * R * T * T), mix(x, p, kij).b * P / (R * T));
    const ry = stableRoots(mix(y, p, kij).a * P / (R * R * T * T), mix(y, p, kij).b * P / (R * T));
    gTwo = (1 - beta) * mixG(x, lnPhi(x, p, kij, T, P, rx.liquid)) + beta * mixG(y, lnPhi(y, p, kij, T, P, ry.vapor));
  }
  const twoPhase = candidateTwoPhase && gTwo < gFeed - 1e-8;

  let phase: FlashResult["phase"] = "vapour";
  let vaporFraction = 1;
  let vapor: PhaseResult | null = null;
  let liquid: PhaseResult | null = null;

  if (twoPhase) {
    phase = "two-phase";
    vaporFraction = beta;
    vapor = phaseProps(y, species, p, kij, T, P, stableRoots(mix(y, p, kij).a * P / (R * R * T * T), mix(y, p, kij).b * P / (R * T)).vapor);
    liquid = phaseProps(x, species, p, kij, T, P, stableRoots(mix(x, p, kij).a * P / (R * R * T * T), mix(x, p, kij).b * P / (R * T)).liquid);
  } else {
    const supercriticalLight = T > Math.min(...species.map((s) => s.pr.tc_K));
    phase = supercriticalLight || singleZ >= 0.5 ? "vapour" : "liquid";
    vaporFraction = phase === "vapour" ? 1 : 0;
    const props = phaseProps(z, species, p, kij, T, P, singleZ);
    if (phase === "vapour") vapor = props;
    else liquid = props;
  }

  const bulk = vapor && liquid
    ? {
        Z: vaporFraction * vapor.Z + (1 - vaporFraction) * liquid.Z,
        density_kg_m3: 1 / (vaporFraction / vapor.density_kg_m3 + (1 - vaporFraction) / liquid.density_kg_m3),
        H_J_mol: vaporFraction * vapor.H_J_mol + (1 - vaporFraction) * liquid.H_J_mol,
        S_J_molK: vaporFraction * vapor.S_J_molK + (1 - vaporFraction) * liquid.S_J_molK,
        Cp_J_molK: vaporFraction * vapor.Cp_J_molK + (1 - vaporFraction) * liquid.Cp_J_molK,
        speedOfSound_m_s: vapor.speedOfSound_m_s,
      }
    : {
        Z: (vapor ?? liquid)!.Z,
        density_kg_m3: (vapor ?? liquid)!.density_kg_m3,
        H_J_mol: (vapor ?? liquid)!.H_J_mol,
        S_J_molK: (vapor ?? liquid)!.S_J_molK,
        Cp_J_molK: (vapor ?? liquid)!.Cp_J_molK,
        speedOfSound_m_s: (vapor ?? liquid)!.speedOfSound_m_s,
      };

  const lightest = species.reduce((a, b) => (a.pr.tc_K < b.pr.tc_K ? a : b));
  if (T < 0.5 * lightest.pr.tc_K) {
    warnings.push(`T is below 0.5 Tc of ${lightest.name}; cubic EOS may be outside its intended range.`);
  }
  const heaviestPc = Math.max(...species.map((s) => s.pr.pc_Pa));
  if (P > 3 * heaviestPc) {
    warnings.push("Pressure is well above component critical pressures; treat density as an estimate.");
  }

  return {
    engineId: PR_ENGINE_ID,
    engineVersion: PR_ENGINE_VERSION,
    method: "PSS Peng-Robinson 0.1 (classic α, kij = 0)",
    assumptions: [
      "Classic Peng–Robinson α(T); van der Waals mixing; all kij = 0.",
      "Ideal-gas Cp taken as a constant at 298.15 K (not a full IG polynomial).",
      "Enthalpy/entropy reference: IG at 298.15 K, 1 bar, plus PR residual.",
    ],
    warnings,
    T_K: T,
    P_Pa: P,
    mw_g_mol: mixtureMw_g_mol(z, species),
    vaporFraction,
    phase,
    vapor,
    liquid,
    mixture: bulk,
  };
}

export const pengRobinsonEngine: EngineAdapter = {
  id: PR_ENGINE_ID,
  version: PR_ENGINE_VERSION,
  displayName: "PSS Peng-Robinson 0.1 (classic α, kij = 0)",
  capabilities: ["pt-flash", "properties"],
  ptFlash,
};

export { R };
