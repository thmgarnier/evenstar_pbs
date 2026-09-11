import { describe, expect, it } from "vitest";
import { CompositionError } from "../src/lib/composition";
import { cloneFixture } from "../src/lib/register/fixture";
import {
  applyRead,
  applyWrite,
  compareRows,
  markLocalOverride,
  simulateProjectChange,
  startFromProject,
} from "../src/lib/project-data";
import { persistRun, publishRun, runFlash } from "../src/lib/results";

describe("project data", () => {
  it("seeds NG-001 from the register without re-entry", () => {
    const register = cloneFixture();
    const model = startFromProject(register);
    const pressure = model.inputs.find((i) => i.path === "feed.pressure");
    const composition = model.inputs.find((i) => i.path === "feed.composition");
    expect(pressure?.value).toBe(70);
    expect(pressure?.unit).toBe("bar");
    expect(pressure?.class).toBe("linked");
    expect(composition?.value).toBe("GAS-FEED-R1");
    expect(model.inputs.every((i) => i.snapshot)).toBe(true);
  });

  it("rejects a composition that does not sum to 1", () => {
    const register = cloneFixture();
    register.compositions[0].components[0].fraction = 0.5;
    expect(() => startFromProject(register)).toThrow(CompositionError);
  });

  it("does not mutate a completed run when project data later changes", () => {
    let register = cloneFixture();
    const model = startFromProject(register);
    const run = runFlash(register, model);
    register = persistRun(register, run);
    const published = publishRun(register, run, model);
    register = published.register;

    register = simulateProjectChange(register);
    const stored = register.runs.find((item) => item.id === run.id);
    const snapP = stored?.inputSnapshot.find((i) => i.path === "feed.pressure");
    expect(snapP?.value).toBe(70);
    expect(register.streams[0].pressure.value).toBe(68);

    const rows = compareRows(model, register);
    const pressure = rows.find((r) => r.path === "feed.pressure");
    const flow = rows.find((r) => r.path === "feed.massFlow");
    const composition = rows.find((r) => r.path === "feed.composition");
    expect(pressure?.status).toMatch(/stale|different/);
    expect(pressure?.projectValue).toContain("68");
    expect(flow?.projectValue).toContain("130");
    expect(composition?.projectRevision).toContain("5");
  });

  it("Read updates the working model only, Write is selective", () => {
    let register = cloneFixture();
    let model = startFromProject(register);
    model = markLocalOverride(model, "feed.pressure", 65);
    register = simulateProjectChange(register);

    const afterRead = applyRead(model, register, ["feed.pressure"]);
    const p = afterRead.inputs.find((i) => i.path === "feed.pressure");
    expect(p?.value).toBe(68);
    expect(p?.class).toBe("linked");
    const flow = afterRead.inputs.find((i) => i.path === "feed.massFlow");
    expect(flow?.value).toBe(125);

    model = markLocalOverride(model, "feed.temperature", 30);
    const written = applyWrite(model, register, ["feed.temperature"]);
    expect(written.streams[0].temperature.value).toBe(30);
    expect(written.streams[0].pressure.value).toBe(68);
  });

  it("publishes engineering records, not cubic internals", () => {
    const register = cloneFixture();
    const model = startFromProject(register);
    const run = runFlash(register, model);
    const { register: next } = publishRun(persistRun(register, run), run, model);
    expect(next.publishedResults.length).toBeGreaterThanOrEqual(10);
    expect(next.publishedResults.length).toBeLessThanOrEqual(20);
    expect(next.publishedResults.some((r) => /k-matrix|kij matrix/i.test(String(r.name)))).toBe(false);
    expect(run.results.some((r) => r.key === "engine" && !r.publish)).toBe(true);
  });
});
