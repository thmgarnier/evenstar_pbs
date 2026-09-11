---
type: "workflow"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "workflow"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# PSS to PBS design-change proposal

**Trigger:** A PSS study identifies a candidate plant improvement.

## Flow

1. Select the study/run and local override to propose, such as DN200 → DN250.
2. Record affected canonical UUIDs, source plant revision, before/after, reason and calculation evidence.
3. Submit for review through the agreed PBS/PMS boundary.
4. PBS accepts/applies or rejects; accepted application creates a new traceable plant revision.
5. Consumers can detect newer plant state and deliberately refresh; retain the originating run.

## Ownership and exceptions

PSS proposes; PBS controls canonical application. Exact review roles, PMS coordination, stale-baseline handling and acceptance/application transaction remain open. A review approval is not silently equated with an applied plant revision.

## Intended completion evidence

Proposal outcome, origin evidence and any applied revision are traceable; rejected/local alternatives never alter canonical state.

## Related notes

- [[WORKFLOWS_INDEX]]
- [[ENGINEERING_CHANGE]]
- [[DATA_OWNERSHIP]]
- [[OQ-005]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[PSS-REQ-009]]
- [[INT-REQ-006]]
