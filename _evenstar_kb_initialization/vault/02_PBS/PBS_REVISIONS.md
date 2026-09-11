---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]"]
---

# PBS revisions and engineering change

Engineering changes must record affected objects, reason, origin, before state and proposed after state. Review accepts or rejects a proposal; accepted application creates a traceable plant revision.

PBS owns canonical plant state. A route or diameter change should let PSS detect a stale imported topology and deliberately refresh. PSS studies preserve their original input snapshots.

The detailed change-set model, undo/redo, concurrent edits and coordination with PMS review/approval are unresolved. PMS approval status alone must not be assumed to apply a canonical change.

## Related notes

- [[PBS_HOME]]
- [[REVISION]]
- [[ENGINEERING_CHANGE]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[OQ-005]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]

## Related requirements

- [[PBS-REQ-003]]
- [[PBS-REQ-009]]
