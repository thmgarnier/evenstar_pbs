---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Process Simulation"]
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]"]
---

# Process simulation

Target process work includes steady-state material/energy balances, streams, separators, mixers/splitters, valves, pumps/compressors, heat exchangers, supported reactors/columns, utilities, recycle convergence and case/sensitivity studies. Dynamics follows progressively.

Known project streams, compositions, cases and equipment inputs should seed calculations. PSS owns flowsheet/solver state while any mapped plant equipment retains PBS identity.

DWSIM is a candidate algorithm backend, not an exclusive engine commitment. Scope, validated methods, supported operations and numerical acceptance tolerances must be selected per implementation slice.

## Related notes

- [[PSS_HOME]]
- [[PSS_THERMODYNAMICS_LAB]]
- [[PSS_ENGINE_ADAPTERS]]
- [[MVP]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]

## Related requirements

- [[PSS-REQ-015]]
