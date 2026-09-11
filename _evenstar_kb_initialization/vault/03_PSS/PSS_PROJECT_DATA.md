---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: ["Project Data"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]"]
---

# PSS Project Data

> **Start from Project, not from scratch.**

| Input class | Meaning | Authority |
| --- | --- | --- |
| LOCAL PSS INPUT | Value exists only in a model/study | PSS model/study |
| PROJECT INPUT | Reusable information in a project register or canonical Evenstar data | Owning domain of that datum |
| LINKED PSS INPUT | Model input explicitly associated with a project record | Source owns project value; PSS owns model value/snapshot |

Not every value needs a project link. A linked input is an association, not permission to overwrite either side.

| Explicit action | Intended effect | Boundary |
| --- | --- | --- |
| ← Read from Project | Select/validate/map project values into the working model | Show relevant differences; preserve historical runs |
| → Write to Project | Explicitly publish selected local inputs to an authorized reusable-input record | Controlled API; PBS-owned physical data needs a proposal instead |
| ⇄ Compare | Show model/project differences including units, basis and revision | Does not mutate either side |
| ↻ Refresh | Check/reload current source information and identify newer versions | No automatic acceptance into model/run; exact UI granularity open |

Selection can span an operating case, stream, composition, equipment dataset or individual variable. Show a diff before overwriting where appropriate. Validate types, units and source ownership. Conflicting writes need a defined resolution policy.

A source edit may make a link stale, but old runs remain unchanged. The engineer can compare, keep current model values or read deliberately. Snapshot and provenance requirements are in [[PSS_PROVENANCE]].

Examples of reusable knowledge include gas composition, water analysis, ambient conditions, design cases, known variables and PBS topology. Project Data is not uncontrolled bidirectional synchronization.

## Related notes

- [[PSS_HOME]]
- [[DATA_OWNERSHIP]]
- [[PSS_PROVENANCE]]
- [[START_FROM_PROJECT]]
- [[PROJECT_DATA_UPDATE]]
- [[OQ-008]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#5. Start From Project|PSS — 5. Start From Project]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#7. Project Data Read / Write Panel|PSS — 7. Project Data Read / Write Panel]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]

## Related requirements

- [[PSS-REQ-001]]
- [[PSS-REQ-002]]
- [[PSS-REQ-003]]
- [[PSS-REQ-004]]
- [[PSS-REQ-005]]
