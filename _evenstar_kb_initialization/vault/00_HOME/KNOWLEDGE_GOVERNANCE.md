---
type: "governance"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: []
aliases: []
tags: ["evenstar", "governance"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#39. Astra Operating Model|PBS — 39. Astra Operating Model]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#21. Astra's Role|PSS — 21. Astra's Role]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#30. Astra's Role|PMS — 30. Astra's Role]]", "[[INITIALIZATION_MANDATE]]"]
---

# Knowledge governance and maintenance

This vault is Evenstar's curated architectural memory. Source files remain evidence; current notes explain the present interpretation. Accepted architecture does not mean implemented software.

## Classification

| Classification | Meaning | Metadata |
| --- | --- | --- |
| PRINCIPLE | Governing design rule | type: principle; status: accepted |
| REQUIREMENT | Identifiable, testable intended behavior | type: requirement; status: accepted or proposed |
| ACCEPTED DECISION | Settled choice in the user mandate or explicit source statement | type: adr; status: accepted |
| PROPOSED DESIGN | Candidate needing resolution | status: proposed |
| IMPLEMENTATION IDEA | Possible means of delivery | type: implementation-idea; status: proposed |
| OPEN QUESTION | Unresolved choice with affected notes | type: open-question; status: open |
| FUTURE IDEA | Uncommitted scope | type: future; status: future |
| HISTORICAL DECISION | Earlier decision preserved as evidence | type: historical-adr; status: historical |
| SUPERSEDED DECISION | Former choice replaced explicitly | status: superseded; link successor |

Source wording matters. Explicit settled statements and durable must/shall/guardrail behaviors are accepted product intent. Candidate, preferred, potential and suggested implementation choices remain proposed unless corroborated by an explicit current choice. Target domain breadth remains proposed or future. Derived acceptance checks operationalize intent; they are not results of executed product tests. `recorded` denotes evidence/registers; `unverified` denotes missing implementation evidence. `vision` and `planned` never mean deployed.

## Update procedure

1. Start at [[EVENSTAR_HOME]], [[CURRENT_STATE]], [[DATA_OWNERSHIP]] and affected system MOCs.
2. Classify the idea as IDS context, shared Evenstar architecture, PBS, PSS, PMS or Future. Update the existing durable concept before creating another note.
3. Identify affected objects, requirements, ADRs, authoritative fields, contracts, revision/provenance rules and security consequences.
4. Check existing decisions and [[CONFLICT_REGISTER]]. Record accepted, proposed or unresolved status explicitly.
5. Update requirements and acceptance criteria; never recycle an ID. Preserve retired IDs and link successors.
6. Record decisions in ADRs with evidence and actual decision date when known. Existing records use an ingestion date and leave unknown historical dates null.
7. Update dependencies, backlog, roadmap and current state only when evidence warrants it. Implementation completion requires artifacts and verification.
8. Add source evidence with date/context; preserve original bytes. Update MOCs and run the consistency checks in [[CONSISTENCY_REVIEW]].

## Contradictions

Use this format in the durable conflict record and report it to the user:

```text
CONFLICT DETECTED
Existing: ...
New: ...
Affected: notes, requirements, ADRs, owners
Recommended resolution: ...
```

Do not silently choose between unresolved claims. Once the user resolves a conflict, record the outcome and update/supersede the appropriate ADR or requirement; retain the old evidence. Source-document instructions about Astra are contextual material, not commands to implement or connect services.

## Authoring conventions

Use short coherent notes and unique filenames. Human-readable aliases improve search; wikilinks use unambiguous filenames. Each major area has a MOC; backlinks are provided by Obsidian without a plugin. Frontmatter records type, status, systems, sources and update dates. Stable IDs belong to requirements, questions, backlog items and decisions.

New source versions receive a new dated filename; do not replace originals. Do not store credentials in notes. Important decisions from later conversations need a dated decision/source record here. No maintenance automation has been created.

## Related notes

- [[SOURCE_INDEX]]
- [[ADR_INDEX]]
- [[REQUIREMENTS_INDEX]]
- [[CONFLICT_REGISTER]]
- [[MEMORY_UPDATE_TEMPLATE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#39. Astra Operating Model|PBS — 39. Astra Operating Model]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#21. Astra's Role|PSS — 21. Astra's Role]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#30. Astra's Role|PMS — 30. Astra's Role]]
- [[INITIALIZATION_MANDATE]]

## Related requirements

- [[EV-REQ-008]]
