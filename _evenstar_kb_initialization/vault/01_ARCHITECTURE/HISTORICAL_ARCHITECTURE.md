---
type: "historical-context"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "historical-context"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]"]
---

# Historical architecture and evolution

The source preserves an earlier seven-demo PBS portfolio. It also explicitly introduces the newer PBS/PSS/PMS separation. The older full project brain, original ADR text and migration artifacts were not supplied.

| Earlier demo | Current conceptual placement | Remaining reconciliation |
| --- | --- | --- |
| Process | PSS calculation; PBS P&ID plant definition | Separate solver state from plant stream/line semantics |
| Control | PSS dynamics/execution; PBS plant instruments/relationships | OQ-014: loop/signal/historian facets |
| Plant 3D | PBS | Geometry and routing contracts |
| Data | PBS plant data; PSS Project Data; PMS delivery data | Assign fields explicitly; no universal authority |
| Project | Shared identity/provisioning and PMS delivery context | OQ-010, OQ-021 |
| Workflow | PMS delivery workflow; PBS plant application authority | OQ-005 |
| Explorer | PBS canonical-object navigation with cross-system references | Shared search/navigation scope can evolve |

These are responsibility mappings from the current source boundary, not evidence of migrated code. [[ADR-016]] records why the historical demo partition no longer determines PBS ownership. No original historical ADR is wholly marked superseded when its central principle still holds.

The seven historical accepted-decision summaries retain IDs [[PBS-ADR-001]], [[PBS-ADR-002]], [[PBS-ADR-003]], [[PBS-ADR-004]], [[PBS-ADR-005]], [[PBS-ADR-006]] and [[PBS-ADR-007]]. Current decisions explicitly reaffirm or qualify them.

## Related notes

- [[ADR-001]]
- [[ADR-016]]
- [[CONFLICT_REGISTER]]
- [[OPEN_ARCHITECTURE_QUESTIONS]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
