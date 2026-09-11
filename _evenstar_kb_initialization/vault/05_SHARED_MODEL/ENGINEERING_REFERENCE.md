---
type: "concept"
status: "accepted"
created: "2026-09-11"
updated: "2026-09-11"
systems: ["PBS", "PSS", "PMS"]
aliases: ["Engineering Reference"]
tags: ["evenstar", "concept"]
sources: ["[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]", "[[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]"]
---

# Engineering reference

An engineering reference links a consumer record to a canonical engineering object using Project UUID and PBS Object UUID. Human-readable tag/name/type/system may be cached with source/freshness metadata.

The consumer owns the association and its workflow context; PBS owns the engineering object. References should preserve identity through tag changes. Deletion, freshness and revision-pinning behavior still need a contract.

## Related notes

- [[CANONICAL_IDENTITY]]
- [[PMS_ENGINEERING_REFERENCES]]
- [[OQ-016]]

## Source

- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#7. Recommended Airtable Tables|PMS — 7. Recommended Airtable Tables]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#8. PBS Engineering References|PMS — 8. PBS Engineering References]]
- [[99_SOURCES/EVENSTAR_PMS_AIRTABLE_ASTRA#18. Cross-System Identity|PMS — 18. Cross-System Identity]]

## Related requirements

- [[PMS-REQ-003]]
