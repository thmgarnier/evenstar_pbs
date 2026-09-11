---
type: "implementation-idea"
status: "proposed"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "implementation-idea"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#19. Airtable Automations|PMS — 19. Airtable Automations]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]"]
---

# PMS automations

Possible automations include due-date reminders, overdue flags, review creation/notification, status updates following approvals, blocked-critical-deliverable alerts, aging issues/RFIs and warnings when selected evidence is superseded.

Important workflow logic must remain documented and inspectable. Status automation must preserve revision-specific decisions and cannot grant AI approval authority. Notification recipients, triggers, permissions, retries and exact transitions need design.

No Airtable automation, notification or scheduled task has been created during knowledge-base initialization.

## Related notes

- [[PMS_HOME]]
- [[PMS_REVIEWS_APPROVALS]]
- [[PMS_PSS_PROMOTION]]
- [[EVENT_AND_API_CONTRACTS]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#19. Airtable Automations|PMS — 19. Airtable Automations]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#23. AI|PMS — 23. AI]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]

## Related requirements

- [[PMS-REQ-010]]
