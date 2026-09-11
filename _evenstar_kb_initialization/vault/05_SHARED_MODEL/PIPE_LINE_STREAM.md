---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: ["Pipe", "Line", "Stream"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]"]
---

# Pipe, line and stream semantics

These concepts must remain distinct even before their detailed schema is selected.

| Concept | Working meaning | Authority |
| --- | --- | --- |
| Physical pipe/segment | Physical conduit with endpoints and physical properties/route | PBS |
| Engineering line | Tagged line/grouping in plant definition; segmentation semantics open | PBS |
| Physical connection | Endpoint relationship, not the pipe itself | PBS |
| Plant process-stream identity/link | Engineering flow concept where plant definition requires it | PBS/canonical model; exact semantics open |
| Reusable stream dataset | Conditions/composition/case used as project input | PSS Project Data for its owned values |
| Computational stream | Solver/model construct with computed state | PSS |

These are conceptual distinctions, not accepted one-to-one cardinalities. One physical line may participate in multiple studies; do not force a solver object to be the physical line primary record.

## Related notes

- [[PBS_PIPING]]
- [[PSS_DATA_MODEL]]
- [[CONNECTION]]
- [[OQ-003]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]

## Related requirements

- [[PBS-REQ-006]]
