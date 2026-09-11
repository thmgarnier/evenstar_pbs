---
type: "workflow"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "workflow"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]"]
---

# Start from Project

**Trigger:** Create or seed a PSS model using known project knowledge.

## Flow

1. Select the Evenstar project and relevant compositions, water analysis, streams, cases, equipment inputs or PBS topology.
2. Validate source identity, types, units and basis; identify missing information.
3. Explicitly Read selected inputs and capture source/snapshot provenance.
4. Add only missing assumptions and local study values, then calculate.
5. Inspect detailed results, publish useful engineering output to the PSS register and optionally promote selected evidence to PMS.

## Ownership and exceptions

Each datum retains its source owner. The PSS model/run owns its snapshot and assumptions. Reading existing data does not allow silent writes to PBS or project inputs.

## Intended completion evidence

The engineer can reconstruct source inputs, assumptions, run and publications without repeated entry of already-known data.

## Related notes

- [[WORKFLOWS_INDEX]]
- [[PSS_PROJECT_DATA]]
- [[PSS_PROVENANCE]]
- [[PSS_RUNS_RESULTS]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]

## Related requirements

- [[PSS-REQ-001]]
