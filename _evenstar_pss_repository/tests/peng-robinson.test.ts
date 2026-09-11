import { describe, expect, it } from "vitest";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { IDS } from "../src/lib/domain";
import { pengRobinsonEngine } from "../src/lib/engine/peng-robinson";
import { SPECIES, SPECIES_BY_ID, mixtureMw_g_mol } from "../src/lib/engine/species";
import { cloneFixture } from "../src/lib/register/fixture";
import { orderedSpecies } from "../src/lib/composition";
import golden from "./golden/pr-ng001.json";

describe("Peng-Robinson", () => {
  it("uses standard methane critical constants", () => {
    const ch4 = SPECIES_BY_ID[IDS.methane];
    expect(ch4.pr.tc_K).toBeCloseTo(190.564, 3);
    expect(ch4.pr.pc_Pa).toBeCloseTo(4.5992e6, -2);
  });

  it("gives near-ideal Z for methane at 25 °C, 1 bar", () => {
    const result = pengRobinsonEngine.ptFlash({
      T_K: 298.15,
      P_Pa: 1e5,
      z: [1],
      species: [SPECIES_BY_ID[IDS.methane]],
    });
    const Z = result.mixture.Z;
    expect(Z).toBeGreaterThan(0.995);
    expect(Z).toBeLessThan(1.002);
  });

  it("computes NG-001 mixture molecular weight from the seeded composition", () => {
    const register = cloneFixture();
    const composition = register.compositions[0];
    const { species, z } = orderedSpecies(register, composition);
    const mw = mixtureMw_g_mol(z, species);
    expect(mw).toBeCloseTo(18.298, 2);
  });

  it("flashes NG-001 at 25 °C, 70 bar as a single dense phase", () => {
    const register = cloneFixture();
    const { species, z } = orderedSpecies(register, register.compositions[0]);
    const result = pengRobinsonEngine.ptFlash({
      T_K: 298.15,
      P_Pa: 70e5,
      z,
      species,
    });
    expect(result.phase).not.toBe("two-phase");
    expect(result.mixture.Z).toBeGreaterThan(0.2);
    expect(result.mixture.Z).toBeLessThan(1.2);
    expect(result.mixture.density_kg_m3).toBeGreaterThan(20);
    expect(result.mixture.density_kg_m3).toBeLessThan(200);
    expect(result.engineId).toBe("pss.peng-robinson");
    expect(result.method).toContain("kij = 0");

    const snapshot = {
      phase: result.phase,
      vaporFraction: result.vaporFraction,
      Z: result.mixture.Z,
      density_kg_m3: result.mixture.density_kg_m3,
      mw_g_mol: result.mw_g_mol,
      H_J_mol: result.mixture.H_J_mol,
      Cp_J_molK: result.mixture.Cp_J_molK,
    };
    if (process.env.PSS_WRITE_GOLDEN === "1") {
      writeFileSync(path.join(__dirname, "golden/pr-ng001.json"), `${JSON.stringify(snapshot, null, 2)}\n`);
    }
    expect(result.phase).toBe(golden.phase);
    expect(result.mixture.Z).toBeCloseTo(golden.Z, 4);
    expect(result.mw_g_mol).toBeCloseTo(golden.mw_g_mol, 4);
    expect(result.mixture.density_kg_m3).toBeCloseTo(golden.density_kg_m3, 2);
  });

  it("exposes a replaceable adapter identity", () => {
    expect(pengRobinsonEngine.capabilities).toContain("pt-flash");
    expect(SPECIES).toHaveLength(7);
  });
});
