import type { EngineeringRegister } from "../domain";
import { cloneFixture } from "./fixture";

const STORAGE_KEY = "evenstar-pss-register";

function hydrate(register: EngineeringRegister): EngineeringRegister {
  if (!register?.species?.length || !register.compositions?.length) {
    return cloneFixture();
  }
  return register;
}

export async function loadRegister(): Promise<EngineeringRegister> {
  if (typeof window !== "undefined" && window.pss) {
    const loaded = await window.pss.loadRegister();
    const hydrated = hydrate(loaded);
    if (!loaded.species?.length) await window.pss.saveRegister(hydrated);
    return hydrated;
  }
  if (typeof localStorage !== "undefined") {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return hydrate(JSON.parse(raw) as EngineeringRegister);
  }
  return cloneFixture();
}

export async function saveRegister(register: EngineeringRegister): Promise<void> {
  if (typeof window !== "undefined" && window.pss) {
    await window.pss.saveRegister(register);
    return;
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(register));
  }
}

export async function resetRegister(): Promise<EngineeringRegister> {
  const fresh = cloneFixture();
  if (typeof window !== "undefined" && window.pss) {
    const fromMain = hydrate(await window.pss.resetRegister());
    if (!fromMain.species?.length) {
      await window.pss.saveRegister(fresh);
      return fresh;
    }
    return fromMain.species.length ? fromMain : fresh;
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }
  return fresh;
}
