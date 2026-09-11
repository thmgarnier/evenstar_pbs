---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PSS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]"]
id: "PSS-REQ-006"
implementation_status: "unverified"
---

# PSS-REQ-006 — Immutable historical run inputs

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS shall retain input snapshots/version references sufficient to reproduce what a run used.

## Acceptance criteria

Edit an Airtable source after a run; the old run still resolves original values, units/basis and source identity/version.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_PROVENANCE]]
- [[ADR-015]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#19. Guardrails|PSS — 19. Guardrails]]
