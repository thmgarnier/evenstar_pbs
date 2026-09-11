---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: ["Canonical Engineering Object"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]"]
---

# Canonical engineering object

A persistent engineering object represents one piece of plant reality with a stable UUID. Type/facets describe its engineering meaning; KKS/tag is a human identifier. P&ID symbols, 3D elements, data rows, PSS references and PMS references resolve it. Relationships to ports, instruments, documents and revisions are first-class.

Exact facet/schema/cardinality and lifecycle rules remain open. A computational model object may reference plant identity without becoming the canonical plant object.

## Related notes

- [[PBS_HOME]]
- [[PBS_KKS]]
- [[PBS_PID]]
- [[PBS_PLANT_3D]]
- [[PSS_PBS_INTEGRATION]]
- [[PMS_ENGINEERING_REFERENCES]]
- [[ENGINEERING_CHANGE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#7. Core Entities|PBS — 7. Core Entities]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]

## Related requirements

- [[INT-REQ-009]]
