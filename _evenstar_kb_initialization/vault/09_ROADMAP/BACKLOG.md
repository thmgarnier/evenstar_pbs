---
type: "backlog"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "backlog"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#38. Backlog Direction|PBS — 38. Backlog Direction]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]", "[[INITIALIZATION_MANDATE]]"]
---

# Backlog

Possible work, grouped by dependencies. Priorities are curator recommendations; no owner/date or implementation commitment has been assigned.

| ID | Possible work | Priority | Gate / intended outcome | Context |
| --- | --- | --- | --- | --- |
| BL-001 | Review initialized vault | P0 | User review; record accepted changes/conflicts | [[INITIALIZATION_REPORT]] |
| BL-002 | Worked shared-model contract | P0 | Project/object/ports/lines, field ownership and revision examples | [[OQ-001]] |
| BL-003 | Resolve change-review handoff | P0 | PSS proposal, PMS coordination, PBS application | [[OQ-005]] |
| BL-004 | Design hydraulic extraction | P0 | Versioned topology, units and completeness example | [[OQ-006]] |
| BL-005 | Design input snapshots and conflicts | P0 | Old-run reproduction after a project edit | [[OQ-008]] |
| BL-006 | Define document/evidence control | P0 | Cardinalities, file authority, revision-bound evidence | [[OQ-015]] |
| BL-007 | Plan project/base provisioning | P1 | Actual capability checks and mapping/migration decisions | [[OQ-010]] |
| BL-008 | Select seed and first proof | P1 | Fixture specification and numerical acceptance references | [[SEED_PLANT]] |
| BL-009 | Implement canonical schema/security/seed | P1 | Blocked until vault review and model decisions; no work performed | [[PBS_DATA_MODEL]] |
| BL-010 | Build explorer/data/P&ID/3D slices | P1 | Depends on canonical model and geometry contract | [[PBS_ARCHITECTURE]] |
| BL-011 | Build PSS Project Data proof | P1 | Depends on input contract, engine and validation choice | [[PSS_PROJECT_DATA]] |
| BL-012 | Build PMS controlled-delivery proof | P1 | Depends on references/evidence/revision and permissions | [[PMS_ARCHITECTURE]] |
| BL-013 | Routing and hydraulic integration proof | P1 | Depends on physical topology and simulation assumptions | [[PBS_TO_PSS_HYDRAULICS]] |
| BL-014 | Broaden control/water/domain studies | P2 | Choose domain/engine depth separately | [[MULTIDISCIPLINE_EXPANSION]] |
| BL-015 | Portfolio and lifecycle expansion | P2 | Define later client/project needs | [[PMS_PORTFOLIO]] |
| BL-016 | Revisit document generation | P2 | Future/open; do not fully design now | [[PROJECT_DOCUMENT_GENERATION]] |

## Related notes

- [[ROADMAP]]
- [[CURRENT_STATE]]
- [[OPEN_QUESTIONS]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#38. Backlog Direction|PBS — 38. Backlog Direction]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]
- [[INITIALIZATION_MANDATE]]
