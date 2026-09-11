---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]"]
---

# PBS ↔ PSS integration

PBS supplies stable engineering identity, physical equipment parameters, piping topology, geometry/elevation, hierarchy and plant instrumentation relationships. PSS owns the resulting computational model, methods and results.

Hydraulic import should use known pipes, ports, fittings, valves and equipment without manual reconstruction. Missing data and simulation-only assumptions are made explicit. Calculated results may be displayed in PBS with their source run/revision context.

The return write path is an explicit design proposal, reviewed and applied by PBS. No study override silently changes the plant.

## Related notes

- [[PBS_HOME]]
- [[PBS_TO_PSS_HYDRAULICS]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[PSS_PBS_INTEGRATION]]
- [[OQ-006]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#13. PBS → PSS Hydraulics|PBS — 13. PBS → PSS Hydraulics]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#22. Relationship to PSS|PBS — 22. Relationship to PSS]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]

## Related requirements

- [[INT-REQ-005]]
