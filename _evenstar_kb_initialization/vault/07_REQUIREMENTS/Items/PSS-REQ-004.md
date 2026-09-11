---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#3. Product Character|PSS — 3. Product Character]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]"]
id: "PSS-REQ-004"
implementation_status: "unverified"
---

# PSS-REQ-004 — Typed and unit-aware input reuse

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall validate types, units and basis when importing reusable inputs.

## Acceptance criteria

A mapped value retains its unit/basis; incompatible or unresolved mappings are surfaced before they silently become model inputs.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_PROJECT_DATA]]
- [[OQ-009]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#3. Product Character|PSS — 3. Product Character]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#18. Process Engineer Experience|PSS — 18. Process Engineer Experience]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
