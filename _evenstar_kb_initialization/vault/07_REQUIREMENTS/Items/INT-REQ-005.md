---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]", "[[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]"]
id: "INT-REQ-005"
implementation_status: "unverified"
---

# INT-REQ-005 — Plant-change freshness

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PBS/PSS exchange shall detect/version source plant changes and allow explicit refresh.

## Acceptance criteria

A PBS route change marks or exposes a stale PSS import; deliberate refresh does not rewrite the old run.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PBS_PSS_INTEGRATION]]
- [[PSS_PROVENANCE]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#19. Cross-System Change Principle|PBS — 19. Cross-System Change Principle]]
- [[99_SOURCES/EVENSTAR_PBS_ASTRA#37. Initial Requirements|PBS — 37. Initial Requirements]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#9. Input Snapshots and Reproducibility|PSS — 9. Input Snapshots and Reproducibility]]
