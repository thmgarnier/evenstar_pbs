---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]"]
id: "PMS-REQ-003"
implementation_status: "unverified"
---

# PMS-REQ-003 — Canonical engineering references

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PMS shall link relevant records to Evenstar Project UUID and PBS Object UUID while treating tag/name caches as non-authoritative.

## Acceptance criteria

Retag a PBS object and verify the delivery reference still resolves the UUID; label refresh does not redefine equipment.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PMS_ENGINEERING_REFERENCES]]
- [[ENGINEERING_REFERENCE]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
