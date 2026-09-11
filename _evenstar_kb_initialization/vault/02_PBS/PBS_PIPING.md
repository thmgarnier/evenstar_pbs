---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]"]
---

# PBS piping and topology

Physical piping is engineering data: stable pipe/line identity, from/to ports, service, diameter, specification, material, route geometry, fittings, valves/components, elevation and revision.

Routing changes must update the related physical definition; an attractive line in 3D alone is insufficient. PBS owns known geometry and physical topology. PSS consumes a versioned view and adds simulation assumptions/results.

Do not collapse a line designation, pipe segment, connection, process stream and computational stream into one entity. The detailed relationship remains open. Nominal and inside diameter must be distinguished in the extraction contract rather than silently substituted.

## Related notes

- [[PBS_HOME]]
- [[PIPE_LINE_STREAM]]
- [[PORT]]
- [[CONNECTION]]
- [[PBS_TO_PSS_HYDRAULICS]]
- [[OQ-003]]
- [[OQ-006]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#6. Canonical Hierarchy|PBS — 6. Canonical Hierarchy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#12. Piping as Engineering Data|PBS — 12. Piping as Engineering Data]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#41. Open Questions|PBS — 41. Open Questions]]

## Related requirements

- [[PBS-REQ-006]]
- [[PBS-REQ-007]]
