import { createContext, useContext, useEffect, useMemo, useReducer, type Dispatch, type ReactNode } from "react";
import type { CompareRow } from "./project-data";
import {
  applyRead,
  applyWrite,
  compareRows,
  markLocalOverride,
  renormalizeLocal,
  setLocalFraction,
  simulateProjectChange,
  startFromProject,
} from "./project-data";
import type { EngineeringRegister, SimulationRun, ThermoModel } from "./domain";
import { loadRegister, resetRegister, saveRegister } from "./register/local";
import { persistModel, persistRun, publishRun, runFlash } from "./results";

export type WorkspaceId = "thermo" | "process" | "hydraulics" | "water" | "dynamics";

type State = {
  ready: boolean;
  error: string | null;
  register: EngineeringRegister | null;
  model: ThermoModel | null;
  selectedRunId: string | null;
  workspace: WorkspaceId;
  startOpen: boolean;
  rowActions: Record<string, CompareRow["action"]>;
  notice: string | null;
};

type Action =
  | { type: "loaded"; register: EngineeringRegister }
  | { type: "failed"; error: string }
  | { type: "set-register"; register: EngineeringRegister; notice?: string }
  | { type: "set-model"; model: ThermoModel }
  | { type: "select-run"; id: string | null }
  | { type: "workspace"; id: WorkspaceId }
  | { type: "start-open"; open: boolean }
  | { type: "row-action"; path: string; action: CompareRow["action"] }
  | { type: "notice"; notice: string | null };

const initial: State = {
  ready: false,
  error: null,
  register: null,
  model: null,
  selectedRunId: null,
  workspace: "thermo",
  startOpen: true,
  rowActions: {},
  notice: null,
};

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "loaded": {
      const model = action.register.models[0] ?? null;
      return {
        ...state,
        ready: true,
        register: action.register,
        model,
        startOpen: false,
        selectedRunId: action.register.runs.at(-1)?.id ?? null,
      };
    }
    case "failed":
      return { ...state, ready: true, error: action.error };
    case "set-register":
      return { ...state, register: action.register, notice: action.notice ?? state.notice };
    case "set-model":
      return { ...state, model: action.model, startOpen: false, rowActions: {} };
    case "select-run":
      return { ...state, selectedRunId: action.id };
    case "workspace":
      return { ...state, workspace: action.id };
    case "start-open":
      return { ...state, startOpen: action.open };
    case "row-action":
      return { ...state, rowActions: { ...state.rowActions, [action.path]: action.action } };
    case "notice":
      return { ...state, notice: action.notice };
    default:
      return state;
  }
}

type Store = State & {
  dispatch: Dispatch<Action>;
  compare: CompareRow[];
  selectedRun: SimulationRun | null;
  start: () => Promise<void>;
  run: () => void;
  publish: () => Promise<void>;
  readSelected: () => Promise<void>;
  writeSelected: () => Promise<void>;
  simulateChange: () => Promise<void>;
  resetSeed: () => Promise<void>;
  override: (path: string, value: number) => void;
  setFraction: (speciesId: string, fraction: number) => void;
  renormalize: () => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduce, initial);

  useEffect(() => {
    loadRegister()
      .then((register) => dispatch({ type: "loaded", register }))
      .catch((error: unknown) => dispatch({ type: "failed", error: error instanceof Error ? error.message : "Failed to load register" }));
  }, []);

  const persist = async (register: EngineeringRegister, notice?: string) => {
    await saveRegister(register);
    dispatch({ type: "set-register", register, notice });
  };

  const compare = useMemo(() => {
    if (!state.model || !state.register) return [];
    return compareRows(state.model, state.register).map((row) => ({
      ...row,
      action: state.rowActions[row.path] ?? row.action,
    }));
  }, [state.model, state.register, state.rowActions]);

  const selectedRun = state.register?.runs.find((run) => run.id === state.selectedRunId) ?? null;

  const value: Store = {
    ...state,
    dispatch,
    compare,
    selectedRun,
    start: async () => {
      if (!state.register) return;
      const model = startFromProject(state.register);
      const register = persistModel(state.register, model);
      await persist(register, "Model seeded from project register.");
      dispatch({ type: "set-model", model });
    },
    run: () => {
      if (!state.register || !state.model) return;
      try {
        const flashRun = runFlash(state.register, state.model);
        const register = persistRun(state.register, flashRun);
        void persist(register, "Flash completed. Results are in the working run; publish to write engineering records.").then(() => {
          dispatch({ type: "select-run", id: flashRun.id });
        });
      } catch (error) {
        dispatch({ type: "notice", notice: error instanceof Error ? error.message : "Flash failed" });
      }
    },
    publish: async () => {
      if (!state.register || !state.model || !selectedRun) return;
      const { register, run } = publishRun(state.register, selectedRun, state.model);
      await persist(register, `Published ${run.publishedIds.length} engineering result records.`);
      dispatch({ type: "select-run", id: run.id });
    },
    readSelected: async () => {
      if (!state.register || !state.model) return;
      const paths = compare.filter((row) => row.action === "update-pss").map((row) => row.path);
      if (!paths.length) {
        dispatch({ type: "notice", notice: "Select Update PSS on the rows you want to read." });
        return;
      }
      const model = applyRead(state.model, state.register, paths);
      const register = persistModel(state.register, model);
      await persist(register, `Read ${paths.length} value(s) from the project register into the working model.`);
      dispatch({ type: "set-model", model });
    },
    writeSelected: async () => {
      if (!state.register || !state.model) return;
      const paths = compare.filter((row) => row.action === "update-project").map((row) => row.path);
      if (!paths.length) {
        dispatch({ type: "notice", notice: "Select Update Project on the rows you want to write." });
        return;
      }
      const register = persistModel(applyWrite(state.model, state.register, paths), state.model);
      await persist(register, `Wrote ${paths.length} value(s) to the project register. Completed runs were not changed.`);
    },
    simulateChange: async () => {
      if (!state.register) return;
      await persist(simulateProjectChange(state.register), "Project register changed (pressure 68 bar, flow 130 t/h, composition rev 5). Completed runs keep their snapshots.");
    },
    resetSeed: async () => {
      const register = await resetRegister();
      dispatch({ type: "loaded", register });
      dispatch({ type: "notice", notice: "Seed register restored." });
    },
    override: (path, value) => {
      if (!state.model || !state.register) return;
      const model = markLocalOverride(state.model, path, value);
      dispatch({ type: "set-model", model });
      void persist(persistModel(state.register, model));
    },
    setFraction: (speciesId, fraction) => {
      if (!state.model || !state.register) return;
      const composition = state.register.compositions.find((c) => c.id === state.model?.compositionId);
      const seeded = state.model.localComponents
        ? state.model
        : { ...state.model, localComponents: composition?.components.map((c) => ({ ...c })) ?? [] };
      const model = setLocalFraction(seeded, speciesId, fraction);
      dispatch({ type: "set-model", model });
      void persist(persistModel(state.register, model));
    },
    renormalize: () => {
      if (!state.model || !state.register) return;
      const model = renormalizeLocal(state.model);
      dispatch({ type: "set-model", model });
      void persist(persistModel(state.register, model));
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("StoreProvider missing");
  return store;
}
