import { describe, expect, it } from "vitest";
import { convert, q, toSI, UnitError } from "../src/lib/units";

describe("units", () => {
  it("converts engineering temperature and pressure to SI", () => {
    expect(toSI(q(25, "°C", "temperature"))).toBeCloseTo(298.15, 10);
    expect(toSI(q(70, "bar", "pressure"))).toBeCloseTo(7e6, 6);
    expect(toSI(q(125, "t/h", "massFlow"))).toBeCloseTo(125000 / 3600, 10);
  });

  it("round-trips display units", () => {
    const t = convert(q(298.15, "K", "temperature"), "°C");
    expect(t.value).toBeCloseTo(25, 10);
    expect(convert(q(7e6, "Pa", "pressure"), "bar").value).toBeCloseTo(70, 8);
  });

  it("rejects a dimension mismatch", () => {
    expect(() => q(70, "bar", "temperature")).toThrow(UnitError);
  });
});
