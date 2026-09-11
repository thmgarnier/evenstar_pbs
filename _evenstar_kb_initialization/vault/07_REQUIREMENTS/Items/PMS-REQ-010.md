---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#19. Airtable Automations|PMS — 19. Airtable Automations]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]"]
id: "PMS-REQ-010"
implementation_status: "unverified"
---

# PMS-REQ-010 — Inspectable automation

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

Important PMS automation/workflow logic shall remain documented and inspectable.

## Acceptance criteria

For a configured status-changing automation, inspect its trigger, conditions and revision-specific outcome; no hidden AI approval path exists.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PMS_AUTOMATIONS]]
- [[AI_ASSISTANCE]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#19. Airtable Automations|PMS — 19. Airtable Automations]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
