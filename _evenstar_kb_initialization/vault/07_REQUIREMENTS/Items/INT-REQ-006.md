---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]"]
id: "INT-REQ-006"
implementation_status: "unverified"
---

# INT-REQ-006 — Explicit design proposals

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS-to-PBS design changes shall be proposals reviewed/applied by PBS rather than silent external writes.

## Acceptance criteria

A study override leaves PBS unchanged; its proposal can be traced to affected UUIDs, before/after and origin evidence.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PSS_TO_PBS_DESIGN_CHANGE]]
- [[ADR-011]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#26. Revisions and Engineering Change|PBS — 26. Revisions and Engineering Change]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#15. Study Overrides and Design Proposals|PSS — 15. Study Overrides and Design Proposals]]
