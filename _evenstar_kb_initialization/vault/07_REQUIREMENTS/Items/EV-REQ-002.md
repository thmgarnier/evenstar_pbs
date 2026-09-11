---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]"]
id: "EV-REQ-002"
implementation_status: "unverified"
---

# EV-REQ-002 — Stable canonical identity

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

Persistent engineering objects shall use stable UUIDs across representations and subsystem references.

## Acceptance criteria

Select a pump in P&ID, 3D, data and external references: each resolves the same canonical UUID.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[CANONICAL_IDENTITY]]
- [[ADR-002]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#5. Canonical Identity|PBS — 5. Canonical Identity]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#15. One Object, Many Representations|PBS — 15. One Object, Many Representations]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
