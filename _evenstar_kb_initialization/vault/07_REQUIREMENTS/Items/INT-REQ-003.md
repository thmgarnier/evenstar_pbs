---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#17. Project Templates|PSS — 17. Project Templates]]"]
id: "INT-REQ-003"
implementation_status: "unverified"
---

# INT-REQ-003 — Per-project PSS register

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

PSS-enabled projects shall support a per-project PSS base provisioned or connected through versioned configuration.

## Acceptance criteria

Resolve project UUID to its PSS base and schema/template mappings without normal users editing table IDs.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[ADR-008]]
- [[PROJECT_CREATION]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#17. Project Templates|PSS — 17. Project Templates]]
