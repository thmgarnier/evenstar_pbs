---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#9. PSS → PMS Promotion|PMS — 9. PSS → PMS Promotion]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]"]
id: "PMS-REQ-004"
implementation_status: "unverified"
---

# PMS-REQ-004 — Selective calculation evidence

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PMS shall reference selected/promoted PSS evidence rather than ingest all runs/results.

## Acceptance criteria

Select one run/report for a deliverable revision; unrelated runs are not automatically added as controlled evidence.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PMS_PSS_PROMOTION]]
- [[ADR-013]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#9. PSS → PMS Promotion|PMS — 9. PSS → PMS Promotion]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#17. Data Ownership|PMS — 17. Data Ownership]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
