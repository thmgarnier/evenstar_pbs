import { describe, expect, it } from "vitest";
import { envelopeWilson, wilsonBubbleP_Pa } from "../src/lib/engine/diagrams";
import { SPECIES_BY_ID } from "../src/lib/engine/species";
import { IDS } from "../src/lib/domain";
import { cloneFixture } from "../src/lib/register/fixture";
import { setLocalFraction, startFromProject } from "../src/lib/project-data";
import { orderedSpecies } from "../src/lib/composition";

describe("thermo diagrams", () => {
  it("builds a Wilson envelope for NG-001", () => {
    const register = cloneFixture();
    const { species, z } = orderedSpecies(register, register.compositions[0]);
    const env = envelopeWilson(z, species);
    expect(env.bubble.length).toBeGreaterThan(8);
    expect(env.dew.length).toBeGreaterThan(8);
    expect(env.bubble.every((p) => p.y > 0)).toBe(true);
  });

  it("gives a finite Wilson bubble pressure for methane below Tc", () => {
    const ch4 = SPECIES_BY_ID[IDS.methane];
    const p = wilsonBubbleP_Pa(150, [1], [ch4]);
    expect(p).toBeGreaterThan(1e5);
    expect(p).toBeLessThan(ch4.pr.pc_Pa);
  });

  it("keeps composition edits local to the model", () => {
    const register = cloneFixture();
    let model = startFromProject(register);
    model = setLocalFraction(model, IDS.methane, 0.8);
    expect(model.localComponents?.find((c) => c.speciesId === IDS.methane)?.fraction).toBe(0.8);
    expect(register.compositions[0].components[0].fraction).toBe(0.89);
    expect(model.inputs.find((i) => i.path === "feed.composition")?.class).toBe("local");
  });
});
