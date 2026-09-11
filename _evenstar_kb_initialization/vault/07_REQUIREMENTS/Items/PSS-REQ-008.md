---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]"]
id: "PSS-REQ-008"
implementation_status: "unverified"
---

# PSS-REQ-008 — Computational authority

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall own model/solver configuration and state; the Engineering Register shall not directly manipulate solver internals.

## Acceptance criteria

An input publication changes reusable data through the domain boundary; a register edit does not silently alter internal solver state.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_ARCHITECTURE]]
- [[DATA_OWNERSHIP]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#2. Relationship to Evenstar|PSS — 2. Relationship to Evenstar]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#14. Data Ownership|PSS — 14. Data Ownership]]
