---
type: "plan"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "plan"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#31. Reference Plants|PBS — 31. Reference Plants]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#38. Backlog Direction|PBS — 38. Backlog Direction]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#27. Suggested MVP|PMS — 27. Suggested MVP]]"]
---

# MVP candidates and acceptance gates

**Proposed proof slices; not a commitment to implement all source feature lists.**

| Slice | Small coherent demonstration | Evidence to pass |
| --- | --- | --- |
| PBS identity | Compact seed pump/network in data, P&ID and 3D | Same UUID, typed ports/relationships, tags and traceable changes |
| PSS Project Data | One project/base; gas composition/design conditions entered in register or explicitly written from PSS; small steady-state/thermo calculation | Start from Project, source/units validated, roughly 10–20 meaningful results, case chart, changed source compared without altering old run |
| PBS → PSS hydraulics | Known compact topology seeds hydraulic model | No redraw, explicit missing assumptions/override, ordered engineering-node results, optional controlled proposal |
| PMS delivery | One proposed project base, about 3 disciplines, 2 systems, 10–20 deliverables with tasks/milestones/documents/reviews | PBS references, one selected PSS report/result, revision submission/review/approval/issue and visible status |

Counts are source demonstration targets, not universal system limits. The water/thermal/process seed and feed-gas PSS example are separate candidates; choose compatible fixture data deliberately.

Recommended next architectural slice is a worked **pump + connected network + one calculation + one controlled deliverable** contract. Resolve identity, datum ownership, revision and evidence semantics on paper before building its schema or UI.

Non-MVP until chosen: broad industrial routing, full process/control domain depth, portfolio, procurement/construction depth and document generation.

## Related notes

- [[SEED_PLANT]]
- [[OPEN_QUESTIONS]]
- [[REQUIREMENTS_INDEX]]
- [[CURRENT_STATE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#31. Reference Plants|PBS — 31. Reference Plants]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#38. Backlog Direction|PBS — 38. Backlog Direction]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#22. MVP Vertical Slice|PSS — 22. MVP Vertical Slice]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#27. Suggested MVP|PMS — 27. Suggested MVP]]
