---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Hydraulics"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]"]
---

# PSS hydraulics

Construct a hydraulic model from PBS physical topology when sufficient data exists: pipes, nodes/ports, connectivity, elevations, lengths/geometry, nominal/inside diameters, fittings/valves, equipment connections, materials/specifications and stable UUIDs/tags.

PSS adds fluid state, boundary conditions, roughness/correlation assumptions, pump/compressor curves, method and scenario overrides. Missing properties must be identified, not silently invented.

A study can test DN250 against a PBS DN200 baseline without changing PBS. Results can yield an explicit proposal. Publish engineering nodes/stations with run, pipeline and node UUIDs, order/distance/elevation, selected results, units and case. Exact topology and result contracts remain open.

## Related notes

- [[PSS_HOME]]
- [[PBS_TO_PSS_HYDRAULICS]]
- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[PBS_PIPING]]
- [[PSS_RUNS_RESULTS]]
- [[OQ-006]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#4. Major PSS Workspaces|PSS — 4. Major PSS Workspaces]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#12. Results Publication Philosophy|PSS — 12. Results Publication Philosophy]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]

## Related requirements

- [[PSS-REQ-009]]
