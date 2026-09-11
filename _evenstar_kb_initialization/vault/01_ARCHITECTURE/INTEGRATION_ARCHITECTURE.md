---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#9. PSS → PMS Promotion|PMS — 9. PSS → PMS Promotion]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#15. Data Flow|PMS — 15. Data Flow]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]"]
---

# Integration architecture

| Flow | Carries | Authority / control |
| --- | --- | --- |
| PBS → PSS | UUIDs, physical topology, geometry, physical properties | PBS source revision retained; PSS validates and snapshots |
| Project Data → PSS model | Selected inputs, units, basis and provenance | Explicit Read; snapshot used by a run |
| PSS → Project Data | Selected local inputs or curated results | Controlled write to permitted owner; no hidden two-way sync |
| PSS → PBS | Design-change proposal with evidence | PBS reviews and applies or rejects |
| PBS → PMS | Canonical engineering references and display metadata | PBS remains engineering authority |
| PSS → PMS | Selected run/report/study evidence | PMS records promotion and deliverable-revision context |

Domain adapters isolate Airtable IDs and engine internals. Stable Evenstar identities, typed units, version/freshness information and explicit authorization belong in contracts. The specific API shapes, events, retry logic and deployment topology remain proposals.

Prefer the smallest coherent integration mechanism. A list of candidate events is not a decision to build an event bus or distributed services.

## Related notes

- [[EVENT_AND_API_CONTRACTS]]
- [[PROJECT_CREATION]]
- [[PBS_TO_PSS_HYDRAULICS]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[PSS_TO_PMS_PROMOTION]]
- [[SECURITY_AND_ACCESS]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#20. APIs / Events|PBS — 20. APIs / Events]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#23. Relationship to PMS|PBS — 23. Relationship to PMS]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#9. PSS → PMS Promotion|PMS — 9. PSS → PMS Promotion]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#15. Data Flow|PMS — 15. Data Flow]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]

## Related requirements

- [[INT-REQ-007]]
