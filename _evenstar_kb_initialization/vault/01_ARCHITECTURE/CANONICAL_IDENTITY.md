---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]"]
---

# Canonical identity

Every persistent engineering object has a stable UUID. KKS/tag, name and presentation IDs are attributes or mappings, not relational primary keys. A controlled tag change preserves relationships to ports, diagrams, models, deliverables and history.

Canonical UUIDs identify shared engineering reality. PSS also needs stable IDs for its own models/runs/reports/studies; PMS needs IDs for deliverables/documents/revisions. Do not assign a fresh plant-object identity merely because an object appears in a new application.

External Airtable record IDs and renderer/symbol IDs map to domain identities through an adapter layer. Their exact mapping/version constraints remain a design task.

Identity stability does not settle the object/facet schema, tag namespace uniqueness or deletion rules. Those remain explicit questions.

## Related notes

- [[CANONICAL_ENGINEERING_OBJECT]]
- [[PROJECT_IDENTITY]]
- [[PBS_KKS]]
- [[ADR-002]]
- [[ADR-003]]
- [[OQ-001]]
- [[OQ-002]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]

## Related requirements

- [[EV-REQ-002]]
