---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# Data ownership

> **Every datum should have one explicit authoritative owner.**

| Information | Authoritative owner | Reference/write rule |
| --- | --- | --- |
| Canonical Project UUID / cross-system identity | Evenstar canonical/core domain | PBS/PSS/PMS reference; creator/provisioner service open |
| Canonical engineering UUID | PBS / Evenstar canonical model | Stable identity across all representations |
| KKS/tag relationship | PBS | Other systems cache labels with source/freshness |
| Plant/system hierarchy | PBS | PMS WBS/delivery grouping is distinct |
| Equipment existence/type and physical design facets | PBS | Vendor/calculation datasets require field-level mapping |
| Plant geometry / placement | PBS | PSS consumes physical values |
| Ports, connections, physical piping topology | PBS | Imported topology snapshots belong to a PSS model |
| Route geometry, length, elevation, physical diameter/spec | PBS | PSS study variants are local assumptions |
| Instrument existence / physical control relationships | PBS | Detailed control-loop facet partition open |
| Materials, parts, specifications and assemblies | PBS | Procurement delivery records can reference these |
| Plant revision / engineering change application | PBS | PMS review orchestration interface open |
| PSS model and solver configuration/state | PSS | Airtable must not manipulate internal solver state |
| PSS thermodynamic methods and calculation assumptions | PSS | Method/version/units remain traceable |
| PSS run, result and input snapshot | PSS | Later project edits do not alter historical runs |
| Reusable inputs authored in PSS Engineering Register | PSS Project Data domain | Controlled explicit writes; not all data accessed by Project Data |
| PBS-owned values exposed through Project Data | PBS | Read/reference; changes require a PBS proposal |
| Local study overrides | PSS model/study | A proposed design is not yet canonical |
| Published PSS engineering result records | PSS | Register is a publication surface; preserve originating run |
| Selected calculation evidence | PSS | PMS owns selection/promotion context, not the calculation |
| Deliverables, tasks and milestones | PMS | Link stable project/object/evidence identifiers |
| Reviews, approvals and delivery status | PMS | Revision-specific history; no silent overwrite |
| Issues, RFIs and delivery change coordination | PMS | Canonical plant application remains PBS |
| Controlled-document metadata and issued revision context | PMS | PBS holds links; file/blob authority remains open |
| Airtable base IDs and schema/mapping registry | Evenstar core integration metadata | Business data authority remains with the domain |
| Document binary storage, retention and access | Unresolved | No competing store designated; see OQ-015 |

An owner is a domain responsibility, not simply the product hosting a record. Airtable can store PSS-owned results and PMS-owned delivery data in separate bases. Supabase can host canonical identity without owning every project datum.

For every new field: name the datum, owner, permitted editors, source reference, unit/basis, version and refresh/write path. A duplicate display must identify its source and must not become an independent truth. Ambiguous fields are blocked from conflicting writes until ownership is resolved.

Two important unresolved overlaps are equipment/vendor parameters (physical design versus reusable calculation assumptions) and document metadata (plant-linked files versus controlled deliverables). Use [[OQ-021]] and [[OQ-015]] rather than assigning them silently.

## Related notes

- [[SYSTEM_BOUNDARIES]]
- [[PSS_PROJECT_DATA]]
- [[PMS_ENGINEERING_REFERENCES]]
- [[OQ-005]]
- [[OQ-021]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#4. Core Ownership|PBS — 4. Core Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#18. Data Ownership|PBS — 18. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#6. Local, Project and Linked Inputs|PSS — 6. Local, Project and Linked Inputs]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#8. Reusable Project Input Model|PSS — 8. Reusable Project Input Model]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[EV-REQ-004]]
- [[PSS-REQ-008]]
- [[INT-REQ-008]]
