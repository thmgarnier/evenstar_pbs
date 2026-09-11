# First slice — PSS Thermodynamics Lab

## Outcome

An engineer opens Evenstar project EV-DEMO-001 in the PSS desktop app, chooses **Start from Project**, reads feed-gas composition and design conditions into a thermodynamics model, runs a local Peng–Robinson PT flash, inspects and publishes engineering results, then changes a project value and Compare/Read without mutating the completed run.

## Included

- Electron + Vite + React desktop shell.
- Local JSON Engineering Register with the Airtable domain contract (no live Airtable).
- Reusable composition, stream, case and engineering variables.
- Start from Project with unit/basis validation.
- Linked / local / project input classes.
- Explicit Read / Write / Compare / Refresh.
- Immutable run input snapshots (hash, revision, source, units).
- Peng–Robinson adapter (`pss.peng-robinson@0.1.0`).
- Publication of ~10–20 engineering records; solver internals remain in PSS.

## Boundary

PSS owns the model, solver state, snapshots and published results. PBS owns plant objects and is not read in this slice. The local register stands in for the per-project Airtable base. DWSIM, flowsheets, hydraulics, water chemistry and dynamics are out of scope.

## Acceptance checks

1. `pnpm dev` launches a desktop window; the flash runs with the network disabled.
2. Start from Project seeds NG-001; composition and 70 bar / 25 °C / 125 t/h are not re-typed.
3. Each model field shows local, project or linked.
4. The method string `PSS Peng-Robinson 0.1 (classic α, kij = 0)` is visible with assumptions and units.
5. A run stores source, record id, revision, units, basis, hash and timestamp.
6. Publish writes about 12 engineering records, not cubic internals.
7. Simulate project-data change: Compare shows 70→68 bar and composition rev 4 vs 5; the completed run still has 70 bar in its snapshot.
8. Stale linked inputs offer Keep and Read; nothing auto-writes.
9. Write to Project updates only selected rows and bumps revision.
10. Mole-fraction sum ≠ 1 is rejected before it becomes a model input.
11. `pnpm test` covers units, methane Z, mixture MW, provenance hash and the run-immutability case.
12. `_evenstar_app_repository` is untouched.

## Next slices

1. Airtable RegisterAdapter on the same types.
2. PBS → PSS hydraulics from EV-DEMO-001 topology.
3. Second engine adapter (DWSIM or CoolProp) under a recorded ADR.
4. Optional Tauri shell; renderer stays.
