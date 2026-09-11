---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]", "[[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]"]
id: "INT-REQ-001"
implementation_status: "unverified"
---

# INT-REQ-001 — Common project identity

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

Subsystem contexts and relevant external records shall retain the canonical Evenstar Project UUID.

## Acceptance criteria

Resolve a PBS object, PSS project/run and PMS deliverable to the same project independently of external base/record IDs.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[PROJECT_IDENTITY]]

## Source

- [[99_SOURCES/EVENSTAR_PBS_ASTRA#21. Project Creation|PBS — 21. Project Creation]]
- [[99_SOURCES/EVENSTAR_PSS_ASTRA#10. PSS Project Base Provisioning|PSS — 10. PSS Project Base Provisioning]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
