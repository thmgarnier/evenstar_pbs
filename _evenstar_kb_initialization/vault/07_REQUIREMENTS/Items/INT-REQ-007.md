---
type: "requirement"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: []
tags: ["evenstar", "requirement"]
sources: ["[[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]"]
id: "INT-REQ-007"
implementation_status: "unverified"
---

# INT-REQ-007 — Domain identities across adapters

**Classification:** REQUIREMENT

**Status:** Accepted product intent. **Implementation:** Unverified.

Integration/business logic shall use stable domain identities and mapping contracts rather than permanent coupling to Airtable IDs or one integration tool.

## Acceptance criteria

Replace a test external mapping while retaining domain references; adapter-specific IDs do not become canonical keys.

These criteria are derived verification targets, not executed product tests.

## Related notes

- [[INTEGRATION_ARCHITECTURE]]
- [[EVENT_AND_API_CONTRACTS]]

## Source

- [[99_SOURCES/EVENSTAR_PSS_ASTRA#16. Integration Architecture|PSS — 16. Integration Architecture]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#20. Integration Layer|PMS — 20. Integration Layer]]
