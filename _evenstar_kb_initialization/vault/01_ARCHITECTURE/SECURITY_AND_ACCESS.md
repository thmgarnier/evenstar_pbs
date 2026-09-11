---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#29. Security|PBS — 29. Security]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#24. Permissions|PMS — 24. Permissions]]"]
---

# Security and access

PBS source guardrails require server-side/environment-scoped privileged credentials, appropriate RLS, project/organization authorization, important-change logging and explicitly designed cross-system writes.

PSS Project Data operations need an authentication/permission design for project sources and writes. PMS source roles are candidates: project manager, engineering manager, discipline lead, engineer, reviewer, approver, external reviewer and viewer. The exact Airtable/Evenstar mapping remains open.

An approval record concerns a specific revision; permission to edit a display record does not imply authority to approve engineering or change canonical plant data. Secret storage and actual platform capability checks belong to implementation planning, not assumptions in these notes.

## Related notes

- [[DATA_OWNERSHIP]]
- [[OQ-019]]
- [[AI_ASSISTANCE]]
- [[DOCUMENT_REVIEW_APPROVAL]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#29. Security|PBS — 29. Security]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#20. Open Questions for Astra|PSS — 20. Open Questions for Astra]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#24. Permissions|PMS — 24. Permissions]]

## Related requirements

- [[PBS-REQ-010]]
