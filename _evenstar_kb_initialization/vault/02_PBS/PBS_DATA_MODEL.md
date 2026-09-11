---
type: "proposed-design"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: []
tags: ["evenstar", "proposed-design"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]"]
---

# PBS data model

Accepted conceptual hierarchy: Project → Plant → System → Engineering Object. Typed objects include equipment, instruments, physical lines/pipes, components and plant-linked stream concepts where needed.

Ports/nozzles, connections, control relationships, materials, parts, specifications, documents and revisions are explicit related concepts. A model must answer what connects to a nozzle, which views show an object, which instruments affect it and which calculations/deliverables reference it.

The physical schema is proposed work: object/facet decomposition, cardinalities, line/stream semantics, versioning and geometry representation are not settled. The shared-model notes define semantic boundaries, not database DDL.

## Related notes

- [[PBS_HOME]]
- [[SHARED_MODEL_INDEX]]
- [[CANONICAL_ENGINEERING_OBJECT]]
- [[PIPE_LINE_STREAM]]
- [[OQ-001]]
- [[OQ-003]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]

## Related requirements

- [[PBS-REQ-001]]
