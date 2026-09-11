import { describe, expect, it } from "vitest";
import { makeSnapshot, snapshotHash } from "../src/lib/provenance";
import { sha256Hex } from "../src/lib/hash";

describe("provenance", () => {
  it("is stable for the same canonical payload", () => {
    const payload = {
      recordId: "80000000-0000-4000-8000-000000000001",
      field: "pressure",
      value: 70,
      unit: "bar",
      basis: "90000000-0000-4000-8000-000000000001",
      revision: 4,
    };
    expect(snapshotHash(payload)).toBe(snapshotHash({ ...payload }));
    expect(snapshotHash(payload)).toHaveLength(64);
  });

  it("changes when the value or revision changes", () => {
    const a = { recordId: "r", field: "pressure", value: 70, unit: "bar", basis: null, revision: 4 };
    const b = { ...a, value: 68 };
    const c = { ...a, revision: 5 };
    expect(snapshotHash(a)).not.toBe(snapshotHash(b));
    expect(snapshotHash(a)).not.toBe(snapshotHash(c));
  });

  it("SHA-256 matches a known digest", () => {
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });

  it("records source system and import time", () => {
    const snap = makeSnapshot({
      recordId: "r",
      field: "temperature",
      value: 25,
      unit: "°C",
      basis: null,
      revision: 4,
    });
    expect(snap.sourceSystem).toBe("pss.local-register");
    expect(snap.importedAt).toMatch(/T/);
    expect(snap.hash).toHaveLength(64);
  });
});
