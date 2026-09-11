---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#1. Position Inside Evenstar|PMS — 1. Position Inside Evenstar]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# System boundaries

| Concern | Responsible system | Boundary rule |
| --- | --- | --- |
| What exists and how it is physically arranged/connected | PBS | PSS overrides do not redefine it |
| Simulation models, methods, behavior and results | PSS | PBS may display referenced results without owning them |
| Deliverables, issued revisions, reviews and project status | PMS | References engineering rather than recreating it |
| Shared project identity and base mappings | Evenstar canonical/core domain | Provisioning owner/service remains open |
| Reusable calculation input | Owner of the particular datum | Project Data is an access/domain concept, not blanket authority over PBS data |

Physical instruments and plant control relationships belong in PBS; dynamic controller state and numerical execution belong in PSS. Detailed control-loop facets remain unresolved.

PBS controls application of changes to plant definition. PMS may coordinate review tasks and delivery approval. The transaction connecting those responsibilities is not yet specified. Likewise, a controlled document's metadata is PMS-owned while file storage and other document metadata facets still need a field-level contract.

## Related notes

- [[DATA_OWNERSHIP]]
- [[INSTRUMENT]]
- [[ENGINEERING_CHANGE]]
- [[DOCUMENT]]
- [[OQ-005]]
- [[OQ-015]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#1. Position Inside Evenstar|PMS — 1. Position Inside Evenstar]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[EV-REQ-001]]
