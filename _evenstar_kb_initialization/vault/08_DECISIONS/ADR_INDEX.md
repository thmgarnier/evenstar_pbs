---
type: "register"
status: "recorded"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "register"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]"]
---

# Architecture decision register

Current accepted records capture explicit source choices. Unknown original decision dates remain null; recording date is initialization. Historical records preserve only summaries supplied in the corpus.

## Current accepted decisions

| ID | Decision | Status |
| --- | --- | --- |
| [[ADR-001]] | PBS / PSS / PMS system responsibilities | accepted |
| [[ADR-002]] | Stable UUIDs for canonical engineering identity | accepted |
| [[ADR-003]] | KKS and tags are human identifiers | accepted |
| [[ADR-004]] | One engineering object, many representations | accepted |
| [[ADR-005]] | Explicit authoritative data ownership | accepted |
| [[ADR-006]] | Initial Supabase / PostgreSQL canonical backbone | accepted |
| [[ADR-007]] | Separate PSS and PMS Airtable bases | accepted |
| [[ADR-008]] | Per-project PSS Engineering Register | accepted |
| [[ADR-009]] | No silent PSS modification of PBS state | accepted |
| [[ADR-010]] | Reuse PBS topology for PSS hydraulics | accepted |
| [[ADR-011]] | Explicit PSS design-change proposals | accepted |
| [[ADR-012]] | Deliverable-centered PMS | accepted |
| [[ADR-013]] | Selected PSS evidence enters PMS | accepted |
| [[ADR-014]] | Open-source-first architecture | accepted |
| [[ADR-015]] | Explicit Project Data exchange and reproducible runs | accepted |
| [[ADR-016]] | Historical demos follow current system boundaries | accepted |

## Candidate not recorded as an accepted ADR

One PMS base per project is preferred in the source, not conclusively settled. See [[OQ-011]]; keep it open until ratified. Exact schemas, APIs/events, frontend/rendering tools, engine selection and provisioning mechanisms likewise remain questions/proposals.

## Historical accepted decisions as reported

- [[PBS-ADR-001|Integrated views]]
- [[PBS-ADR-002|Shared canonical backend]]
- [[PBS-ADR-003|Stable UUIDs]]
- [[PBS-ADR-004|Astra as architect and build manual]]
- [[PBS-ADR-005|Executable human tasks]]
- [[PBS-ADR-006|Open source first]]
- [[PBS-ADR-007|Canonical model before elaborate interfaces]]

No original historical ADR is marked wholly superseded without evidence. [[ADR-016]] records supersession of the old demo partition as permanent subsystem ownership, while retaining its durable principles.

## Related notes

- [[HISTORICAL_ARCHITECTURE]]
- [[REQUIREMENTS_INDEX]]
- [[KNOWLEDGE_GOVERNANCE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#27. Historical Demo Strategy|PBS — 27. Historical Demo Strategy]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#35. Accepted Historical Decisions|PBS — 35. Accepted Historical Decisions]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#36. Decisions Requiring Reconciliation|PBS — 36. Decisions Requiring Reconciliation]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#4. One PMS Base Per Project|PMS — 4. One PMS Base Per Project]]
