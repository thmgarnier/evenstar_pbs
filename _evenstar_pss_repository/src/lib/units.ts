export type Dimension =
  | "temperature"
  | "pressure"
  | "massFlow"
  | "molarEnergy"
  | "massEnergy"
  | "molarEnergyPerTemp"
  | "massDensity"
  | "molarDensity"
  | "molarMass"
  | "speed"
  | "dimensionless"
  | "fraction";

export type Quantity = {
  value: number;
  unit: string;
  dimension: Dimension;
};

type UnitDef = {
  dimension: Dimension;
  toSI: (value: number) => number;
  fromSI: (value: number) => number;
};

const UNITS: Record<string, UnitDef> = {
  K: { dimension: "temperature", toSI: (v) => v, fromSI: (v) => v },
  "°C": { dimension: "temperature", toSI: (v) => v + 273.15, fromSI: (v) => v - 273.15 },
  Pa: { dimension: "pressure", toSI: (v) => v, fromSI: (v) => v },
  kPa: { dimension: "pressure", toSI: (v) => v * 1e3, fromSI: (v) => v / 1e3 },
  bar: { dimension: "pressure", toSI: (v) => v * 1e5, fromSI: (v) => v / 1e5 },
  "kg/s": { dimension: "massFlow", toSI: (v) => v, fromSI: (v) => v },
  "t/h": { dimension: "massFlow", toSI: (v) => (v * 1000) / 3600, fromSI: (v) => (v * 3600) / 1000 },
  "kg/h": { dimension: "massFlow", toSI: (v) => v / 3600, fromSI: (v) => v * 3600 },
  "J/mol": { dimension: "molarEnergy", toSI: (v) => v, fromSI: (v) => v },
  "kJ/mol": { dimension: "molarEnergy", toSI: (v) => v * 1e3, fromSI: (v) => v / 1e3 },
  "kJ/kg": { dimension: "massEnergy", toSI: (v) => v * 1e3, fromSI: (v) => v / 1e3 },
  "J/kg": { dimension: "massEnergy", toSI: (v) => v, fromSI: (v) => v },
  "J/mol-K": { dimension: "molarEnergyPerTemp", toSI: (v) => v, fromSI: (v) => v },
  "kJ/kmol-K": { dimension: "molarEnergyPerTemp", toSI: (v) => v, fromSI: (v) => v },
  "kg/m3": { dimension: "massDensity", toSI: (v) => v, fromSI: (v) => v },
  "mol/m3": { dimension: "molarDensity", toSI: (v) => v, fromSI: (v) => v },
  "g/mol": { dimension: "molarMass", toSI: (v) => v / 1000, fromSI: (v) => v * 1000 },
  "kg/mol": { dimension: "molarMass", toSI: (v) => v, fromSI: (v) => v },
  "m/s": { dimension: "speed", toSI: (v) => v, fromSI: (v) => v },
  "-": { dimension: "dimensionless", toSI: (v) => v, fromSI: (v) => v },
  mol: { dimension: "fraction", toSI: (v) => v, fromSI: (v) => v },
};

const SI_UNIT: Record<Dimension, string> = {
  temperature: "K",
  pressure: "Pa",
  massFlow: "kg/s",
  molarEnergy: "J/mol",
  massEnergy: "J/kg",
  molarEnergyPerTemp: "J/mol-K",
  massDensity: "kg/m3",
  molarDensity: "mol/m3",
  molarMass: "kg/mol",
  speed: "m/s",
  dimensionless: "-",
  fraction: "mol",
};

export class UnitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnitError";
  }
}

export function q(value: number, unit: string, dimension: Dimension): Quantity {
  const def = UNITS[unit];
  if (!def) throw new UnitError(`Unknown unit "${unit}"`);
  if (def.dimension !== dimension) {
    throw new UnitError(`Unit "${unit}" is ${def.dimension}, expected ${dimension}`);
  }
  return { value, unit, dimension };
}

export function toSI(quantity: Quantity): number {
  const def = UNITS[quantity.unit];
  if (!def) throw new UnitError(`Unknown unit "${quantity.unit}"`);
  if (def.dimension !== quantity.dimension) {
    throw new UnitError(`Quantity unit "${quantity.unit}" does not match dimension ${quantity.dimension}`);
  }
  return def.toSI(quantity.value);
}

export function fromSI(siValue: number, unit: string, dimension: Dimension): Quantity {
  const def = UNITS[unit];
  if (!def) throw new UnitError(`Unknown unit "${unit}"`);
  if (def.dimension !== dimension) {
    throw new UnitError(`Unit "${unit}" is ${def.dimension}, expected ${dimension}`);
  }
  return { value: def.fromSI(siValue), unit, dimension };
}

export function convert(quantity: Quantity, unit: string): Quantity {
  return fromSI(toSI(quantity), unit, quantity.dimension);
}

export function compatible(fromUnit: string, toUnit: string): boolean {
  return Boolean(UNITS[fromUnit] && UNITS[toUnit] && UNITS[fromUnit].dimension === UNITS[toUnit].dimension);
}

export function siUnit(dimension: Dimension): string {
  return SI_UNIT[dimension];
}

export function formatQuantity(quantity: Quantity, digits = 4): string {
  const n = Number.isInteger(quantity.value) ? String(quantity.value) : quantity.value.toPrecision(digits);
  return `${n} ${quantity.unit}`;
}
