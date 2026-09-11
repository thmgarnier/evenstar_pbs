---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: ["P&ID"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#8. P&ID / Process Definition|PBS — 8. P&ID / Process Definition]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]"]
---

# P&ID and process definition

The PBS P&ID is a data-driven engineering representation. Placing a symbol instantiates or references a canonical object; connecting ports creates or modifies an explicit typed relationship.

The intended interface includes equipment, lines, ports/nozzles, valves, instruments, control relationships, tags, inspectors, completeness validation and revision awareness. Selecting an object should navigate to 3D/data and its PSS/PMS context.

PBS may show a referenced PSS result, but the drawing does not become a solver. How simultaneous P&ID and 3D changes reconcile is unresolved; both must preserve the same identity and relationship semantics.

## Related notes

- [[PBS_HOME]]
- [[CANONICAL_ENGINEERING_OBJECT]]
- [[PORT]]
- [[CONNECTION]]
- [[PBS_PLANT_3D]]
- [[OQ-004]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#8. P&ID / Process Definition|PBS — 8. P&ID / Process Definition]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]

## Related requirements

- [[PBS-REQ-002]]
- [[PBS-REQ-003]]
