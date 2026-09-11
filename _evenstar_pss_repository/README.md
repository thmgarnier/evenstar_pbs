# Evenstar — Plant Simulation System

Desktop thermodynamics laboratory for the Evenstar project. PSS owns simulation models, solver state and published engineering results. This slice proves **Start from Project**, a local Peng–Robinson PT flash, explicit Project Data exchange and immutable run snapshots.

PBS remains a separate Next.js application. This repository does not modify it.

## What works

- Electron desktop window (Vite + React) with the Evenstar visual language.
- Local Engineering Register (JSON in Electron userData; localStorage fallback in the browser).
- Start from Project seeds NG-001 / GAS-FEED-R1 / DESIGN without re-typing.
- Linked vs local inputs, Compare / Read / Write / Refresh, stale detection.
- Peng–Robinson PT flash (`kij = 0`, classic α) with visible method, assumptions and units.
- Publish ~12 engineering result records. Solver internals stay in the run.
- Completed runs keep their input snapshot after a project-data change.

## Requirements

Node.js 22 or later and pnpm.

## Run

```bash
pnpm install
pnpm test
pnpm dev
```

`pnpm dev` starts Vite on port 5173 and opens the Electron window. Use `pnpm dev:web` for the renderer in a browser (register stored in localStorage).

The first Electron launch copies the seed register into the user-data directory. The header reset control restores the shipped seed after a confirmation.

## Seed

Project `EV-DEMO-001` (same identity as the PBS Object Explorer). Stream `NG-001` at 25 °C, 70 bar, 125 t/h. Composition `GAS-FEED-R1` rev 4, mole basis.

This engine is labelled `PSS Peng-Robinson 0.1 (classic α, kij = 0)`. It is a slice engine, not a certified property package.

## Docs

- `docs/FIRST_SLICE.md` — acceptance checks and boundary
