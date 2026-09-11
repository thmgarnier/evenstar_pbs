---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]"]
---

# PMS engineering references

An engineering reference is a bridge to PBS: Project UUID, PBS Object UUID and useful cached tag/name/type/system plus source/refresh metadata. The UUID is the technical link; cached labels are for usability.

A deliverable such as Pump Datasheet — P-101 can refer to the canonical pump while PMS stores owner, dates and delivery status. PMS must not redefine the equipment or create an independent engineering truth.

Refresh cadence, changed/deleted object behavior and revision pinning are open contract questions. A stale cached tag must never force a new engineering identity.

## Related notes

- [[PMS_HOME]]
- [[ENGINEERING_REFERENCE]]
- [[CANONICAL_IDENTITY]]
- [[DATA_OWNERSHIP]]
- [[OQ-016]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#29. Open Questions for Astra|PMS — 29. Open Questions for Astra]]

## Related requirements

- [[PMS-REQ-003]]
- [[INT-REQ-009]]
