import type { Composition, EngineeringRegister, Species } from "./domain";

export class CompositionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CompositionError";
  }
}

export function compositionSum(composition: Composition): number {
  return composition.components.reduce((sum, c) => sum + c.fraction, 0);
}

export function assertMoleSum(composition: Composition, tol = 1e-6) {
  if (composition.basis !== "mole") {
    throw new CompositionError(`Composition ${composition.tag} is ${composition.basis} basis; mole basis required.`);
  }
  const sum = compositionSum(composition);
  if (Math.abs(sum - 1) > tol) {
    throw new CompositionError(
      `Composition ${composition.tag} mole fractions sum to ${sum.toFixed(8)}, expected 1 ± ${tol}.`,
    );
  }
}

export function resolveComposition(register: EngineeringRegister, compositionId: string, localComponents?: { speciesId: string; fraction: number }[] | null): Composition {
  const base = register.compositions.find((c) => c.id === compositionId);
  if (!base) throw new CompositionError("Composition is not in the register.");
  if (!localComponents) return base;
  return { ...base, components: localComponents };
}

export function orderedSpecies(register: EngineeringRegister, composition: Composition): { species: Species[]; z: number[] } {
  const species: Species[] = [];
  const z: number[] = [];
  for (const component of composition.components) {
    const found = register.species.find((s) => s.id === component.speciesId);
    if (!found) {
      throw new CompositionError(`Species ${component.speciesId} is not in the register.`);
    }
    species.push(found);
    z.push(component.fraction);
  }
  return { species, z };
}
