---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]"]
id: "INT-REQ-002"
implementation_status: "unverified"
---

# INT-REQ-002 — Separate engineering and delivery bases

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS and PMS Airtable bases shall remain separate domains with explicit selected exchange.

## Acceptance criteria

Reusable inputs/runs reside in the PSS context and deliverables/reviews in PMS; linking evidence does not merge bases.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[ADR-007]]
- [[PMS_AIRTABLE_ARCHITECTURE]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#16. PSS Base vs PMS Base|PMS — 16. PSS Base vs PMS Base]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#28. Guardrails|PMS — 28. Guardrails]]
