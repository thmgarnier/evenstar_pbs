---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: ["Plant 3D"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#9. Plant 3D Builder|PBS — 9. Plant 3D Builder]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#10. KKS-Based Layers|PBS — 10. KKS-Based Layers]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]"]
---

# Plant 3D builder

The 3D builder should make plant assembly accessible while retaining engineering meaning. Engineers place, move and rotate equipment, define areas, connect equipment and inspect canonical objects.

Equipment placement and pipe geometry belong to PBS. A relevant mesh resolves a UUID; selection connects to P&ID, engineering data and history. KKS/system metadata drives useful visibility. Pipe racks/support concepts and route editing are intended capabilities whose depth remains open.

Three.js/React Three Fiber is a candidate rendering choice. Geometry representation, interaction implementation and route/support modeling still need decisions.

## Related notes

- [[PBS_HOME]]
- [[PBS_KKS]]
- [[PBS_PIPING]]
- [[PBS_SMART_ROUTING]]
- [[CANONICAL_ENGINEERING_OBJECT]]
- [[OQ-004]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#9. Plant 3D Builder|PBS — 9. Plant 3D Builder]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#10. KKS-Based Layers|PBS — 10. KKS-Based Layers]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#28. Initial Technical Direction|PBS — 28. Initial Technical Direction]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]

## Related requirements

- [[PBS-REQ-004]]
- [[PBS-REQ-005]]
