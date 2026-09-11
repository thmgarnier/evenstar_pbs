import type { ModelInput, Snapshot } from "./domain";
import { canonicalJson, sha256Hex } from "./hash";

export type SnapshotPayload = {
  recordId: string;
  field: string;
  value: number | string;
  unit: string | null;
  basis: string | null;
  revision: number;
};

export function snapshotHash(payload: SnapshotPayload): string {
  return sha256Hex(canonicalJson(payload));
}

export function makeSnapshot(payload: SnapshotPayload, sourceSystem = "pss.local-register"): Snapshot {
  return {
    ...payload,
    sourceSystem,
    importedAt: new Date().toISOString(),
    hash: snapshotHash(payload),
  };
}

export function isStale(input: ModelInput, live: SnapshotPayload | null): boolean {
  if (input.class !== "linked" || !input.snapshot) return false;
  if (!live) return true;
  return input.snapshot.hash !== snapshotHash(live);
}

export function cloneInputs(inputs: ModelInput[]): ModelInput[] {
  return inputs.map((input) => ({
    ...input,
    snapshot: input.snapshot ? { ...input.snapshot } : null,
  }));
}
